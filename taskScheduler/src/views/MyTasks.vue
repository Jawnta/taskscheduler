<script setup lang="ts"></script>
<template>
  <div class="intro" :class="{'hidden' : !noTasks}">
    <p>You don't have any tasks right now... Click <span class="clickable" @click="this.$router.push('/addTask')">
      here</span>
      to
      start
      adding
      tasks.</p>
  </div>
  <div class="my-task-wrapper" :class="{'hidden' : noTasks}">

    <div class="all-tasks">
      <h2>My Tasks</h2>

      <div class="filter-tasks">
        <div class="filterInput">
          <div class="test">
          <h3>Filter by:</h3>
          </div>
        </div>

        <div class="filterInput">
          <label for="filter_date">Description</label>
        <input
            id="filter_search"
            v-model="filterData.query"
            placeholder="Search..."
            type="text"
            @keyup="checkFilter()"
        />
        </div>
        <div class="filterInput">
        <label for="filter_date">Date</label>
        <input
            id="filter_date"
            v-model="filterData.date"
            type="date"
            @change="checkFilter()"
        />
        </div>
        <div class="filterInput">
          <label for="filter_date">Deadline</label>
        <input
            id="filter_deadline"
            v-model="filterData.deadline"
            type="date"
            @change="checkFilter()"
        />
        </div>
      </div>


      <p v-if="isLoading">Loading...</p>
      <table>
      <thead>
        <tr>
          <th @click="sortById()" class="clickable">ID</th>
          <th @click="sortByDescription()" class="clickable">Description</th>
          <th @click="sortByCategory()" class="clickable">Category</th>
          <th @click="sortByDate()" class="clickable">Start date</th>
          <th @click="sortByDeadline()" class="clickable">Deadline</th>
          <th>Estimated duration</th>
          <th>Actual duration</th>
          <th>Elapsed time</th>
          <th>Status</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in filteredTasks">
          <td>
            {{ task.id }}
          </td>
          <td>
            {{ task.description }}
          </td>
          <td>
            {{ task.category }}
          </td>
          <td>
            {{ task.starting_time }}
          </td>
          <td>
            {{ task.deadline }}
          </td>
          <td>
            {{ task.estimated_duration + " hours" }}
          </td>
          <td v-if="!task.actual_duration">
            -
          </td>
          <td v-else-if="task.actual_duration">{{ task.actual_duration + " hours" }}</td>
          <td v-if="!task.elapsed_time">
            -
          </td>
          <td v-else-if="task.elapsed_time">{{ task.elapsed_time + " hours" }}</td>
          <td>
            {{ task.status }}
          </td>
          <td @click="editTask(task.id)" class="clickable">Edit</td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  async mounted() {
    const response = await fetch("http://localhost:1337/tasks/");
    const result = await response.json();
    this.tasks = result;
    this.filteredTasks = result;
    this.isLoading = false;
    this.checkTasks()
  },
  methods: {
    checkTasks (){
      if (this.filteredTasks.length) {
        this.noTasks = false
        return;
      }
      this.noTasks = true

    },
    async editTask (id) {
      const task = await this.getOneTask(id);
      this.$router.push({ name: "editTask", params: { id: task.id } });
    },
    async getOneTask(id) {
      const response = await fetch(`http://localhost:1337/tasks/${id}`);
      return await response.json();
    },
    checkFilter() {
      const filtersToApply = [];
      if (this.filterData.query) {
        filtersToApply.push((task) => task.description.toLowerCase().includes(this.filterData.query.toLowerCase()))
      }
      if (this.filterData.date) {
        filtersToApply.push((task) => task.starting_time === this.filterData.date)
      }
      if (this.filterData.deadline){
        filtersToApply.push((task) => task.deadline === this.filterData.deadline)
      }

      this.filteredTasks = this.tasks.filter((item) => filtersToApply.every(fn => fn(item)))

    },
    sortById() {
      switch (this.idSorted){
        case false:
          this.idSorted = true;
          this.filteredTasks.sort((a, b) => {
            return a.id - b.id;
          });
          break;
        case true:
          this.idSorted = false;
          this.filteredTasks.sort((a, b) => {
            return b.id - a.id;
          });
          break;
      }

    },
    sortByDescription() {

      switch (this.descriptionSorted){
        case false:
          this.descriptionSorted = true;
          this.filteredTasks.sort((a, b) => {
            return a.description.localeCompare(b.description);
          });
          break;
        case true:
          this.descriptionSorted = false;
          this.filteredTasks.sort((a, b) => {
            return b.description.localeCompare(a.description);
          });
          break;
      }

    },
    sortByCategory () {
      switch (this.categorySorted){
        case false:
          this.categorySorted = true;
          this.filteredTasks.sort((a, b) => {
            return a.category.localeCompare(b.category);
          });
          break;
        case true:
          this.categorySorted = false;
          this.filteredTasks.sort((a, b) => {
            return b.category.localeCompare(a.category);
          });
          break;
      }
    },
    sortByDate() {
      switch (this.dateSorted){
        case false:
          this.dateSorted = true;
          this.filteredTasks.sort((a, b) => {
            return dayjs(a.starting_time) - dayjs(b.starting_time);
          });
          break;
          case true:
            this.dateSorted = false;
            this.filteredTasks.sort((a, b) => {
              return dayjs(b.starting_time) - dayjs(a.starting_time);
            });
            break;
      }
    },
    sortByDeadline() {
      switch (this.deadlineSorted){
        case false:
          this.deadlineSorted = true;
          this.filteredTasks.sort((a, b) => {
            return dayjs(a.deadline) - dayjs(b.deadline);
          });
          break;
        case true:
          this.deadlineSorted = false;
          this.filteredTasks.sort((a, b) => {
            return dayjs(b.deadline) - dayjs(a.deadline);
          });
          break;
      }
    },
  },
  data() {
    return {
      filterData: {
        query: "",
        date: "",
        deadline: ""
      },
      idSorted: true,
      descriptionSorted: true,
      categorySorted: true,
      dateSorted: true,
      deadlineSorted: true,
      tasks: [],
      filteredTasks: [],
      isLoading: true,
      noTasks: true,
      tableData: {
        id: "",
        description: "",
        category: "",
        starting_time: "",
        deadline: "",
        estimated_duration: "",
        actual_duration: "",
      },
    };
  },
};
</script>

