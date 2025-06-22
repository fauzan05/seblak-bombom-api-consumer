<template>
    <head>
        <Title>Register - {{ appName }}</Title>
        <Link rel="icon" type="image/x-icon" href="favicon.ico" />
    </head>
    <div class="w-full max-w-[100%] mx-auto lg:mx-0">
        <div class="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-95">
            <form class="space-y-6" @submit.prevent="handleRegister">
                <div>
                    <h1 class="text-4xl text-orange-400 mb-7">{{ currentLang === 'id' ? 'Registrasi' : 'Register' }}</h1>
                    <div v-if="error" class="bg-orange-100 my-5 border-l-4 border-orange-500 text-orange-700 p-4 rounded"
                        role="alert">
                        <p>{{ error }}</p>
                    </div>
                    <div v-if="success" class="bg-green-100 my-5 border-l-4 border-green-500 text-green-700 p-4 rounded"
                        role="alert">
                        <p>{{ success }}</p>
                    </div>
                </div>
                <!-- First Name & Last Name dalam satu row untuk desktop -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <!-- First Name Input -->
                    <div>
                        <label for="firstName" class="sr-only">{{ currentLang === 'id' ? 'Nama Depan' : 'First Name'
                        }}</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <input id="firstName" v-model="registerForm.first_name" name="firstName" type="text" required
                                class="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 transition-all duration-200"
                                :placeholder="currentLang === 'id' ? 'Nama Depan' : 'First Name'">
                        </div>
                    </div>

                    <!-- Last Name Input -->
                    <div>
                        <label for="lastName" class="sr-only">{{ currentLang === 'id' ? 'Nama Belakang' : 'Last Name'
                        }}</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <input id="lastName" v-model="registerForm.last_name" name="lastName" type="text"
                                class="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 transition-all duration-200"
                                :placeholder="currentLang === 'id' ? 'Nama Belakang' : 'Last Name'">
                        </div>
                    </div>
                </div>

                <!-- Email Input -->
                <div>
                    <label for="email" class="sr-only">Email</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                        </div>
                        <input id="email" v-model="registerForm.email" name="email" type="email" required
                            class="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 transition-all duration-200"
                            placeholder="Email">
                    </div>
                </div>

                <!-- Phone Number Input -->
                <div>
                    <label for="phoneNumber" class="sr-only">{{ currentLang === 'id' ? 'Nomor Telepon' : 'Phone Number'
                    }}</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <input id="phoneNumber" v-model="registerForm.phone" name="phoneNumber" type="tel" required
                            class="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 transition-all duration-200"
                            :placeholder="currentLang === 'id' ? 'Nomor Telepon' : 'Phone Number'">
                    </div>
                </div>

                <!-- Password Input -->
                <div>
                    <label for="password" class="sr-only">{{ currentLang === 'id' ? 'Kata Sandi' : 'Password' }}</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <input id="password" v-model="registerForm.password" name="password"
                            :type="showPassword ? 'text' : 'password'" required
                            class="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 transition-all duration-200"
                            :placeholder="currentLang === 'id' ? 'Kata Sandi' : 'Password'">
                        <button type="button" @click="showPassword = !showPassword"
                            class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
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
                </div>

                <!-- Password Confirmation Input -->
                <div>
                    <label for="passwordConfirmation" class="sr-only">{{ currentLang === 'id' ? 'Konfirmasi Password' :
                        'Password Confirmation' }}</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <input id="passwordConfirmation" v-model="registerForm.password_confirmation"
                            name="passwordConfirmation" :type="showPasswordConfirmation ? 'text' : 'password'" required
                            class="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 transition-all duration-200"
                            :placeholder="currentLang === 'id' ? 'Konfirmasi Password' : 'Password Confirmation'">
                        <button type="button" @click="showPasswordConfirmation = !showPasswordConfirmation"
                            class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer z-20">
                            <svg v-if="!showPasswordConfirmation" class="h-5 w-5 text-gray-400 z-20" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
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
                </div>

                <!-- Terms and Conditions -->
                <div class="flex items-center">
                    <input @click="registerForm.agreeTerms = !registerForm.agreeTerms" id="agreeTerms"
                        v-model="registerForm.agreeTerms" name="agreeTerms" type="checkbox" required
                        class="h-4 w-4 accent-orange-500 focus:ring-orange-500 border-gray-300 rounded">
                    <label for="agreeTerms" class="ml-2 block text-sm text-gray-700">
                        {{ currentLang === 'id' ? 'Saya setuju dengan' : 'I agree with' }}
                        <NuxtLink to="/terms" class="text-orange-500 hover:text-orange-600">
                            {{ currentLang === 'id' ? 'syarat dan ketentuan' : 'terms and conditions' }}
                        </NuxtLink>
                    </label>
                </div>

                <!-- Register Button -->
                <div>
                    <button type="submit" :disabled="loading"
                        class="group relative cursor-pointer w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105">
                        <span v-if="!loading">{{ currentLang === 'id' ? 'Daftar Sekarang' : 'Register Now' }}</span>
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

                <!-- Login Link -->
                <div class="text-center">
                    <p class="text-sm text-gray-600">
                        {{ currentLang === 'id' ? 'Sudah punya akun?' : 'Already have an account?' }}
                        <NuxtLink to="/auth/login"
                            class="font-medium text-orange-500 hover:text-orange-600 transition-colors duration-200">
                            {{ currentLang === 'id' ? 'Masuk disini' : 'Login here' }}
                        </NuxtLink>
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>
  
