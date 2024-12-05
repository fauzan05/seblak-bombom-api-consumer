import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin/login',
      name: 'Login Admin',
      component: LoginView,
    },
    {
      path: '/admin/forgot-password',
      name: 'Forgot Password',
      component: () => import('../views/ForgotPasswordView.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/AboutView.vue')
    }
  ],
});

router.beforeEach((to, from, next) => {
    if (to.name !== 'Login Admin' && !check_cookie('_token')) next({name: 'Login Admin'});
    else next();
});

function check_cookie(cookieName) {
    return document.cookie.split('; ').some(cookie => cookie.startsWith(cookieName + "="));
}

export default router
