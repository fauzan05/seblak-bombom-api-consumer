<template>
    <head>
        <Title>Admin Categories - {{ appSettingStore.settings.data.app_name }}</Title>
        <Link rel="icon" type="image/x-icon" href="favicon.ico" />
    </head>
    <!-- modal create new category -->
    <TransitionRoot appear :show="isCreateNewCategoryOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/75" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 mb-4">
                                Create New Category
                            </DialogTitle>

                            <form @submit.prevent="createNewCategory" class="flex flex-col md:flex-row gap-6">
                                <!-- Upload Section - Full width on mobile, left column on desktop -->
                                <div class="w-full md:w-1/2 md:border-r md:border-gray-300 md:pr-6">
                                    <div class="h-[300px] md:h-[400px] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6"
                                        @drop.prevent="handleDrop" @dragover.prevent="dragover = true"
                                        @dragleave.prevent="dragover = false"
                                        :class="{ 'border-orange-500 bg-orange-50': dragover }">
                                        <div v-if="categoryImage" class="w-full h-full">
                                            <img :src="categoryImage" alt="Category"
                                                class="w-full h-full object-cover rounded-lg" />
                                        </div>
                                        <div v-else class="text-center">
                                            <div class="mb-4">
                                                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor"
                                                    fill="none" viewBox="0 0 48 48">
                                                    <path
                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                            <div class="flex text-sm text-gray-600 justify-center">
                                                <label
                                                    class="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500">
                                                    <span>Upload a file</span>
                                                    <input type="file" class="sr-only" @change="handleFileSelect"
                                                        accept="image/*">
                                                </label>
                                                <p class="pl-1">or drag and drop</p>
                                            </div>
                                            <p class="text-xs text-gray-500 mt-2">
                                                PNG, JPG, GIF up to 1MB
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Form Details - Full width on mobile, right column on desktop -->
                                <div class="w-full md:w-1/2">
                                    <!-- Name -->
                                    <div class="mb-4">
                                        <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                                            Name
                                        </label>
                                        <input type="text" id="name" v-model="categoryForm.name"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                            required>
                                    </div>

                                    <!-- Description -->
                                    <div class="mb-4">
                                        <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
                                            Description
                                        </label>
                                        <textarea id="description" v-model="categoryForm.description" rows="4"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                            required></textarea>
                                    </div>

                                    <!-- Action Buttons -->
                                    <div class="mt-6 flex justify-end space-x-3">
                                        <button type="button"
                                            class="inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                            @click="closeModal">
                                            Cancel
                                        </button>
                                        <button type="submit" :disabled="loading"
                                            class="inline-flex justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2">
                                            <span v-if="!loading">Create Category</span>
                                            <span v-else class="flex items-center">
                                                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                        stroke-width="4">
                                                    </circle>
                                                    <path class="opacity-75" fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                                    </path>
                                                </svg>
                                                Processing...
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
    <div class="p-6 bg-gray-50 min-h-screen">
        <!-- Header Section -->
        <div class="flex justify-between items-center mb-8">
            <div>
                <h1 class="text-2xl font-bold text-gray-800">Categories Management</h1>
                <p class="text-gray-600">Manage your product categories and organize your inventory</p>
            </div>
            <button @click="openModal"
                class="bg-orange-600 cursor-pointer hover:bg-orange-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Category</span>
            </button>
        </div>

        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500">Total Categories</p>
                        <h3 class="text-2xl font-bold text-gray-700">{{ totalRealCategories }}</h3>
                    </div>
                    <div class="p-3 bg-blue-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500">Active Categories</p>
                        <h3 class="text-2xl font-bold text-gray-700">{{ totalActiveCategories }}</h3>
                    </div>
                    <div class="p-3 bg-green-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500">Inactive Categories</p>
                        <h3 class="text-2xl font-bold text-gray-700">{{ totalInactiveCategories }}</h3>
                    </div>
                    <div class="p-3 bg-red-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500">Products in Categories</p>
                        <h3 class="text-2xl font-bold text-gray-700">{{ totalProducts }}</h3>
                    </div>
                    <div class="p-3 bg-purple-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        <!-- Search and Filter Section -->
        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div class="flex-1 max-w-md">
                    <div class="relative">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input v-model="search" type="text" placeholder="Search categories..."
                            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    </div>
                </div>
                <div class="flex items-center space-x-4">
                    <select v-model="statusFilter"
                        class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    <select v-model="sortBy"
                        class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                        <option value="name">Sort by Name</option>
                        <option value="created_at">Sort by Date</option>
                    </select>
                    <select v-model="pageSize"
                        class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Categories Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            <div v-for="category in categories.data" :key="category.id"
                class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div class="relative">
                    <img :src="category.image || '/placeholder-category.jpg'" :alt="category.name"
                        class="w-full h-48 object-cover">
                    <div class="absolute top-3 right-3">
                        <span
                            :class="`px-2 py-1 rounded-full text-xs font-medium ${category.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`">
                            {{ category.status }}
                        </span>
                    </div>
                </div>
                <div class="p-4">
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ category.name }}</h3>
                    <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ category.description }}</p>
                    <div class="flex items-center justify-between mb-4">
                        <span class="text-sm text-gray-500">{{ formatDate(category.created_at) }}</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button @click="editCategory(category)"
                            class="flex-1 bg-orange-600 cursor-pointer hover:bg-orange-700 text-white px-3 py-2 rounded-lg text-sm transition-colors">
                            Edit
                        </button>
                        <button @click="deleteCategory(category.id)"
                            class="px-3 py-2 bg-red-100 cursor-pointer hover:bg-red-200 text-red-600 rounded-lg transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-between bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div class="text-sm text-gray-500">
                Showing {{ (currentPage - 1) * dataPerPages + 1 }} to {{ Math.min(currentPage * dataPerPages,
                    totalCurrentCategories) }} of
                {{ totalCurrentCategories }} categories
            </div>
            <div class="flex items-center space-x-2">
                <button @click="previousPage" :disabled="currentPage === 1"
                    class="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition-colors">
                    Previous
                </button>
                <span class="px-3 py-2 bg-orange-600 text-white rounded-lg">{{ currentPage }}</span>
                <button @click="nextPage" :disabled="currentPage === totalPages"
                    class="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition-colors">
                    Next
                </button>
            </div>
        </div>
    </div>
