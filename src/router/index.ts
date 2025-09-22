// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Admin from "@/views/Admin.vue";
import ListArticles from "@/components/ListArticles.vue";
import CreateArticle from "@/components/CreateArticle.vue";
import supabase from "@/lib/supabaseClient";
import UpdateArticle from "@/components/UpdateArticle.vue";

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
        meta: { requiresAuth: true },
      },
      {
        path: "update/:id", // /admin/create → formulaire
        component: UpdateArticle,
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach(async (to, from, next) => {
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  if (to.meta.requiresAuth && !user) {
    next("/lekeza"); // redirige vers login si non connecté
  } else {
    next();
  }
});

export default router;
