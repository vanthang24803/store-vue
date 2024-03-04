<script setup>
import { ref, watchEffect , onMounted } from 'vue';
import axios from 'axios';
import * as z from 'zod'
import { useHead } from '@unhead/vue'
import MobileCart from '@/components/MobileCart.vue';
import { codPrice } from "@/constant"
import { useCartStore } from '@/store/cart';
import { ChevronRight } from 'lucide-vue-next';
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useRouter , useRoute } from 'vue-router'

import { Button } from '@/components/ui/button'
import { Check, MapPin, Package2 } from 'lucide-vue-next';
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import Payment from '@/components/Payment.vue';
import { info } from '@/constant';
import OrderDetail from '@/components/OrderDetail.vue';
import { useToast } from '@/components/ui/toast/use-toast'
import { useAuthStore } from '@/store/auth';
import Separator from '@/components/ui/separator/Separator.vue';
import SelectAddress from '@/components/SelectAddress.vue';

const { toast } = useToast();


useHead({
    title: "Thanh toán | AMAK Store"
});

const router = useRouter();
const auth = useAuthStore();
const profile = ref();
const loading = ref(false);

const uuid = self.crypto.randomUUID();

const formSchema = toTypedSchema(z.object({
    email: z.string().min(1),
    name: z.string().min(1),
    numberPhone: z.string().min(1),
    address: z.string().min(1),
}))

const form = useForm({
    validationSchema: formSchema,
})

const fetchData = async () => {
   try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile/${auth.user?.id}`,
         { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      profile.value = response.data;
   }
   catch (error) {
      console.error(error);
   }
}

onMounted(() => {
    if(auth.user != null){
        fetchData();
    }
});


const cart = useCartStore();

const payment = ref('cod');
const sendChecked = ref(true);
const storeChecked = ref(false);

const exitAddress = ref('');

watchEffect(() => {
   if (profile.value) {
      form.setValues({
         email: profile.value.email,
         name: `${profile.value.firstName} ${profile.value.lastName}`,
         numberPhone: "0",
         address: profile.value.address || exitAddress,
      });
   }
});


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

const onSubmit = form.handleSubmit(async (values) => {
    const dataSend = {
        ...values,
        id: uuid,
        products: cart.items.map((item) => ({
            optionId: item.product.options[0].id,
            productId: item.product.id,
            name: item.product.name,
            thumbnail: item.product.thumbnail,
            option: item.product.options[0].name,
            price: item.product.options[0].price,
            sale: item.product.options[0].sale,
            quantity: item.quantity,
        })),
        payment: payment.value.toUpperCase(),
        shipping: sendChecked.value,
        quantity: cart.totalItems,
        totalPrice: priceCod,
        userId: auth.user?.id || "",
    }

    try {
        loading.value = true;
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/order/create`,
            dataSend,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.status == 200) {
            toast({
                description: 'Đơn hàng của bạn khởi tạo thành công.',
            })
            cart.clearCart();
            router.push({ path: `/checkout/${uuid}` })
        } else {
            toast({
                description: 'Something went wrong.',
            })
        }
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }

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

            <div class="flex items-center space-x-4" v-if="auth.isLogin">
                <Avatar>
                    <AvatarImage :src="auth.user.avatar" :alt="auth.user.name" />
                    <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div class="flex flex-col">
                    <p class="text-[14px] tracking-tight font-medium">
                        {{ auth.user.name }} ({{ auth.user.email }})
                    </p>
                </div>
            </div>

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

                <div>
                    <div class="w-full rounded-md border border-neutral-200 p-4 flex flex-col space-y-4">
                        <div class="flex items-center space-x-2" @click="handleCheckboxChange('send')">
                            <div class="w-4 h-4 rounded flex items-center justify-center border border-neutral-700">
                                <Check v-if="sendChecked" class="w-4 h-4" />
                            </div>
                            <Label for="send">Giao tận nơi</Label>
                        </div>
                        <div class="flex flex-col space-y-2" v-if="sendChecked">
                            <Separator />
                            <FormField v-slot="{ componentField }" name="address">
                                <FormItem>
                                    <FormControl>
                                        <Input type="text" placeholder="Địa chỉ" v-bind="componentField" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </FormField>
                            <SelectAddress />
                        </div>

                        <Separator />
                        <div class="flex items-center space-x-2" @click="handleCheckboxChange('store')">
                            <div class="w-4 h-4 rounded flex items-center justify-center border border-neutral-700">
                                <Check v-if="storeChecked" class="w-4 h-4" />
                            </div>
                            <Label for="store">Nhận tại cửa hàng</Label>
                        </div>
                    </div>

                    <div class="my-2">
                        <div v-if="sendChecked"
                            class="w-full rounded-md border border-neutral-200 p-4 flex flex-col space-y-2">
                            <div class="flex items-center justify-center">
                                <Package2 class="w-20 h-20" />
                            </div>
                            <span class="text-[12px] text-center">
                                Vui lòng chọn tỉnh / thành để có danh sách phương thức vận chuyển.
                            </span>
                        </div>

                        <div v-if="storeChecked"
                            class="w-full rounded-md border border-neutral-200 p-4 flex flex-col space-y-2">
                            <div class="flex items-center space-x-2 text-sm">
                                <MapPin />
                                <span>{{ info.address }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <Payment :payment="payment" :handle-bank-change="handleBankChange" />

                <Button type="submit" :disabled="loading">
                    Hoàn tất đơn hàng
                </Button>
            </form>
        </div>
        <OrderDetail :total-price="totalPrice" :ship="sendChecked" :price-cod="priceCod" />
    </div>
</template>