<script setup>
import { ref, onMounted } from 'vue';
import { Button } from '@/components/ui/button'
import { formatPrice, price } from "@/lib/format";
import { Minus, Plus, Link } from 'lucide-vue-next';
import { useToast } from '@/components/ui/toast/use-toast'
import { defineProps } from 'vue'

const props = defineProps({
    product: Object,
});

let option = ref(null);
let total = ref(1);

onMounted(() => {
    option.value = props.product?.options[0];
});

const { toast } = useToast()

const handleOptionChange = (id) => {
    const newOption = props.product?.options.find((option) => option.id === id);
    option.value = newOption;
};

const copy = async (id) => {
    try {
        await navigator.clipboard.writeText(
            `http://localhost:5173/product/${id}` || ""
        );

        toast({
            title: "Success",
        });

    } catch (err) {
        console.error('Failed to copy text: ', err);
        toast({
            title: 'Uh oh! Something went wrong.',
            description: 'There was a problem with your request.',
        });
    }
};
</script>



<template>
    <div class="w-full bg-white rounded-md md:p-8 p-4">
        <div class="flex md:flex-row flex-col md:space-x-12">
            <div class="relative lg:w-1/3 w-full">
                <img :src="product?.thumbnail" alt="image-detail">
                <div v-if="option?.sale > 0"
                    class="w-12 h-12 bg-[#ff0000] text-white absolute top-4 left-4 flex items-center justify-center font-medium text-sm rounded-b-lg">
                    <div class="flex flex-col items-center justify-center">
                        <span> -{{ option.sale }}%</span>
                        <span class="text-[12px]">OFF</span>
                    </div>
                </div>
            </div>

            <div class="flex flex-col space-y-2 lg:basis-3/4">
                <h2 class="font-semibold text-2xl">{{ product?.name }}</h2>
                <div class="text-sm">
                    Mã sản phẩm:
                    <span class="text-[#417505] font-semibold">{{ option?.id }}</span>
                </div>
                <div class="flex items-center space-x-4">
                    <div class="text-sm">
                        Tình trạng:
                        <span v-if="option?.status" class="text-[#417505] font-bold">Còn hàng</span>
                        <span v-else class="text-[#417505] font-bold">Hết hàng</span>
                    </div>
                    <div class="text-sm">
                        Thuơng Hiệu:
                        <span class="text-[#417505] font-bold">{{ product?.brand }}</span>
                    </div>
                </div>

                <div class="flex flex-col lg:flex-row py-4 space-y-4 lg:space-y-0">
                    <div class="flex flex-col space-y-4 lg:w-1/2">
                        <div
                            class="flex items-center space-x-6 md:space-x-12 text-sm p-2 w-full bg-neutral-100/80 rounded-md">
                            <span class="font-semibold">Giá:</span>
                            <div class="flex items-center space-x-8">
                                <span class="text-red-500 font-bold text-2xl">
                                    {{ formatPrice(option?.price, option?.sale) }}₫
                                </span>
                                <span v-if="Number(option?.sale) > 0" class="text-neutral-400 text-lg line-through">
                                    {{ price(option?.price) }}₫
                                </span>
                                <Button v-if="Number(option?.sale) > 0" variant="outline" size="sm"
                                    class="mx-2 border-red-500 hover:bg-transparent text-red-500 font-semibold hover:text-red-500">
                                    -{{ option?.sale }}%
                                </Button>
                            </div>
                        </div>
                        <div class="flex items-center space-x-4 text-sm py-2">
                            <span class="font-semibold">Tiêu đề:</span>
                            <div class="flex items-center space-x-2" v-for="(item, index) in product?.options" :key="index">
                                <Button :variant="item.quantity > 0 ? (item.id === option?.id ? '' : 'outline') : 'outline'"
                                    :disabled="item.quantity == 0" @click="handleOptionChange(item.id)">
                                    {{ item.name }}
                                </Button>
                            </div>
                        </div>

                        <div class="flex items-center space-x-2 text-sm py-4">
                            <span class="font-semibold">Số lượng:</span>
                            <div className="flex items-center space-x-2">
                                <Button size="icon" :disabled="total <= 0" :variant="total > 0 && outline"
                                    class="font-medium" @click="total > 0 ? total-- : null">
                                    <Minus />
                                </Button>
                                <Button disabled variant="outline" size="icon">
                                    {{ total }}
                                </Button>
                                <Button size="icon" class="font-medium" @click="total++">
                                    <Plus />
                                </Button>
                            </div>
                        </div>
                        <Button>
                            Thêm vào giỏ hàng
                        </Button>

                        <div class="flex flex-col">
                            <div class="flex items-center space-x-2 text-sm py-2">
                                <span class="font-medium">Chia sẻ:</span>
                                <button @click="copy(`${product?.id}`)"
                                    class="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white hover:cursor-pointer">
                                    <Link class="w-4 h-4" />
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
