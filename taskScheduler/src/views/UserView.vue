<script setup lang="ts"></script>
<template>
<div class="user-wrapper">
  <div class="userCap">
  <form @submit.prevent>
    <input v-model="this.userCap.cap" type="number" min="0" step="10">
    <button @click="setUserCap(this.userCap)">update userCap</button>
  </form>
  </div>
</div>
</template>

<script>

export default {
  async mounted() {
    await this.getUserCap();
  },
  methods: {
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

  },
  data() {
    return {
      userCap: {}
    };
  },
};
</script>

<style>
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