<script setup>
import { Separator } from 'radix-vue';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Container from '@/components/ui/Container.vue';
import { useHead } from '@unhead/vue';
import { useAuthStore } from '@/store/auth';
import ProfileBar from '@/components/profile/ProfileBar.vue';
import { ShoppingBasket } from 'lucide-vue-next';
import { statusList } from '@/constant'
import { price } from '@/lib/format';
import { Button } from '@/components/ui/button'
import { _http } from '@/lib/api';

const orders = ref([]);

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();

const fetchData = async () => {
    try {
        const response = await _http.get(`/api/order/${route.params.id}/user`,
            { headers: { Authorization: `Bearer ${auth.token}` } }
        );
        orders.value = response.data;
    }
    catch (error) {
        console.error(error);
    }
}

onMounted(fetchData);


useHead({
    title: `Đơn hàng - AMAK Store`
})



</script>

<template>
    <Container>
        <div class="flex flex-col space-y-8">
            <div class="flex items-center justify-center flex-col  space-y-4">
                <h1 class="text-2xl  font-bold tracking-tighter">Đơn hàng của bạn</h1>
                <Separator class="h-1 bg-black rounded w-[100px] " />
            </div>
        </div>

        <div class="flex flex-col lg:flex-row  md:px-12 px-4 space-y-4 mt-4 lg:space-y-0">
            <ProfileBar />
            <div class="flex flex-col space-y-4 w-full bg-white p-4 rounded-md">
                <h2 class="uppercase font-semibold">THÔNG TIN ĐƠN HÀNG</h2>
                <div class="flex flex-col space-y-3" v-show="orders">
                    <div class="border border-neutral-200 w-full rounded-md p-4 flex flex-col space-x-2"
                        v-for="(item, index) in orders" :key="index" v-if="orders.length > 0">
                        <div
                            class="flex lg:flex-row flex-col lg:items-center lg:justify-between space-y-2 lg:space-y-0 mb-2">
                            <div class="flex lg:flex-row flex-col lg:items-center lg:space-x-2">
                                <h1>Mã vận đơn:</h1>
                                <span class="font-semibold">{{ item.id }}</span>
                            </div>
                            <div class="flex lg:flex-row flex-col lg:items-center lg:space-x-2">
                                <span>Trạng thái:</span>
                                <span className="font-semibold text-[#417505]">
                                    {{ statusList[item.status] }}
                                </span>
                            </div>
                        </div>
                        <Separator />

                        <div class="flex flex-col space-y-2">
                            <div class="flex flex-col space-y-4 my-4" v-for="(item, index) in item.products" :key="index">
                                <div class="flex flex-col space-y-2 text-sm hover:cursor-pointer">
                                    <div class="flex space-x-4">
                                        <img :src="item.thumbnail" :alt="item.name"
                                            className="w-[20%] md:w-[10%] object-cover"
                                            @click="router.push({ path: `/product/${item.productId}` })" />
                                        <div class="flex flex-col w-full">
                                            <div class="flex items-center justify-between ">
                                                <RouterLink :to="`/product/${item.productId}`" target="_blank">{{ item.name
                                                }}</RouterLink>
                                            </div>
                                            <span class="text-neutral-500 text-[13px]">
                                                {{ item.option }}
                                            </span>
                                            <div class="flex items-center justify-between">
                                                <div class="flex flex-col space-y-2">
                                                    <span class="text-neutral-500 ">
                                                        x{{ item.quantity }}
                                                    </span>
                                                    <Button variant="secondary"  size="icon" class="text-[12px]">
                                                        {{ item.sale }}%
                                                    </Button>
                                                </div>
                                                <span class="text-lg text-neutral-800">
                                                    {{ price(item.price) }}₫
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Separator />
                        <div class="text-right text-sm">
                            <p>Tổng tiền: <b class="text-xl font-bold text-[#ee4d2d]">
                                    {{ price(item.totalPrice) }}₫
                                </b></p>
                        </div>
                    </div>
                    <div v-else class="flex items-center justify-center flex-col">
                        <ShoppingBasket class="w-24 h-24" stroke-width="1.25" />
                        <h2 class="font-medium tracking-tight">Kho hàng trống</h2>
                    </div>
                </div>
            </div>
        </div>
    </Container>
</template>