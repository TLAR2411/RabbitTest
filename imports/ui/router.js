import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import TextEditor from "./pages/TextEditor.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      patt: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/form",
      name: "TextEditor",
      component: TextEditor,
    },
  ],
});
