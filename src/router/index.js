import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import LoginView from '../views/LoginView.vue';

const loginRouteGuard = (to, from, next) => {
  axios.get("http://localhost:1024/cart")
    .then(() => next())
    .catch(err => {
      if (err.response.status === 401) {
        next('/');
      }
    });
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/cart',
      name: 'cart',
      beforeEnter: loginRouteGuard,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CartView.vue')
    }
  ]
})

export default router
