<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import Card from '@/components/card/Card.vue';
import Spinner from "@/components/main/Spinner.vue";
import Billboard from '@/components/main/Billboard.vue';
import Container from '@/components/ui/Container.vue';
import Categories from '@/components/main/Categories.vue';
import BottomPagination from '@/components/main/BottomPagination.vue';
import { subBillboard } from "@/constant"
import { _http } from '@/lib/api';
import Blog from '@/components/main/Blog.vue';
import SkeletonLoading from '@/components/loading/SkeletonLoading.vue';


let products = ref([]);
let isProductLoading = ref(false);
let isBillboardLoading = ref(false);
let billboards = ref([]);
let currentPage = ref(1);
let totalProducts = ref(0);

const fetchProducts = async () => {
  try {
    isProductLoading.value = true;
    const response = await _http.get(`/api/product?Page=${currentPage.value} `);

    totalProducts.value = response.data.length;
    products.value = response.data.slice((currentPage.value - 1) * 10, currentPage.value * 10)

  }
  catch (error) {
    console.error(error);
  } finally {
    isProductLoading.value = false;
  }
}


watchEffect(async () => {
  fetchProducts();
});

const changePage = (number) => {
  currentPage.value = number;
  fetchProducts();
}

onMounted(async () => {
  try {
    isBillboardLoading.value = true;
    const response = await _http.get(`/api/product/billboard`);
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
      <div class="flex items-center justify-between space-x-2">
        <Spinner v-if="isBillboardLoading" />
        <div class="flex" v-else>
          <Billboard :billboards="billboards" />
          <div class="hidden lg:flex flex-col space-y-4">
            <div v-for="(item, index) in subBillboard" :key="index" class="hover:cursor-pointer rounded-md">
              <img :src="item.thumbnail" :alt="item.name" class="rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Categories />
    <div class="flex flex-col space-y-4">
      <h2 class="text-2xl font-bold tracking-tight uppercase  lg:mt-0">Sản phẩm mới cập nhật</h2>
      <div>
       <SkeletonLoading  v-if="isProductLoading" :items="10" />
          <div class="flex items-center justify-center flex-col space-y-8" v-else>
          <div class="grid lg:grid-cols-5 grid-cols-2 gap-4 lg:gap-6">
            <Card v-for="product in products" :key="product.id" :product="product" />
          </div>

          <BottomPagination  :currentPage="currentPage" :total="totalProducts" :changePage="changePage" />
        </div>
      </div>
    </div>
    <Blog />
  </Container>
</template>
