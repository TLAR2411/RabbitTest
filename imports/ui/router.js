import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import TextEditor from "./pages/TextEditor.vue";
import CategoryForm from "./pages/CategoryForm.vue";
import Default from "./Layouts/Default.vue";
import Blank from "./Layouts/Blank.vue";

import Admin from "./pages/Admin.vue";
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/admin",
      name: "Admin",
      component: Admin,
    },
    {
      path: "/form/:id?",
      name: "TextEditor",
      component: TextEditor,
    },
    {
      path: "/default",
      name: "Default",
      component: Default,
    },
    {
      path: "/blank",
      name: "Blank",
      component: Blank,
    },
    {
      path: "/categoryform",
      name: "CategoryForm",
      component: CategoryForm,
    },
  ],
});