</template>
  
<script setup>
definePageMeta({
    layout: "admin",
    middleware: ['auth']
});

const config = useRuntimeConfig()
const apiUrl = config.public.apiUrl

const appSettingStore = useAppSettingStore()

import { ref, computed, onMounted, watch } from 'vue'
import { useToast } from "vue-toastification";
// Toast notification
const toast = useToast()

import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'

const isCreateNewCategoryOpen = ref(false)

function closeModal() {
    isCreateNewCategoryOpen.value = false
}

function openModal() {
    resetForm()
    isCreateNewCategoryOpen.value = true
}

// Reactive data
const categories = ref([])
const search = ref('')
const statusFilter = ref('active')
const sortBy = ref('name')
const pageSize = ref(10)
const dataPerPages = ref(0)
const currentPage = ref(1)
const loading = ref(false)
const totalPages = ref(1)

// Modal states  
const showModal = ref(false)

// Statistics
const totalCurrentCategories = computed(() => categories.value.total_current_datas)
const totalRealCategories = computed(() => categories.value.total_real_datas)
const totalActiveCategories = computed(() => categories.value.total_active_datas)
const totalInactiveCategories = computed(() => categories.value.total_inactive_datas)
const totalProducts = computed(() => 0)
const categoryImage = ref(null)
const uploadedCategoryImageFile = ref(null)

// watch for search and filter changes
watch([statusFilter, sortBy, pageSize, search], () => {
    fetchCategories()
})

const categoryForm = ref({
    id: null,
    name: "",
    description: "",
    image: null,
});

const resetForm = () => {
    categoryForm.value = {
        id: null,
        name: '',
        description: '',
        image: null,
    }
    categoryImage.value = null
}

// Function to handle file processing
const processFile = (file) => {
    if (validateFile(file)) {
        const reader = new FileReader()
        reader.onload = (e) => {
            categoryImage.value = e.target.result
            uploadedCategoryImageFile.value = file
        }
        reader.readAsDataURL(file)
    }
}

// Handle file select through input
const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
        processFile(file)
    }
}

// Handle drag and drop
const handleDrop = (event) => {
    dragover.value = false
    const file = event.dataTransfer.files[0]
    if (file) {
        processFile(file)
    }
}

// CRUD OPERATIONS
const dragover = ref(false)
const validateFile = (file) => {
    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif']
    if (!validTypes.includes(file.type)) {
        alert('Please upload an image file (PNG, JPG, or GIF)')
        return false
    }

    // Check file size (1MB = 1048576 bytes)
    if (file.size > 1048576) {
        alert('File size should be less than 1MB')
        return false
    }

    return true
}

const createNewCategory = async () => {
    try {
        loading.value = true
        const formData = new FormData()
        formData.append('name', categoryForm.value.name)
        formData.append('description', categoryForm.value.description)
        // If categoryImage is a base64 string, convert it to a file first
        if (categoryImage.value) {
            // Convert base64 to blob
            const response = await fetch(categoryImage.value)
            const blob = await response.blob()

            // Create a file from the blob
            const file = new File(
                [blob],
                uploadedCategoryImageFile.value.name, // Original filename
                { type: uploadedCategoryImageFile.value.type } // Original file type
            )

            // Append the file
            formData.append('image', file)
        }

        await $fetch('/categories', {
            method: 'POST',
            body: formData,
            baseURL: apiUrl,
            credentials: 'include'
        })

        fetchCategories()
        toast.success(`Category ${categoryForm.value.name} was created successfully!`)
        closeModal()
    } catch (error) {
        console.error('Error creating category:', error)
        toast.error('Failed to create category. Please try again.')
    } finally {
        loading.value = false
    }
}

