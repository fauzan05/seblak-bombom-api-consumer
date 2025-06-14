<template>
    <div
        class="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <!-- Background Pattern -->
        <div class="absolute inset-0 overflow-hidden">
            <div
                class="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse">
            </div>
            <div
                class="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse">
            </div>
        </div>

        <!-- Container utama dengan responsive layout -->
        <div class="w-full max-w-6xl relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

                <!-- Left Side - Header & Info (Desktop) / Top (Mobile) -->
                <div class="text-center lg:text-left space-y-6">
                    <div class="flex justify-center lg:justify-start">
                        <div class="h-20 w-20 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                            <svg class="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                    </div>

                    <div>
                        <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Bergabung dengan
                            <span class="text-orange-500">Warung Seblak</span>
                        </h2>
                        <p class="text-xl text-gray-600 mb-6">Daftar sekarang dan nikmati seblak terbaik!</p>

                        <!-- Benefits List (Desktop only) -->
                        <div class="hidden lg:block space-y-4 text-left">
                            <div class="flex items-center space-x-3">
                                <div class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <span class="text-gray-700">Seblak dengan cita rasa autentik</span>
                            </div>
                            <div class="flex items-center space-x-3">
                                <div class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <span class="text-gray-700">Promo dan diskon khusus member</span>
                            </div>
                            <div class="flex items-center space-x-3">
                                <div class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <span class="text-gray-700">Notifikasi menu terbaru</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <slot />
                </div>
            </div>

            <!-- Footer -->
            <div class="text-center text-sm text-gray-500 mt-8">
                <p>&copy; 2024 Warung Seblak Mantap. All rights reserved.</p>
            </div>
        </div>
    </div>
</template>
