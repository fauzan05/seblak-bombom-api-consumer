// Mengimpor CSS dan bootstrap
import './bootstrap';
import '../css/app.css';

// Mengimpor Vue 3
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router'; // Vue 3 Router

// Mengimpor CKEditor untuk Vue 3
// import CKEditor, { Ckeditor } from '@ckeditor/ckeditor5-vue';
// import '@ckeditor/ckeditor5-vue';

// Mengimpor Komponen
import Login from "./components/Login.vue";
import Dashboard from "./components/admin/Dashboard.vue";
import Product from "./components/admin/Product.vue";

// Buat Aplikasi Vue
const app = createApp({});

// Definisikan Route
const routes = [
    { path: '/admin/dashboard', component: Dashboard },
    { path: '/admin/product', component: Product }, // Menggunakan komponen Product yang memuat CKEditor
];

// Daftarkan Komponen Global
app.component("Login", Login);
app.component("Dashboard", Dashboard);
app.component("Product", Product);  // Pastikan komponen ini terdaftar
// app.use(Ckeditor);

// Buat Router
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Gunakan Router pada aplikasi Vue
app.use(router);

// Mount Aplikasi Vue ke elemen dengan ID "app"
app.mount("#app");
