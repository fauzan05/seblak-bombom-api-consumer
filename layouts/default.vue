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
    <div v-if="!loading">
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
                'h-auto fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-sm',
                isScrolled ? 'bg-white/90 text-orange-400 shadow-md' : 'bg-transparent text-white'
            ]">
                <div class="container mx-auto px-4">
                    <div class="flex justify-between items-center h-20">
                        <!-- Logo Section -->
                        <NuxtLink to="/">
                            <div class="flex items-center space-x-2">
                                <img :src="logoUrl" alt="Logo" class="h-10 transition-transform hover:scale-105" />
                                <h1
                                    class="text-lg md:text-xl font-bold truncate max-w-[300px] hover:text-orange-500 transition-colors">
                                    {{ appSetting.app_name }}
                                </h1>
                            </div>
                        </NuxtLink>

                        <!-- Desktop Menu -->
                        <div class="hidden md:flex items-center space-x-6">
                            <!-- Main Navigation -->
                            <div class="flex items-center space-x-6">
                                <!-- Home -->
                                <a href="#" class="nav-link group">
                                    <span class="relative">
                                        Home
                                        <span
                                            class="absolute -bottom-3 left-0 w-full h-0.5 bg-orange-500 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
                                    </span>
                                </a>

                                <!-- Menu Dropdown -->
                                <div class="relative group menu-wrapper h-20 flex items-center" @mouseenter="isMenuOpen = true"
                                    @mouseleave="isMenuOpen = false">
                                    <button class="nav-link flex items-center space-x-1" @click.stop="toggleMenu">
                                        <span>Menu</span>
                                        <svg class="w-4 h-4 transition-transform group-hover:rotate-180" fill="none"
                                            stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <div v-show="isMenuOpen"
                                        class="absolute top-full -left-2 w-48 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                                        <div class="py-2 px-3">
                                            <a href="#"
                                                class="block px-3 py-2 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-500 transition-colors">Seblak
                                                Kuah</a>
                                            <a href="#"
                                                class="block px-3 py-2 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-500 transition-colors">Seblak
                                                Kering</a>
                                            <a href="#"
                                                class="block px-3 py-2 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-500 transition-colors">Topping</a>
                                            <a href="#"
                                                class="block px-3 py-2 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-500 transition-colors">Minuman</a>
                                        </div>
                                    </div>
                                </div>

                                <a href="#" class="nav-link group">
                                    <span class="relative">
                                        My Orders
                                        <span
                                            class="absolute -bottom-3 left-0 w-full h-0.5 bg-orange-500 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
                                    </span>
                                </a>
                                <a href="#" class="nav-link group">
                                    <span class="relative">
                                        FAQ
                                        <span
                                            class="absolute -bottom-3 left-0 w-full h-0.5 bg-orange-500 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
                                    </span>
                                </a>
                            </div>

                            <!-- Action Buttons -->
                            <div class="flex items-center space-x-4">
                                <!-- Notification -->
                                <div class="relative notif-wrapper h-20 flex items-center" @mouseenter="isNotifOpen = true"
                                    @mouseleave="isNotifOpen = false">
                                    <button @click.stop="toggleNotif"
                                        class="relative p-2 hover:bg-white/10 rounded-full transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                        </svg>
                                        <span
                                            class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center">
                                            99+
                                        </span>
                                    </button>
                                    <!-- Notification Dropdown -->
                                    <div v-show="isNotifOpen"
                                        class="absolute top-full right-0 w-80 bg-white rounded-xl shadow-lg z-50 transition-all duration-300 transform">
                                        <div class="p-4">
                                            <h3 class="text-lg font-semibold text-gray-800 mb-2">Notifications</h3>
                                            <div class="space-y-3">
                                                <div
                                                    class="p-3 hover:bg-orange-50 rounded-lg transition-colors cursor-pointer">
                                                    <div class="flex items-start">
                                                        <div
                                                            class="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4"
                                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    stroke-width="2"
                                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                        </div>
                                                        <div class="ml-3">
                                                            <p class="text-sm font-medium text-gray-800">Order #123
                                                                Completed</p>
                                                            <p class="text-xs text-gray-500 mt-1">Your order has been
                                                                delivered successfully.</p>
                                                            <p class="text-xs text-gray-400 mt-1">2 minutes ago</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- More notification items -->
                                            </div>
                                            <a href="#"
                                                class="block text-center text-orange-500 hover:text-orange-600 text-sm font-medium mt-4 py-2">
                                                View All Notifications
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <!-- Cart -->
                                <div class="relative cart-wrapper flex items-center h-20" @mouseenter="isCartOpen = true"
                                    @mouseleave="isCartOpen = false">
                                    <button @click.stop="toggleCart"
                                        class="relative p-2 hover:bg-white/10 rounded-full transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <span
                                            class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center">
                                            3
                                        </span>
                                    </button>
                                    <!-- Cart Dropdown -->
                                    <div v-show="isCartOpen"
                                        class="absolute top-full right-0 w-96 bg-white rounded-xl shadow-lg z-50 transition-all duration-300 transform">
                                        <div class="p-4">
                                            <h3 class="text-lg font-semibold text-gray-800 mb-2">Shopping Cart</h3>
                                            <div class="space-y-3">
                                                <div
                                                    class="flex items-center p-3 hover:bg-orange-50 rounded-lg transition-colors">
                                                    <img src="" alt="Food" class="h-16 w-16 object-cover rounded-lg" />
                                                    <div class="ml-4 flex-1">
                                                        <h4 class="text-sm font-medium text-gray-800">Seblak Special</h4>
                                                        <p class="text-xs text-gray-500">2x | Level 3</p>
                                                        <p class="text-sm font-medium text-orange-500 mt-1">Rp 25.000</p>
                                                    </div>
                                                    <button class="text-gray-400 hover:text-red-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                                            viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <!-- More cart items -->
                                            </div>
                                            <div class="mt-4 pt-4 border-t">
                                                <div class="flex justify-between text-sm font-medium text-gray-800">
                                                    <span>Total</span>
                                                    <span>Rp 75.000</span>
                                                </div>
                                                <button
                                                    class="w-full mt-4 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors">
                                                    Checkout
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Language -->
                                <div class="relative language-wrapper flex items-center h-20"
                                    @mouseenter="isLanguageOpen = true" @mouseleave="isLanguageOpen = false">
                                    <button @click.stop="toggleLanguage"
                                        class="flex items-center space-x-1 p-2 hover:bg-white/10 rounded-full transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                        </svg>
                                        <span class="text-sm">EN</span>
                                    </button>
                                    <!-- Language Dropdown -->
                                    <div v-show="isLanguageOpen"
                                        class="absolute top-full right-0 w-48 bg-white rounded-xl shadow-lg z-50 transition-all duration-300 transform">
                                        <div class="py-2">
                                            <a href="#"
                                                class="flex items-center px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-500">
                                                🇮🇩
                                                Bahasa Indonesia
                                            </a>
                                            <a href="#"
                                                class="flex items-center px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-500">
                                                🇺🇸
                                                English
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <!-- Auth Buttons -->
                                <div v-if="!currentUser" class="flex items-center space-x-3">
                                    <NuxtLink to="/auth/login" :class="[
                                        'px-4 py-2 rounded-full border transition-all duration-300 hover:scale-105',
                                        isScrolled ? 'border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white' : 'border-white text-white hover:bg-white hover:text-orange-500'
                                    ]">
                                        Login
                                    </NuxtLink>

                                    <NuxtLink to="/auth/register" :class="[
                                        'px-4 py-2 rounded-full transition-all duration-300 hover:scale-105',
                                        isScrolled ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-white text-orange-500 hover:bg-orange-50'
                                    ]">
                                        Register
                                    </NuxtLink>
                                </div>

                                <!-- Profile (Visible when logged in) -->
                                <div v-if="currentUser" class="relative profile-wrapper flex items-center h-20"
                                    @mouseenter="isProfileOpen = true" @mouseleave="isProfileOpen = false">
                                    <button @click.stop="toggleProfile"
                                        class="flex items-center space-x-2 p-2 hover:bg-white/10 rounded-full transition-colors">
                                        <svg width="100" height="100" class="h-8 w-8 rounded-full object-cover"
                                            viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="50" cy="50" r="48" fill="#F3F4F6" stroke="#E5E7EB"
                                                stroke-width="4" />
                                            <circle cx="50" cy="38" r="14" fill="#D1D5DB" />
                                            <path
                                                d="M24 78C24 65.2975 35.2975 56 48 56H52C64.7025 56 76 65.2975 76 78V80H24V78Z"
                                                fill="#D1D5DB" />
                                        </svg>

                                        <span class="text-sm font-medium">{{ currentUser.first_name }}</span>
                                    </button>
                                    <!-- Profile Dropdown -->
                                    <div v-show="isProfileOpen"
                                        class="absolute top-full right-0 w-56 bg-white rounded-xl shadow-lg z-50 transition-all duration-300 transform">
                                        <div class="p-3">
                                            <div class="flex items-center px-3 py-2">
                                                <div>
                                                    <svg width="100" height="100" class="h-8 w-8 rounded-full object-cover"
                                                        viewBox="0 0 100 100" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="50" cy="50" r="48" fill="#F3F4F6" stroke="#E5E7EB"
                                                            stroke-width="4" />
                                                        <circle cx="50" cy="38" r="14" fill="#D1D5DB" />
                                                        <path
                                                            d="M24 78C24 65.2975 35.2975 56 48 56H52C64.7025 56 76 65.2975 76 78V80H24V78Z"
                                                            fill="#D1D5DB" />
                                                    </svg>
                                                </div>
                                                <div class="ml-3 max-w-30">
                                                    <p class="text-sm font-medium text-gray-800 truncate">
                                                        {{ `${currentUser?.first_name ?? ''} ${currentUser?.last_name ??
                                                            ''}`.trim() }}
                                                    </p>
                                                    <p class="text-xs text-gray-500 truncate">{{ currentUser.email }}</p>
                                                </div>
                                            </div>
                                            <div class="mt-3 space-y-1">
                                                <a href="#"
                                                    class="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 rounded-lg">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none"
                                                        viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    My Profile
                                                </a>
                                                <a href="#"
                                                    class="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 rounded-lg">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none"
                                                        viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                    </svg>
                                                    My Orders
                                                </a>
                                                <a href="#"
                                                    class="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 rounded-lg">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none"
                                                        viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    Settings
                                                </a>
                                                <hr class="my-2" />
                                                <button @click="logout"
                                                    class="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg w-full">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none"
                                                        viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                    </svg>
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Mobile Menu Button -->
                        <button @click="toggleMobileMenu"
                            class="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
        </div>

        <Transition name="slide-fade">
            <div v-if="isMenuMobileOpen" class="fixed inset-0 z-50 md:hidden">
                <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="toggleMobileMenu"></div>
                <div class="absolute top-0 right-0 h-full w-[280px] bg-white shadow-xl overflow-y-auto">
                    <div class="sticky top-0 z-10 bg-white border-b border-gray-100">
                        <div class="flex items-center justify-between p-4">
                            <div class="flex-1 min-w-0 pr-2">
                                <template v-if="currentUser">
                                    <p class="text-sm font-medium text-gray-800 truncate">
                                        {{ `${currentUser?.first_name ?? ''} ${currentUser?.last_name ?? ''}`.trim() }}
                                    </p>
                                    <p class="text-xs text-gray-500 truncate">{{ currentUser.email }}</p>
                                </template>
                                <template v-else>
                                    <div class="flex space-x-2">
                                        <NuxtLink to="/auth/login" @click="toggleMobileMenu"
                                            class="px-3 py-1.5 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors">
                                            Login
                                        </NuxtLink>
                                        <NuxtLink to="/auth/register" @click="toggleMobileMenu"
                                            class="px-3 py-1.5 text-sm font-medium text-orange-500 border border-orange-500 rounded-lg hover:bg-orange-50 transition-colors">
                                            Register
                                        </NuxtLink>
                                    </div>
                                </template>
                            </div>

                            <div class="flex items-center space-x-3">
                                <div v-if="currentUser">
                                    <svg width="100" height="100"
                                        class="h-10 w-10 rounded-full bg-white border border-gray-200" viewBox="0 0 100 100"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="50" cy="50" r="48" fill="#F3F4F6" stroke="#E5E7EB" stroke-width="4" />
                                        <circle cx="50" cy="38" r="14" fill="#FB923C" />
                                        <path
                                            d="M24 78C24 65.2975 35.2975 56 48 56H52C64.7025 56 76 65.2975 76 78V80H24V78Z"
                                            fill="#FB923C" />
                                    </svg>
                                </div>
                                <button @click="toggleMobileMenu"
                                    class="p-2 rounded-full hover:bg-gray-100 transition-colors">
                                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="p-4 space-y-6">
                        <div class="space-y-2">
                            <a href="#" @click="toggleMobileMenu"
                                class="flex items-center space-x-3 p-2.5 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors"><svg
                                    class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg><span>Home</span>
                            </a>
                            <div>
                                <button @click="isMobileSubmenuOpen = !isMobileSubmenuOpen"
                                    class="w-full flex items-center justify-between p-2.5 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors cursor-pointer">
                                    <div class="flex items-center space-x-3"><svg class="w-5 h-5" fill="none"
                                            stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M4 6h16M4 12h16M4 18h16" />
                                        </svg><span>Menu</span></div><svg class="w-4 h-4 transition-transform duration-200"
                                        :class="{ 'rotate-180': isMobileSubmenuOpen }" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <Transition name="expand">
                                    <div v-if="isMobileSubmenuOpen" class="mt-1 ml-8 space-y-1.5">
                                        <a href="#" @click="toggleMobileMenu"
                                            class="block py-2 rounded-lg px-3 text-sm text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-colors">Seblak
                                            Kuah
                                        </a>
                                        <a href="#" @click="toggleMobileMenu"
                                            class="block py-2 rounded-lg px-3 text-sm text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-colors">Seblak
                                            Kering
                                        </a>
                                        <a href="#" @click="toggleMobileMenu"
                                            class="block py-2 rounded-lg px-3 text-sm text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-colors">Topping
                                        </a>
                                        <a href="#" @click="toggleMobileMenu"
                                            class="block py-2 rounded-lg px-3 text-sm text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-colors">Minuman
                                        </a>
                                    </div>
                                </Transition>
                            </div>
                            <a href="#" @click="toggleMobileMenu"
                                class="flex items-center space-x-3 p-2.5 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors"><svg
                                    class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg><span>My Orders</span></a><a href="#" @click="toggleMobileMenu"
                                class="flex items-center space-x-3 p-2.5 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors"><svg
                                    class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg><span>FAQ</span>
                            </a>
                            <button @click="logout"
                                class="flex w-full cursor-pointer items-center space-x-3 p-2.5 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12H3m12 0l-4-4m4 4l-4 4m6-10h2a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
                                </svg>
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>

        <!-- Overlay / backdrop -->
        <div v-if="isMenuMobileOpen" class="fixed inset-0 backdrop-blur-3xl z-40" @click="toggleMobileMenu"></div>

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
                    &copy; {{ yearNow }} {{ appSetting.app_name }}. All rights reserved.
                </div>
            </div>
        </footer>
    </div>
