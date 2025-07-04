<template>
    <head>
        <Title>Admin Products - {{ appSettingStore.settings.data.app_name }}</Title>
        <Link rel="icon" type="image/x-icon" href="favicon.ico" />
    </head>
    <!-- modal create new product -->
    <TransitionRoot appear :show="isCreateNewProductOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-50">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" />
            </TransitionChild>
            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white dark:bg-slate-800/80 p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 mb-4 dark:text-white">
                                {{ createTitleModal }}
                            </DialogTitle>
                            <form @submit.prevent="createNewProduct" class="flex flex-col md:flex-row gap-6">
                                <!-- Upload Section - Full width on mobile, left column on desktop -->
                                <div class="w-full md:w-1/2 md:border-r md:border-gray-300 dark:border-gray-100 md:pr-6">
                                    <!-- Multiple Image Upload Area -->
                                    <div class="mb-4">
                                        <div
                                            class="h-[400px] border-2 border-dashed border-gray-300 dark:border-gray-100 rounded-lg p-4 overflow-y-auto">
                                            <!-- Drag & Drop Area -->
                                            <div v-if="productImages.length === 0"
                                                class="h-full flex flex-col items-center justify-center"
                                                @drop.prevent="handleDrop" @dragover.prevent="dragover = true"
                                                @dragleave.prevent="dragover = false"
                                                :class="{ 'border-orange-500 bg-orange-50': dragover }">
                                                <div class="text-center">
                                                    <!-- Upload Icon -->
                                                    <PhotoIcon class="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
                                                    <div class="mt-4">
                                                        <label class="cursor-pointer text-orange-600 hover:text-orange-500">
                                                            <span>Upload files</span>
                                                            <input type="file" multiple class="sr-only"
                                                                @change="handleFilesSelect" accept="image/*">
                                                        </label>
                                                        <p class="text-sm text-gray-500">or drag and drop</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- Images Preview -->
                                            <draggable v-model="productImages" v-if="productImages.length > 0"
                                                class="grid grid-cols-2 gap-4" item-key="id" @change="updateOrderImages">
                                                <template #item="{ element, index }">
                                                    <div class="relative group handle cursor-move">
                                                        <!-- Nomor Urutan -->
                                                        <div
                                                            class="absolute top-2 left-2 z-10 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center">
                                                            {{ element.position }}
                                                        </div>
                                                        <!-- Delete Button - Dipindah ke pojok kanan atas -->
                                                        <button type="button" @click="removeImage(element)"
                                                            class="absolute top-2 right-2 z-10 text-white p-1 hover:text-red-500 bg-black bg-opacity-50 rounded-full">
                                                            <TrashIcon class="w-5 h-5" aria-hidden="true" />
                                                        </button>
                                                        <img :src="element.preview ? element.preview : element.image"
                                                            class="w-full h-40 object-cover rounded-lg" />
                                                    </div>
                                                </template>
                                            </draggable>
                                            <!-- Upload More Button -->
                                            <div v-if="productImages.length > 0" class="mt-4 text-center">
                                                <label
                                                    class="cursor-pointer inline-block px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-500">
                                                    Add More Images
                                                    <input type="file" multiple class="sr-only" @change="handleFilesSelect"
                                                        accept="image/*">
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Form Details - Full width on mobile, right column on desktop -->
                                <div class="w-full md:w-1/2 flex flex-col justify-between">
                                    <div>
                                        <!-- Name -->
                                        <div class="mb-4">
                                            <label for="name"
                                                class="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
                                                Name
                                            </label>
                                            <input type="text" id="name" v-model="productForm.name"
                                                class="w-full px-3 dark:text-white py-2 border border-gray-300 rounded-md focus:outline-none focus-within:ring focus-within:ring-orange-500 focus-within:border-orange-500"
                                                required>
                                        </div>
                                        <!-- Category -->
                                        <div class="mb-4">
                                            <label for="name"
                                                class="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
                                                Category
                                            </label>
                                            <Combobox v-model="selectedCategory">
                                                <div class="relative w-full h-10">
                                                    <div
                                                        class="relative w-full cursor-default overflow-hidden rounded-lg bg-white dark:bg-slate-800/50 text-left shadow-md border border-gray-300 focus-within:ring focus-within:ring-orange-500 focus-within:border-orange-500">
                                                        <ComboboxInput
                                                            class="w-full h-11 border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 dark:text-white bg-transparent focus:outline-none"
                                                            :displayValue="(category) => category?.name"
                                                            @change="query = $event.target.value" />
                                                        <ComboboxButton
                                                            class="absolute inset-y-0 right-0 flex items-center pr-2">
                                                            <ChevronUpDownIcon class="h-5 w-5 text-gray-400"
                                                                aria-hidden="true" />
                                                        </ComboboxButton>
                                                    </div>
                                                    <transition leave-active-class="transition duration-100 ease-in"
                                                        leave-from-class="opacity-100" leave-to-class="opacity-0">
                                                        <ComboboxOptions
                                                            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-slate-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                                            <div v-if="filteredCategories.length === 0"
                                                                class="relative cursor-default select-none px-4 py-2 text-gray-700 dark:text-gray-300">
                                                                Nothing found.
                                                            </div>
                                                            <ComboboxOption v-for="category in filteredCategories"
                                                                :key="category.name" :value="category"
                                                                v-slot="{ selected, active }">
                                                                <li :class="[
                                                                    'relative cursor-default select-none py-2 pl-10 pr-4',
                                                                    active ? 'bg-amber-100 text-amber-900 dark:bg-gray-500 dark:text-white' : 'text-gray-900 dark:text-white'
                                                                ]">
                                                                    <span :class="[
                                                                        'block truncate',
                                                                        selected ? 'font-medium' : 'font-normal'
                                                                    ]">
                                                                        {{ category.name }}
                                                                    </span>
                                                                    <span v-if="selected"
                                                                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600 dark:text-white">
                                                                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                                                    </span>
                                                                </li>
                                                            </ComboboxOption>
                                                        </ComboboxOptions>
                                                    </transition>
                                                </div>
                                            </Combobox>
                                        </div>
                                        <!-- Description -->
                                        <div class="mb-4">
                                            <label for="description"
                                                class="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
                                                Description
                                            </label>
                                            <textarea id="description" v-model="productForm.description" rows="4"
                                                class="w-full px-3 py-2 dark:text-white border border-gray-300 rounded-md focus:outline-none focus-within:ring focus-within:ring-orange-500 focus-within:border-orange-500"
                                                required></textarea>
                                        </div>
                                        <!-- Price -->
                                        <div class="mb-4">
                                            <label for="price"
                                                class="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
                                                Price
                                            </label>
                                            <div class="relative">
                                                <div
                                                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <span class="text-gray-500 dark:text-gray-400">Rp</span>
                                                </div>
                                                <input type="text" id="price" v-model="formattedPrice"
                                                    class="w-full pl-10 pr-3 py-2 dark:text-white border border-gray-300 rounded-md focus:outline-none focus-within:ring focus-within:ring-orange-500 focus-within:border-orange-500"
                                                    placeholder="0" required>
                                            </div>
                                        </div>
                                        <!-- Stock -->
                                        <div class="mb-4">
                                            <label for="stock"
                                                class="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
                                                Stock
                                            </label>
                                            <div class="relative">
                                                <input type="text" id="stock" v-model="productForm.stock"
                                                    class="w-full pl-3 pr-3 py-2 dark:text-white border border-gray-300 rounded-md focus:outline-none focus-within:ring focus-within:ring-orange-500 focus-within:border-orange-500"
                                                    placeholder="0" required>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <!-- Action Buttons -->
                                        <div class="mt-6 flex justify-center space-x-3">
                                            <button type="button"
                                                class="inline-flex justify-center cursor-pointer rounded-md border dark:text-white/75 border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                                @click="closeModal">
                                                Cancel
                                            </button>
                                            <button type="submit" :disabled="loading"
                                                class="inline-flex justify-center cursor-pointer rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2">
                                                <span v-if="!loading">{{ createTitleModalButton }}</span>
                                                <span v-else class="flex items-center">
                                                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle class="opacity-25" cx="12" cy="12" r="10"
                                                            stroke="currentColor" stroke-width="4">
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
                                </div>
                            </form>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
    <!-- modal delete product confirmation -->
    <TransitionRoot appear :show="isDeleteModalOpen" as="template">
        <Dialog as="div" @close="closeDeleteModal" class="relative z-50">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" />
            </TransitionChild>
            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white dark:bg-slate-800/80 dark:border-gray-600 p-6 text-left align-middle shadow-xl transition-all">
                            <!-- Header -->
                            <div class="flex items-center justify-between mb-6">
                                <DialogTitle as="h3" class="text-xl font-semibold text-gray-900 dark:text-white">
                                    Confirm Deletion
                                </DialogTitle>
                                <button @click="closeDeleteModal"
                                    class="text-gray-400 hover:text-gray-500 transition-colors">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <!-- Warning Message -->
                            <div class="bg-red-50 dark:bg-red-200 rounded-lg p-4 mb-6">
                                <div class="flex">
                                    <div class="flex-shrink-0">
                                        <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <div class="ml-3">
                                        <p class="text-sm text-red-800">
                                            The following products will be permanently deleted. This action cannot be
                                            undone.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <!-- List of products -->
                            <div
                                class="bg-gray-50 dark:bg-slate-800/80 border dark:border-gray-100 rounded-xl overflow-hidden">
                                <div class="max-h-64 overflow-y-auto">
                                    <ul class="divide-y divide-gray-200">
                                        <li v-for="item in selectedProducts" :key="item.id"
                                            class="flex items-center gap-3 p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                                            <div class="flex-shrink-0">
                                                <div
                                                    class="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                                                    <img v-if="item.image" :src="item.image" alt="Product Image"
                                                        class="w-10 h-10 object-cover rounded-lg">
                                                </div>
                                            </div>
                                            <div class="flex-1 min-w-0">
                                                <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                    {{ item.name }}
                                                </p>
                                                <p class="text-sm text-gray-500 truncate" v-if="item.description">
                                                    {{ item.description }}
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <!-- Action buttons -->
                            <div class="mt-6 flex justify-end gap-3">
                                <button type="button"
                                    class="inline-flex justify-center cursor-pointer rounded-md border dark:text-white/75 border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                    @click="closeDeleteModal">
                                    Cancel
                                </button>
                                <button type="button" :disabled="loading"
                                    class="inline-flex cursor-pointer items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    @click="deleteSelectedCategories">
                                    <template v-if="!loading">
                                        Delete Selected
                                    </template>
                                    <template v-else>
                                        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                            </path>
                                        </svg>
                                        Deleting...
                                    </template>
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
    <div class="p-6 bg-gray-50 min-h-screen dark:bg-slate-900/50 dark:text-gray-100 rounded-xl">
        <!-- Header Section -->
        <div class="flex justify-between items-center mb-8">
            <div>
                <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Products Management</h1>
                <p class="text-gray-600 dark:text-gray-400">Manage your product products and organize your inventory</p>
            </div>
            <button @click="openModal(null)"
                class="bg-orange-600 cursor-pointer hover:bg-orange-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Product</span>
            </button>
        </div>
        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div
                class="bg-white rounded-xl shadow-md p-6 border border-gray-50 dark:bg-slate-800/50 dark:border-slate-700/50">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500 dark:text-white">Total Products</p>
                        <h3 class="text-2xl font-bold text-gray-700 dark:text-white">{{ totalRealProducts }}</h3>
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
            <div
                class="bg-white rounded-xl shadow-md p-6 border border-gray-50 dark:bg-slate-800/50 dark:border-slate-700/50">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500 dark:text-white">Active Products</p>
                        <h3 class="text-2xl font-bold text-gray-700 dark:text-white">{{ totalActiveProducts }}</h3>
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
            <div
                class="bg-white rounded-xl shadow-md p-6 border border-gray-50 dark:bg-slate-800/50 dark:border-slate-700/50">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500 dark:text-white">Inactive Products</p>
                        <h3 class="text-2xl font-bold text-gray-700 dark:text-white">{{ totalInactiveProducts }}</h3>
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
        </div>
        <!-- Search and Filter Section -->
        <div
            class="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100 mb-6 dark:bg-slate-800/50 dark:border-slate-700/50">
            <!-- Mobile: Stack everything vertically -->
            <div class="space-y-4">
                <!-- Search Bar - Full width on all screens -->
                <div class="w-full">
                    <div class="relative">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input v-model="search" type="text" placeholder="Search products..."
                            class="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus-within:ring-orange-500 focus:border-transparent text-sm sm:text-base">
                    </div>
                </div>
                <!-- Mobile: Show/Hide Filters Toggle -->
                <div class="block sm:hidden">
                    <button @click="showMobileFilters = !showMobileFilters"
                        class="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-slate-600 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                        </svg>
                        <span class="text-sm font-medium">
                            {{ showMobileFilters ? 'Hide Filters' : 'Show Filters' }}
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-4 h-4 transition-transform"
                            :class="{ 'rotate-180': showMobileFilters }">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>
                </div>
                <!-- Filters Container -->
                <div class="space-y-4 sm:space-y-0" :class="{ 'hidden sm:block': !showMobileFilters }">
                    <!-- Mobile: Grid for Refresh button -->
                    <div class="block sm:hidden">
                        <button @click="fetchProducts" :disabled="loading"
                            class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm bg-orange-600 text-white rounded-lg shadow hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed">
                            <span v-if="!loading" class="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="h-4 w-4">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                                Refresh Data
                            </span>
                            <span v-else class="flex items-center gap-2">
                                <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4" />
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Loading...
                            </span>
                        </button>
                    </div>
                    <!-- Desktop: Horizontal layout -->
                    <div class="hidden sm:flex sm:items-center sm:justify-between sm:space-x-4">
                        <!-- Refresh Button -->
                        <button @click="fetchProducts" :disabled="loading"
                            class="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-orange-600 text-white rounded-md shadow hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed">
                            <span v-if="!loading" class="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="h-4 w-4">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                                Refresh
                            </span>
                            <span v-else class="flex items-center gap-1">
                                <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4" />
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Loading...
                            </span>
                        </button>
                        <div class="flex items-center space-x-3">
                            <!-- Status Filter -->
                            <div class="w-32">
                                <Listbox v-model="selectedStatusFilter">
                                    <div class="relative">
                                        <ListboxButton
                                            class="relative w-full cursor-default rounded-lg bg-white dark:bg-slate-800/50 py-2 pl-3 pr-10 text-left shadow-md sm:text-sm border border-gray-200 dark:border-slate-600">
                                            <span class="block truncate text-gray-900 dark:text-white">{{
                                                selectedStatusFilter.name }}</span>
                                            <span
                                                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </ListboxButton>
                                        <transition leave-active-class="transition duration-100 ease-in"
                                            leave-from-class="opacity-100" leave-to-class="opacity-0">
                                            <ListboxOptions
                                                class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-slate-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                                <ListboxOption v-slot="{ active, selected }"
                                                    v-for="statusItem in statusItems" :key="statusItem.name"
                                                    :value="statusItem" as="template">
                                                    <li :class="[
                                                        active ? 'bg-amber-100 text-amber-900 dark:bg-gray-500 dark:text-white' : 'text-gray-900 dark:text-white',
                                                        'relative cursor-default select-none py-2 pl-10 pr-4',
                                                    ]">
                                                        <span
                                                            :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{
                                                                statusItem.name }}</span>
                                                        <span v-if="selected"
                                                            class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600 dark:text-white">
                                                            <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    </li>
                                                </ListboxOption>
                                            </ListboxOptions>
                                        </transition>
                                    </div>
                                </Listbox>
                            </div>
                            <!-- Sort By Filter -->
                            <div class="w-40">
                                <Listbox v-model="selectedSortByFilter">
                                    <div class="relative">
                                        <ListboxButton
                                            class="relative w-full cursor-default rounded-lg bg-white dark:bg-slate-800/50 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm border border-gray-200 dark:border-slate-600">
                                            <span class="block truncate text-gray-900 dark:text-white">{{
                                                selectedSortByFilter.name }}</span>
                                            <span
                                                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </ListboxButton>
                                        <transition leave-active-class="transition duration-100 ease-in"
                                            leave-from-class="opacity-100" leave-to-class="opacity-0">
                                            <ListboxOptions
                                                class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-slate-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                                <ListboxOption v-slot="{ active, selected }"
                                                    v-for="sortByItem in sortByItems" :key="sortByItem.name"
                                                    :value="sortByItem" as="template">
                                                    <li :class="[
                                                        active ? 'bg-amber-100 text-amber-900 dark:bg-gray-500 dark:text-white' : 'text-gray-900 dark:text-white',
                                                        'relative cursor-default select-none py-2 pl-10 pr-4',
                                                    ]">
                                                        <span
                                                            :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{
                                                                sortByItem.name }}</span>
                                                        <span v-if="selected"
                                                            class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600 dark:text-white">
                                                            <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    </li>
                                                </ListboxOption>
                                            </ListboxOptions>
                                        </transition>
                                    </div>
                                </Listbox>
                            </div>
                            <!-- Page Size Filter -->
                            <div class="w-20">
                                <Listbox v-model="selectedPageSizeFilter">
                                    <div class="relative">
                                        <ListboxButton
                                            class="relative w-full cursor-default rounded-lg bg-white dark:bg-slate-800/50 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm border border-gray-200 dark:border-slate-600">
                                            <span class="block truncate text-gray-900 dark:text-white">{{
                                                selectedPageSizeFilter.name }}</span>
                                            <span
                                                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </ListboxButton>
                                        <transition leave-active-class="transition duration-100 ease-in"
                                            leave-from-class="opacity-100" leave-to-class="opacity-0">
                                            <ListboxOptions
                                                class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-slate-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                                <ListboxOption v-slot="{ active, selected }"
                                                    v-for="pageSizeItem in pageSizeItems" :key="pageSizeItem.name"
                                                    :value="pageSizeItem" as="template">
                                                    <li :class="[
                                                        active ? 'bg-amber-100 text-amber-900 dark:bg-gray-500 dark:text-white' : 'text-gray-900 dark:text-white',
                                                        'relative cursor-default select-none py-2 pl-10 pr-4',
                                                    ]">
                                                        <span
                                                            :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{
                                                                pageSizeItem.name }}</span>
                                                        <span v-if="selected"
                                                            class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600 dark:text-white">
                                                            <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    </li>
                                                </ListboxOption>
                                            </ListboxOptions>
                                        </transition>
                                    </div>
                                </Listbox>
                            </div>
                            <!-- Sort Direction Toggle -->
                            <SwitchGroup as="div" class="flex items-center space-x-2">
                                <SwitchLabel as="span" class="text-sm text-gray-700 dark:text-white">Asc</SwitchLabel>
                                <Switch v-model="isDesc" :class="isDesc ? 'bg-orange-600' : 'bg-gray-400'"
                                    class="relative inline-flex items-center h-6 w-11 shrink-0 cursor-pointer rounded-full border border-gray-200 dark:border-slate-600 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                                    <span class="sr-only">Toggle sort direction</span>
                                    <span aria-hidden="true" :class="isDesc ? 'translate-x-5' : 'translate-x-0'"
                                        class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out" />
                                </Switch>
                                <SwitchLabel as="span" class="text-sm text-gray-700 dark:text-white">Desc</SwitchLabel>
                            </SwitchGroup>
                        </div>
                    </div>
                    <!-- Mobile: Vertical Grid Layout for Filters -->
                    <div class="grid grid-cols-1 gap-4 sm:hidden">
                        <!-- Row 1: Status and Sort By -->
                        <div class="grid grid-cols-2 gap-3">
                            <!-- Status Filter -->
                            <div>
                                <label
                                    class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                                <Listbox v-model="selectedStatusFilter">
                                    <div class="relative">
                                        <ListboxButton
                                            class="relative w-full cursor-default rounded-lg bg-white dark:bg-slate-800/50 py-2.5 pl-3 pr-8 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-sm border border-gray-200 dark:border-slate-600">
                                            <span class="block truncate text-gray-900 dark:text-white">{{
                                                selectedStatusFilter.name }}</span>
                                            <span
                                                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                <ChevronUpDownIcon class="h-4 w-4 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </ListboxButton>
                                        <transition leave-active-class="transition duration-100 ease-in"
                                            leave-from-class="opacity-100" leave-to-class="opacity-0">
                                            <ListboxOptions
                                                class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-slate-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                                <ListboxOption v-slot="{ active, selected }"
                                                    v-for="statusItem in statusItems" :key="statusItem.name"
                                                    :value="statusItem" as="template">
                                                    <li :class="[
                                                        active ? 'bg-amber-100 text-amber-900 dark:bg-gray-500 dark:text-white' : 'text-gray-900 dark:text-white',
                                                        'relative cursor-default select-none py-2 pl-10 pr-4',
                                                    ]">
                                                        <span
                                                            :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{
                                                                statusItem.name }}</span>
                                                        <span v-if="selected"
                                                            class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600 dark:text-white">
                                                            <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    </li>
                                                </ListboxOption>
                                            </ListboxOptions>
                                        </transition>
                                    </div>
                                </Listbox>
                            </div>
                            <!-- Sort By Filter -->
                            <div>
                                <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Sort
                                    By</label>
                                <Listbox v-model="selectedSortByFilter">
                                    <div class="relative">
                                        <ListboxButton
                                            class="relative w-full cursor-default rounded-lg bg-white dark:bg-slate-800/50 py-2.5 pl-3 pr-8 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-sm border border-gray-200 dark:border-slate-600">
                                            <span class="block truncate text-gray-900 dark:text-white">{{
                                                selectedSortByFilter.name }}</span>
                                            <span
                                                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                <ChevronUpDownIcon class="h-4 w-4 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </ListboxButton>
                                        <transition leave-active-class="transition duration-100 ease-in"
                                            leave-from-class="opacity-100" leave-to-class="opacity-0">
                                            <ListboxOptions
                                                class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-slate-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                                <ListboxOption v-slot="{ active, selected }"
                                                    v-for="sortByItem in sortByItems" :key="sortByItem.name"
                                                    :value="sortByItem" as="template">
                                                    <li :class="[
                                                        active ? 'bg-amber-100 text-amber-900 dark:bg-gray-500 dark:text-white' : 'text-gray-900 dark:text-white',
                                                        'relative cursor-default select-none py-2 pl-10 pr-4',
                                                    ]">
                                                        <span
                                                            :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{
                                                                sortByItem.name }}</span>
                                                        <span v-if="selected"
                                                            class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600 dark:text-white">
                                                            <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    </li>
                                                </ListboxOption>
                                            </ListboxOptions>
                                        </transition>
                                    </div>
                                </Listbox>
                            </div>
                        </div>
                        <!-- Row 2: Page Size and Sort Direction -->
                        <div class="grid grid-cols-2 gap-3">
                            <!-- Page Size Filter -->
                            <div>
                                <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Items</label>
                                <Listbox v-model="selectedPageSizeFilter">
                                    <div class="relative">
                                        <ListboxButton
                                            class="relative w-full cursor-default rounded-lg bg-white dark:bg-slate-800/50 py-2.5 pl-3 pr-8 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-sm border border-gray-200 dark:border-slate-600">
                                            <span class="block truncate text-gray-900 dark:text-white">{{
                                                selectedPageSizeFilter.name }}</span>
                                            <span
                                                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                <ChevronUpDownIcon class="h-4 w-4 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </ListboxButton>
                                        <transition leave-active-class="transition duration-100 ease-in"
                                            leave-from-class="opacity-100" leave-to-class="opacity-0">
                                            <ListboxOptions
                                                class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-slate-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                                <ListboxOption v-slot="{ active, selected }"
                                                    v-for="pageSizeItem in pageSizeItems" :key="pageSizeItem.name"
                                                    :value="pageSizeItem" as="template">
                                                    <li :class="[
                                                        active ? 'bg-amber-100 text-amber-900 dark:bg-gray-500 dark:text-white' : 'text-gray-900 dark:text-white',
                                                        'relative cursor-default select-none py-2 pl-10 pr-4',
                                                    ]">
                                                        <span
                                                            :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{
                                                                pageSizeItem.name }}</span>
                                                        <span v-if="selected"
                                                            class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600 dark:text-white">
                                                            <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    </li>
                                                </ListboxOption>
                                            </ListboxOptions>
                                        </transition>
                                    </div>
                                </Listbox>
                            </div>
                            <!-- Sort Direction Toggle -->
                            <div>
                                <label
                                    class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Direction</label>
                                <div
                                    class="flex items-center justify-center h-10 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600">
                                    <SwitchGroup as="div" class="flex items-center space-x-2">
                                        <SwitchLabel as="span" class="text-sm text-gray-700 dark:text-white">Asc
                                        </SwitchLabel>
                                        <Switch v-model="isDesc" :class="isDesc ? 'bg-orange-600' : 'bg-gray-400'"
                                            class="relative inline-flex items-center h-5 w-9 shrink-0 cursor-pointer rounded-full border border-gray-200 dark:border-slate-600 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                                            <span class="sr-only">Toggle sort direction</span>
                                            <span aria-hidden="true" :class="isDesc ? 'translate-x-4' : 'translate-x-0'"
                                                class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out" />
                                        </Switch>
                                        <SwitchLabel as="span" class="text-sm text-gray-700 dark:text-white">Desc
                                        </SwitchLabel>
                                    </SwitchGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full flex items-center">
            <button @click="selectAllProducts"
                class="inline-flex mb-4 items-center cursor-pointer gap-1 px-3 py-1.5 text-sm bg-orange-600 text-white rounded-md shadow hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Select All
            </button>
            <button @click="clearSelectAllProducts"
                class="inline-flex ms-4 mb-4 items-center cursor-pointer gap-1 px-3 py-1.5 text-sm bg-gray-600 text-white rounded-md shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Clear All
            </button>
            <button v-show="showButtonDeleteSelectedItems" @click="showModalDeleteSelectedItems"
                class="inline-flex ms-4 mb-4 items-center cursor-pointer gap-1 px-3 py-1.5 text-sm bg-red-600 text-white rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Selected Items
            </button>
        </div>
        <!-- Products Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            <div v-for="(product, productIndex) in products.data" :key="product.id"
                class="bg-white dark:bg-slate-800/50 dark:border-gray-600 rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div class="relative">
                    <div :ref="el => swiperElements[productIndex] = el" class="swiper z-0">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(image, index) in product.images" :key="index">
                                <img :src="image.image" :alt="'image-of-' + product.name"
                                    class="w-full z-0 h-48 object-cover" />
                            </div>
                        </div>
                        <!-- Custom Pagination -->
                        <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-5 flex space-x-3">
                            <button v-for="(_, index) in product.images" :key="index"
                                @click="goToSlide(productIndex, index)"
                                class="w-3 h-3 rounded-full transition-all duration-300" :class="[
                                    currentIndices[productIndex] === index
                                        ? 'bg-orange-500 w-5'
                                        : 'bg-white/50 hover:bg-white/70'
                                ]">
                            </button>
                        </div>
                    </div>
                    <div class="absolute top-3 right-3 z-50">
                        <span
                            :class="`px-2 py-1 rounded-full text-xs font-medium ${product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`">
                            {{ product.status }}
                        </span>
                    </div>
                    <div class="absolute top-3 left-3 z-50">
                        <label class="inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="selectedProducts" :value="product" class="sr-only">
                            <div class="h-5 w-5 rounded transition-all duration-200 ease-in-out relative" :class="[
                                selectedProducts.includes(product)
                                    ? 'bg-gradient-to-br from-orange-400 to-orange-600'
                                    : 'bg-white/50'
                            ]">
                                <!-- Checkmark -->
                                <svg class="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                       transition-all duration-200 ease-in-out"
                                    :class="selectedProducts.includes(product) ? 'opacity-100' : 'opacity-0'"
                                    viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                </svg>
                            </div>
                        </label>
                    </div>
                </div>
                <div class="p-4">
                    <h3 class="text-lg font-semibold text-gray-800 mb-2 dark:text-white">{{ product.name }}</h3>
                    <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ product.description }}</p>
                    <div class="flex items-center justify-between mb-4">
                        <span class="text-sm text-gray-500">{{ formatDate(product.created_at) }}</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button @click="openModal(product)"
                            class="flex-1 bg-orange-600 cursor-pointer hover:bg-orange-700 text-white px-3 py-2 rounded-lg text-sm transition-colors">
                            Edit
                        </button>
                        <button @click="deleteProduct(product)"
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
        <div
            class="flex items-center justify-between bg-white rounded-xl shadow-sm p-4 border border-gray-100 dark:bg-slate-800/50 dark:border-gray-600">
            <div class="text-sm text-gray-500">
                Showing {{ (currentPage - 1) * dataPerPages + 1 }} to {{ Math.min(currentPage * dataPerPages,
                    totalCurrentProducts) }} of
                {{ totalCurrentProducts }} products
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
const { $toast } = useNuxtApp()
import {
    CheckIcon,
    ChevronUpDownIcon,
    PhotoIcon,
    TrashIcon,
} from '@heroicons/vue/20/solid'
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import draggable from 'vuedraggable'
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
    Switch,
    SwitchGroup,
    SwitchLabel,
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    Combobox,
    ComboboxInput,
    ComboboxButton,
    ComboboxOptions,
    ComboboxOption,
} from '@headlessui/vue'
import Swiper from 'swiper'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'

