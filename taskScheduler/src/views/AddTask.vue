<script setup lang="ts"></script>
<template>
  <div id="task-info" class="task-wrapper">
    <h2>Task details</h2>
    <div class="task-details">
      <form id="add-task" @submit.prevent>
        <label for="f_description">Description</label>
        <input
          id="f_description"
          v-model="formdata.description.value"
          placeholder="Description..."
          type="text"
          :class="{ 'input-error': formdata.description.hasError }"
          @focus="clearErrorOnFocus(formdata.description)"
        />
        <label for="f_deadline">Deadline</label>
        <input
          id="f_deadline"
          v-model="formdata.deadline.value"
          type="date"
          :min="setMinDate()"
          :class="{ 'input-error': formdata.deadline.hasError }"
          @focus="clearErrorOnFocus(formdata.deadline)"
        />
        <label for="f_estimation">Estimated time for completion</label>
        <input
          id="f_estimation"
          v-model="formdata.estimation.value"
          placeholder="Estimated time in hours..."
          type="number"
          min="1"
          :class="{ 'input-error': formdata.estimation.hasError }"
          @focus="clearErrorOnFocus(formdata.estimation)"
        />
        <label for="f_selected">Choose a category:</label>
        <select
          id="f_selected"
          v-model="formdata.selected.value"
          :class="{ 'input-error': formdata.selected.hasError }"
          @focus="clearErrorOnFocus(formdata.selected)"
        >
          <option value="" selected disabled hidden>
            Choose a category...
          </option>
          <option v-for="option in categories" :key="option.value">
            {{ option.text }}
          </option>
        </select>
        <button @click="saveData(this.formdata)">Save task</button>
      </form>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  methods: {
    setMinDate() {
      return dayjs().format("YYYY-MM-DD").toString();
    },
    allFieldsValid() {
      return Object.values(this.formdata).every((x) => !x.hasError);
    },
    validateFields() {
      for (const key of Object.keys(this.formdata)){
        this.formdata[key].hasError = !this.formdata[key].value;
      }
    },
    clearErrorOnFocus(item){
      item.hasError = false;
    },
    async saveData(data) {
      this.validateFields();
      if (!this.allFieldsValid()){
        return false;
      }
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      await fetch("http://localhost:1337/tasks", requestOptions);
      return true;
    },
  },
  data() {
    return {
      formdata: {
        description: { value: "", hasError: false },
        deadline: { value: "", hasError: false },
        estimation: { value: "", hasError: false },
        selected: { value: "", hasError: false },
      },
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

.task-details button {
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
.input-error {
  border: 2px solid rgba(255, 0, 0, 0.8);
}
</style>
