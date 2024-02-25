<script setup>
import { ShoppingBag } from 'lucide-vue-next';
import { useCartStore } from '@/store/cart';
import { price, formatPrice } from "@/lib/format"
import UpdateCart from './UpdateCart.vue';

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

import { ScrollArea } from '@/components/ui/scroll-area'
import { X } from 'lucide-vue-next';
import { useRouter } from 'vue-router'
import { ShoppingBasket } from 'lucide-vue-next';

const router = useRouter();

const cart = useCartStore();


</script>

<template>
    <Sheet>
        <SheetTrigger>
            <div class="relative hover:cursor-pointer">
                <ShoppingBag class="w-6 h-6" />
                <div class="w-5 h-5 flex items-center justify-center rounded-full bg-red-500 absolute -top-2 -right-2">
                    <span class="text-white text-[12px]">
                        {{ cart.totalItems }}
                    </span>
                </div>
            </div>
        </SheetTrigger>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Giỏ Hàng</SheetTitle>
                <SheetDescription>
                    Số sản phẩm trong giỏ hàng: {{ cart.totalItems }}
                </SheetDescription>
            </SheetHeader>
            <div class="flex flex-col space-y-2 mt-4">
                <ScrollArea class="lg:h-[74vh] md:h-[82vh] h-[76vh] w-full">
                    <div class="flex items-center justify-center flex-col space-y-4 h-[50vh]" v-if="cart.totalItems == 0">
                        <ShoppingBasket class="w-20 h-20" />
                        <span class="text-muted-foreground text-sm">Hiện chưa có sản phẩm</span>
                    </div>
                    <div v-else>
                        <div v-for="(item, index) in cart.items" :key="index"
                            class="flex flex-col space-y-4 mb-4 text-sm hover:cursor-pointer">
                            <div class="flex space-x-4">
                                <img :src="item.product.thumbnail" :alt="item.product.name" class="w-[25%] object-cover" />
                                <div class="flex flex-col">
                                    <div class="relative w-[220px]">
                                        <span
                                            class="text-xs text-muted-foreground line-clamp-2 flex-grow min-w-0 overflow-hidden text-overflow-ellipsis">
                                            {{ item.product.name }}
                                        </span>
                                        <X class="w-4 h-4 absolute top-0 -right-4" @click="cart.removeItem(
                                            item.product.id,
                                            item.product.options[0].id
                                        )" />
                                    </div>
                                    <span class="text-neutral-400 text-[12px]">
                                        {{ item.product.options[0].name }}
                                    </span>
                                    <div class="flex items-center justify-between my-2">
                                        <UpdateCart :product-id="item.product.id" :optionId="item.product.options[0].id"
                                            :quantity="item.quantity" />
                                    </div>
                                    <div class="flex items-center space-x-5">
                                        <span class="font-semibold">
                                            {{ formatPrice(
                                                item.product.options[0].price,
                                                item.product.options[0].sale
                                            ) }}₫
                                        </span>
                                        <span v-if="item.product.options[0].sale > 0"
                                            class="text-[12px] line-through hidden md:block">
                                            {{ price(item.product.options[0].price) }}₫
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
                <Separator />
                <div class="flex items-center justify-between">
                    <span class="text-lg font-semibold uppercase">Tổng tiền:</span>
                    <span class="font-bold text-rose-500">
                        {{ cart.totalPrice }}
                    </span>
                </div>
                <Button class="bg-black" @click="router.push({ path: '/check-out' })">
                    Thanh toán
                </Button>
            </div>
        </SheetContent>
    </Sheet>
</template>