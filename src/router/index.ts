// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Admin from "@/views/Admin.vue";
import ListArticles from "@/components/ListArticles.vue";
import CreateArticle from "@/components/CreateArticle.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/lekeza",
    name: "Admin",
    component: Admin,
    children: [
      {
        path: "", // /admin → liste
        component: ListArticles,
      },
      {
        path: "create", // /admin/create → formulaire
        component: CreateArticle,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
