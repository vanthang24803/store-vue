<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { Search } from 'lucide-vue-next';
import { Input } from '@/components/ui/input';
import { formatPrice } from "@/lib/format"
import { RouterLink } from 'vue-router';
import { Separator } from './ui/separator';
import { useRouter } from 'vue-router'


const router = useRouter();
const content = ref('');
const product = ref([]);

const handleInputChange = async (e) => {
    content.value = e.target.value;
    const url = `${import.meta.env.VITE_API_URL}/api/product?Name=${content.value}`;

    try {
        const response = await axios.get(url);
        product.value = response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

</script>

<template>
    <div class="relative md:block hidden dark:border-white group " ref="ref">
        <Input class="lg:w-[500px] md:w-[300px] h-10 font-medium" @input="handleInputChange"
            placeholder="Tìm kiếm sản phẩm..." />

        <RouterLink :to="`/search?product=${content}`"
            class="absolute top-1 right-1 w-14 h-5/6 flex items-center justify-center bg-[#417505] rounded-md cursor-pointer hover:bg-[#65b10d]">
            <Search class="w-4 h-4 text-white hover:cursor-pointer" />
        </RouterLink>
        <div v-if="content !== ''"
            class="lg:w-[500px] md:w-[300px] lg:min-h-[20vh] min-h-[15vh] rounded-md bg-white dark:bg-neutral-700/90 p-4 md:absolute md:top-12 md:-right-2 drop-shadow-xl">
            <p class="text-sm font-medium">Gợi ý cho bạn:</p>
            <div v-if="product.length > 0" class="w-full h-auto my-2 text-sm flex flex-col space-y-2">
                <div class="flex flex-col space-y-2">
                    <div v-for="(item, index) in product.slice(0, 5)" :key="index" class="flex flex-col space-y-2">
                        <RouterLink :to="`/product/${item.id}`" class="flex items-center justify-between"
                            @click="content = ''">
                            <div class="flex flex-col space-y-1">
                                <span class="hover:text-[#65b10d] font-medium">{{ item.name }}</span>
                                <div class="flex items-center space-x-3">
                                    <span class="font-medium">{{ item.options[0].price }}₫</span>
                                    <span class="line-through text-neutral-500 text-xs">
                                        {{ formatPrice(item.options[0].price, item.options[0].sale) }}₫
                                    </span>
                                </div>
                            </div>
                            <img :src="item.thumbnail" :alt="item.name" className="w-[8%]" />
                        </RouterLink>
                    </div>
                    <Separator />
                    <RouterLink :to="`/search?product=${content}`" v-if="product.length > 5"
                        class="flex items-center justify-center pt-1">
                        Xem thêm {{ product.length - 5 }} sản phẩm
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

  