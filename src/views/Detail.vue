<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Spinner from "@/components/Spinner.vue"
import { RouterLink } from 'vue-router';
import { ChevronRight } from 'lucide-vue-next';
import DetailCard from '@/components/DetailCard.vue';

const product = ref(null);
const isLoading = ref(false);

onMounted(async () => {
    const route = useRoute();
    try {
        isLoading.value = true;
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/product/${route.params.id}`);
        product.value = response.data;
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
        <div class="md:max-w-screen-xl mx-auto flex flex-col space-y-6">
            <Spinner v-if="isLoading" />
            <div v-else>
                <div class="flex flex-col space-y-4">
                    <div class="hidden md:flex items-center text-sm space-x-4 text-neutral-800 hover:cursor-pointer">
                        <RouterLink to="/">Trang chủ</RouterLink>
                        <ChevronRight :size="20" />
                        <RouterLink to="/">Sách mới</RouterLink>
                        <ChevronRight :size="20" />
                        <span>{{ product?.name }}</span>
                    </div>

                    <DetailCard :product="product" />
                </div>
            </div>
        </div>
    </div>
</template>
