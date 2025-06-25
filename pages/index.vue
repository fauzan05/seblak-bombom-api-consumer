<template>
    <head>
        <Title>Home - {{ appSettingStore.settings.data.app_name }}</Title>
        <Link rel="icon" type="image/x-icon" href="favicon.ico" />
    </head>
    <div class="relative w-full h-[700px] overflow-hidden">
        <div class="swiper-1 w-full h-full">
            <div class="swiper-wrapper">
                <div class="swiper-slide relative w-full h-full" v-for="(slide, index) in slides" :key="index">
                    <!-- Background Image with Zoom Effect -->
                    <div class="absolute inset-0 scale-105 transition-transform duration-[20s]"
                        :class="{ 'scale-125': activeIndex === index }">
                        <img :src="`/images/seblak-${index}.png`" alt="Seblak" class="w-full h-full object-cover" />
                    </div>

                    <!-- Enhanced Gradient Overlays -->
                    <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
                    <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>

                    <!-- Animated Pattern Overlay -->
                    <div class="absolute inset-0 bg-[url('/pattern.png')] opacity-20"></div>

                    <!-- Text Content with Animations -->
                    <div class="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 md:px-20 text-white z-10">
                        <div class="max-w-4xl" :class="{ 'opacity-100': activeIndex === index }">
                            <!-- Badge -->
                            <div class="slide-down-fade-in mb-6">
                                <span class="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium
                                    bg-orange-500/80 backdrop-blur-sm">
                                    <span class="animate-pulse mr-2">🔥</span>
                                    Trending Now
                                </span>
                            </div>

                            <!-- Title -->
                            <h2 class="slide-up-fade-in text-4xl sm:text-5xl md:text-7xl font-bold mb-6
                                leading-tight tracking-tight">
                                {{ slide.title }}
                                <span class="block mt-2 text-orange-400">Special</span>
                            </h2>

                            <!-- Description -->
                            <p class="slide-up-fade-in delay-200 text-lg sm:text-xl md:text-2xl mb-8
                                text-gray-300 max-w-xl leading-relaxed">
                                {{ slide.desc }}
                            </p>

                            <!-- Action Buttons -->
                            <div class="slide-up-fade-in delay-400 flex flex-wrap gap-4">
                                <button class="group relative overflow-hidden px-8 py-4 bg-orange-500
                                    rounded-full transition-all duration-300 hover:bg-orange-600
                                    focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                                    <span class="relative z-10 flex items-center font-semibold">
                                        Pesan Sekarang
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            class="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </span>
                                </button>
                                <button class="px-8 py-4 rounded-full border-2 border-white/80
                                    hover:bg-white hover:text-orange-500 transition-all duration-300 font-semibold">
                                    Lihat Menu
                                </button>
                            </div>

                            <!-- Additional Info -->
                            <div class="slide-up-fade-in delay-600 mt-12 flex items-center space-x-8">
                                <div class="flex items-center space-x-2">
                                    <span class="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/20">
                                        ⭐️
                                    </span>
                                    <div class="flex flex-col">
                                        <span class="text-sm text-gray-300">Rating</span>
                                        <span class="font-semibold">4.9/5.0</span>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <span class="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/20">
                                        ⏱️
                                    </span>
                                    <div class="flex flex-col">
                                        <span class="text-sm text-gray-300">Delivery Time</span>
                                        <span class="font-semibold">20-30 min</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Custom Navigation -->
            <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
                <button v-for="(_, index) in slides" :key="index" @click="swiper?.slideTo(index)" :class="[
                    'w-3 h-3 rounded-full transition-all duration-300',
                    activeIndex === index ? 'bg-orange-500 w-8' : 'bg-white/50 hover:bg-white/70'
                ]">
                </button>
            </div>
        </div>
    </div>

    <div>
        <section class="relative bg-gradient-to-br from-orange-50 via-white to-yellow-50 py-24 overflow-hidden"
            id="special-menu">
            <div class="absolute inset-0 opacity-10">
                <div
                    class="absolute top-0 left-1/4 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse">
                </div>
                <div
                    class="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000">
                </div>
            </div>
            <div class="absolute top-20 left-10 w-6 h-6 bg-orange-300 rounded-full animate-bounce opacity-20"></div>
            <div
                class="absolute top-40 right-20 w-4 h-4 bg-yellow-400 rounded-full animate-bounce opacity-30 animation-delay-1000">
            </div>
            <div
                class="absolute bottom-32 left-1/3 w-5 h-5 bg-orange-400 rounded-full animate-bounce opacity-25 animation-delay-3000">
            </div>
            <div class="relative max-w-7xl mx-auto px-6">
                <div class="text-center mb-20">
                    <h2 class="text-5xl md:text-7xl font-bold mb-6">
                        <span
                            class="bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">Special
                            Menu</span>
                    </h2>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Temukan menu istimewa kami yang
                        disiapkan dengan penuh cinta dan bahan-bahan berkualitas tinggi</p>
                    <div class="flex items-center justify-center mt-8">
                        <div class="h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent w-32"></div>
                        <div class="mx-4 w-3 h-3 bg-orange-400 rounded-full"></div>
                        <div class="h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent w-32"></div>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
                    <div v-for="(menu, index) in menus" :key="index"
                        :class="['group relative', menus.length === 4 && index === 3 ? 'lg:col-start-2' : '']"
                        data-aos="fade-up" :data-aos-delay="100 + index * 100">
                        <div
                            class="relative bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl border border-gray-100 group-hover:border-orange-200">
                            <div
                                class="relative h-64 bg-gradient-to-br from-orange-100 to-orange-200 group-hover:from-orange-400 group-hover:to-orange-500 transition-all duration-700 rounded-b-[60px]">
                                <div class="absolute inset-0 opacity-20">
                                    <svg class="w-full h-full" viewBox="0 0 100 100" fill="none">
                                        <defs>
                                            <pattern :id="'pattern-' + index" x="0" y="0" width="20" height="20"
                                                patternUnits="userSpaceOnUse">
                                                <circle cx="10" cy="10" r="1" fill="currentColor" />
                                            </pattern>
                                        </defs>
                                        <rect width="100" height="100" :fill="'url(#pattern-' + index + ')'" />
                                    </svg>
                                </div>
                                <div class="absolute inset-0 flex justify-center items-end pb-6">
                                    <div
                                        class="relative transform transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-105">
                                        <img :src="menu.image" alt="Menu Image"
                                            class="w-48 h-48 object-cover rounded-2xl border-4 border-white shadow-2xl" />
                                    </div>
                                </div>
                                <div
                                    class="absolute top-6 right-6 bg-white/90 backdrop-blur-sm text-orange-600 font-bold text-lg px-4 py-2 rounded-full shadow-lg border border-orange-100">
                                    Rp{{ menu.price }}
                                </div>
                            </div>
                            <div class="px-8 py-8 text-center">
                                <h3
                                    class="text-2xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                                    {{ menu.title }}</h3>
                                <p class="text-gray-600 leading-relaxed mb-6 text-sm">{{ menu.description }}</p>
                                <div class="flex justify-center space-x-1 mb-6">
                                    <template v-for="n in 5" :key="n">
                                        <svg class="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.963a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.378 2.455a1 1 0 00-.364 1.118l1.287 3.963c.3.92-.755 1.688-1.538 1.118l-3.379-2.455a1 1 0 00-1.175 0l-3.379 2.455c-.782.57-1.837-.197-1.538-1.118l1.287-3.963a1 1 0 00-.364-1.118L2.05 9.39c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69l1.286-3.963z">
                                            </path>
                                        </svg>
                                    </template>
                                </div>
                                <div class="flex space-x-3">
                                    <button
                                        class="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                                        <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M3 3h2l.4 2M7 13h10l4-8H5.4m-2.4 0L2 1H1m6 12a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z">
                                            </path>
                                        </svg>Pesan
                                    </button>
                                    <button
                                        class="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-all duration-300 transform hover:scale-105">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                                            </path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center">
                    <div
                        class="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100 max-w-2xl mx-auto">
                        <h3 class="text-2xl font-bold text-gray-800 mb-4">Masih Lapar?</h3>
                        <p class="text-gray-600 mb-6">Jelajahi seluruh menu kami dan temukan favorit baru Anda!</p>
                        <button
                            class="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl relative overflow-hidden">
                            <span class="relative z-10 flex items-center justify-center">
                                <svg class="w-6 h-6 mr-2 transform group-hover:rotate-12 transition-transform duration-300"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7"></path>
                                </svg>Lihat Semua Menu
                            </span>
                            <div
                                class="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left">
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- card why choose -->
        <section class="relative py-20 bg-gradient-to-br from-orange-50 via-white to-orange-50 overflow-hidden">
            <!-- Background Decorative Elements -->
            <div class="absolute inset-0 opacity-5">
                <div
                    class="absolute top-20 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl animate-blob">
                </div>
                <div
                    class="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000">
                </div>
                <div
                    class="absolute -bottom-20 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000">
                </div>
            </div>
            <div class="relative max-w-7xl mx-auto px-6">
                <!-- Header Section -->
                <div class="text-center mb-20">
                    <div
                        class="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-6">
                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                                clip-rule="evenodd"></path>
                        </svg>
                        Why Choose Us
                    </div>
                    <h2
                        class="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-6 leading-tight">
                        Seblak BomBom
                    </h2>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Pengalaman kuliner terbaik dengan cita rasa autentik Bandung yang
                        menggugah selera.
                        <span class="text-orange-500 font-semibold">Rasakan perbedaannya!</span>
                    </p>
                </div>

                <!-- Features Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <!-- Card 1: Pengantaran Cepat -->
                    <div data-aos="fade-up" data-aos-delay="100"
                        class="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-orange-200">
                        <!-- Card Background Gradient -->
                        <div
                            class="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                        </div>

                        <!-- Icon Container -->
                        <div class="relative z-10 mb-6">
                            <div
                                class="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                        </div>
                        <!-- Content -->
                        <div class="relative z-10 text-center">
                            <h4
                                class="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                                Pengantaran Cepat
                            </h4>
                            <p class="text-gray-600 leading-relaxed">
                                Khusus area Kebumen, makanan sampai dalam keadaan hangat dan
                                fresh.
                            </p>
                        </div>
                        <!-- Decorative corner -->
                        <div
                            class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-100 to-transparent rounded-2xl transform rotate-45 translate-x-10 -translate-y-10 opacity-50">
                        </div>
                    </div>

                    <!-- Card 2: Metode Pembayaran -->
                    <div data-aos="fade-up" data-aos-delay="200"
                        class="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-green-200">
                        <div
                            class="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                        </div>

                        <div class="relative z-10 mb-6">
                            <div
                                class="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z">
                                    </path>
                                </svg>
                            </div>
                        </div>

                        <div class="relative z-10 text-center">
                            <h4
                                class="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors duration-300">
                                Pembayaran Fleksibel
                            </h4>
                            <p class="text-gray-600 leading-relaxed">
                                QRIS, E-Wallet, dan tunai. Bayar dengan cara yang paling nyaman!
                            </p>
                        </div>
                        <div
                            class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-100 to-transparent rounded-2xl transform rotate-45 translate-x-10 -translate-y-10 opacity-50">
                        </div>
                    </div>

                    <!-- Card 3: Rasa Otentik -->
                    <div data-aos="fade-up" data-aos-delay="300"
                        class="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-red-200">
                        <div
                            class="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                        </div>

                        <div class="relative z-10 mb-6">
                            <div
                                class="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center mx-auto transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                                    </path>
                                </svg>
                            </div>
                        </div>

                        <div class="relative z-10 text-center">
                            <h4
                                class="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors duration-300">
                                Rasa Otentik Bandung
                            </h4>
                            <p class="text-gray-600 leading-relaxed">
                                Seblak dengan racikan bumbu khas yang bikin ketagihan setiap
                                suapannya.
                            </p>
                        </div>
                        <div
                            class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-100 to-transparent rounded-2xl transform rotate-45 translate-x-10 -translate-y-10 opacity-50">
                        </div>
                    </div>

                    <!-- Card 4: Promo & Kupon -->
                    <div data-aos="fade-up" data-aos-delay="400"
                        class="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-purple-200">
                        <div
                            class="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                        </div>

                        <div class="relative z-10 mb-6">
                            <div
                                class="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7">
                                    </path>
                                </svg>
                            </div>
                        </div>

                        <div class="relative z-10 text-center">
                            <h4
                                class="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                                Promo & Kupon Menarik
                            </h4>
                            <p class="text-gray-600 leading-relaxed">
                                Dapatkan diskon spesial dan hadiah menarik setiap minggunya!
                            </p>
                        </div>
                        <div
                            class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-100 to-transparent rounded-2xl transform rotate-45 translate-x-10 -translate-y-10 opacity-50">
                        </div>
                    </div>
                </div>

                <!-- Bottom CTA Section -->
                <div class="text-center mt-16">
                    <div
                        class="inline-flex items-center space-x-4 bg-white px-8 py-4 rounded-full shadow-lg border border-gray-100">
                        <span class="text-gray-600">Siap merasakan pengalaman terbaik?</span>
                        <button
                            class="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-md">
                            Pesan Sekarang
                        </button>
                    </div>
                </div>
            </div>
        </section>
        <section class="relative py-24 bg-gradient-to-br from-orange-50 via-white to-yellow-50 overflow-hidden">
            <div class="absolute inset-0 opacity-10">
                <div
                    class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-300 to-yellow-300 rounded-full mix-blend-multiply filter blur-2xl animate-pulse">
                </div>
                <div
                    class="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-200 to-red-200 rounded-full mix-blend-multiply filter blur-2xl animate-pulse animation-delay-2000">
                </div>
            </div>
            <div class="absolute top-20 left-10 w-8 h-8 bg-orange-300 rounded-full animate-bounce opacity-20"></div>
            <div
                class="absolute top-32 right-20 w-6 h-6 bg-yellow-400 rounded-full animate-bounce opacity-30 animation-delay-1000">
            </div>
            <div
                class="absolute bottom-40 right-1/3 w-4 h-4 bg-orange-400 rounded-full animate-bounce opacity-25 animation-delay-3000">
            </div>
            <div class="relative max-w-7xl mx-auto px-6">
                <div class="text-center mb-16">
                    <div
                        class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-600 rounded-full text-sm font-semibold mb-6 border border-orange-200">
                        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                                clip-rule="evenodd"></path>
                        </svg>
                        Limited Time Offers
                    </div>
                    <h2 class="text-5xl md:text-6xl font-bold mb-6">
                        <span
                            class="bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">Promo
                            & Kupon</span><br>
                        <span class="text-gray-800">Spesial</span>
                    </h2>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">Hemat lebih banyak dengan kupon
                        eksklusif kami! Cukup klik untuk copy kode dan nikmati promo menarik</p>
                    <div class="flex justify-center items-center space-x-8 text-sm text-gray-500">
                        <div class="flex items-center">
                            <svg class="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            Valid until end of month
                        </div>
                        <div class="flex items-center">
                            <svg class="w-4 h-4 mr-1 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z">
                                </path>
                            </svg>
                            {{ promos.length }}+ exclusive offers
                        </div>
                    </div>
                </div>
                <div class="relative">
                    <div
                        class="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-gray-100 lg:hidden">
                        <svg class="w-2 h-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7">
                            </path>
                        </svg>
                    </div>
                    <div class="flex space-x-6 overflow-x-auto scrollbar-hide px-1 pb-6 scroll-smooth" id="promo-container">
                        <div v-for="(promo, index) in promos" :key="index" data-aos="fade-up"
                            :data-aos-delay="100 + (index * 10)" class="group relative min-w-[320px] flex-shrink-0 mt-5">
                            <div
                                class="relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-2 border border-gray-100 group-hover:border-orange-200">
                                <div
                                    class="relative h-[30px] bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 overflow-hidden">
                                    <div class="absolute inset-0 opacity-30">
                                        <svg class="w-full h-[70px]" viewBox="0 0 100 100" fill="none">
                                            <defs>
                                                <pattern :id="`promo-pattern-${index}`" x="0" y="0" width="20" height="20"
                                                    patternUnits="userSpaceOnUse">
                                                    <circle cx="10" cy="10" r="1.5" fill="white" />
                                                </pattern>
                                            </defs>
                                            <rect width="100" height="20" :fill="`url(#promo-pattern-${index})`" />
                                        </svg>
                                    </div>
                                    <div class="absolute bottom-4 left-6">
                                        <div
                                            class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="..."></path>
                                                <path d="..."></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div class="p-6">
                                    <div v-if="copiedIndex === index"
                                        class="absolute top-4 left-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg flex items-center justify-center z-40">
                                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="..." clip-rule="evenodd"></path>
                                        </svg>
                                        Copied Successfully!
                                    </div>
                                    <h4
                                        class="text-2xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                                        {{ promo.title }}</h4>
                                    <p class="text-gray-600 mb-6 leading-relaxed">{{ promo.description }}</p>
                                    <div
                                        class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4 border border-gray-200">
                                        <p class="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Promo Code
                                        </p>
                                        <div
                                            class="flex items-center justify-between bg-white rounded-xl p-3 border-2 border-dashed border-orange-200 group-hover:border-orange-400 transition-colors duration-300">
                                            <span class="font-mono font-bold text-orange-600 text-lg">{{ promo.code
                                            }}</span>
                                            <button @click="copyCode(promo.code, index)"
                                                class="group/btn bg-orange-500 hover:bg-orange-600 cursor-pointer text-white p-2 rounded-lg transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                    class="w-5 h-5 size-6 group-hover/btn:scale-110 transition-transform duration-200"
                                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="mt-4 pt-4 border-t border-gray-100">
                                        <p class="text-xs text-gray-500 flex items-center">
                                            <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="..." clip-rule="evenodd"></path>
                                            </svg>
                                            Valid until {{ promo.validUntil || 'end of month' }}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    class="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-gray-100 lg:hidden">
                        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </div>
                </div>
                <div class="text-center mt-16">
                    <div
                        class="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 text-white shadow-2xl max-w-2xl mx-auto relative overflow-hidden">
                        <div class="absolute inset-0 opacity-20">
                            <svg class="w-full h-full" viewBox="0 0 100 100" fill="none">
                                <defs>
                                    <pattern id="cta-pattern" x="0" y="0" width="20" height="20"
                                        patternUnits="userSpaceOnUse">
                                        <circle cx="10" cy="10" r="1" fill="white" />
                                    </pattern>
                                </defs>
                                <rect width="100" height="100" fill="url(#cta-pattern)" />
                            </svg>
                        </div>
                        <div class="relative z-10">
                            <h3 class="text-2xl font-bold mb-4">🎉 Jangan Sampai Terlewat!</h3>
                            <p class="mb-6 opacity-90">Promo terbatas! Gunakan kode kupon sekarang dan nikmati kelezatan
                                seblak dengan harga spesial.</p>
                            <button
                                class="bg-white text-orange-600 font-bold py-3 px-8 rounded-full hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg">Pesan
                                Sekarang</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-20 bg-gradient-to-b from-gray-50 to-white" id="metode-pembayaran">
            <div class="max-w-6xl mx-auto px-6">
                <div class="text-center mb-16">
                    <div
                        class="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-6">
                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9z">
                            </path>
                        </svg>
                        Secure Payment
                    </div>
                    <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Metode <span
                            class="text-orange-600">Pembayaran</span></h2>
                    <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">Pilih cara pembayaran yang paling
                        nyaman untuk Anda. Aman, cepat, dan terpercaya.</p>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div class="group bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
                        data-aos="fade-up" data-aos-delay="100">
                        <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-6 relative">
                            <div
                                class="absolute top-3 right-3 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full">
                                POPULER</div>
                            <div class="flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z">
                                    </path>
                                </svg>
                            </div>
                            <h3 class="text-2xl font-bold text-white">QRIS Payment</h3>
                        </div>
                        <div class="p-6">
                            <div class="flex justify-center mb-6">
                                <div class="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center">
                                    <img src="/images/qris-logo.svg" alt="QRIS" class="h-12 object-contain" />
                                </div>
                            </div>
                            <p class="text-gray-600 mb-6 leading-relaxed">Pembayaran instant melalui aplikasi dompet digital
                                seperti DANA, OVO, GoPay, ShopeePay dan lainnya.</p>
                            <div class="mb-6">
                                <p class="text-sm font-medium text-gray-500 mb-3">Didukung oleh:</p>
                                <div class="flex space-x-2">
                                    <span
                                        class="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">DANA</span>
                                    <span
                                        class="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">OVO</span>
                                    <span
                                        class="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">GoPay</span>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <div class="flex items-center text-sm text-gray-600"><svg
                                        class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>Pembayaran instan</div>
                                <div class="flex items-center text-sm text-gray-600"><svg
                                        class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>Tanpa biaya admin</div>
                            </div>
                        </div>
                    </div>
                    <div class="group bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
                        data-aos="fade-up" data-aos-delay="200">
                        <div class="bg-gradient-to-r from-orange-500 to-orange-600 p-6 relative">
                            <div
                                class="absolute top-3 right-3 bg-green-400 text-white text-xs font-bold px-2 py-1 rounded-full">
                                MUDAH</div>
                            <div class="flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z">
                                    </path>
                                </svg>
                            </div>
                            <h3 class="text-2xl font-bold text-white">BomBom Wallet</h3>
                        </div>
                        <div class="p-6">
                            <div class="flex justify-center mb-6">
                                <div class="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center">
                                    <img src="/images/bombom-wallet-logo.svg" alt="BomBom Wallet"
                                        class="h-12 object-contain" />
                                </div>
                            </div>
                            <p class="text-gray-600 mb-6 leading-relaxed">Sistem pembayaran eksklusif kami. Bayar langsung
                                saat pesanan diantar. Praktis dan tanpa ribet!</p>
                            <div class="mb-6">
                                <p class="text-sm font-medium text-gray-500 mb-3">Cara kerja:</p>
                                <div class="space-y-2 text-sm text-gray-600">
                                    <div class="flex items-center"><span
                                            class="w-5 h-5 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold mr-2">1</span>Pesan
                                        makanan</div>
                                    <div class="flex items-center"><span
                                            class="w-5 h-5 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold mr-2">2</span>Kurir
                                        datang</div>
                                    <div class="flex items-center"><span
                                            class="w-5 h-5 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold mr-2">3</span>Bayar
                                        langsung</div>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <div class="flex items-center text-sm text-gray-600"><svg
                                        class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>Cash on delivery</div>
                                <div class="flex items-center text-sm text-gray-600"><svg
                                        class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>Tidak perlu aplikasi</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center mt-12">
                    <div
                        class="inline-flex items-center space-x-6 bg-white px-6 py-4 rounded-2xl shadow-md border border-gray-100">
                        <div class="flex items-center text-sm text-gray-600"><svg class="w-5 h-5 text-green-500 mr-2"
                                fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clip-rule="evenodd"></path>
                            </svg>100% Aman</div>
                        <div class="w-px h-6 bg-gray-300"></div>
                        <div class="flex items-center text-sm text-gray-600"><svg class="w-5 h-5 text-blue-500 mr-2"
                                fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                    clip-rule="evenodd"></path>
                            </svg>Proses Cepat</div>
                        <div class="w-px h-6 bg-gray-300"></div>
                        <div class="flex items-center text-sm text-gray-600"><svg class="w-5 h-5 text-orange-500 mr-2"
                                fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>Mudah Digunakan</div>
                    </div>
                </div>
            </div>
        </section>

        <section class="bg-gradient-to-br from-orange-100 to-orange-200 py-20 px-4">
            <div class="max-w-6xl mx-auto">
                <!-- Header Section -->
                <div class="text-center mb-16">
                    <h2 class="text-4xl md:text-5xl font-bold text-orange-600 mb-4">
                        What Our Customers Say
                    </h2>
                    <p class="text-orange-700/70 text-lg max-w-2xl mx-auto">
                        Real experiences from real customers who love our products
                    </p>
                </div>

                <!-- Testimonial Cards -->
                <div class="max-w-5xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden">
                    <div class="swiper-2 w-full">
                        <div class="swiper-wrapper">
                            <div v-for="(comment, index) in comments" :key="index" class="swiper-slide">
                                <div class="flex flex-col md:flex-row items-center md:items-stretch min-h-[400px]">
                                    <!-- Left Side: Avatar Section (35%) -->
                                    <div
                                        class="w-full md:w-[35%] bg-gradient-to-br from-orange-400 to-orange-600 p-8 flex flex-col justify-center items-center text-center relative">
                                        <!-- Decorative elements -->
                                        <div class="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full"></div>
                                        <div class="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full"></div>

                                        <!-- Avatar -->
                                        <div class="relative mb-6">
                                            <div
                                                class="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                                                <img :src="comment.avatar" alt="Avatar"
                                                    class="w-full h-full object-cover" />
                                            </div>
                                            <!-- Online indicator -->
                                            <div
                                                class="absolute bottom-2 right-2 w-6 h-6 bg-green-400 rounded-full border-4 border-white">
                                            </div>
                                        </div>

                                        <!-- Customer Info -->
                                        <h3 class="text-white font-bold text-xl mb-2">
                                            {{ comment.name }}
                                        </h3>
                                        <p class="text-orange-100 text-sm font-medium mb-4">
                                            {{ comment.role || "Verified Customer" }}
                                        </p>

                                        <!-- Rating Stars -->
                                        <div class="flex justify-center space-x-1">
                                            <template v-for="n in 5" :key="n">
                                                <svg :class="n <= comment.rating
                                                    ? 'text-yellow-300'
                                                    : 'text-orange-200'
                                                    " class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20">
                                                    <path
                                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.963a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.378 2.455a1 1 0 00-.364 1.118l1.287 3.963c.3.92-.755 1.688-1.538 1.118l-3.379-2.455a1 1 0 00-1.175 0l-3.379 2.455c-.782.57-1.837-.197-1.538-1.118l1.287-3.963a1 1 0 00-.364-1.118L2.05 9.39c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69l1.286-3.963z" />
                                                </svg>
                                            </template>
                                        </div>
                                    </div>

                                    <!-- Right Side: Review Content (65%) -->
                                    <div
                                        class="w-full md:w-[65%] p-8 md:p-12 bg-white relative flex flex-col justify-center">
                                        <!-- Quote Icon -->
                                        <div class="absolute top-6 left-6 text-6xl text-orange-200 font-serif leading-none">
                                            "
                                        </div>

                                        <!-- Review Text -->
                                        <div class="relative z-10 pt-8">
                                            <h4 class="text-2xl font-bold text-gray-800 mb-6">
                                                Amazing Experience!
                                            </h4>

                                            <p class="text-gray-600 text-lg leading-relaxed mb-8 italic">
                                                {{ comment.message }}
                                            </p>

                                            <!-- Date and additional info -->
                                            <div class="flex items-center justify-between pt-6 border-t border-gray-100">
                                                <p class="text-sm text-gray-400">
                                                    {{ comment.date }}
                                                </p>
                                                <div class="flex items-center space-x-2 text-sm text-green-600">
                                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fill-rule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clip-rule="evenodd"></path>
                                                    </svg>
                                                    <span>Verified Purchase</span>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Quote closing -->
                                        <div
                                            class="absolute bottom-6 right-6 text-6xl text-orange-200 font-serif leading-none rotate-180">
                                            "
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Navigation -->
                <div class="swiper-pagination-2 text-center mt-10"></div>

                <!-- CTA Section -->
                <div class="text-center mt-16">
                    <p class="text-orange-700 mb-6">
                        Join thousands of satisfied customers
                    </p>
                    <button
                        class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-sm cursor-pointer transition duration-300 transform hover:scale-105 shadow-lg">
                        Shop Now
                    </button>
                </div>
            </div>
        </section>
        <section class="bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-4">
            <div class="max-w-7xl mx-auto">
                <!-- Header Section -->
                <div class="text-center mb-16">
                    <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Visit Our Store
                    </h2>
                    <p class="text-gray-600 text-lg max-w-2xl mx-auto">
                        Come and experience our products firsthand at our beautiful store
                        location
                    </p>
                </div>

                <!-- Main Content -->
                <div class="grid lg:grid-cols-2 gap-12 items-start">
                    <!-- Left Side: Contact Information -->
                    <div class="space-y-8">
                        <!-- Store Info Card -->
                        <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
                            <div class="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
                                <h3 class="text-2xl font-bold text-white flex items-center">
                                    <svg class="w-7 h-7 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    Store Location
                                </h3>
                            </div>

                            <div class="p-6 space-y-6">
                                <!-- Address -->
                                <div class="flex items-start space-x-4">
                                    <div
                                        class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                                            </path>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 class="font-semibold text-gray-800 mb-1">
                                            Our Address
                                        </h4>
                                        <p class="text-gray-600 leading-relaxed">
                                            Jl. Merdeka No. 123<br />
                                            Kelurahan Sukamaju<br />
                                            Jakarta Pusat, 10110<br />
                                            Indonesia
                                        </p>
                                    </div>
                                </div>

                                <!-- Phone -->
                                <div class="flex items-start space-x-4">
                                    <div
                                        class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                                            </path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 class="font-semibold text-gray-800 mb-1">
                                            Phone Number
                                        </h4>
                                        <p class="text-gray-600">+62 21 1234 5678</p>
                                        <p class="text-gray-600">+62 812 3456 7890</p>
                                    </div>
                                </div>

                                <!-- Email -->
                                <div class="flex items-start space-x-4">
                                    <div
                                        class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                                            </path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 class="font-semibold text-gray-800 mb-1">
                                            Email Address
                                        </h4>
                                        <p class="text-gray-600">info@yourstore.com</p>
                                        <p class="text-gray-600">support@yourstore.com</p>
                                    </div>
                                </div>

                                <!-- Operating Hours -->
                                <div class="flex items-start space-x-4">
                                    <div
                                        class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 class="font-semibold text-gray-800 mb-2">
                                            Operating Hours
                                        </h4>
                                        <div class="space-y-1 text-sm">
                                            <div class="flex justify-between">
                                                <span class="text-gray-600">Monday - Friday</span>
                                                <span class="font-medium text-gray-800">09:00 - 21:00</span>
                                            </div>
                                            <div class="flex justify-between">
                                                <span class="text-gray-600">Saturday</span>
                                                <span class="font-medium text-gray-800">09:00 - 22:00</span>
                                            </div>
                                            <div class="flex justify-between">
                                                <span class="text-gray-600">Sunday</span>
                                                <span class="font-medium text-gray-800">10:00 - 20:00</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Quick Actions -->
                        <div class="grid grid-cols-2 gap-4">
                            <a href="tel:+6221123456789"
                                class="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-xl transition duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z">
                                    </path>
                                </svg>
                                <span>Call Now</span>
                            </a>

                            <a href="https://wa.me/6281234567890" target="_blank"
                                class="bg-green-400 hover:bg-green-500 text-white font-semibold py-4 px-6 rounded-xl transition duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                </svg>
                                <span>WhatsApp</span>
                            </a>
                        </div>
                    </div>

                    <!-- Right Side: Google Maps -->
                    <div class="lg:sticky lg:top-8">
                        <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
                            <div class="bg-gradient-to-r from-orange-500 to-orange-600 p-4">
                                <h3 class="text-xl font-bold text-white flex items-center">
                                    <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    Find Us on Map
                                </h3>
                            </div>

                            <!-- Google Maps Embed -->
                            <div class="relative">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8317128!3d-6.1951128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f42e1fc53c9d%3A0x4b2c3a7b6e8f5d1a!2sMonas%2C%20Jakarta!5e0!3m2!1sen!2sid!4v1234567890"
                                    width="100%" height="400" style="border: 0" allowfullscreen="" loading="lazy"
                                    referrerpolicy="no-referrer-when-downgrade" class="w-full">
                                </iframe>

                                <!-- Overlay with directions button -->
                                <div class="absolute bottom-4 right-4">
                                    <a href="https://goo.gl/maps/YOUR_LOCATION_LINK" target="_blank"
                                        class="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 flex items-center space-x-2">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7">
                                            </path>
                                        </svg>
                                        <span class="text-sm">Get Directions</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <!-- Additional Info Card -->
                        <div class="mt-6 bg-orange-50 border border-orange-200 rounded-xl p-6">
                            <div class="flex items-center space-x-3 mb-3">
                                <div class="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <h4 class="font-semibold text-orange-800">
                                    Parking Information
                                </h4>
                            </div>
                            <p class="text-orange-700 text-sm">
                                Free parking available for customers. Enter through the main
                                entrance and follow the signs to our designated parking area.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
