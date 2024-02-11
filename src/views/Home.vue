<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Card from '@/components/Card.vue';
import Spinner from "@/components/Spinner.vue";
import Billboard from '@/components/Billboard.vue';
import Button from '@/components/ui/button/Button.vue';
import Container from '@/components/ui/Container.vue';
import Categories from '@/components/Categories.vue';

let products = ref([]);
let isProductLoading = ref(false);
let isBillboardLoading = ref(false);
let billboards = ref([]);

onMounted(async () => {
  try {
    isProductLoading.value = true;
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/product`);
    products.value = response.data;
  }
  catch (error) {
    console.error(error);
  } finally {
    isProductLoading.value = false;
  }
});

onMounted(async () => {
  try {
    isBillboardLoading.value = true;
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/product/billboard`);
    billboards.value = response.data;
  }
  catch (error) {
    console.error(error);
  } finally {
    isBillboardLoading.value = false;
  }
});

</script>


<template>
  <Container>
    <div class="w-full rounded-md flex items-center justify-center border-neutral-400 min-h-[20vh]">
      <Spinner v-if="isBillboardLoading" />
      <Billboard :billboards="billboards" v-else />
    </div>
    <Categories />
    <div class="flex flex-col space-y-4">
      <h2 class="text-2xl font-bold tracking-tight uppercase mt-8 lg:mt-0">Sản phẩm mới cập nhật</h2>
      <div>
        <Spinner v-if="isProductLoading" />
        <div class="flex items-center justify-center flex-col space-y-8" v-else>
          <div class="grid lg:grid-cols-6 grid-cols-2 gap-4">
            <Card v-for="product in products" :key="product.id" :product="product" />
          </div>

          <Button size="lg">Xem Thêm</Button>
        </div>
      </div>
    </div>
  </Container>
</template>


