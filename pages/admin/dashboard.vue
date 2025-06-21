<template lang="">
    <div>
        Ini halaman dashboard admin
    </div>
    <hr>
    <div>
    <p>Count: {{ counter.count }}</p>
    <button @click="counter.increment">Increment</button>
  </div>
</template>
<script setup>
const counter = useCounterStore()

definePageMeta({
    layout: "admin",
    middleware: ['auth']
});

const currentUserStore = useUserStore()

</script>
<style lang="">
    
</style>