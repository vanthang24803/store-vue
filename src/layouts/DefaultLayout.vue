<script setup>
import { RouterView } from 'vue-router';
import { Navbar, Footer } from '@/components/main';
import { useHead } from '@unhead/vue';


useHead({
  title: 'AMAK BOOKS | Sách là bạn'
})


</script>

<template>
    <Navbar />
    <RouterView />
    <Footer />
</template>