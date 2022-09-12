<script setup lang="ts"></script>
<template>
  <div class="task-wrapper">
  <div class="task-details">
    <form id="add-task" action="" method="post">
        <input id="placeholder1" name="placeholder1" placeholder="placeholder1" type="text" />
        <input id="placeholder2" name="placeholder2" placeholder="placeholder2" type="text" />
      <input id="placeholder3" name="placeholder3" placeholder="placeholder3" type="text" />
      <input id="placeholder4" name="placeholder4" placeholder="placeholder4" type="text" />
      <input id="placeholder5" name="placeholder5" placeholder="placeholder5" type="text" />
      <input id="placeholder6" name="placeholder6" placeholder="placeholder7" type="text" />
      <input type="submit" value="placeholder8">
    </form>
  </div>
  </div>
</template>

<style>
.task-wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
}
.task-details {
  display: flex;
  width: 500px;
  justify-content: center;
}

.task-details input[type=text] {
  margin: 20px;
  width: 200px;
  height: 30px;
  box-sizing: content-box;
  border-radius: 4px;
}

.task-details input[type=submit] {
  margin: 20px;
  width: 450px;
  height: 30px;
  box-sizing: content-box;
  border-radius: 4px;
}
</style>

