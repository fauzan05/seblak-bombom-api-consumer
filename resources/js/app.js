import './bootstrap';
import '../css/app.css'; 
import axios from 'axios';
// axios.defaults.baseURL = 'http://localhost:8000/api';
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// axios.defaults.headers.common['X-CSRF-TOKEN'] = document.head.querySelector('meta[name="csrf-token"]').content;

import { createApp } from 'vue';
const app = createApp({});

// app.config.globalProperties.$axios = axios; // Membuat Axios bisa diakses di semua komponen dengan `this.$axios`

import Login from "./components/Login.vue";
app.component("Login", Login);
app.mount("#app");