<script setup>
definePageMeta({
    layout: 'auth'
})

import { ref, onMounted } from "vue";
const currentLang = useState('lang')
const config = useRuntimeConfig()
const apiUrl = config.public.apiUrl
const appSettingStore = useAppSettingStore()
await appSettingStore.fetchSettings()
const appSetting = ref(null)

const appName = computed(() =>
    appSettingStore.settings?.data?.app_name || 'Untitled App'
)

const faviconUrl = computed(() =>
    appSettingStore.settings?.data?.logo_filename
        ? `${apiUrl}/image/application/${appSettingStore.settings.data.logo_filename}`
        : '/favicon.ico'
)

// Meta tags
useHead({
    title: () => `Register - ${appName.value}`,
    meta: [
        { name: 'description', content: 'Daftar di Warung Seblak Mantap untuk menikmati seblak terbaik' }
    ],
    link: [
        {
            rel: 'icon',
            type: 'image/png',
            href: () => faviconUrl.value
        },
        {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: () => faviconUrl.value
        }
    ],
})

// Reactive data
const registerForm = ref({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    agreeTerms: false
})

const showPassword = ref(false)
const showPasswordConfirmation = ref(false)
const loading = ref(false)
const error = ref(null)
const success = ref(null)

// Methods
const handleRegister = async () => {
    loading.value = true
    error.value = null
    success.value = null

    try {
        // Validasi password
        if (registerForm.value.password !== registerForm.value.password_confirmation) {
            error.value = 'Password confirmation does not match the password entered.'
            if (currentLang.value === 'id') {
                error.value = 'Konfirmasi password tidak sesuai dengan password yang dimasukkan.'
            }
            return
        }

        await $fetch(`/users/register?lang=${currentLang.value}`, {
            method: 'POST',
            body: registerForm.value,
            credentials: 'include', // untuk withCredentials:true seperti di axios
            baseURL: apiUrl // opsional, jika kamu pakai apiUrl global
        })

        success.value = `Registration successful. Please check your email ${registerForm.value.email} for verification.`
        if (currentLang.value === 'id') {
            success.value = `Registrasi berhasil. Silakan cek email ${registerForm.value.email} untuk verifikasi.`
        }

    } catch (err) {
        console.error('Registration error:', err)

        if (err?.response?.status === 409 || err?.status === 409) {
            error.value = 'Email already in use, please use another email address.'
            if (currentLang.value === 'id') {
                error.value = 'Email sudah digunakan, tolong gunakan alamat email yang lain.'
            }
            return
        }

        if (err?.response?._data?.errors || err?.status === 400) {
            error.value = err.response._data.errors || 'Invalid input'
            return
        }

        error.value = 'Internal server error 500'

    } finally {
        loading.value = false
    }
}

onMounted(() => {
    if (appSettingStore.settings && appSettingStore.settings.data) {
        appSetting.value = appSettingStore.settings.data
    }
    // Auto focus ke input email saat component dimount
    document.getElementById('first_name')?.focus()
})
</script>
  
<style scoped>
/* Custom animations yang sama seperti login page */
@keyframes float {

    0%,
    100% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-10px);
    }
}

.animate-float {
    animation: float 6s ease-in-out infinite;
}
</style>