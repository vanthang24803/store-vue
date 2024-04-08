<script setup>
import { useHead } from '@unhead/vue'
import { RouterLink } from 'vue-router';
import { useCartStore } from '@/store/cart';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X } from 'lucide-vue-next';
import UpdateCart from '@/components/cart/UpdateCart.vue';
import { formatPrice, price } from '@/lib/format';
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router'

const router = useRouter();

const cart = useCartStore();
useHead({
    title: "Giỏ hàng | AMAK Store"
});


</script>

<template>
    <main class="my-12 py-6 px-4 bg-neutral-100/90 min-h-screen">
        <div class="md:container">
            <p class="py-2 flex items-center space-x-3 text-sm">
                <RouterLink to="/">Trang chủ</RouterLink>
                <span>/</span>
                <span>Giỏ hàng ({{ cart.totalItems }})</span>
            </p>

            <div class="flex lg:flex-row flex-col justify-between lg:space-x-4 w-full">
                <div class="lg:w-2/3 w-full  bg-white rounded p-4 flex flex-col space-y-3">
                    <h1 class="text-xl font-bold">Giỏ hàng của bạn</h1>
                    <Separator />
                    <span>
                        Bạn đang có <b>{{ cart.totalItems }} sản phẩm</b> trong giỏ hàng
                    </span>

                    <div class="w-full rounded-md border border-neutral-200 p-2">
                        <ScrollArea class="h-[50vh]">
                            <div class="flex flex-col space-y-4 my-4 w-full" v-for="(item, index) in cart.items"
                                :key="index">
                                <div class="flex flex-col space-y-2 text-sm hover:cursor-pointer">
                                    <div class="flex md:space-x-8 space-x-4">
                                        <RouterLink :to="`/product/${item.product.id}`" target="_blank"
                                            class="w-[20%] md:w-[15%]">
                                            <img :src="item.product.thumbnail" :alt="item.product.name"
                                                class="object-cover" />
                                        </RouterLink>
                                        <div class="flex flex-col w-full">
                                            <div class="flex items-start justify-between">
                                                <RouterLink :to="`/product/${item.product.id}`" target="_blank"
                                                    class="font-medium">
                                                    <span> {{ item.product.name }}</span>
                                                </RouterLink>
                                                <X class="md:mx-4 w-4 h-4" @click="cart.removeItem(
                    item.product.id,
                    item.product.options[0].id
                )" />
                                            </div>

                                            <span class="text-neutral-500 text-[12px]">
                                                {{ item.product.options[0].name }}
                                            </span>

                                            <div class="flex items-center justify-between my-2">
                                                <UpdateCart :product-id="item.product.id"
                                                    :optionId="item.product.options[0].id" :quantity="item.quantity" />
                                                <div class="flex items-center space-x-2 md:mx-4">
                                                    <span class="font-bold text-rose-500">
                                                        {{ formatPrice(
                    item.product.options[0].price,
                    item.product.options[0].sale
                ) }} ₫
                                                    </span>

                                                    <span v-show="item.product.options[0].sale > 0"
                                                        class="text-[12px] line-through hidden md:block">{{
                    price(item.product.options[0].price) }} ₫</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>
                    </div>


                    <span class="text-sm font-bold py-3">
                        Ghi chú đơn hàng
                    </span>

                    <Textarea role="60" cols="10" class="w-full rounded-md border border-neutral-200 p-4" />
                </div>
                <div class="lg:w-1/3 w-full lg:h-[38vh]  bg-white rounded p-4 flex flex-col space-y-3">
                    <h1 class="text-xl font-bold">Giỏ hàng của bạn</h1>
                    <Separator />
                    <div class="flex items-center justify-between">
                        <h2 class="text-base font-bold">Tổng tiền:</h2>
                        <p class="text-2xl font-bold text-[#ff0000]">{{ cart.totalPrice }}</p>
                    </div>
                    <Separator />

                    <ul class="text-sm text-neutral-600 space-y-1 pb-4">
                        <li>Đổi trả sản phẩm trong 7 ngày do lỗi sản xuất.</li>
                        <li>Sản phẩm còn đủ tem mác, chưa qua sử dụng.</li>
                    </ul>
                    <Button variant="destructive" class="bg-[#ff0000] uppercase font-semibold"
                        @click="router.push({ path: '/check-out' })">
                        Thanh toán
                    </Button>
                </div>
            </div>
        </div>
    </main>
</template>