<script setup>
import { RouterView } from 'vue-router';
import { Navbar, Footer } from '@/components/main';
import { useHead } from '@unhead/vue';
import { useAuthStore } from '@/store/auth';
import { watchEffect } from 'vue'


useHead({
  title: 'AMAK BOOKS | Sách là bạn'
})


const { checkExpiry } = useAuthStore();

watchEffect(() => {
  checkExpiry();
})

</script>

<template>
  <Navbar />
  <RouterView />
  <Footer />
</template>