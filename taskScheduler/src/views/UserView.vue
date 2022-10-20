<script setup lang="ts"></script>
<template>
<div class="user-wrapper">
  <div class="userCap">
  <form @submit.prevent>
    <label for="f_userCap">Weekly hours:</label>
    <input id="f_userCap" v-model="this.userCap.cap" type="number" min="0" step="5" max="100"
           @change="checkUserCapInput()">
    <button @click="setUserCap(this.userCap)" :disabled="disabled">Update</button>
  </form>
  </div>
  <div class="userCap">
    <p>Total number of tasks: {{this.numberOfTasks}}</p>
  </div>
  <div class="userCap">
    <p>Tasks not started: {{this.notStarted}}</p>
  </div>
  <div class="userCap">
    <p>Tasks in progress: {{this.started}}</p>
  </div>
  <div class="userCap">
    <p>Finished tasks: {{this.finished}}</p>
  </div>
</div>
</template>

<script>

export default {
  async mounted() {
    await this.getUserCap();
    const response = await fetch("http://localhost:1337/tasks/");
    this.tasks = await response.json();
    this.numberOfTasks = this.tasks.length;
    this.getNotStartedTasks();
    this.getStartedTasks();
    this.getFinishedTasks();

  },
  methods: {
    checkUserCapInput(){
      if (this.userCap.cap > 100 || this.userCap.cap < 0){
        this.disabled = true;
      }
      else {
        this.disabled = false;
      }
    },
    async setUserCap(hours) {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json", 'Accept': 'application/json' },
        body: JSON.stringify(hours),
      };
      await fetch("http://localhost:1337/userCap/:hours", requestOptions);

      return true;
    },
    async getUserCap(){
      const response = await fetch(`http://localhost:1337/userCap`);
      this.userCap =  await response.json();
    },
    getNotStartedTasks() {
      const notStartedTasks = this.tasks.filter((item) => item.status === "Not started")
      this.notStarted = notStartedTasks.length;
    },
    getStartedTasks() {
      const startedTasks = this.tasks.filter((item) => item.status === "In progress")
      this.started = startedTasks.length;
    },
    getFinishedTasks() {
      const finishedTasks = this.tasks.filter((item) => item.status === "FinishedT")
      this.finished = finishedTasks.length;
    },
  },
  data() {
    return {
      userCap: {},
      tasks: [],
      numberOfTasks: 0,
      notStarted: 0,
      started: 0,
      finished: 0,
      disabled: false,
    };
  },
};
</script>

<style>
.userCap {
  font-size: 20px;
  margin: 20px;
}
.userCap input[type="number"] {
  margin: 20px;
  width: 200px;
  height: 30px;
  box-sizing: content-box;
  border-radius: 4px;
}

.userCap button {
  margin: 20px;
  width: 200px;
  height: 30px;
  box-sizing: content-box;
  border-radius: 4px;
}
</style>