<template>
    <!-- Notifikasi -->
    <Transition name="fade-slide">
        <div v-if="showNotification"
            class="fixed bottom-6 right-6 bg-white border-l-4 border-orange-500 shadow-lg rounded-md p-4 w-80 z-50">
            <div class="flex items-start">
                <svg class="h-6 w-6 text-orange-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M13 16h-1v-4h-1m1-4h.01M12 12h.01M12 12h.01m0-4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z" />
                </svg>
                <div class="flex-1">
                    <p class="text-sm font-semibold text-gray-800">Notifikasi Berhasil!</p>
                    <p class="text-sm text-gray-600">Data berhasil disimpan ke sistem.</p>
                </div>
                <button @click="showNotification = false" class="text-gray-400 hover:text-gray-700 ml-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    </Transition>
    <div>
        <!-- Tombol Scroll to up (Pojok kanan Bawah) -->
        <div class="fixed bottom-6 right-6 z-[1000] w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer group"
            @click="scrollToTop">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="size-6 text-orange-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
            </svg>

            <svg class="absolute top-0 left-0 w-12 h-12 transform -rotate-90">
                <circle class="text-gray-300" stroke-width="3" stroke="currentColor" fill="transparent" r="21" cx="24"
                    cy="24" />
                <circle class="text-orange-500 progress-ring" stroke-width="3" stroke-linecap="round" stroke="currentColor"
                    fill="transparent" r="21" cx="24" cy="24" :stroke-dasharray="circumference"
                    :stroke-dashoffset="offset" />
            </svg>
        </div>

        <!-- Tombol WhatsApp (Pojok Kiri Bawah) -->
        <a href="https://wa.me/6281234567890?text=Halo%2C%20saya%20tertarik%20dengan%20seblaknya%20🍲" target="_blank"
            class="fixed bottom-6 left-6 z-[1000] w-12 h-12 rounded-full bg-green-500 shadow-lg flex items-center justify-center hover:bg-green-600 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" class="w-6 h-6">
                <path
                    d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
            </svg>
        </a>
        <div>
            <nav :class="[
                'h-[70px] content-center fixed top-0 w-full z-50 transition-all duration-300',
                isScrolled ? 'bg-white text-orange-400 shadow-md' : 'bg-transparent text-white'
            ]">
                <div class="container mx-auto px-4 flex justify-between items-center">
                    <!-- Logo -->
                    <div class="flex items-center">
                        <img src="/images/seblak-logo.png" alt="Logo" class="h-10 mr-2" />
                        <h1 class="text-[30px] font-comic">Seblak BomBom</h1>
                    </div>

                    <!-- Desktop Menu -->
                    <div class="hidden md:flex items-center space-x-10 h-[70px]">
                        <!-- Dropdown: Home -->
                        <div class="relative group h-max">
                            <button class="flex items-center h-[70px] hover:text-orange-600 text-[18px] cursor-pointer">
                                Home
                            </button>
                        </div>

                        <!-- Links biasa -->
                        <div class="relative group h-max">
                            <button class="flex items-center h-[70px] hover:text-orange-600 text-[18px] cursor-pointer">
                                Menu
                                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div
                                class="absolute top-full left-0 mt-0 w-48 text-gray-500 pointer-events-none bg-white shadow-lg
                                rounded-md opacity-0 translate-y-2 scale-y-95 group-hover:opacity-100 group-hover:translate-y-0
                                group-hover:scale-y-100 group-hover:pointer-events-auto transition-all duration-200 ease-in-out z-30">
                                <a href="#" class="block px-4 py-2 hover:rounded-md hover:bg-gray-100">Seblak Kuah</a>
                                <a href="#" class="block px-4 py-2 hover:rounded-md hover:bg-gray-100">Seblak Kering</a>
                                <a href="#" class="block px-4 py-2 hover:rounded-md hover:bg-gray-100">Topping</a>
                                <a href="#" class="block px-4 py-2 hover:rounded-md hover:bg-gray-100">Minuman</a>
                            </div>
                        </div>
                        <a href="#" class="hover:text-orange-600 flex items-center text-[18px] h-[70px]">My Orders</a>
                        <a href="#" class="hover:text-orange-600 flex items-center text-[18px] h-[70px]">FAQ</a>

                        <!-- Language Dropdown -->
                        <div class="relative group">
                            <button class="flex items-center hover:text-orange-600 h-[70px] text-[18px] cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="size-5">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                                </svg>
                                <span class="ms-1">EN</span>
                                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div
                                class="absolute top-full left-0 mt-0 w-48 group-hover:pointer-events-auto text-gray-500
                                pointer-events-none bg-white shadow-lg rounded-md opacity-0 translate-y-2 scale-y-95
                                group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-y-100 transition-all duration-200 ease-in-out z-30">
                                <a href="#" class="block px-4 py-2 hover:rounded-md hover:bg-gray-100">Bahasa Indonesia</a>
                                <a href="#" class="block px-4 py-2 hover:rounded-md hover:bg-gray-100">Bahasa Inggris</a>
                            </div>
                        </div>

                        <a href="#" class="hover:text-orange-600 flex items-center text-[18px] h-[70px]">About</a>

                        <!-- Notification Dropdown -->
                        <div class="relative group">
                            <button class="relative flex items-center hover:text-orange-600 cursor-pointer h-[70px]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                                </svg>
                                <span
                                    class="absolute top-0 right-0 translate-x-4 translate-y-4 bg-red-500 text-white text-[10px] rounded-full px-1.5 py-[2px] leading-none">
                                    99+
                                </span>
                            </button>
                            <div
                                class="absolute top-full left-1/2 transform -translate-x-1/2 mt-0 w-80 text-gray-500 group-hover:pointer-events-auto
                                bg-white shadow-lg rounded-md opacity-0 translate-y-2 pointer-events-none scale-y-95 group-hover:opacity-100
                                group-hover:translate-y-0 group-hover:scale-y-100 transition-all duration-200 ease-in-out z-30">
                                <a href="#" class="block px-4 py-2 hover:rounded-md hover:bg-gray-100">
                                    <span class="font-bold text-[15px]">Makan Gratis (Title) 1</span>
                                    <p class="text-[15px] line-clamp-2 text-gray-500">Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit.</p>
                                </a>
                                <a href="#" class="block px-4 py-2 hover:rounded-md hover:bg-gray-100">
                                    <span class="font-bold text-[15px]">Makan Gratis (Title) 2</span>
                                    <p class="text-[15px] line-clamp-2 text-gray-500">Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit.</p>
                                </a>
                                <a href="#"
                                    class="block px-4 py-2 hover:rounded-md hover:bg-gray-100 text-center text-orange-400">Show
                                    More...</a>
                            </div>
                        </div>

                        <!-- Cart -->
                        <div class="relative group">
                            <button class="flex items-center hover:text-orange-600 cursor-pointer h-[70px]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                                <span
                                    class="absolute top-0 right-0 translate-x-4 translate-y-4 bg-red-500 text-white text-[10px] rounded-full px-1.5 py-[2px] leading-none">
                                    99+
                                </span>
                            </button>
                            <div
                                class="absolute top-full left-1/2 transform -translate-x-[80%] mt-0 w-80 text-gray-500 group-hover:pointer-events-auto
                                bg-white shadow-lg rounded-md opacity-0 translate-y-2 pointer-events-none scale-y-95 group-hover:opacity-100
                                group-hover:translate-y-0 group-hover:scale-y-100 transition-all duration-200 ease-in-out z-30">
                                <a href="#" class="block px-4 py-2 hover:rounded-md hover:bg-gray-100">
                                    <span class="font-bold text-[15px]">Makan Gratis (Title) 1</span>
                                    <p class="text-[15px] line-clamp-2 text-gray-500">Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit.</p>
                                </a>
                                <a href="#" class="block px-4 py-2 hover:rounded-md hover:bg-gray-100">
                                    <span class="font-bold text-[15px]">Makan Gratis (Title) 2</span>
                                    <p class="text-[15px] line-clamp-2 text-gray-500">Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit.</p>
                                </a>
                                <a href="#"
                                    class="block px-4 py-2 hover:rounded-md hover:bg-gray-100 text-center text-orange-400">Show
                                    More...</a>
                            </div>
                        </div>

                        <div class="flex gap-2">
                            <!-- Tombol Login (outline-style) -->
                            <button :class="[
                                'border font-bold py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer',
                                isScrolled ? 'border-orange-500 text-orange-500 hover:text-orange-600 hover:border-orange-600' : 'border-white text-white hover:text-orange-600 hover:border-orange-600'
                            ]">
                                Login
                            </button>

                            <!-- Tombol Register (filled light style) -->
                            <button :class="[
                                'font-bold py-2 px-4 rounded-md border border-transparent transition-colors duration-200 cursor-pointer',
                                isScrolled ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-white text-orange-400 hover:bg-orange-50 hover:text-orange-600'
                            ]">
                                Register
                            </button>
                        </div>
                    </div>

                    <!-- Hamburger Button -->
                    <div class="md:hidden">
                        <button @click="toggleMenu" class="p-2 hover:bg-white hover:text-black rounded-full">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
        </div>

        <!-- Mobile Sidebar -->
        <div class="fixed top-0 right-0 h-full w-64 bg-white text-black shadow-lg z-50 transform transition-transform duration-300 ease-in-out"
            :class="{ 'translate-x-0': isMenuOpen, 'translate-x-full': !isMenuOpen }">
            <!-- Close Button -->
            <div class="flex justify-end p-4">
                <button @click="toggleMenu">
                    <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Sidebar Links -->
            <div class="px-6 space-y-4">
                <a href="#" class="block hover:text-orange-600">Home</a>
                <a href="#" class="block hover:text-orange-600">Pages</a>
                <a href="#" class="block hover:text-orange-600">Shop</a>
                <a href="#" class="block hover:text-orange-600">Blogs</a>
                <a href="#" class="block hover:text-orange-600">Contact</a>
            </div>
        </div>

        <!-- Overlay / backdrop -->
        <div v-if="isMenuOpen" class="fixed inset-0 backdrop-blur-3xl z-40" @click="toggleMenu"></div>

        <div>
            <slot />
        </div>
        <footer class="bg-gradient-to-b from-orange-100 to-orange-200 text-gray-700 py-16">
            <div class="max-w-7xl mx-auto px-6 md:px-16">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    <!-- Brand & Description -->
                    <div class="space-y-6">
                        <div>
                            <h3 class="text-3xl font-bold text-orange-600 mb-3">
                                Seblak <span class="text-orange-500">BomBom</span>
                            </h3>
                            <p class="text-gray-600 leading-relaxed">
                                Seblak pedas nikmat dengan topping lengkap yang bikin nagih!
                                Rasakan kelezatan autentik Bandung setiap hari.
                            </p>
                        </div>
                        <div class="bg-white/50 rounded-xl p-4 border border-orange-200">
                            <div class="flex items-center mb-2">
                                <svg class="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span class="font-semibold text-gray-700">Jam Buka</span>
                            </div>
                            <p class="text-sm text-gray-600">Setiap hari: 10:00 - 22:00 WIB</p>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-700 mb-3">Ikuti Kami:</p>
                            <div class="flex gap-3">
                                <!-- Social Media icons (sudah ada, tidak diulang di sini) -->
                                <!-- ... -->
                            </div>
                        </div>
                    </div>

                    <!-- Quick Links -->
                    <div>
                        <h4 class="text-xl font-bold text-gray-800 mb-6 relative">
                            Menu
                            <div class="absolute bottom-0 left-0 w-12 h-1 bg-orange-500 rounded-full"></div>
                        </h4>
                        <ul class="space-y-3">
                            <li><a href="#" class="text-gray-600 hover:text-orange-600 transition">Beranda</a></li>
                            <li><a href="#" class="text-gray-600 hover:text-orange-600 transition">Tentang Kami</a></li>
                            <li><a href="#" class="text-gray-600 hover:text-orange-600 transition">Menu</a></li>
                            <li><a href="#" class="text-gray-600 hover:text-orange-600 transition">Cara Pesan</a></li>
                            <li><a href="#" class="text-gray-600 hover:text-orange-600 transition">Kontak</a></li>
                        </ul>
                    </div>

                    <!-- Contact Info -->
                    <div>
                        <h4 class="text-xl font-bold text-gray-800 mb-6 relative">
                            Kontak Kami
                            <div class="absolute bottom-0 left-0 w-16 h-1 bg-orange-500 rounded-full"></div>
                        </h4>
                        <ul class="space-y-4 text-sm text-gray-600">
                            <li class="flex items-start">
                                <svg class="w-5 h-5 text-orange-500 mr-3 mt-1" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 5h12M9 3v2m4 4H3m16 0a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h14z" />
                                </svg>
                                Jl. Sukajadi No. 123, Bandung, Jawa Barat
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-orange-500 mr-3" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 12h.01" />
                                </svg>
                                seblakbombom@email.com
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-orange-500 mr-3" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 5h12M9 3v2m6 4h.01M3 9h12m-9 4h6" />
                                </svg>
                                +62 812-3456-7890
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Footer Bottom -->
                <div class="border-t border-orange-300 pt-8 text-sm text-center text-gray-500">
                    &copy; 2025 Seblak BomBom. All rights reserved.
                </div>
            </div>
        </footer>
    </div>
