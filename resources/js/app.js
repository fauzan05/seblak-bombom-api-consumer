// Mengimpor CSS dan bootstrap
import './bootstrap';
import '../css/app.css';

// Mengimpor Vue 3
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router'; // Vue 3 Router


// Mengimpor Komponen
import Login from "./components/Login.vue";
import Sidebar from "./components/admin/templates/Sidebar.vue";
import Dashboard from "./components/admin/Dashboard.vue";
import Product from "./components/admin/Product.vue";
import Category from "./components/admin/Category.vue";
import Discount_Coupon from "./components/admin/Discount.vue";
import Setting from "./components/admin/Setting.vue";

// Buat Aplikasi Vue
const app = createApp({});

// Definisikan Route
const routes = [
    { path: '/admin/dashboard', component: Dashboard },
    { path: '/admin/discount_coupon', component: Discount_Coupon }, 
    { path: '/admin/product', component: Product }, 
    { path: '/admin/category', component: Category }, 
    { path: '/admin/setting', component: Setting }, 
];

// Daftarkan Komponen Global
app.component("Login", Login);
app.component("Dashboard", Dashboard);
app.component("Sidebar", Sidebar);  // Pastikan komponen ini terdaftar
app.component("Product", Product);  // Pastikan komponen ini terdaftar
app.component("Discount", Discount_Coupon);  // Pastikan komponen ini terdaftar
app.component("Category", Category);  // Pastikan komponen ini terdaftar
app.component("Setting", Setting);  // Pastikan komponen ini terdaftar

// Buat Router
const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
});

// Gunakan Router pada aplikasi Vue
app.use(router);

// Mount Aplikasi Vue ke elemen dengan ID "app"
app.mount("#app");
