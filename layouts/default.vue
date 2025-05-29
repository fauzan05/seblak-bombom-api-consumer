<template>
    <div>
        <div class="bg-orange-400 text-white min-h-screen">
            <nav :class="[
                'h-[70px] content-center fixed top-0 w-full z-50 transition-all duration-300',
                isScrolled ? 'bg-white text-orange-400 shadow-md' : 'bg-transparent text-white'
            ]">
                <div class="container mx-auto px-4 flex justify-between items-center">
                    <!-- Logo -->
                    <div class="flex items-center">
                        <img src="../assets/images/seblak-logo.png" alt="Logo" class="h-10 mr-2" />
                        <span class="text-[30px] font-bold">Seblak BomBom</span>
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
                            <button
                                class="border border-white text-white font-bold py-2 px-4 rounded-md hover:text-orange-600 hover:border-orange-600 transition-colors duration-200 cursor-pointer">
                                Login
                            </button>

                            <!-- Tombol Register (filled light style) -->
                            <button
                                class="bg-white text-orange-400 font-bold py-2 px-4 rounded-md border border-transparent hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 cursor-pointer">
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

        <div class="h-screen">
            <slot />
        </div>
    </div>
</template>
  
<script setup>
import { useHead } from 'nuxt/app';
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isMenuOpen = ref(false)
const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

useHead({
    title: 'Seblak BomBom',
    meta: [
        { name: 'default page', content: 'seblak bombom ya' }
    ],
    link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&family=WDXL+Lubrifont+TC&display=swap' }
    ]
})

const isScrolled = ref(false)

const handleScroll = () => {
    isScrolled.value = window.scrollY > 10 // kamu bisa ubah angka 10 ke 0 jika ingin langsung efek
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>
  