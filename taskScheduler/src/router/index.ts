import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddTask from "../views/AddTask.vue";
import MyTasks from "../views/MyTasks.vue";
import EditTask from "../views/EditTask.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/addTask",
      name: "addTask",
      component: AddTask,
    },
    {
      path: "/myTasks",
      name: "myTasks",
      component: MyTasks,
    },
    {
      path: "/myTasks/:id",
      name: "editTask",
      component: EditTask,
    },
  ],
});

export default router;