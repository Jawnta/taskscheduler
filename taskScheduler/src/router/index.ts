import { createRouter, createWebHistory } from "vue-router";
import AddTask from "../views/AddTask.vue";
import MyTasks from "../views/MyTasks.vue";
import EditTask from "../views/EditTask.vue";
import Timeline from "../views/TimelineView.vue";
import User from "../views/UserView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/myTasks",
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
    {
      path: "/timeline",
      name: "Timeline",
      component: Timeline,
    },
    {
      path: "/user",
      name: "userView",
      component: User,
    },
  ],
});

export default router;
