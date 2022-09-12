<script setup lang="ts"></script>

<template>
  <div class="navbar">
      <ul>
      <li><RouterLink to="/">Home</RouterLink></li>
      <li><RouterLink to="/addTask">Add Task</RouterLink></li>
        <li><RouterLink to="/myTasks">My Tasks</RouterLink></li>
      </ul>
  </div>


</template>

<style>
.navbar {
  display: flex;
  width: 100%;
  height: 5vh;
  justify-content: center;
  color: white;
  background-color: #507AA1;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;

}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 16px 16px;
  text-decoration: none;
}

/* Change the link color to #111 (black) on hover */
li a:hover {
  background-color: #3D5D7A;
}

</style>
