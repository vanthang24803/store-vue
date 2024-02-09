<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Card from '@/components/Card.vue';
import Spinner from "@/components/Spinner.vue";

let products = ref([]);
let isLoading = ref(false);
let category = ref("Manga");

onMounted(async () => {
    try {
        isLoading.value = true;
        const response = await axios.get(`http://localhost:6002/api/product?Category=${category.value}`);
        products.value = response.data;
    }
    catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
});
</script>


<template>
  <div class="my-12 py-6 px-4 bg-neutral-100/90 min-h-screen">
    <Spinner v-if="isLoading" />
    <div v-else class="grid lg:grid-cols-6 grid-cols-2 gap-4">
      <Card v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>


