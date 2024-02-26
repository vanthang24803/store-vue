<script setup>
import { useHead } from '@unhead/vue'
import MobileCart from '@/components/MobileCart.vue';
import { codPrice } from "@/constant"
import { useCartStore } from '@/store/cart';

useHead({
    title: "Thanh toán | AMAK Store"
});

const cart = useCartStore();


let sendChecked = true;

const totalPrice = cart.items.reduce((total, item) => {
    return (
        total +
        (item.product.options[0].price -
            (item.product.options[0].price * item.product.options[0].sale) / 100) *
        item.quantity
    );
}, 0);

const priceCod = totalPrice + codPrice;

</script>

<template>
    <div class="flex flex-col lg:flex-row lg:container mx-auto">
        <div class="flex flex-col space-y-3 p-8">
            <RouterLink to="/" class="font-bold text-2xl tracking-tight">AMAK Store</RouterLink>
            <div class="md:hidden">
                <MobileCart :ship="sendChecked" :total-price="totalPrice" :price-cod="priceCod" />
            </div>
        </div>
    </div>
</template>