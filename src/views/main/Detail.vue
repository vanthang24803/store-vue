<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import Spinner from "@/components/main/Spinner.vue";
import { RouterLink } from "vue-router";
import { ChevronRight } from "lucide-vue-next";
import DetailCard from "@/components/card/DetailCard.vue";
import Introduce from "@/components/card/Introduce.vue";
import Suggest from "@/components/card/Suggest.vue";
import { useHead } from "@unhead/vue";

import { Reviews } from "@/components/reviews";
import { decodeSlug } from "@/lib/slug";
import { fetchDetailProduct } from "@/api/product";

const product = ref(null);
const isLoading = ref(false);
const route = useRoute();

const fetchProduct = async () => {
  try {
    isLoading.value = true;
    product.value = await fetchDetailProduct(route.params.id);

    useHead({
      title: `${product.value.name} | AMAK Store`,
    });
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchProduct);

watch(() => route.params.id, fetchProduct);
</script>

<template>
  <div class="my-12 py-6 px-4 bg-neutral-100/90 min-h-screen">
    <div class="md:max-w-screen-xl mx-auto flex flex-col space-y-6">
      <Spinner v-if="isLoading" />
      <div v-else>
        <div class="flex flex-col space-y-4" v-if="product">
          <div
            class="hidden md:flex items-center text-sm space-x-4 text-neutral-800 hover:cursor-pointer"
          >
            <RouterLink to="/">Trang chủ</RouterLink>
            <ChevronRight :size="20" />
            <RouterLink to="/collections/sach-moi">Sách mới</RouterLink>
            <ChevronRight :size="20" />
            <span>{{ product.name }}</span>
          </div>

          <DetailCard :product="product" />
          <Introduce v-if="product" :data="product" />
          <Reviews :productId="`${decodeSlug(route.params.id)}`" />
          <Suggest :category="product.categories[0].name" />
        </div>
      </div>
    </div>
  </div>
</template>
