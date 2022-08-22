import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import { store } from "../store/store";

const checkisLoggedIn = (to, from, next) => {
  if (!store.user.isLoggedIn) {
    store.setUserState({
      isLoggedIn: 0,
      username: ""
    });
    store.setAlert({ error: "You need to sign in first" });
    next("/");
  }
  next();
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView
    },
    {
      path: "/cart",
      name: "cart",
      beforeEnter: checkisLoggedIn,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/CartView.vue")
    },
    {
      path: "/checkout",
      name: "checkout",
      beforeEnter: checkisLoggedIn,
      component: () => import("../views/Checkout.vue")
    }
  ]
});

export default router;
