import dayjs from "dayjs";
import * as isoWeek from 'dayjs/plugin/isoWeek';
// @ts-ignore
dayjs.extend((isoWeek));

export const createWeekCapacity = () => {
    const years = ["2022", "2023", "2024", "2025"];
    const numberOfWeeks = 52;
    const weekCapData = {};
    years.forEach((year) => {
        weekCapData[year] = {};
    });

    for (let i = 0; i < numberOfWeeks; i++) {
        for (const year in weekCapData) {
            weekCapData[year][i + 1] = 0
        }
    }
    return weekCapData;
}

export const getTasks = async () => {
    const response = await fetch("http://localhost:1337/tasks/");
    return await response.json();
};

export const getUserCap = async () => {
    const response = await fetch(`http://localhost:1337/userCap`);
    const result = await response.json();
    return result.cap;
};

export const sortTasksByDeadline = async () => {
    const tasks = await getTasks();
    return tasks.sort((a, b) => {
        return dayjs(a.deadline) - dayjs(b.deadline);
    });
}
export const checkWeeklyCapacity = async (task, weekCapData) => {
    const userTime = await getUserCap();
    const taskYear = await getTaskYear(task.id);
    let taskWeek = await getTaskWeek(task.id);
    if (weekCapData[taskYear][taskWeek] === userTime) {
        while(weekCapData[taskYear][taskWeek] >= userTime) {
            taskWeek++;
        }
    }
    return taskWeek;
}
export const setEvent = async (weekCapData) => {
    const data = await sortTasksByDeadline();
    const tasks = [];

    for (const task of data) {
        const userTime = await getUserCap();
        let taskYear = await getTaskYear(task.id);
        let taskWeek = await checkWeeklyCapacity(task, weekCapData);
        let currentTaskWeek = weekCapData[taskYear][taskWeek];

        const sumOfTime = weekCapData[taskYear][taskWeek] + task.estimated_duration;
        if (!sumOfTime <= userTime){
            let timeLeft = userTime - currentTaskWeek;
            const negative = task.estimated_duration - timeLeft;
            if (negative <= 0) {
                weekCapData[taskYear][taskWeek] += task.estimated_duration;
                task.estimated_duration = 0;
                tasks.push(addEvent(taskYear, taskWeek, task));
            }else {
                const firstWeekToSchedule = taskWeek;
                weekCapData[taskYear][taskWeek] += timeLeft;
                task.estimated_duration -= timeLeft;
                const timeLeftFromTask = await calcTimeLeft(task.estimated_duration);

                for (let x = 0; x < timeLeftFromTask.length; x++) {
                    taskWeek++;
                    if (taskWeek > 52) {
                        taskYear++;
                        taskWeek = 1;
                    }
                    weekCapData[taskYear][taskWeek] += timeLeftFromTask[x];

                }

                tasks.push(addEvent(taskYear, taskWeek, task, firstWeekToSchedule));
            }

        }else {
            weekCapData[taskYear][taskWeek] += task.estimated_duration;
            task.estimated_duration = 0;
            tasks.push(addEvent(taskYear, taskWeek, task));
        }
    }
    return tasks;

};


export const getTaskClass = (task) => {
    if (task.status === "Not started") {
        return "notStarted task";
    } else if (task.status === "In progress") {
        return "started task";
    } else {
        return "finished task";
    }

};

export const addEvent = (taskYear, taskWeek, task, firstWeek=0) => {
    const taskData = {};
    const friday = getFridayByWeekAndYear(taskYear, taskWeek);

    if (firstWeek === 0) {
        if (taskWeek === dayjs(task.starting_time).isoWeek()){
            taskData['start'] = task.starting_time;
        }else {
            taskData['start'] = getNextMondayByWeekAndYear(taskYear, taskWeek);
        }

    }else {
        if (taskWeek === firstWeek) {
            taskData['start'] = task.starting_time;
        }else {
            taskData['start'] = getNextMondayByWeekAndYear(taskYear, firstWeek);
        }
    }
    taskData['end'] = friday;
    taskData['title'] = task.description;
    taskData['class'] = getTaskClass(task);

    return taskData;

};

export const getTaskDate = async (id) => {
    const tasks = await getTasks();
    const task = tasks.filter((task) => {
        if (task.id === id) {
            return task.starting_time
        }
    })
    return task[0].starting_time
};

export const getTaskYear = async (id) =>{
    const taskDate = await getTaskDate(id);
    return taskDate.split("-")[0];
};

export const getTaskWeek = async (id) => {
    const date = await getTaskDate(id);
    return dayjs(date).isoWeek();
};

export const getNextMondayByWeekAndYear = (year, week) => {
    const firstDate = dayjs(`${year}-01-01`).add(week, "week");
    return firstDate.day(1).format("YYYY-MM-DD");
};

export const getFridayByWeekAndYear = (year, week) => {
    const firstDate = dayjs(`${year}-01-01`).add(week, "week");
    return firstDate.day(5).format("YYYY-MM-DD");
};

export const calcTimeLeft = async (timeLeftFromTask) => {
    const userTime = await getUserCap();
    const hoursPerWeek = [];

    let timeLeft = timeLeftFromTask;

    while (timeLeft >= userTime) {
        if (timeLeft > userTime) {
            hoursPerWeek.push(userTime);
            timeLeft -= userTime;
        }else {
            hoursPerWeek.push(timeLeft);
            break;
        }
    }
    if (timeLeft < userTime && timeLeft !== 0) {
        hoursPerWeek.push(timeLeft);
    }
    return hoursPerWeek;
}