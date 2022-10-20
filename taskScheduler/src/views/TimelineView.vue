<script setup lang="ts"></script>

<template>




<div class="test-wrapper">
  <vue-cal

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
import {createWeekCapacity, setEvent} from "../components/eventPlanner.ts";
dayjs.extend((isoYear));
export default {
  async mounted() {
    this.weekCapData = createWeekCapacity();
    this.events = await setEvent(this.weekCapData);
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

