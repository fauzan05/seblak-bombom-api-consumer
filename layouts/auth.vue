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

    <div v-if="!loading"
        class="relative max-h-max overflow-y-auto w-full min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex flex-col items-center justify-between px-4 sm:px-6 lg:px-8 py-12">
        <!-- Background Pattern -->
        <div class="absolute inset-0 -z-10 overflow-hidden">
            <div
                class="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse">
            </div>
            <div
                class="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse">
            </div>
        </div>
        <!-- Language Toggle Switch -->
        <div class="flex justify-end w-full max-w-6xl mb-4 px-2">
            <label class="inline-flex items-center cursor-pointer">
                <span class="mr-3 text-sm font-medium text-gray-700">🇮🇩 ID</span>
                <div class="relative">
                    <input type="checkbox" class="sr-only peer" :checked="currentLang === 'en'" @change="toggleLang" />
                    <div
                        class="w-11 h-6 bg-white border border-orange-500 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500 rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-orange-500 after:border-orange-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all">
                    </div>
                </div>
                <span class="ml-3 text-sm font-medium text-gray-700">EN 🇺🇸</span>
            </label>
        </div>

        <!-- Container utama dengan responsive layout -->
        <div class="w-full max-w-6xl relative z-10 h-full flex justify-center items-center">
            <!-- class="max-h-[80vh] overflow-y-auto w-full relative" -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

                <!-- Left Side - Header & Info (Desktop) / Top (Mobile) -->
                <div class="text-center lg:text-left space-y-6">
                    <div class="flex justify-center lg:justify-start">
                        <div class="h-20 w-20 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                            <img v-if="logoUrl" :src="logoUrl" alt="Logo Seblak" />
                        </div>
                    </div>

                    <div>
                        <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            {{ currentLang === 'id' ? 'Bergabung dengan' : 'Join' }}
                            <span class="text-orange-500">{{ data.app_name != null ? data.app_name : "" }}</span>
                        </h2>
                        <p class="text-xl text-gray-600 mb-6">{{ currentLang === 'id' ? 'Daftar sekarang dan nikmati seblak terbaik' : 'Register now and enjoy the best seblak' }}!</p>

                        <!-- Benefits List (Desktop only) -->
                        <div class="hidden lg:block space-y-4 text-left">
                            <div class="flex items-center space-x-3">
                                <div class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <span class="text-gray-700">{{ currentLang === 'id' ? 'Seblak dengan cita rasa autentik' : 'Seblak with authentic taste' }}</span>
                            </div>
                            <div class="flex items-center space-x-3">
                                <div class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <span class="text-gray-700">{{ currentLang === 'id' ? 'Promo dan diskon khusus member' : 'Special member promotions and discounts' }}</span>
                            </div>
                            <div class="flex items-center space-x-3">
                                <div class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <span class="text-gray-700">{{ currentLang === 'id' ? 'Notifikasi menu terbaru' : 'Latest menu notification' }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <slot />
                </div>
            </div>
        </div>
        <!-- Footer -->
        <div class="text-center text-sm text-gray-500 mt-20">
            <p>&copy; {{ yearNow }} {{ data.app_name != null ? data.app_name : "" }}. All rights reserved.</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
const config = useRuntimeConfig()
const apiUrl = config.public.apiUrl

const { $axios } = useNuxtApp()
const data = ref(null)
const loading = ref(true)
const error = ref('')
const logoUrl = ref('')

onMounted(async () => {
    try {
        const res = await $axios.get('/applications')
        data.value = res.data.data
        logoUrl.value = `${apiUrl}/image/application/${data.value.logo_filename}`
        useState('appSetting', () => data.value)
    } catch (err) {
        error.value = err.message || 'Error Unknown'
    } finally {
        setTimeout(() => {
            loading.value = false
        }, 300)
    }
})

const yearNow = new Date().getFullYear()

const currentLang = useState('lang', () => 'id') // default ke Bahasa Indonesia

function toggleLang() {
    currentLang.value = currentLang.value === 'id' ? 'en' : 'id'
}

</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.animate-fade-in-up {
    animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