const updateCategory = async () => {
    // const formData = new FormData()
    // formData.append('_method', 'PUT')
    // formData.append('name', categoryForm.value.name)
    // formData.append('description', categoryForm.value.description)
    // formData.append('status', categoryForm.value.status)
    // if (categoryForm.value.image && typeof categoryForm.value.image === 'object') {
    //     formData.append('image', categoryForm.value.image)
    // }

    // const response = await fetch(`/categories/${categoryForm.value.id}`, {
    //     method: 'POST',
    //     body: formData,
    //     baseURL: apiUrl,
    //     headers: {
    //         'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    //     }
    // })

    // if (!response.ok) {
    //     throw new Error('Failed to update category')
    // }

    // return await response.json()
}

const deleteCategory = (categoryId) => {
    // categoryToDelete.value = categoryId
    // showDeleteModal.value = true
}

const confirmDelete = async () => {
    try {
        // const response = await fetch(`/api/categories/${categoryToDelete.value}`, {
        //     method: 'DELETE',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        //     }
        // })

        // if (!response.ok) {
        //     throw new Error('Failed to delete category')
        // }

        // await fetchCategories()
        // toast.success('Category deleted successfully!')
        // closeDeleteModal()
    } catch (error) {
        console.error('Error deleting category:', error)
        toast.error('Failed to delete category. Please try again.')
    }
}


// Pagination functions
const previousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--
    }
    fetchCategories()
}

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++
    }
    fetchCategories()
}

// Utility functions
const formatDate = (utcDateString) => {
    // Convert UTC string to user's local timezone
    const date = new Date(utcDateString)

    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone // Get user's timezone
    }

    return date.toLocaleString('en-US', options)
        .replace(',', '')
        .replace(',', ' at')
}

// Fetch categories from API
const fetchCategories = async () => {
    try {
        const response = await $fetch(`/categories?is_active=${statusFilter.value || ''}&per_page=${pageSize.value}&page=${currentPage.value}&search=${search.value}`, {
            baseURL: apiUrl,
            credentials: 'include'
        })

        categories.value = response
        categories.value.data.
            filter(category => !category.deleted_at).
            forEach(category => {
                category.image = `${apiUrl}/image/categories/${category.image_filename}`
                if (category.is_active) {
                    category.status = 'active'
                } else {
                    category.status = 'inactive'
                }
            })
        dataPerPages.value = response.data_per_pages
        currentPage.value = response.current_pages
        totalPages.value = response.total_pages
    } catch (error) {
        console.error('Error fetching categories:', error)
        toast.error('Failed to load categories')
        // Fallback to sample data for development
        loadSampleData()
    }
}

// Keyboard shortcuts
const handleKeydown = (event) => {
    // Ctrl/Cmd + N to create new category
    if ((event.ctrlKey || event.metaKey) && event.key === 'n') {
        event.preventDefault()
        openCreateModal()
    }
    // Escape to close modals
    if (event.key === 'Escape') {
        if (showModal.value) {
            closeModal()
        }
        if (showDeleteModal.value) {
            closeDeleteModal()
        }
    }
}

onMounted(async () => {
    fetchCategories()
    document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
})

// Sample data for development/testing
const loadSampleData = () => {
    categories.value = [
        {
            id: 1,
            name: 'Seblak Pedas',
            description: 'Seblak dengan level kepedasan yang menantang untuk pecinta makanan pedas',
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
            status: 'active',
            products_count: 12,
            created_at: '2024-01-15T08:30:00Z'
        },
        {
            id: 2,
            name: 'Seblak Original',
            description: 'Seblak dengan rasa original yang pas untuk semua kalangan',
            image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400',
            status: 'active',
            products_count: 8,
            created_at: '2024-01-12T10:15:00Z'
        },
        {
            id: 3,
            name: 'Seblak Manis',
            description: 'Varian seblak dengan rasa manis yang unik dan menyegarkan',
            image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400',
            status: 'active',
            products_count: 5,
            created_at: '2024-01-10T14:45:00Z'
        },
        {
            id: 4,
            name: 'Minuman',
            description: 'Berbagai jenis minuman segar untuk menemani seblak Anda',
            image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400',
            status: 'active',
            products_count: 15,
            created_at: '2024-01-08T09:20:00Z'
        },
        {
            id: 5,
            name: 'Cemilan',
            description: 'Aneka cemilan ringan sebagai pelengkap hidangan utama',
            image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400',
            status: 'inactive',
            products_count: 3,
            created_at: '2024-01-05T16:30:00Z'
        },
        {
            id: 6,
            name: 'Paket Combo',
            description: 'Paket hemat kombinasi seblak dengan minuman dan cemilan',
            image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
            status: 'active',
            products_count: 7,
            created_at: '2024-01-03T11:10:00Z'
        }
    ]
}
</script>