// List reactive data items
const sortByItems = [
    { name: 'Name', value: 'products.name' },
    { name: 'Created Date', value: 'products.created_at' },
    { name: 'Updated Date', value: 'products.updated_at' }
]
const statusItems = [
    { name: 'Active', value: 'true' },
    { name: 'Inactive', value: 'false' }
]
const pageSizeItems = [
    { name: '10', value: 10 },
    { name: '25', value: 25 },
    { name: '50', value: 50 },
    { name: '100', value: 100 }
]

// Reactive data
const createTitleModal = ref('')
const createTitleModalButton = ref('')
const isCreateNewProduct = ref(true)
const products = ref([])
const search = ref('')
const selectedStatusFilter = ref(statusItems[0])
const selectedSortByFilter = ref(sortByItems[0])
const selectedPageSizeFilter = ref(pageSizeItems[0])
const selectedProducts = ref([])
const isDesc = ref(true)
const dataPerPages = ref(0)
const currentPage = ref(1)
const loading = ref(false)
const totalPages = ref(1)
const showButtonDeleteSelectedItems = ref(false)
const isDeleteModalOpen = ref(false)
const showMobileFilters = ref(false)
const selectedCategory = ref(null)
const categories = ref({ data: [] })
const query = ref('')
watch(query, (newQuery) => {
    fetchCategories(newQuery)
})

