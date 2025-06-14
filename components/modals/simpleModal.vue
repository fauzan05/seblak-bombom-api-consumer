<template>
    <Teleport to="body">
        <Transition name="modal" @after-leave="afterLeave">
            <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div class="bg-white rounded-xl shadow-xl w-full" :class="maxWidthClass">
                    <div class="relative p-6">
                        <button @click="close" class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl">
                            &times;
                        </button>
                        <h2 v-if="title" class="text-xl font-semibold mb-4">{{ title }}</h2>
                        <div>
                            <slot />
                        </div>
                        <div v-if="showFooter" class="mt-6 flex justify-end gap-2">
                            <button @click="close"
                                class="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100">Batal</button>
                            <button @click="confirm"
                                class="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>
  
<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
    modelValue: Boolean,
    title: String,
    showFooter: { type: Boolean, default: true },
    maxWidth: { type: String, default: 'md' }, // 'sm', 'md', 'lg', 'xl', '2xl'
})

const emit = defineEmits(['update:modelValue', 'confirm'])

const visible = ref(false)

watch(() => props.modelValue, (val) => {
    visible.value = val
    document.body.style.overflow = val ? 'hidden' : ''
})

const maxWidthClass = computed(() => {
    return {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
    }[props.maxWidth] ?? 'max-w-md'
})

const close = () => {
    visible.value = false
}

const afterLeave = () => {
    emit('update:modelValue', false)
}

const confirm = () => {
    emit('confirm')
    close()
}
</script>
  
<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: translateY(30px) scale(0.97);
}

.modal-enter-to,
.modal-leave-from {
    opacity: 1;
    transform: translateY(0) scale(1);
}
</style>
  