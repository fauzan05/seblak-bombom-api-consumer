<template>
    <!-- Fullscreen Loading Overlay -->
    <div v-if="loading" class="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <svg class="animate-spin h-12 w-12 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z">
            </path>
        </svg>
    </div>
    <div v-if="!loading" class="h-screen flex overflow-hidden">
        <!-- Sidebar backdrop -->
        <Transition enter-active-class="transition-opacity ease-out duration-300" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition-opacity ease-in duration-200"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="isMobileSidebarOpen" @click="closeMobileSidebar"
                class="fixed inset-0 z-30 bg-gray-900/50 backdrop-blur-sm md:hidden"></div>
        </Transition>

        <!-- Sidebar -->
        <aside :class="[
            'fixed inset-y-0 left-0 z-40 transition-all duration-300 ease-in-out transform',
            'bg-gradient-to-b from-orange-600 to-amber-700 shadow-2xl',
            isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
            isSidebarCollapsed ? 'w-20' : 'w-60'
        ]">
            <!-- Sidebar Header -->
            <div class="relative h-20 flex items-center justify-between px-5 border-b border-white/10">
                <button @click="toggleSidebar"
                    class="absolute top-1/2 right-[-20px] hidden md:flex z-50 transform -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-white text-orange-600 shadow-md hover:bg-orange-100 transition-all duration-200">
                    <svg :class="[isSidebarCollapsed ? 'rotate-180' : '']" class="w-4 h-4 transition-transform" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <div class="flex items-center">
                    <div class="relative">
                        <div class="absolute inset-0 bg-white/20 blur-xl rounded-full"></div>
                        <div class="relative w-10 h-10 bg-white/90 rounded-xl flex items-center justify-center shadow-lg">
                            <span class="text-orange-600 font-bold text-xl">A</span>
                        </div>
                    </div>
                    <Transition enter-active-class="transition-all duration-300 ease-out"
                        enter-from-class="opacity-0 -translate-x-4" enter-to-class="opacity-100 translate-x-0"
                        leave-active-class="transition-all duration-200 ease-in"
                        leave-from-class="opacity-100 translate-x-0" leave-to-class="opacity-0 -translate-x-4">
                        <span v-show="!isSidebarCollapsed"
                            class="ml-4 text-white font-bold text-xl tracking-wide">AdminPanel</span>
                    </Transition>
                </div>
            </div>
            <!-- Sidebar Content -->
            <div class="flex flex-col h-[calc(100vh-5rem)] overflow-y-auto py-6">
                <!-- Navigation -->
                <nav class="space-y-2">
                    <NuxtLink v-for="(item, index) in sidebarItems" :key="index" :to="item.path"
                        class="flex items-center px-4 py-2.5 rounded-xl text-white font-medium hover:bg-white/10" :class="{
                            'bg-white/10': isActive(item.path),
                        }">
                        <component :is="item.icon" class="w-5 h-5 mx-3" />
                        <span v-show="!isSidebarCollapsed">{{ item.name }}</span>
                    </NuxtLink>
                </nav>
            </div>
        </aside>

        <!-- Main Content -->
        <div
            :class="['flex-1 flex flex-col overflow-hidden transition-all duration-300', isSidebarCollapsed ? 'md:ml-20' : 'md:ml-60']">
            <!-- Header & Page Content (unchanged) -->
            <header
                class="relative h-[80px] bg-white/80 backdrop-blur-xl shadow-sm flex items-center justify-between px-6 z-10">
                <div class="flex items-center space-x-4">
                    <button @click="toggleMobileSidebar" class="md:hidden p-2 rounded-md hover:bg-gray-100 transition">
                        <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <h1 class="text-xl font-semibold text-gray-800">Dashboard</h1>
                </div>
                <div class="flex items-center space-x-6">
                    <div class="relative group">
                        <SearchButton />
                    </div>
                    <div class="relative h-[80px] flex items-center dropdown-notification-wrapper"
                        @mouseenter="openNotificationDropdown" @mouseleave="isNotificationDropdownOpen = false">
                        <!-- Tombol -->
                        <button @click.stop="toggleNotificationDropdown"
                            class="relative p-2.5 rounded-full hover:bg-gray-100 transition-all duration-200">
                            <svg class="w-6 h-6 text-gray-600 hover:text-gray-800 transition-colors" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 17h5l-1.4-1.4a2 2 0 01-.6-1.42V11a6 6 0 00-4-5.66V5a2 2 0 10-4 0v.34A6 6 0 006 11v3.18c0 .53-.2 1.05-.6 1.42L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span class="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                                <span
                                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                            </span>
                        </button>

                        <!-- Dropdown -->
                        <div v-show="isNotificationDropdownOpen"
                            class="absolute right-0 top-full w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 transition-all duration-200">
                            <div class="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                                <h3 class="text-sm font-semibold text-gray-800">Notifications</h3><button
                                    class="text-xs text-orange-600 hover:text-orange-700 font-medium">Mark all as
                                    read</button>
                            </div>
                            <div class="max-h-96 overflow-y-auto">
                                <div
                                    class="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50">
                                    <div class="flex items-start space-x-3">
                                        <div class="flex-shrink-0">
                                            <div
                                                class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                                <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div class="flex-1">
                                            <p class="text-sm text-gray-800">Your order has been confirmed</p>
                                            <p class="text-xs text-gray-500 mt-1">2 minutes ago</p>
                                        </div>
                                        <div class="flex-shrink-0">
                                            <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer">
                                    <div class="flex items-start space-x-3">
                                        <div class="flex-shrink-0"><img
                                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
                                                class="w-10 h-10 rounded-full" alt="User"></div>
                                        <div class="flex-1">
                                            <p class="text-sm text-gray-800"><span class="font-medium">Jane Cooper</span>
                                                mentioned you in a comment</p>
                                            <p class="text-xs text-gray-500 mt-1">1 hour ago</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="px-4 py-3 bg-gray-50 text-center">
                                <a href="#" class="text-sm text-orange-600 hover:text-orange-700 font-medium">View all
                                    notifications</a>
                            </div>
                        </div>
                    </div>
                    <div class="relative h-[80px] flex items-center dropdown-notification-wrapper"
                        @mouseenter="openProfileDropdown" @mouseleave="isProfileDropdownOpen = false">
                        <button @click.stop="toggleProfileDropdown" class="relative">
                            <div class="relative">
                                <svg width="100" height="100"
                                    class="w-8 h-8 rounded-full ring-2 ring-gray-200 group-hover:ring-orange-300 transition-all duration-200"
                                    viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="50" cy="50" r="48" fill="#F3F4F6" stroke="#E5E7EB" stroke-width="4" />
                                    <circle cx="50" cy="38" r="14" fill="#D1D5DB" />
                                    <path d="M24 78C24 65.2975 35.2975 56 48 56H52C64.7025 56 76 65.2975 76 78V80H24V78Z"
                                        fill="#D1D5DB" />
                                </svg>
                                <div
                                    class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white">
                                </div>
                            </div>
                        </button>
                        <div v-show="isProfileDropdownOpen"
                            class="absolute right-0 top-full w-70 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 transition-all duration-200">
                            <div class="px-4 py-4 border-b border-gray-100">
                                <div class="flex items-center space-x-3">
                                    <svg width="100" height="100" class="h-8 w-8 rounded-full object-cover"
                                        viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="50" cy="50" r="48" fill="#F3F4F6" stroke="#E5E7EB" stroke-width="4" />
                                        <circle cx="50" cy="38" r="14" fill="#D1D5DB" />
                                        <path
                                            d="M24 78C24 65.2975 35.2975 56 48 56H52C64.7025 56 76 65.2975 76 78V80H24V78Z"
                                            fill="#D1D5DB" />
                                    </svg>
                                    <div class="max-w-40">
                                        <p class="text-sm font-semibold text-gray-800 truncate">{{
                                            `${currentUserStore.user.first_name} ${currentUserStore.user.last_name} ` }}</p>
                                        <p class="text-xs text-gray-500 truncate">{{ currentUserStore.user.email }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="py-2">
                                <a href="#"
                                    class="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors"><svg
                                        class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>My Profile</a>
                                <a href="#"
                                    class="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors"><svg
                                        class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>Settings</a>
                                <a href="#"
                                    class="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors"><svg
                                        class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8.228 11.685h.774a2 2 0 001.94-1.515L12 5.5h0l1.058 4.67a2 2 0 001.94 1.515h.774m-7.544 0H5a2 2 0 00-2 2v5a2 2 0 002 2h14a2 2 0 002-2v-5a2 2 0 00-2-2h-3.228M10 17v-6m4 6v-6" />
                                    </svg>Billing</a>
                            </div>
                            <div class="border-t border-gray-100"></div>
                            <div class="py-2">
                                <button @click="logout"
                                    class="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"><svg
                                        class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>Sign out</button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <main class="flex-1 overflow-y-auto overflow-x-hidden">
                <div class="p-4 sm:p-6">
                    <slot />
                </div>
            </main>
            <footer class="bg-white border-t border-gray-200">
                <div class="mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2 text-gray-500 text-sm">
                            <span>Admin Dashboard Version 1.0.0</span>
                            <span>•</span>
                            <span>Last updated: {{ lastUpdated }}</span>
                        </div>
                        <div class="flex space-x-4">
                            <a href="#" class="text-gray-400 hover:text-gray-500">
                                <span class="sr-only">Instagram</span>
                                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                                </svg>
                            </a>
                            <a href="#" class="text-gray-400 hover:text-gray-500">
                                <span class="sr-only">WhatsApp</span>
                                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import {
    HomeIcon,
    UserIcon,
    Squares2X2Icon,
    CubeIcon,
    ClipboardDocumentListIcon,
    TruckIcon,
    BellIcon,
    StarIcon,
    Cog6ToothIcon,
} from '@heroicons/vue/24/outline'
import SearchButton from '~/components/modals/searchButtonAdmin.vue'

const route = useRoute()
const loading = ref(true)
const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl

const isActive = (path) => {
    return route.path.startsWith(path)
}

const isSidebarCollapsed = ref(false)
const isMobileSidebarOpen = ref(false)
const appSettingStore = useAppSettingStore()
await appSettingStore.fetchSettings()
const currentUserStore = useUserStore()
const isNotificationDropdownOpen = ref(false)
const isProfileDropdownOpen = ref(false)

function openNotificationDropdown() {
    isNotificationDropdownOpen.value = true
}
function openProfileDropdown() {
    isProfileDropdownOpen.value = true
}

function closeNotificationDropdown(e) {
    if (!e.target.closest('.dropdown-notification-wrapper')) {
        isNotificationDropdownOpen.value = false
    }
}
function closeProfileDropdown(e) {
    if (!e.target.closest('.dropdown-profile-wrapper')) {
        isProfileDropdownOpen.value = false
    }
}

function toggleNotificationDropdown() {
    isNotificationDropdownOpen.value = !isNotificationDropdownOpen.value
}

function toggleProfileDropdown() {
    isProfileDropdownOpen.value = !isProfileDropdownOpen.value
}
function toggleSidebar() {
    isSidebarCollapsed.value = !isSidebarCollapsed.value
}

function toggleMobileSidebar() {
    isMobileSidebarOpen.value = true
    isSidebarCollapsed.value = false
}
function closeMobileSidebar() {
    isMobileSidebarOpen.value = false
}

const sidebarItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: HomeIcon },
    { name: 'Orders', path: '/admin/orders', icon: ClipboardDocumentListIcon },
    { name: 'Users', path: '/admin/users', icon: UserIcon },
    { name: 'Categories', path: '/admin/categories', icon: Squares2X2Icon },
    { name: 'Products', path: '/admin/products', icon: CubeIcon },
    { name: 'Deliveries', path: '/admin/deliveries', icon: TruckIcon },
    { name: 'Notifications', path: '/admin/notifications', icon: BellIcon },
    { name: 'Reviews', path: '/admin/reviews', icon: StarIcon },
    { name: 'Settings', path: '/admin/settings', icon: Cog6ToothIcon },
]

const lastUpdated = "22 Jun 2025"

onMounted(async () => {
    loading.value = false
    window.addEventListener('click', closeNotificationDropdown)
    window.addEventListener('click', closeProfileDropdown)
})

onUnmounted(() => {
    window.removeEventListener('click', closeNotificationDropdown)
    window.removeEventListener('click', closeProfileDropdown)
})


</script>
<style>
html,
body {
    overflow-x: hidden !important;
}
</style>