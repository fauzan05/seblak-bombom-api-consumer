<template>
    <!-- SIDEBAR -->
    <div class="main-sidebar sidebar-style-2">
        <aside id="sidebar-wrapper">
            <div class="sidebar-brand mt-3">
                <span class="w-100 d-flex align-items-center"><img class="w-25" :src="logoUrl" alt="">{{ appName }}</span>
            </div>
            <div class="sidebar-brand sidebar-brand-sm mt-3">
                    <img :src="logoUrl" alt="">
            </div>
            <ul class="sidebar-menu mt-1">
                <li class="dropdown" :class="{ active: currentPath === '/admin/dashboard' }">
                    <router-link to="/admin/dashboard" class="nav-link"><i
                            class="fas fa-solid fa-house"></i><span>Dashboard</span>
                    </router-link>
                </li>
                <li class="dropdown" :class="{ active: currentPath === '/admin/order' }">
                    <router-link to="/admin/order" class="nav-link"><i class="fas fa-solid fa-store"></i>
                        <span>Orders</span>
                    </router-link>
                </li>
                <li class="dropdown" :class="{ active: currentPath === '/admin/product' }">
                    <router-link to="/admin/product" class="nav-link"><i class="fas fa-solid fa-utensils"></i>
                        <span>Products</span>
                    </router-link>
                </li>
                <li class="dropdown" :class="{ active: currentPath === '/admin/category' }">
                    <router-link to="/admin/category" class="nav-link"><i class="fas fa-solid fa-list"></i>
                        <span>Categories</span>
                    </router-link>
                </li>
                <li class="dropdown" :class="{ active: currentPath === '/admin/discount_coupon' }">
                    <router-link to="/admin/discount_coupon" class="nav-link"><i class="fas fa-solid fa-percent"></i>
                        <span>Discount Coupon</span>
                    </router-link>
                </li>
                <li class="dropdown" :class="{ active: currentPath === '/admin/delivery' }">
                    <router-link to="/admin/delivery" class="nav-link"><i class="fas fa-solid fa-truck"></i>
                        <span>Delivery</span>
                    </router-link>
                </li>
                <li class="dropdown" :class="{ active: currentPath === '/admin/setting' }">
                    <router-link to="/admin/setting" class="nav-link"><i class="fas fa-solid fa-sliders"></i>
                        <span>Setting</span>
                    </router-link>
                </li>
            </ul>
        </aside>
    </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
const api_url = "http://localhost:8010/api";

export default {
    setup() {
        const logoUrl = ref(''); // Data reaktif untuk URL logo
        const appName = ref(''); // Data reaktif untuk URL logo
        const route = useRoute(); // Menggunakan useRoute untuk mendapatkan objek route
        const currentPath = computed(() => route.path); // Menggunakan computed untuk memantau perubahan path

        // Fungsi untuk memuat data aplikasi
        const loadApplications = async () => {
            try {
                const response = await axios.get(api_url + "/applications");
                const data = response.data.data;
                logoUrl.value = api_url + "/image/application/" + data["logo_filename"];
                appName.value = data["app_name"]
            } catch (error) {
                console.error("Error fetching applications:", error);
            }
        };

        // Menggunakan onMounted untuk menjalankan fungsi loadApplications
        onMounted(() => {
            document.body.classList.add('sidebar-mini');
            loadApplications();
        });

        // Pastikan logoUrl dikembalikan ke template
        return {
            logoUrl,
            appName,
            currentPath,
        };
    }
};

</script>
