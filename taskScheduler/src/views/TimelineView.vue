<script setup lang="ts"></script>

<template>




<div class="test-wrapper">
  <vue-cal
      selected-date="2022-10-05"
      :time="false"
      :selected-date="today"
      hide-weekends
      events-on-month-view="short"
      :disable-views="['years', 'year', 'day']"
      :events="events">
  </vue-cal>
</div>
</template>

<script>
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css'
import dayjs from "dayjs";
import * as isoYear from 'dayjs/plugin/isoWeek';
dayjs.extend((isoYear));
export default {
  async mounted() {
    const response = await fetch("http://localhost:1337/tasks/");
    const result = await response.json();
    this.tasks = await result;
    this.userCap = await this.getUserCap();
    this.createWeekCapacity();
    this.setEventTest();
  },
  methods: {
    checkWeeklyCapacity(task){
      const userTime = this.userCap.cap;
      const taskYear = this.getTaskYear(task.id);
      let taskWeek = this.getTaskWeek(task.id);
      if (this.weekCapData[taskYear][taskWeek] === userTime) {
        while(this.weekCapData[taskYear][taskWeek] >= userTime) {
          taskWeek++;
        }
      }
      return taskWeek;
    },
    getTaskClass(task){
      if (task.status === "Not started") {
        return "notStarted task";
      } else if (task.status === "In progress") {
        return "started task";
      } else {
        return "finished task";
      }

    },
    addEvent(taskYear, taskWeek, task, firstWeek=0){
        const taskData = {};
        const friday = this.getFridayByWeekAndYear(taskYear, taskWeek);

        if (firstWeek === 0) {
      if (taskWeek === dayjs(task.starting_time).isoWeek()){
        taskData['start'] = task.starting_time;
      }else {
        taskData['start'] = this.getNextMondayByWeekAndYear(taskYear, taskWeek);
      }

        }else {
          if (taskWeek === firstWeek) {
            taskData['start'] = task.starting_time;
          }else {
            taskData['start'] = this.getNextMondayByWeekAndYear(taskYear, firstWeek);
          }
        }
      taskData['end'] = friday;
      taskData['title'] = task.description;
      taskData['class'] = this.getTaskClass(task);

        return taskData;

    },
    setEventTest() {
      const data = this.sortTasksByDeadline();
      const tasks = [];

      data.forEach((task) => {
        const userTime = this.userCap.cap;
        let taskYear = this.getTaskYear(task.id);
        let taskWeek = this.checkWeeklyCapacity(task);
        let currentTaskWeek = this.weekCapData[taskYear][taskWeek];

        const sumOfTime = this.weekCapData[taskYear][taskWeek] + task.estimated_duration;
        if (!sumOfTime <= userTime){
          let timeLeft = userTime - currentTaskWeek;
          const negative = task.estimated_duration - timeLeft;
          if (negative <= 0) {
            this.weekCapData[taskYear][taskWeek] += task.estimated_duration;
            task.estimated_duration = 0;
            tasks.push(this.addEvent(taskYear, taskWeek, task));
          }else {
            const firstWeekToSchedule = taskWeek;
            this.weekCapData[taskYear][taskWeek] += timeLeft;
            task.estimated_duration -= timeLeft;
            const timeLeftFromTask = this.calcTimeLeft(task.estimated_duration);

            for (let x = 0; x < timeLeftFromTask.length; x++) {
              taskWeek++;
              if (taskWeek > 52) {
                taskYear++;
                taskWeek = 1;
              }
              this.weekCapData[taskYear][taskWeek] += timeLeftFromTask[x];

            }

            tasks.push(this.addEvent(taskYear, taskWeek, task, firstWeekToSchedule));
          }

        }else {
          this.weekCapData[taskYear][taskWeek] += task.estimated_duration;
          task.estimated_duration = 0;
          tasks.push(this.addEvent(taskYear, taskWeek, task));
        }
        this.events = tasks;
        console.log(this.weekCapData);
      });

    },
    async getUserCap(){
      const response = await fetch(`http://localhost:1337/userCap`);
      return await response.json();
    },
    getTaskDate(id){
      const task = this.tasks.filter((task) => {
        if (task.id === id) {
          return task.starting_time
        }
      })
      return task[0].starting_time
    },
    getTaskYear(id){
      return this.getTaskDate(id).split("-")[0];
    },
    getTaskWeek(id){
      const date = this.getTaskDate(id);
      return dayjs(date).isoWeek();
    },
    getNextMondayByWeekAndYear(year, week){
      const firstDate = dayjs(`${year}-01-01`).add(week, "week");
      return firstDate.day(1).format("YYYY-MM-DD");
    },
    getFridayByWeekAndYear(year, week){
      const firstDate = dayjs(`${year}-01-01`).add(week, "week");
      return firstDate.day(5).format("YYYY-MM-DD");



    },
    createWeekCapacity(){
      const years = ["2022", "2023", "2024", "2025"];
      const numberOfWeeks = 52;
      const weekCapData = {};
      years.forEach((year) => {
        weekCapData[year] = {};
      });

      for (let i = 0; i < numberOfWeeks; i++) {
       for (const year in weekCapData){
         weekCapData[year][i + 1] = 0
       }
      }
      this.weekCapData = weekCapData;
    },
    sortTasksByDeadline(){
      return this.tasks.sort((a, b) => {
        return dayjs(a.deadline) - dayjs(b.deadline);
      });
    },
    calcTimeLeft(timeLeftFromTask){
      const userTime = this.userCap.cap;
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
    },

  },
  tasks: [],
  weekCapData: {},
  userCap: {},
  today: dayjs().format("YYYY-MM-DD").toString(),

  data: () => ({
    events: [
    ]}),

  components: { VueCal },

}
</script>
<style>
.test-wrapper {
  width: 100%;
  height: 100vh;
}

.vuecal__event.task{
  color: #fff;
  margin-bottom: 5px;
  padding: 10px;
}

.vuecal__event.notStarted{
  background-color: grey;
}

.vuecal__event.started {
  background-color: #ff8f00;
}

.vuecal__event.finished {
  background-color: #3cd73c;
}

.vuecal--month-view .vuecal__cell-content {
  padding-top: 10px;
  justify-content: start;
}
</style>

