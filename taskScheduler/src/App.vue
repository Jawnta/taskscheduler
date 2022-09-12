<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Header from "./components/Header.vue";
import MainContainer from "./components/MainContainer.vue";
import Footer from "./components/Footer.vue";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div class="wrapper">
  <Header />
    <Navbar />
  <MainContainer/>
<!--  <Footer />-->
  </div>
</template>

<style>
body {
  margin: 0;
}
.wrapper {
  display: flex;
  align-items: center;
  min-height: 100vh;
  flex-flow: column;
}
</style>