</template>
  
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import AOS from 'aos';
import 'aos/dist/aos.css';

const isMenuMobileOpen = ref(false)
const toggleMobileMenu = () => {
    isMenuMobileOpen.value = !isMenuMobileOpen.value
}

const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl
const data = ref(null)

const isScrolled = ref(false)

const handleScroll = () => {
    isScrolled.value = window.scrollY > 10 // kamu bisa ubah angka 10 ke 0 jika ingin langsung efek
}
const error = ref('')
const logoUrl = ref('')
const loading = ref(true)
const appSetting = useState('appSetting', () => null)
const currentUser = useState('currentUser', () => null)
const isMobileSubmenuOpen = ref(false);

onMounted(async () => {
    await getAppSetting()
    await getCurrentUser()

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

    window.addEventListener('click', closeProfile)
    window.addEventListener('click', closeLanguage)
    window.addEventListener('click', closeCart)
    window.addEventListener('click', closeNotif)
    window.addEventListener('click', closeMenu)
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('scroll', updateProgress)
    window.removeEventListener('click', closeProfile)
    window.removeEventListener('click', closeLanguage)
    window.removeEventListener('click', closeCart)
    window.removeEventListener('click', closeNotif)
    window.removeEventListener('click', closeMenu)
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

const yearNow = new Date().getFullYear()

async function getAppSetting() {
    try {
        const res = await $fetch('/applications', {
            baseURL: apiUrl
        })

        data.value = res.data
        logoUrl.value = `${apiUrl}/image/application/${data.value.logo_filename}`
        appSetting.value = data.value

    } catch (err) {
        alert(err?.message || 'Unknown error')

    } finally {
        setTimeout(() => {
            loading.value = false
        }, 300)
    }
}

async function getCurrentUser() {
    try {
        const res = await $fetch('/users/current', {
            baseURL: apiUrl,
            credentials: 'include'
        })

        useState('currentUser', () => res.data)
        currentUser.value = res.data
    } catch (err) {
        if (err?.response?.status !== 401 && err?.status !== 401) {
            alert(err?.message || 'Unknown error')
        }
    } finally {
        // kosong = tidak masalah
    }
}

async function logout() {
    try {
        await $fetch('/users/logout', {
            baseURL: apiUrl,
            method: 'delete',
            credentials: 'include'
        })

        useState('currentUser', () => null)
        currentUser.value = null
        showNotification.value = true
    } catch (err) {
        alert(err?.message || 'Unknown error')
    }
}

// Profile dropdown
const isProfileOpen = ref(false)
function toggleProfile() {
    isProfileOpen.value = !isProfileOpen.value
}
function closeProfile(e) {
    if (!e.target.closest('.profile-wrapper')) {
        isProfileOpen.value = false
    }
}

// Language dropdown
const isLanguageOpen = ref(false)
function toggleLanguage() {
    isLanguageOpen.value = !isLanguageOpen.value
}
function closeLanguage(e) {
    if (!e.target.closest('.language-wrapper')) {
        isLanguageOpen.value = false
    }
}

// Cart dropdown
const isCartOpen = ref(false)
function toggleCart() {
    isCartOpen.value = !isCartOpen.value
}
function closeCart(e) {
    if (!e.target.closest('.cart-wrapper')) {
        isCartOpen.value = false
    }
}

// Notif dropdown
const isNotifOpen = ref(false)

function toggleNotif() {
    isNotifOpen.value = !isNotifOpen.value
}

function closeNotif(e) {
    if (!e.target.closest('.notif-wrapper')) {
        isNotifOpen.value = false
    }
}

// Menu dropdown
const isMenuOpen = ref(false)

function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value
}

function closeMenu(e) {
    if (!e.target.closest('.menu-wrapper')) {
        isMenuOpen.value = false
    }
}

</script>

<style scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Comic+Relief:wght@400;700&family=Fredoka:wght@300..700&family=WDXL+Lubrifont+TC&display=swap');

* {
    font-family: 'Comic Relief', cursive;
} */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

body {
    font-family: 'Poppins', sans-serif;
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