<style>
.intro {
  display: flex;
  width: 100%;
  justify-content: center;
  font-size: 24px;
}
label {
  margin-bottom: 10px;
}
.clickable {
  cursor: pointer;
}

.clickable th:hover {
  cursor: pointer;
}
.all-tasks h2 {
  margin-top: 0;
  margin-bottom: 20px;
  align-self: center;
}
.filterInput h3 {
  margin:0;
}
.filterInput {
  display: flex;
  flex-flow: column;
  align-items: center;
  margin: 0 20px 20px 0;
}
input[type="text"] {
  height: 30px;
  width: 100px;
  box-sizing: content-box;
  border-radius: 4px;

}

input[type="date"] {
  height: 30px;
  width: 100px;
  box-sizing: content-box;
  border-radius: 4px;

}
.my-task-wrapper {
  display: flex;
  margin: 50px;
  width: 100%;
  flex-flow: column;
  align-items: center;
}

.all-tasks {
  display: flex;
  flex-flow: column;
  width: 100%;
  font-size: 20px;
}

.filter-tasks {
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
}


table {
  width: 100%;
  background: #507aa1;
  border-radius: 0.25em;
  border-collapse: collapse;
}
th {
  border-bottom: 1px solid #364043;
  color: #ffb900;
  font-size: 0.85em;
  font-weight: 600;
  padding: 0.5em 1em;
  text-align: left;
}
td {
  color: #fff;
  font-weight: 400;
  padding: 0.65em 1em;
}
.disabled td {
  color: #4f5f64;
}
tbody tr {
  transition: background 0.25s ease;
}
tbody tr:hover {
  background: #014055;
}

.hidden {
  display: none;
}

.all-tasks p {
  cursor: pointer;
}

.all-tasks p:hover {
  color: #a8a8a8;
}
</style>