definePageMeta({
    layout: "default",
    middleware: ['auth']
});

import { onMounted, ref } from "vue";
import { useHead } from "nuxt/app";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import { useUserStore } from '~/stores/user'

const appSettingStore = useAppSettingStore()

const copiedIndex = ref(null);
function copyCode(code, index) {
    navigator.clipboard.writeText(code).then(() => {
        copiedIndex.value = index;

        // Hide after 2 seconds
        setTimeout(() => {
            copiedIndex.value = null;
        }, 2000);
    });
}

const slides = [
    {
        title: "Seblak Ori",
        desc: "Cita rasa klasik yang bikin kangen, cocok untuk semua kalangan.",
    },
    {
        title: "Seblak Ceker",
        desc: "Pedasnya mantap, cekernya empuk, bikin nagih!",
    },
    {
        title: "Seblak Bombom Pedas",
        desc: "Level pedas maksimal untuk kamu pecinta tantangan!",
    },
    {
        title: "Seblak Komplit",
        desc: "Semua topping dalam satu mangkuk spesial. Porsi kenyang!",
    },
];

const activeIndex = ref(0);
const swiper = ref(null);
const currentUserStore = useUserStore()

onMounted(async () => {
    if (!currentUserStore.user) {
        await currentUserStore.fetchUser()
    }

    swiper.value = new Swiper(".swiper-1", {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        effect: "fade",
        fadeEffect: {
            crossFade: true,
        },
        speed: 1000,
        on: {
            slideChange: (swiper) => {
                activeIndex.value = swiper.realIndex;
            },
        },
    });

    new Swiper(".swiper-2", {
        loop: true,
        pagination: {
            el: ".swiper-pagination-2",
            clickable: true,
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        on: {
            init: function () {
                const bullets = document.querySelectorAll(
                    ".swiper-pagination-2 .swiper-pagination-bullet"
                );
                bullets.forEach((bullet) => {
                    bullet.classList.add("swiper-pagination-2-bullet");
                });
            },
        },
    });
});

const menus = [
    {
        title: "Seblak Ori",
        description: "Seblak klasik dengan cita rasa gurih pedas khas Bandung.",
        image: "/images/seblak-0.png",
        price: 25000,
    },
    {
        title: "Seblak Ceker",
        description: "Ceker lembut dengan kuah pedas menggoda.",
        image: "/images/seblak-1.png",
        price: 15000,
    },
    {
        title: "Seblak Bombom Pedas",
        description: "Level pedas maksimal, hanya untuk pecinta cabai sejati!",
        image: "/images/seblak-2.png",
        price: 30000,
    },
    {
        title: "Seblak Komplit",
        description: "Campuran kerupuk, bakso, sosis, makaroni, dan sayuran.",
        image: "/images/seblak-3.png",
        price: 45000,
    },
];

const promos = [
    {
        title: "Diskon 20% Hari Ini",
        description: "Berlaku untuk semua menu di atas Rp15.000",
        code: "SEBLAKHEMAT",
    },
    {
        title: "Gratis Seblak Mini",
        description: "Minimal pembelian Rp30.000, tanpa ongkir!",
        code: "MINIGRATIS",
    },
    {
        title: "Cashback 10%",
        description: "Pembayaran via QRIS e-wallet apapun",
        code: "CASHBACKQR",
    },
    {
        title: "Buy 1 Get 1",
        description: "Khusus menu Seblak Ori di hari Senin",
        code: "B1G1ORI",
    },
];

const comments = [
    {
        name: "Goo Young",
        message: "Seblaknya enak banget! Pedesnya pas, kuahnya nagih banget.",
        avatar: "images/profile-0.jpg",
        date: "Mei 2025",
    },
    {
        name: "Bae Suzy",
        message: "Order jam 10 malam masih dilayanin. Mantap! Rasa bintang lima.",
        avatar: "images/profile-1.jpg",
        date: "April 2025",
    },
    {
        name: "Bae Rona",
        message: "Langganan banget. Pake topping ceker + batagor, best combo!",
        avatar: "images/profile-2.jpg",
        date: "Maret 2025",
    },
];
</script>

<style>
.swiper-pagination-bullet-active {
    background-color: var(--color-orange-500) !important;
}

.swiper-pagination-2 .swiper-pagination-bullet {
    background-color: var(--color-orange-400) !important;
    width: 12px;
    height: 12px;
    opacity: 1;
}

.swiper-pagination-2 .swiper-pagination-bullet-active {
    background-color: var(--color-white) !important;
}

.slide-up-fade-in {
    animation: slideUpFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
    transform: translateY(20px);
}

.slide-down-fade-in {
    animation: slideDownFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
    transform: translateY(-20px);
}

.delay-200 {
    animation-delay: 0.2s;
}

.delay-400 {
    animation-delay: 0.4s;
}

.delay-600 {
    animation-delay: 0.6s;
}

@keyframes slideUpFadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideDownFadeIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* @keyframes blob {
    0% {
        transform: translate(0px, 0px) scale(1);
    }

    33% {
        transform: translate(30px, -50px) scale(1.1);
    }

    66% {
        transform: translate(-20px, 20px) scale(0.9);
    }

    100% {
        transform: translate(0px, 0px) scale(1);
    }
}

.animate-blob {
    animation: blob 7s infinite;
}

.animation-delay-2000 {
    animation-delay: 2s;
}

.animation-delay-4000 {
    animation-delay: 4s;
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-10px);
    }
}

.animation-delay-1000 {
    animation-delay: 1s;
}

.animation-delay-2000 {
    animation-delay: 2s;
}

.animation-delay-3000 {
    animation-delay: 3s;
}

/* Custom scrollbar for better aesthetics */

/* ::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #f97316, #ea580c);

    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(45deg, #ea580c, #dc2626);
} */
</style>
