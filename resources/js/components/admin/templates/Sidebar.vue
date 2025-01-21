<template>
    <!-- SIDEBAR -->
    <div class="main-sidebar sidebar-style-2">
        <aside id="sidebar-wrapper">
            <div class="sidebar-brand">
                <a href="/stone-store/admin/dashboard">
                    <img class="w-10" src="" alt="">
                </a>
            </div>
            <div class="sidebar-brand sidebar-brand-sm">
                <a href="/stone-store/admin/dashboard">
                    <img class="w-75" src="" alt="">
                </a>
            </div>
            <ul class="sidebar-menu mt-3">
                <li class="dropdown" :class="{ active: currentPath === '/admin/dashboard' }">
                    <router-link to="/admin/dashboard" class="nav-link"><i
                            class="fas fa-solid fa-house"></i><span>Dashboard</span>
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
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
    setup() {
        // Menggunakan useRoute untuk mendapatkan objek route
        const route = useRoute();

        // Menggunakan computed untuk memantau perubahan path
        const currentPath = computed(() => route.path);

        return {
            currentPath,
        };
    },
    mounted() {
        $("body").addClass('sidebar-mini');
    }
};
</script>