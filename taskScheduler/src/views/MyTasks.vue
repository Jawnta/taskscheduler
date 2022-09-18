<script setup lang="ts"></script>
<template>
  <div class="my-task-wrapper">
    <h2>My Tasks</h2>
    <div class="filter-tasks">
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
        <p>{{ task.id }}</p>
        <p>{{ task.description }}</p>
        <p>{{ task.category }}</p>
        <p>{{ task.estimated_duration }}</p>
      </div>
      <p v-if="isLoading">Loading...</p>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    fetch("http://localhost:1337/tasks/")
      .then((response) => response.json())
      .then((result) => {
        this.tasks = result;
        this.filteredTasks = result;
        this.isLoading = false;
      });
  },
  methods: {
    filterTasks() {
      this.filteredTasks = this.tasks.filter((task) =>
        task.description.toLowerCase().includes(this.query.toLowerCase())
      );
    },
  },
  data() {
    return {
      query: "",
      tasks: [],
      filteredTasks: [],
      isLoading: true,
    };
  },
};
</script>

<style>
.task {
  display: flex;
  width: 100%;
}
input[type="text"] {
  width: 100%;
  height: 30px;
  box-sizing: content-box;
  border-radius: 4px;
  margin: 0;
}
.my-task-wrapper {
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
}

.all-tasks {
  display: flex;
  flex-flow: column;
}
</style>
