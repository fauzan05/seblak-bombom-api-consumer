<template>
    <div>
        <!-- Tombol Search Mobile -->
        <button @click="openSearchModal" 
                class="md:hidden p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/50 dark:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" 
                 class="h-5 w-5 text-gray-600 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors" 
                 fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
        </button>

        <!-- Search Bar Desktop -->
        <button @click="openSearchModal"
            class="md:flex hidden items-center text-left space-x-3 px-4 h-10 
                   bg-white dark:bg-slate-800/50 
                   ring-1 ring-slate-900/10 dark:ring-slate-700/50 
                   hover:ring-slate-300 dark:hover:ring-slate-500 
                   focus:outline-none focus:ring-2 focus:ring-orange-500 
                   shadow-sm dark:shadow-slate-800/30 
                   rounded-lg text-slate-400 dark:text-slate-300 
                   backdrop-blur-sm transition-all duration-200">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" class="flex-none text-slate-300 dark:text-slate-400" aria-hidden="true">
                <path d="m19 19-3.5-3.5" />
                <circle cx="11" cy="11" r="6" />
            </svg>
            <span class="flex-auto dark:text-slate-400">Quick search...</span>
            <kbd class="font-sans font-semibold dark:text-slate-500">
                <abbr title="Command" class="no-underline text-slate-300 dark:text-slate-500">⌘</abbr> K
            </kbd>
        </button>

        <!-- Modal Backdrop -->
        <Teleport to="body">
            <transition enter-active-class="ease-out duration-300" 
                      enter-from-class="opacity-0" 
                      enter-to-class="opacity-100"
                      leave-active-class="ease-in duration-200" 
                      leave-from-class="opacity-100" 
                      leave-to-class="opacity-0">
                <div v-if="isOpen" 
                     class="fixed inset-0 bg-gray-900/70 dark:bg-slate-900/80 backdrop-blur-sm z-[999]"
                     @click="closeSearchModal" />
            </transition>

            <!-- Search Modal -->
            <transition enter-active-class="ease-out duration-300" 
                      enter-from-class="opacity-0 scale-95"
                      enter-to-class="opacity-100 scale-100" 
                      leave-active-class="ease-in duration-200"
                      leave-from-class="opacity-100 scale-100" 
                      leave-to-class="opacity-0 scale-95">
                <div v-if="isOpen" class="fixed inset-x-0 top-0 z-[1000] p-4 sm:p-6 md:p-20 transition-all">
                    <div ref="modalContent"
                        class="mx-auto max-w-2xl transform divide-y divide-gray-100 dark:divide-gray-700/50 
                               overflow-hidden rounded-xl 
                               bg-white dark:bg-slate-800/90 
                               shadow-2xl dark:shadow-slate-900/20 
                               ring-1 ring-black/5 dark:ring-white/10 
                               backdrop-blur-xl transition-all">
                        <!-- Search Input -->
                        <div class="relative">
                            <svg class="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500"
                                viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                    clip-rule="evenodd" />
                            </svg>
                            <input ref="searchInput" 
                                   v-model="searchQuery" 
                                   type="text"
                                   class="h-12 w-full border-0 bg-transparent pl-11 pr-4 
                                          text-gray-900 dark:text-gray-100 
                                          placeholder:text-gray-400 dark:placeholder:text-gray-500 
                                          focus:ring-2 focus:ring-orange-500 focus:outline-none 
                                          sm:text-sm"
                                   placeholder="Search documentation..." 
                                   @keyup.esc="closeSearchModal" />
                            <div class="absolute right-4 top-3">
                                <kbd class="inline-flex items-center rounded border 
                                           border-gray-200 dark:border-gray-700 
                                           px-1.5 text-sm text-gray-400 dark:text-gray-500">esc</kbd>
                            </div>
                        </div>

                        <!-- Recent Searches -->
                        <div class="flex flex-col divide-y divide-gray-100 dark:divide-gray-700/50">
                            <div class="px-6 py-4">
                                <h2 class="text-xs font-semibold text-gray-500 dark:text-gray-400">Recent</h2>
                            </div>
                            <div class="max-h-96 overflow-y-auto">
                                <div v-for="(item, index) in recentSearches" 
                                     :key="index"
                                     class="flex items-center px-6 py-4 
                                            transition 
                                            hover:bg-gray-50 dark:hover:bg-slate-700/50 
                                            cursor-pointer">
                                    <div class="flex-1">
                                        <p class="text-sm text-gray-900 dark:text-gray-100">{{ item.title }}</p>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">{{ item.category }}</p>
                                    </div>
                                    <button @click.stop="removeRecentSearch(index)"
                                        class="ml-4 p-1 text-gray-400 hover:text-gray-500 
                                               dark:text-gray-500 dark:hover:text-gray-400 
                                               transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" 
                                             class="h-4 w-4" 
                                             fill="none"
                                             viewBox="0 0 24 24" 
                                             stroke="currentColor">
                                            <path stroke-linecap="round" 
                                                  stroke-linejoin="round" 
                                                  stroke-width="2"
                                                  d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </Teleport>
    </div>
</template>
  
<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const isOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)
const modalContent = ref(null)

const recentSearches = ref([
    { title: 'align-self', category: 'CSS Properties' },
    { title: 'font-size', category: 'Typography' },
    { title: 'Checkboxes', category: 'Components/Forms' },
    { title: 'Alerts', category: 'Components/Feedback' },
])

const openSearchModal = () => {
    isOpen.value = true
    nextTick(() => {
        searchInput.value?.focus()
    })
}

const closeSearchModal = () => {
    isOpen.value = false
    searchQuery.value = ''
}

const removeRecentSearch = (index) => {
    recentSearches.value.splice(index, 1)
}

// Handle keyboard shortcuts
const handleKeydown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        openSearchModal()
    }
    if (e.key === 'Escape' && isOpen.value) {
        closeSearchModal()
    }
}

const handleClickOutside = (event) => {
    if (isOpen.value && modalContent.value && !modalContent.value.contains(event.target)) {
        closeSearchModal()
    }
}

onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    document.removeEventListener('mousedown', handleClickOutside)
    document.removeEventListener('keydown', handleKeydown)
})
</script>
  
<style scoped>
/* Optional: Add any custom styles here */
</style>