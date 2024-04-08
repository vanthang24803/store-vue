<script setup>
import { ref, onMounted } from 'vue'
import { useTitle } from '@vueuse/core'
import { get } from '@/lib/api';
import Card from '@/components/card/Card.vue';
import { ChevronRight } from 'lucide-vue-next';

useTitle("Sách bán chạy - AMAK Store")

const products = ref([])

const fetchProducts = async () => {
   try {
      const response = await get(`/api/product/selling`);

      if (response.status === 200) {
         products.value = response.data;
      }
   } catch (error) {
      console.log(error)
   }
}

onMounted(fetchProducts);

</script>

<template>
   <div class="py-16 bg-[#F5F5FA]">
      <div class="flex flex-col space-y-4 container">
         <div className="flex items-center space-x-3 text-sm font-medium my-4">
            <RouterLink to="/" class="text-neutral-500">Trang chủ</RouterLink>
            <ChevronRight class="w-4 h-4" />
            <span>Sách bán chạy</span>
         </div>
         <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <Card :product="item" v-for="(item, index) in products" :key="index" />
         </div>
      </div>
   </div>
</template>