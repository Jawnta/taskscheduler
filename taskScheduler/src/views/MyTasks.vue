<script setup lang="ts"></script>
<template>
  <div class="my-task-wrapper">
    <div class="filter-tasks">
      <h2>My Tasks</h2>

      <input
        id="f_des"
        v-model="query"
        placeholder="Search..."
        type="text"
        @keyup="filterTasks()"
      />
    </div>
    <div class="all-tasks">
      <div v-for="task in filteredTasks" class="task">
        <p v-on:click="setTable(task.id)">{{ task.description }}</p>
      </div>
      <p v-if="isLoading">Loading...</p>
    </div>
  </div>
  <div class="task-info-wrapper">
    <table :class="{ 'hide-table': !tableData.id }">
      <thead>
        <tr>
          <th>ID</th>
          <th>Description</th>
          <th>Category</th>
          <th>Start date</th>
          <th>Deadline</th>
          <th>Estimated duration</th>
          <th>Actual duration</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td v-for="value in tableData">
            {{ value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  async mounted() {
    const response = await fetch("http://localhost:1337/tasks/");
    const result = await response.json();
    this.tasks = result;
    this.filteredTasks = result;
    this.isLoading = false;
  },
  methods: {
    filterTasks() {
      this.filteredTasks = this.tasks.filter((task) =>
        task.description.toLowerCase().includes(this.query.toLowerCase())
      );
    },
    async getOneTask(id) {
      const response = await fetch(`http://localhost:1337/tasks/${id}`);
      console.log(response);

      return await response.json();
    },
    async setTable(id) {
      const task = await this.getOneTask(id);
      for (const key of Object.keys(this.tableData)) {
        this.tableData[key] = task[key];
      }
    },
  },
  data() {
    return {
      query: "",
      tasks: [],
      filteredTasks: [],
      isLoading: true,
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
.filter-tasks h2 {
  margin-top: 0;
  margin-bottom: 20px;
}

.task {
  display: flex;
  width: 100%;
}
input[type="text"] {
  height: 30px;
  width: 200px;
  box-sizing: content-box;
  border-radius: 4px;
  margin: 0;
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
  width: 40%;
  font-size: 20px;
  font-weight: bold;
}

.filter-tasks {
  display: flex;
  width: 40%;
  flex-direction: column;
}

.task-info-wrapper {
  display: flex;
  margin: 50px;
  flex-flow: column;
  width: 100%;
  height: auto;
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

.hide-table {
  display: none;
}

.all-tasks p {
  cursor: pointer;
}

.all-tasks p:hover {
  color: #a8a8a8;
}
</style>