// Handle create & update product
const productImages = ref([])
const productForm = ref({
    id: 0,
    categoryId: 0,
    name: "",
    description: "",
    price: 0,
    stock: 0
});
const isCreateNewProductOpen = ref(false)
function closeModal() {
    isCreateNewProductOpen.value = false
}
function openModal(selectedProduct = null) {
    if (selectedProduct) {
        productForm.value.id = selectedProduct.id || 0
        productForm.value.name = selectedProduct.name
        productForm.value.description = selectedProduct.description
        productForm.value.price = selectedProduct.price || 0
        productForm.value.stock = selectedProduct.stock || 0
        productImages.value = selectedProduct.images || []
        productImages.value.sort((a, b) => a.position - b.position)
        createTitleModal.value = 'Edit Product'
        createTitleModalButton.value = 'Update Product'
        isCreateNewProduct.value = false
        selectedCategory.value = selectedProduct.category
    } else {
        createTitleModal.value = 'Create New Product'
        createTitleModalButton.value = 'Create Product'
        resetForm()
        query.value = ''
        fetchCategories()
    }
    isCreateNewProductOpen.value = true
}
// Methods
const handleFilesSelect = (event) => {
    const files = Array.from(event.target.files)
    addImages(files)
}
const updateOrderImages = () => {
    nextTick(() => {
        productImages.value = productImages.value.map((image, index) => ({
            ...image,
            position: index + 1
        }))
        productImages.value.sort((a, b) => a.position - b.position)
    })
}
const handleDrop = (event) => {
    dragover.value = false
    const files = Array.from(event.dataTransfer.files)
    addImages(files)
}
const addImages = (files) => {
    files.forEach((file, index) => {
        if (file.type.startsWith('image/') && validateFile(file)) {
            const reader = new FileReader()
            reader.onload = (e) => {
                productImages.value.push({
                    id: Date.now() + Math.random(),
                    file: file,
                    preview: e.target.result,
                    position: productImages.value.length + 1,
                    is_current: false,
                })
            }
            reader.readAsDataURL(file)
        }
    })
}
const removeImage = (image) => {
    const index = productImages.value.findIndex(img => img.id === image.id)
    if (index > -1) {
        productImages.value.splice(index, 1)
        // Update urutan setelah menghapus
        updateOrderImages()
    }
}
const formattedPrice = computed({
    get: () => {
        try {
            const numericValue = parseInt(productForm.value.price) || 0
            return numericValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        } catch (error) {
            return "0"
        }
    },
    set: (value) => {
        try {
            const cleanValue = value.replace(/\D/g, '')
            productForm.value.price = cleanValue ? Number(cleanValue) : 0
        } catch (error) {
            productForm.value.price = 0
        }
    }
})

