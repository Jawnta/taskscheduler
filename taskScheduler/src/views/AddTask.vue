<script setup lang="ts"></script>
<template>
  <div id="task-info" class="task-wrapper">
    <div class="task-details">
      <h2>Task details</h2>
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
        <label for="f_startTime">Start date</label>
        <input
          id="f_startTime"
          v-model="formdata.startTime.value"
          type="date"
          :min="setMinDate()"
          :class="{ 'input-error': formdata.startTime.hasError }"
          @focus="clearErrorOnFocus(formdata.startTime)"
        />
        <label for="f_deadline">Deadline</label>
        <input
          id="f_deadline"
          v-model="formdata.deadline.value"
          type="date"
          :min="formdata.startTime.value"
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
        <div class="new-cat">
          <select
            id="f_selected"
            ref="catSelect"
            v-model="formdata.selected.value"
            :class="{
              'input-error': formdata.selected.hasError,
              hideDisplay: display.isActive,
            }"
            @focus="clearErrorOnFocus(formdata.selected)"
          >
            <option value="" selected disabled hidden>
              Choose a category...
            </option>
            <option
              v-for="option in categories"
              :key="option.category"
              :value="option.id"
            >
              {{ option.category }}
            </option>
            <p></p>
          </select>
          <button
            :class="{ hideDisplay: display.isActive }"
            @click="newCategory()"
          >
            New Category
          </button>
          <input
            ref="catText"
            v-model="formdata.selected.value"
            placeholder="Enter a category..."
            type="text"
            :class="{
              'input-error': formdata.selected.hasError,
              hideDisplay: !display.isActive,
            }"
            @focus="clearErrorOnFocus(formdata.selected)"
          />
          <button
            :class="{ hideDisplay: !display.isActive }"
            @click="resetDisplay()"
          >
            Choose from list
          </button>
        </div>
        <button @click="saveData(this.formdata)" :disabled="disableButton" >Save task</button>
      </form>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  async mounted() {
    const response = await fetch("http://localhost:1337/categories/");
    this.categories = await response.json();
    if (!this.categories.length){
      this.formdata.selected.newCat = true;
      this.display.isActive = true;
    }
  },
  methods: {
    newCategory() {
      this.display.isActive = true;
      this.formdata.selected.newCat = true;
      this.formdata.selected.value = "";
    },
    resetDisplay() {
      this.display.isActive = false;
      this.formdata.selected.newCat = false;
      this.formdata.selected.value = "";
    },
    setMinDate() {
      return dayjs().format("YYYY-MM-DD").toString();
    },
    allFieldsValid() {
      return Object.values(this.formdata).every((x) => !x.hasError);
    },
    validateFields() {
      for (const key of Object.keys(this.formdata)) {
        this.formdata[key].hasError = !this.formdata[key].value;
      }
    },
    clearErrorOnFocus(item) {
      item.hasError = false;
    },
    async saveData(data) {
      this.validateFields();
      if (!this.allFieldsValid()) {
        return false;
      }
      this.disableButton = true;

      if (this.formdata.selected.newCat) {
        const newCategory = await this.addCategory(this.formdata.selected);
        data.selected.value = newCategory.id;
      }

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      await fetch("http://localhost:1337/tasks", requestOptions);
      await this.$router.push({ path: "/myTasks" });

      return true;
    },
    async addCategory(data) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      const result = await fetch(
        "http://localhost:1337/categories",
        requestOptions
      );
      return await result.json();
    },
  },
  data() {
    return {
      formdata: {
        description: { value: "", hasError: false },
        startTime: { value: "", hasError: false },
        deadline: { value: "", hasError: false },
        estimation: { value: "", hasError: false },
        selected: { value: "", hasError: false, newCat: false },
        status: { value: "Not started" }
      },
      disableButton: false,
      categories: [],
      display: {
        isActive: false,
      },
      userCap: {"cap": -1}
    };
  },
};
</script>

<style>


.hideDisplay {
  display: none;
}
.new-cat {
  display: flex;
  flex-flow: row;
  width: auto;
  align-items: center;
}

.new-cat button {
  margin-left: 0 !important;
  border: 1px solid black;
  width: 80px !important;
  height: 40px !important;
  padding: 5px;
}
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
  flex-flow: column;
  text-align: center;
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
  width: 204px;
  height: 30px;
  box-sizing: content-box;
  border-radius: 4px;
}
.input-error {
  border: 2px solid rgba(255, 0, 0, 0.8);
}

</style>
