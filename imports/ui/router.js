import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      patt: "/",
      name: "Home",
      component: Home,
    },
  ],
});
