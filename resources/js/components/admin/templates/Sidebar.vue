<template>
        <!-- SIDEBAR -->
        <div class="main-sidebar sidebar-style-2">
        <aside id="sidebar-wrapper">
            <div class="sidebar-brand">
                <a href="/stone-store/admin/dashboard">
                    <img class="w-10"
                        src=""
                        alt="">
                </a>
            </div>
            <div class="sidebar-brand sidebar-brand-sm">
                <a href="/stone-store/admin/dashboard">
                    <img class="w-75"
                        src=""
                        alt="">
                </a>
            </div>
            <ul class="sidebar-menu mt-3">
                <li class="dropdown">
                    <router-link activeClass="active" exactActiveClass="active" to="/admin/dashboard" class="nav-link"><i
                            class="fas fa-solid fa-house"></i><span>Dashboard</span>
                    </router-link>
                </li>
                <li class="dropdown">
                    <router-link to="/admin/product" activeClass="active" exactActiveClass="active" class="nav-link"><i class="fas fa-solid fa-utensils"></i>
                    <span>Products</span>
                </router-link>
                </li>
                <li class="dropdown">
                    <a href="/stone-store/admin/categories" class="nav-link"><i
                            class="fas fa-solid fa-list"></i><span>Categories</span></a>
                </li>
                <li class="dropdown">
                    <a href="/stone-store/admin/settings" class="nav-link"><i
                            class="fas fa-solid fa-sliders"></i><span>Settings</span></a>
                </li>
            </ul>
        </aside>
    </div>
</template>

<script setup>
</script>