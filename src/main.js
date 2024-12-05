import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import Admin from './Admin.vue'
import AdminLogin from './AdminLogin.vue'
import router from './router'

const app = createApp(App)
const admin = createApp(Admin)
const adminLogin = createApp(AdminLogin)

app.use(router)
admin.use(router)
adminLogin.use(router)

app.mount('#main-app')
admin.mount('#admin')
adminLogin.mount('#admin-login')
