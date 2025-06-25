<template>
    <head>
        <Title>Admin Dashboard - {{ appSettingStore.settings.data.app_name }}</Title>
        <Link rel="icon" type="image/x-icon" href="favicon.ico" />
    </head>
    <div class="p-6 bg-gray-50">
        <!-- Header Welcome -->
        <div class="mb-8">
            <!-- <h1 class="text-2xl font-bold text-gray-800">Welcome back, {{ currentUser.name }}!</h1> -->
            <p class="text-gray-600">Here's what's happening with Seblak Bombom today.</p>
        </div>

        <!-- Statistik Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <!-- Total Orders Card -->
            <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500">Total Orders</p>
                        <h3 class="text-2xl font-bold text-gray-700">1,234</h3>
                    </div>
                    <div class="p-3 bg-orange-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-600" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                </div>
                <p class="mt-2 text-green-600 text-sm flex items-center">
                    <span class="text-green-500 mr-1">↑</span> 12% from last month
                </p>
            </div>

            <!-- Total Revenue Card -->
            <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500">Revenue</p>
                        <h3 class="text-2xl font-bold text-gray-700">Rp 4,567K</h3>
                    </div>
                    <div class="p-3 bg-green-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
                <p class="mt-2 text-green-600 text-sm flex items-center">
                    <span class="text-green-500 mr-1">↑</span> 8% from last month
                </p>
            </div>

            <!-- Total Products Card -->
            <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500">Total Products</p>
                        <h3 class="text-2xl font-bold text-gray-700">45</h3>
                    </div>
                    <div class="p-3 bg-purple-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                        </svg>
                    </div>
                </div>
                <p class="mt-2 text-purple-600 text-sm flex items-center">
                    <span>Active products</span>
                </p>
            </div>

            <!-- Total Users Card -->
            <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500">Total Customers</p>
                        <h3 class="text-2xl font-bold text-gray-700">892</h3>
                    </div>
                    <div class="p-3 bg-blue-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                </div>
                <p class="mt-2 text-blue-600 text-sm flex items-center">
                    <span class="text-blue-500 mr-1">↑</span> 24 new today
                </p>
            </div>
        </div>

        <!-- Charts Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <!-- Sales Chart -->
            <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-lg font-semibold text-gray-700">Sales Overview</h2>
                    <div class="flex space-x-2">
                        <button
                            class="px-3 py-1 text-sm bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200">Weekly</button>
                        <button
                            class="px-3 py-1 text-sm bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200">Monthly</button>
                        <button
                            class="px-3 py-1 text-sm bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200">Yearly</button>
                    </div>
                </div>
                <div class="h-80">
                    <Bar :data="chartData" :options="chartOptions" />
                </div>
            </div>

            <!-- Popular Products -->
            <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 class="text-lg font-semibold text-gray-700 mb-4">Popular Products</h2>
                <div class="space-y-4">
                    <div v-for="product in popularProducts" :key="product.id"
                        class="flex items-center space-x-4 p-2 hover:bg-gray-50 rounded-lg">
                        <img :src="product.image" :alt="product.name" class="w-12 h-12 rounded-lg object-cover">
                        <div class="flex-1">
                            <h3 class="text-sm font-medium text-gray-800">{{ product.name }}</h3>
                            <p class="text-sm text-gray-500">{{ product.orders }} orders</p>
                        </div>
                        <div class="text-right">
                            <p class="text-sm font-medium text-gray-800">Rp {{ product.price }}</p>
                            <p class="text-xs text-gray-500">In stock: {{ product.stock }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Orders Table -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="p-6">
                <h2 class="text-lg font-semibold text-gray-700 mb-4">Recent Orders</h2>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order
                                ID</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Customer</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Products</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="order in recentOrders" :key="order.id" class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{{ order.id }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="h-8 w-8 rounded-full bg-gray-200"></div>
                                    <div class="ml-4">
                                        <div class="text-sm font-medium text-gray-900">{{ order.customer }}</div>
                                        <div class="text-sm text-gray-500">{{ order.email }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ order.products }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Rp {{ order.total }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    :class="`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`">
                                    {{ order.status }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
  
<script setup>
definePageMeta({
    layout: "admin",
    middleware: ['auth']
});

import { ref, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
const config = useRuntimeConfig()
const apiUrl = config.public.apiUrl
const appSettingStore = useAppSettingStore()
const appName = computed(() =>
    appSettingStore.settings?.data?.app_name || 'Untitled App'
)

const faviconUrl = computed(() =>
    appSettingStore.settings?.data?.logo_filename
        ? `${apiUrl}/image/application/${appSettingStore.settings.data.logo_filename}`
        : '/favicon.ico'
)

useHead({
    title: `${appSettingStore.settings?.data?.app_name} - Admin Dashboard`,
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
});

// Chart Data
const chartData = ref({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        label: 'Sales',
        backgroundColor: '#60A5FA',
        data: [65, 59, 80, 81, 56, 55],
    }],
})

const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
    },
    scales: {
        y: {
            beginAtZero: true
        }
    }
})

// Sample Data
const popularProducts = ref([
    { id: 1, name: 'Seblak Original', orders: 125, price: '15.000', stock: 50, image: '/products/seblak-1.jpg' },
    { id: 2, name: 'Seblak Spesial', orders: 98, price: '20.000', stock: 30, image: '/products/seblak-2.jpg' },
    { id: 3, name: 'Seblak Tulang', orders: 89, price: '25.000', stock: 25, image: '/products/seblak-3.jpg' },
    { id: 4, name: 'Seblak Seafood', orders: 75, price: '30.000', stock: 20, image: '/products/seblak-4.jpg' },
])

const recentOrders = ref([
    { id: '1234', customer: 'John Doe', email: 'john@example.com', products: 'Seblak Original x2', total: '30.000', status: 'Completed' },
    { id: '1235', customer: 'Jane Smith', email: 'jane@example.com', products: 'Seblak Spesial x1', total: '20.000', status: 'Processing' },
    { id: '1236', customer: 'Bob Johnson', email: 'bob@example.com', products: 'Seblak Tulang x3', total: '75.000', status: 'Pending' },
])

// Utility function for order status colors
const getStatusColor = (status) => {
    const colors = {
        'Completed': 'bg-green-100 text-green-800',
        'Processing': 'bg-yellow-100 text-yellow-800',
        'Pending': 'bg-gray-100 text-gray-800',
        'Cancelled': 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
}

onMounted(() => {

});
</script>