<script setup>
import { RouterView } from 'vue-router';
import Toaster from '@/components/ui/toast/Toaster.vue'

</script>

<template>
  <main>
    <RouterView />
    <Toaster />
  </main>
</template>


