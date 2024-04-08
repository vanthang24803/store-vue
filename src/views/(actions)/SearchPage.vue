<script setup>
import { ref, watchEffect } from 'vue';
import Container from '@/components/ui/Container.vue';
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import { Separator } from '@/components/ui/separator';
import Card from '@/components/card/Card.vue';
import Button from '@/components/ui/button/Button.vue';
import Spinner from '@/components/main/Spinner.vue';
import { get } from '@/lib/api';


const route = useRoute();

const search = route.query.product;

const products = ref([]);
const isLoading = ref(false);

watchEffect(async () => {
    try {
        isLoading.value = true;
        const response = await get(`/api/product?Name=${search}`);
        products.value = response.data;
    }
    catch (error) {
        console.error(error);
    }
    finally {
        isLoading.value = false;
    }
});


useHead({
  title: `Kết quả tìm kiếm cho "${search}" - AMAK Store`
})




</script>


<template>
    <Container>
        <div class="flex items-center justify-center flex-col space-y-1">
            <h1 class="text-3xl font-bold tracking-tight">Tìm kiếm</h1>
            <span class="text-sm">
                Có <b>{{ products.length || 0 }} sản phẩm</b> cho tìm kiếm
            </span>
            <div class="py-4 w-[80px] ">
                <Separator class="bg-black h-1" />
            </div>
        </div>

        <div class="my-4 flex flex-col space-y-2">
            <span class="text-sm">
                Kết quả tìm kiếm cho <b>"{{ search }}"</b>.
            </span>
            <div v-if="isLoading == false">
                <div v-if="products.length > 0" class="grid grid-cols-2 lg:grid-cols-5 gap-4 my-4">
                    <Card v-for="product in products" :key="product.id" :product="product" />
                </div>
                <div class="flex items-center justify-center flex-col space-y-2" v-else>
                    <img src="https://cdn-icons-png.flaticon.com/512/7486/7486803.png" className="w-[90%" />
                    <span class="tracking-tight font-medium">
                        Không tìm thấy sản phẩm có tên <b> "{{ search }}"</b> 
                    </span>
                </div>
                <div class="flex items-center justify-center w-full pt-4" v-show="products.length > 20">
                    <Button class="bg-[#417505] hover:bg-[#65b10d] w-[200px]">
                        Xem Thêm
                    </Button>
                </div>
            </div>
            <div class="h-[50vh] flex items-center justify-center" v-else>
                <Spinner />
            </div>
        </div>
    </Container>
</template>