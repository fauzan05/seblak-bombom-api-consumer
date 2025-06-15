<template>
    <div class="w-full max-w-md mx-auto lg:mx-0">
        <div class="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-95">
            <form class="space-y-6" @submit.prevent="handleLogin">
                <!-- Email Input -->
                <div>
                    <h1 class="text-4xl text-orange-400 mb-7">{{ currentLang === 'id' ? 'Masuk' : 'Login' }}</h1>
                    <div v-if="error" class="bg-orange-100 my-5 border-l-4 border-orange-500 text-orange-700 p-4 rounded"
                        role="alert">
                        <p>{{ error }}</p>
                    </div>

                    <label for="email" class="sr-only">Email</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <input id="email" v-model="loginForm.email" name="email" type="text" required
                            class="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 transition-all duration-200"
                            placeholder="Email" />
                    </div>
                </div>

                <!-- Password Input -->
                <label for="password" class="sr-only">{{ currentLang === 'id' ? 'Kata Sandi' : 'Password' }}</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <input id="password" v-model="loginForm.password" name="password"
                        :type="showPassword ? 'text' : 'password'" required
                        class="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 transition-all duration-200"
                        :placeholder="currentLang === 'id' ? 'Kata Sandi' : 'Password'" />
                    <button type="button" @click="showPassword = !showPassword"
                        class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer z-20">
                        <svg v-if="!showPassword" class="h-5 w-5 text-gray-400 z-20" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <svg v-else class="h-5 w-5 text-gray-400 z-20" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                    </button>
                </div>

                <!-- Remember Me & Forgot Password -->
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <input @click="loginForm.remember = !loginForm.remember" type="checkbox"
                            v-model="loginForm.remember"
                            class="h-4 w-4 accent-orange-500 focus:ring-orange-500 border-gray-300 rounded" />
                        <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                            {{ currentLang === 'id' ? 'Ingat saya' : 'Remember me' }}
                        </label>
                    </div>

                    <div class="text-sm">
                        <NuxtLink to="/forgot-password"
                            class="font-medium text-orange-500 hover:text-orange-600 transition-colors duration-200">
                            {{ currentLang === 'id' ? 'Lupa password?' : 'Forget password?' }}
                        </NuxtLink>
                    </div>
                </div>

                <!-- Login Button -->
                <div>
                    <button type="submit" :disabled="loading"
                        class="group cursor-pointer relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105">
                        <span v-if="!loading">{{ currentLang === 'id' ? 'Masuk' : 'Login' }}</span>
                        <span v-else class="flex items-center">
                            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                                </circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            {{ currentLang === 'id' ? 'Memproses...' : 'Processing...' }}
                        </span>
                    </button>
                </div>

                <!-- Divider -->
                <div class="relative">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-300" />
                    </div>
                    <div class="relative flex justify-center text-sm">
                        <span class="px-2 bg-white text-gray-500">{{ currentLang === 'id' ? 'atau' : 'or' }}</span>
                    </div>
                </div>

                <!-- Register Link -->
                <div class="text-center">
                    <p class="text-sm text-gray-600">
                        {{ currentLang === 'id' ? 'Belum punya akun?' : `Don't have an account yet?` }}
                        <NuxtLink to="/auth/register"
                            class="font-medium text-orange-500 hover:text-orange-600 transition-colors duration-200">
                            {{ currentLang === 'id' ? 'Daftar Sekarang' : 'Register Now' }}
                        </NuxtLink>
                    </p>
                </div>
                <div class="text-center">
                    <p class="text-sm text-gray-600">
                        <NuxtLink to="/home"
                            class="font-medium text-orange-500 hover:text-orange-600 transition-colors duration-200">
                            {{ currentLang === 'id' ? 'Kembali ke halaman utama' : 'Back to main page' }}
                        </NuxtLink>
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import Pusher from "pusher-js";
import { ref, onMounted } from "vue";
const { $axios } = useNuxtApp()
const router = useRouter()

definePageMeta({
    layout: "auth",
});
const appSetting = useState('appSetting')
const currentLang = useState('lang')

// Meta tags
useHead({
    title: `Login - ${appSetting.value.app_name}`,
    meta: [
        {
            name: "description",
            content: "Login ke Warung Seblak Mantap untuk menikmati seblak terbaik",
        },
    ],
});

// Reactive data
const loginForm = ref({
    email: "",
    password: "",
    remember: false,
});
const error = ref('')

const showPassword = ref(false);
const loading = ref(false);
const data = ref(null)

// Methods
const handleLogin = async () => {
    loading.value = true
    error.value = null

    try {
        const res = await $axios.post('/users/login', loginForm.value, {
            withCredentials: true
        })

        data.value = res.data.data
        if (data.value.role === 'admin') {
            router.push('/admin/dashboard')
        } else {
            router.push('/')
        }
    } catch (err) {
        if (err.status !== 500) {
            error.value = 'The email or password you entered does not match. Please check again.'
            if (currentLang.value === 'id') {
                error.value = 'Email atau password yang kamu masukkan tidak cocok. Silakan periksa kembali.'
            }
            return
        }
        error.value = 'Internal server error 500'
    } finally {
        loading.value = false
    }
}


var pusher = null;

// Lifecycle
// onMounted(() => {
//     pusher = new Pusher("cf5b4709d689d1228001", {
//         // Bukan 'rahasia'
//         cluster: "ap1",
//         // Tambahkan untuk debugging
//         enabledTransports: ["ws", "wss"],
//         forceTLS: true,
//     });

//     // Event untuk debugging koneksi
//     pusher.connection.bind("connected", () => {
//         console.log("Pusher Connected!");
//     });

//     pusher.connection.bind("error", (err) => {
//         console.error("Pusher Connection Error:", err);
//     });

//     const channel = pusher.subscribe("seblak_bombom_api_channel");
//     // Event saat berhasil subscribe
//     channel.bind("pusher:subscription_succeeded", () => {
//         console.log("Successfully subscribed to channel!");
//     });

//     // Event saat error subscribe
//     channel.bind("pusher:subscription_error", (status) => {
//         console.error("Subscription error:", status);
//     });

//     channel.bind("event_testing1", (data) => {
//         console.log("DATANYA : ", data.message);
//     });
// });

// Jangan lupa cleanup saat component unmount
onUnmounted(() => {
    // if (pusher) {
    //     pusher.unsubscribe("seblak_bombom_api_channel");

    //     pusher.disconnect();
    // }
    document.body.style.overflow = "";
});
</script>
<style scoped>
/* Modal Fade Animation */
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}

/* Modal Scale Animation */
.modal-scale-enter-active {
    transition: all 0.3s ease;
}

.modal-scale-leave-active {
    transition: all 0.2s ease;
}

.modal-scale-enter-from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
}

.modal-scale-leave-to {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
}

/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}
</style>
