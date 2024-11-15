import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: import("../views/AboutView.vue"),
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: import("../views/Signup.vue"),
  },
  {
    path: "/login",
    name: "LoginPage",
    component: import("../views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