</template>
  
<script setup>
const config = useRuntimeConfig();
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useHead } from 'nuxt/app';

const isMenuOpen = ref(false)
const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

useHead({
    link: [
        {
            rel: 'stylesheet',
            href: 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css'
        },
        {
            rel: 'stylesheet',
            href: 'https://unpkg.com/aos@2.3.1/dist/aos.css'
        },
    ],
    script: [
        {
            src: 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
            tagPosition: 'bodyClose'
        },
        {
            src: 'https://unpkg.com/aos@2.3.1/dist/aos.js',
            tagPosition: 'bodyClose'
        },
    ]
})

const api_url = config.public.apiUrl

const isScrolled = ref(false)

const handleScroll = () => {
    isScrolled.value = window.scrollY > 10 // kamu bisa ubah angka 10 ke 0 jika ingin langsung efek
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('scroll', updateProgress)
    updateProgress()
    AOS.init({
        // Global settings:
        disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        initClassName: 'aos-init', // class applied after initialization
        animatedClassName: 'aos-animate', // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 120, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 300, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    });
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('scroll', updateProgress)
})

const radius = 21
const circumference = 2 * Math.PI * radius
const offset = ref(circumference)

function updateProgress() {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = scrollTop / docHeight
    offset.value = circumference - progress * circumference
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const showNotification = ref(false)

watch(showNotification, (val) => {
    if (val) {
        setTimeout(() => {
            showNotification.value = false
        }, 3000)
    }
})

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Comic+Relief:wght@400;700&family=Fredoka:wght@300..700&family=WDXL+Lubrifont+TC&display=swap');

* {
    font-family: 'Comic Relief', cursive;
}

circle {
    transition: stroke-dashoffset 0.3s;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(20px);
}</style>
