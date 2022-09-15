<script setup lang="ts">

</script>
<template>
  <div id="task-info" class="task-wrapper">
    <h2>Task details</h2>
    <div class="task-details">
      <form id="add-task" @submit.prevent>
        <label for="f_des">Description</label>
        <input
          id="f_des"
          v-model="formdata.description"
          placeholder="Description..."
          type="text"
          required
        />
        <label for="f_deadline">Deadline</label>
        <input id="f_deadline" v-model="formdata.deadline" type="date" required />
        <label for="f_estimated">Estimated time for completion</label>
        <input
          id="f_estimated"
          v-model="formdata.estimate"
          placeholder="Estimated time in hours..."
          type="number"
          required
        />
        <label for="f_category">Choose a category:</label>
        <select id="f_category" v-model="formdata.selected">
          <option v-for="option in categories" :value="option.value">
            {{ option.text }}
          </option>
        </select>
        <button @click="saveData">Spara mig för fan</button>
      </form>
    </div>
  </div>
</template>

<script>
import { addTaskToDb } from "../../sql/dbHelper.ts";

export default {
  methods: {
    saveData() {
      addTaskToDb();
      console.log(this.formdata);
    },
  },
  data() {
    return {
      formdata:{ description: '', deadline: '', estimate: '', selected: '' },
      categories: [
        { text: "cat1", value: "cat1" },
        { text: "cat2", value: "cat2" },
        { text: "cat3", value: "cat3" },
      ],
    };
  },
};
</script>

<style>
.task-wrapper {
  display: flex;
  width: 100%;
  flex-flow: column wrap;
  align-items: center;
}
.task-details {
  display: flex;
  width: 500px;
  justify-content: center;
}

.task-details form {
  display: flex;
  flex-flow: column;
  align-self: center;
}
.task-details label {
  display: flex;

  margin-left: 20px;
}

.task-details input[type="text"] {
  margin: 20px;
  width: 200px;
  height: 30px;
  box-sizing: content-box;
  border-radius: 4px;
}

.task-details input[type="submit"] {
  margin: 20px;
  width: 200px;
  height: 30px;
  box-sizing: content-box;
  border-radius: 4px;
}

.task-details input[type="date"] {
  margin: 20px;
  width: 200px;
  height: 30px;
  box-sizing: content-box;
  border-radius: 4px;
}

.task-details input[type="number"] {
  margin: 20px;
  width: 200px;
  height: 30px;
  box-sizing: content-box;
  border-radius: 4px;
}

.task-details select {
  margin: 20px;
  width: 200px;
  height: 30px;
  box-sizing: content-box;
  border-radius: 4px;
}
</style>
