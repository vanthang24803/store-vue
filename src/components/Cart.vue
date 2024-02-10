<script setup>
import { ShoppingBag } from 'lucide-vue-next';
import { useCartStore } from '@/store/cart';
import { price, formatPrice } from "@/lib/format"

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
                <ScrollArea class="lg:h-[74vh] h-[78vh] w-full">
                    <div v-for="(item, index) in cart.items" :key="index"
                        class="flex flex-col space-y-4 mb-4 text-sm hover:cursor-pointer">
                        <div class="flex space-x-4">
                            <img :src="item.product.thumbnail" :alt="item.product.name" class="w-[25%] object-cover" />
                            <div className="flex flex-col">
                                <div className="flex items-center space-x-5">
                                    <span className="text-xs text-muted-foreground line-clamp-2">
                                        {{ item.product.name }}
                                    </span>
                                    <X className="w-1 h-1" @click="cart.removeItem(
                                        item.product.id,
                                        item.product.options[0].id
                                    )" />
                                </div>
                                <span className="text-neutral-400 text-[12px]">
                                            {{ item.product.options[0].name }}
                                </span>
                                <div className="flex items-center space-x-5">
                                    <span className="font-semibold ">
                                        {{ formatPrice(
                                            item.product.options[0].price,
                                            item.product.options[0].sale
                                        ) }}₫
                                    </span>
                                    <span className="text-[12px] line-through hidden md:block">
                                        {{ price(item.product.options[0].price) }}₫
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
                <Separator />
                <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold uppercase">Tổng tiền:</span>
                    <span className="font-bold text-rose-500">
                        {{ cart.totalPrice }}
                    </span>
                </div>
                <Button class="bg-black">
                    Thanh toán
                </Button>
            </div>
        </SheetContent>
    </Sheet>
</template>