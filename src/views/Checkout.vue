<script setup>
import { ref } from 'vue';
import { useHead } from '@unhead/vue'
import MobileCart from '@/components/MobileCart.vue';
import { codPrice } from "@/constant"
import { useCartStore } from '@/store/cart';
import { ChevronRight } from 'lucide-vue-next';
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Payment from '@/components/Payment.vue';
import Method from '@/components/Method.vue';


useHead({
    title: "Thanh toán | AMAK Store"
});




const formSchema = toTypedSchema(z.object({
    email: z.string().min(1),
    name: z.string().min(1),
    numberPhone: z.string().min(1),
    address: z.string().min(1),
}))

const form = useForm({
    validationSchema: formSchema,
})

const cart = useCartStore();

const sendChecked = ref(true);
const storeChecked = ref(false);

const payment = ref('cod');

const totalPrice = cart.items.reduce((total, item) => {
    return (
        total +
        (item.product.options[0].price -
            (item.product.options[0].price * item.product.options[0].sale) / 100) *
        item.quantity
    );
}, 0);

const priceCod = totalPrice + codPrice;


const handleBankChange = (paymentType) => {
    payment.value = payment.value === paymentType ? 'cod' : paymentType;
};


const handleCheckboxChange = (checkboxType) => {
    if (checkboxType === "send") {
        sendChecked.value = !sendChecked.value;
        storeChecked.value = false;
        payment.value = "cod";
    } else if (checkboxType === "store") {
        storeChecked.value = !storeChecked.value;
        sendChecked.value = false;
        payment.value = null;
    }
};

const onSubmit = form.handleSubmit((values) => {
    console.log(values);
});


</script>

<template>
    <div class="flex flex-col lg:flex-row lg:container mx-auto">
        <div class="flex flex-col space-y-3 p-8">
            <RouterLink to="/" class="font-bold text-2xl tracking-tight">AMAK Store</RouterLink>
            <div class="md:hidden">
                <MobileCart :ship="sendChecked" :total-price="totalPrice" :price-cod="priceCod" />
            </div>
            <div class="flex items-center space-x-3 text-[12px] text-neutral-500 font-medium">
                <RouterLink to="/cart">Giỏ hàng</RouterLink>
                <ChevronRight class="w -4 h-4" />
                <span>Thông tin giao hàng</span>
            </div>

            <span class="font-bold text-xl tracking-tight">Thông tin giao hàng</span>

            <form @submit="onSubmit" class="w-full lg:w-[500px] flex flex-col space-y-3">
                <FormField v-slot="{ componentField }" name="name">
                    <FormItem>
                        <FormControl>
                            <Input type="text" placeholder="Họ và tên" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="email">
                    <FormItem>
                        <FormControl>
                            <Input type="email" placeholder="Email" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="numberPhone">
                    <FormItem>
                        <FormControl>
                            <Input type="text" placeholder="Số điện thoại" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <Method :handle-checkbox-change="handleCheckboxChange" :send-checked="sendChecked"
                    :store-checked="storeChecked" />

                <Payment :payment="payment" :handle-bank-change="handleBankChange" />

                <Button type="submit">
                    Hoàn tất đơn hàng
                </Button>
            </form>
        </div>
    </div>
</template>