<script setup lang="ts"></script>
<template>
  <div class="edit-task-wrapper">


      <h2>Edit Task</h2>
      <form @submit.prevent>
        <label for="f_id">Id</label>
        <input type="text" id="f_id" v-model="taskData.id" disabled />
        <label for="f_desc">Description</label>
        <input type="text" id="f_desc" v-model="taskData.description" />
        <label for="f_cat">Category</label>
        <select
            id="f_cat"
            ref="catSelect"
            v-model="taskData.category">
          <option selected disabled hidden :key="taskData.category">{{
              taskData.category
            }}</option>
          <option
              v-for="option in categories"
              :key="option.category"
          >
            {{ option.category }}
          </option>
        </select>
        <label for="f_date">Start date</label>
        <input type="date" id="f_date" v-model="taskData.starting_time" disabled />
        <label for="f_deadline">Deadline</label>
        <input type="date" id="f_deadline" v-model="taskData.deadline" :min="taskData.starting_time" />
        <label for="f_estimated">Estimated duration</label>
        <input type="number" id="f_estimated" v-model="taskData.estimated_duration" :min="1" />
        <label for="f_actual">Actual duration</label>
        <input type="number" id="f_actual" v-model="taskData.actual_duration" :min="0" />
        <label for="f_elapsed">Elapsed time</label>
        <input type="number" id="f_elapsed" v-model="taskData.elapsed_time" :min="0" />
        <label for="f_status">Status</label>
        <select
            id="f_status"
            v-model="taskData.status"
            >
          <option selected disabled hidden> {{ taskData.status }}</option>
          <option>Not started</option>
          <option>In progress</option>
          <option>Finished</option>
        </select>
        <div class="buttons">
        <button @click="updateTaskData(taskData)">Update task</button>
        <button @click="deleteTask(taskData.id)">Delete task</button>
        </div>
      </form>

  </div>
</template>

<script>

export default {
  async mounted() {
    const id = this.$route.params.id;
    const response = await fetch(`http://localhost:1337/tasks/${id}`);
    this.taskData = await response.json();

    const catResponse = await fetch("http://localhost:1337/categories/");
    this.categories = await catResponse.json();

  },
  methods: {
    async deleteTask(id) {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      };
      await fetch(`http://localhost:1337/tasks/${id}`, requestOptions);
      await this.$router.push({ path: "/myTasks" });
    },
    async getCategoryId(category){
      const response = await fetch(`http://localhost:1337/category/${category}`);
      const result = await response.json();

      return Object.values(result)[0].id;

    },
    async updateTaskData(data) {
      if (isNaN(this.taskData.category)){
        this.taskData.category = await this.getCategoryId(data.category);
      }
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      await fetch("http://localhost:1337/tasks/:id", requestOptions);
      await this.$router.push({ path: "/myTasks" });

      return true;
    },
  },
  data() {
    return {
      taskData: {},
      categories: []
    }
  }
};
</script>

<style>

.buttons {
  display: flex;
}

.buttons button {
  margin: 20px;
}
.edit-task-wrapper {
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
}

.edit-task-wrapper button {
  margin-top: 20px;
  margin-bottom: 20px;
  height: 30px;
  width: 200px;
  box-sizing: content-box;
  border-radius: 4px;

}

.edit-task-wrapper form {
  display: flex;
  flex-flow: column;
  align-items: center;
}
.edit-task-wrapper input[disabled]{
  background-color: white;
  color: black;
}
.edit-task-wrapper label {
  align-self: center;
  margin: 10px;
  font-size: 16px;
  font-weight: bold;
}

.edit-task-wrapper input[type="text"] {
  height: 30px;
  width: 200px;
  box-sizing: content-box;
  border-radius: 4px;

}

.edit-task-wrapper input[type="date"] {
  height: 30px;
  width: 200px;
  box-sizing: content-box;
  border-radius: 4px;

}

.edit-task-wrapper input[type="number"] {
  height: 30px;
  width: 200px;
  box-sizing: content-box;
  border-radius: 4px;

}

.edit-task-wrapper select {
  height: 30px;
  width: 200px;
  box-sizing: content-box;
  border-radius: 4px;

}
</style>

