<template>
    <button @click="toggleDarkMode" :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        class="relative overflow-hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 w-9 h-9 ease-in-out">
        <div class="relative w-full h-full">
            <!-- Sun icon -->
            <svg class="absolute -inset-1 w-6 h-6 m-auto text-yellow-500 transition-all duration-300"
                :class="isDark ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <!-- Moon icon -->
            <svg class="absolute inset-0 w-6 h-6 m-auto text-blue-500 transition-all duration-300"
                :class="isDark ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
        </div>
        <div class="absolute inset-0 transform transition-transform duration-300" :class="isDark ? 'scale-100' : 'scale-0'">
            <div class="absolute inset-0 bg-gray-800/10 dark:bg-blue-500/10 rounded-xl"></div>
        </div>
    </button>
</template>  
  
<script setup>
// Menggunakan composable bawaan dari Nuxt
const colorMode = useColorMode()

// Computed property untuk menentukan mode gelap
const isDark = computed(() => colorMode.value === 'dark')

// Fungsi toggle dark mode
const toggleDarkMode = () => {
    colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>