const fetchCategories = async (search = '') => {
    // loading.value = true
    try {
        const response = await $fetch(`/categories`, {
            params: {
                per_page: 5,
                search,
                column: 'categories.name',
                sort_by: 'asc',
                is_active: true
            },
            baseURL: apiUrl,
            credentials: 'include'
        })
        categories.value = response || { data: [] }
    } catch (error) {
        console.error('Error fetching categories:', error)
        $toast.error('Failed to fetch categories. Please try again.')
        categories.value = { data: [] }
    } finally {
        // loading.value = false
    }
}

const filteredCategories = computed(() => {
    const items = categories.value?.data ?? []
    if (!query.value) return items
    return items.filter(cat =>
        cat.name.toLowerCase().includes(query.value.toLowerCase())
    )
})

// Modal states  
const showModal = ref(false)
// Statistics
const totalCurrentProducts = computed(() => products.value.total_current_datas)
const totalRealProducts = computed(() => products.value.total_real_datas)
const totalActiveProducts = computed(() => products.value.total_active_datas)
const totalInactiveProducts = computed(() => products.value.total_inactive_datas)
const direction = computed(() => isDesc.value ? 'desc' : 'asc')
const selectAllProducts = () => {
    selectedProducts.value = products.value.data.map(cat => cat)
}
const clearSelectAllProducts = () => {
    selectedProducts.value = []
    showButtonDeleteSelectedItems.value = false
}
// watch for search and filter changes
watch([selectedStatusFilter, selectedSortByFilter, selectedPageSizeFilter, search, isDesc], () => {
    fetchProducts()
})
watch(selectedProducts, (newSelectedProducts) => {
    if (newSelectedProducts.length > 0) {
        showButtonDeleteSelectedItems.value = true
    } else {
        showButtonDeleteSelectedItems.value = false
    }
})
const resetForm = () => {
    isCreateNewProduct.value = true
    productForm.value = {
        id: 0,
        name: '',
        description: '',
        price: 0,
        stock: 0,
    }
    productImages.value = []
    selectedCategory.value = null
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
const createNewProduct = async () => {
    try {
        let message = '';
        loading.value = true
        const formData = new FormData()
        formData.append('name', productForm.value.name)
        if (selectedCategory.value.id == 0) {
            alert('Please select a category for the product.')
        }
        formData.append('category_id', selectedCategory.value.id)
        formData.append('description', productForm.value.description)
        formData.append('price', productForm.value.price)
        formData.append('stock', productForm.value.stock)

        if (isCreateNewProduct.value) {
            if (productImages.value.length > 0) {
                productImages.value.forEach(image => {
                    if (image.file) {
                        formData.append('images', image.file)
                        formData.append('positions', image.position)
                    }
                })
            }

            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`)
            })

            await $fetch('/products', {
                method: 'POST',
                body: formData,
                baseURL: apiUrl,
                credentials: 'include'
            })
            message = 'Product created successfully!'
        } else {
            if (productImages.value.length > 0) {
                productImages.value.forEach(image => {
                    if (image.is_current) {
                        formData.append('current_images', image.id)
                        formData.append('current_positions', image.position)
                    } else {
                        formData.append('new_images', image.file)
                        formData.append('new_positions', image.position)
                    }
                })
            }

            // formData.forEach((value, key) => {
            //     console.log(`${key}: ${value}`)
            // })

            await $fetch(`/products/${productForm.value.id}`, {
                method: 'PUT',
                body: formData,
                baseURL: apiUrl,
                credentials: 'include'
            })
            console.log('Updating product with ID:', productForm.value.id)
            message = 'Product updated successfully!'
        }
        fetchProducts()
        $toast.success(message)
        closeModal()
    } catch (error) {
        console.error('Error creating product:', error)
        $toast.error('Failed to create product. Please try again.')
    } finally {
        loading.value = false
    }
}
const showModalDeleteSelectedItems = () => {
    isDeleteModalOpen.value = true
}
const closeDeleteModal = () => {
    isDeleteModalOpen.value = false
}
// Pagination functions
const previousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--
    }
    fetchProducts()
}
const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++
    }
    fetchProducts()
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
// Fetch products from API
const fetchProducts = async () => {
    try {
        loading.value = true
        const response = await $fetch(`/products?is_active=${selectedStatusFilter.value.value || ''}&per_page=${selectedPageSizeFilter.value.value}&page=${currentPage.value}&search=${search.value}&sort_by=${direction.value}&column=${selectedSortByFilter.value.value}`, {
            baseURL: apiUrl,
            credentials: 'include'
        })
        products.value = response
        if (!products.value.data || products.value.data.length === 0) {
            $toast.info('No products found')
            return
        } else {
            products.value.data.filter(product => !product.deleted_at).
                forEach(product => {
                    // Format product image URL
                    product.images.forEach(image => {
                        if (image.file_name) {
                            image.image = `${apiUrl}/image/products/${image.file_name}`
                            image.is_current = true
                        }
                    })
                    product.images.sort((a, b) => a.position - b.position)
                    if (product.is_active) {
                        product.status = 'active'
                    } else {
                        product.status = 'inactive'
                    }
                })
        }
        dataPerPages.value = response.data_per_pages
        currentPage.value = response.current_pages
        totalPages.value = response.total_pages
        await nextTick()
        initializeIndices()
        initializeSwipers()
    } catch (error) {
        console.error('Error fetching products:', error)
        $toast.error('Failed to load products')
    } finally {
        loading.value = false
    }
}
const deleteSelectedCategories = async () => {
    try {
        loading.value = true
        let ids = selectedProducts.value.map(product => product.id)
        ids = ids.join(',')
        await $fetch(`/products?ids=${ids}`, {
            method: 'DELETE',
            body: { ids },
            baseURL: apiUrl,
            credentials: 'include'
        })
        $toast.success('Selected products deleted successfully!')
        closeDeleteModal()
        fetchProducts()
        selectedProducts.value = []
    } catch (error) {
        console.error('Error deleting products:', error)
        $toast.error('Failed to delete selected products')
    } finally {
        loading.value = false
    }
}
const deleteProduct = (product) => {
    selectedProducts.value = []
    isDeleteModalOpen.value = true
    selectedProducts.value = [product]
}
// Keyboard shortcuts
const handleKeydown = (event) => {
    // Ctrl/Cmd + N to create new product
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
    fetchProducts()
    document.addEventListener('keydown', handleKeydown)
})
onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
    swiperInstances.value.forEach(instance => {
        if (instance && instance.destroy) {
            instance.destroy()
        }
    })
})
const swiperElements = ref([])
const swiperInstances = ref([])
const currentIndices = ref([])
const initializeSwipers = async () => {
    await nextTick()
    if (!products.value?.data) return
    products.value.data.forEach((_, index) => {
        if (!swiperElements.value[index]) return
        const instance = new Swiper(swiperElements.value[index], {
            modules: [Autoplay, EffectFade],
            loop: true,
            effect: "fade",
            fadeEffect: {
                crossFade: true,
            },
            speed: 1000,
            on: {
                slideChange: (swiper) => {
                    currentIndices.value[index] = swiper.realIndex
                },
            },
        })
        swiperInstances.value[index] = instance
    })
}
const goToSlide = (productIndex, slideIndex) => {
    const swiper = swiperInstances.value[productIndex]
    if (swiper) {
        swiper.slideToLoop(slideIndex)
    }
}
// Di dalam fetchProducts atau setelah data products didapat
const initializeIndices = () => {
    currentIndices.value = new Array(products.value.data.length).fill(0)
}
</script>
