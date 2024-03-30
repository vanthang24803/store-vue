<script setup>
import { useCartStore } from "@/store/filter.js";
import { ref, watch } from 'vue';
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import { price, selects } from "@/constant/index"
import Container from "@/components/ui/Container.vue";
import { ChevronRight, Feather } from 'lucide-vue-next';
import Card from "@/components/Card.vue";
import PriceFilter from "@/components/PriceFilter.vue";

import { RouterLink } from "vue-router";
import { useHead } from '@unhead/vue'

const store = useCartStore();
const selectedFilter = ref(null);
const selectedPrice = ref(null)

let category = "Phụ kiện";

watch(selectedFilter, (newFilter) => {
    store.updateState(null, newFilter, category);
});

const updateState = (item) => {
    store.updateState(item, selectedFilter, category)
    selectedPrice.value = item;
}

const updateSelect = () => {
    store.updateState(selectedPrice.value, selectedFilter, category)
}


const handleReset = () => {
    store.updateState(null, null, category);
}

store.updateState(null, null, category);

useHead({
  title: 'Phụ kiện | AMAK Store'
})

</script>


<template>
    <Container>
        <div className="flex items-center space-x-3 text-sm font-medium my-4">
            <RouterLink to="/">Trang chủ</RouterLink>
            <ChevronRight class="w-4 h-4" />
            <span>{{ category }}</span>
        </div>
        <div className=" lg:flex w-full lg:space-x-12">
            <div className="hidden lg:flex lg:flex-row flex-col space-y-4 lg:space-y-0 my-4">
                <div className="w-[300px] max-h-[220px] bg-white rounded-md py-2 px-4">
                    <div
                        className="flex flex-1 items-center justify-between py-1 font-medium transition-all hover:font-bold [&[data-state=open]>svg]:rotate-180 hover:cursor-pointer">
                        <h1 className="font-bold">Lọc giá</h1>

                    </div>
                    <PriceFilter :price="price" :selectedPrice="selectedPrice" :updateState="updateState" />
                </div>
            </div>

            <div className="flex flex-col space-y-4">
                <img src="https://file.hstatic.net/200000294254/collection/phu-kien-1200x628_dbee01b7158e4e0299add52c4ab27531.png"
                    alt="billboard" className="rounded-md" />

                <div className="flex space-y-2 flex-col">
                    <div className="flex items-center justify-between">
                        <div
                            className="flex lg:flex-row flex-col space-y-2 lg:space-y-0 lg:items-center lg:space-x-6 w-full">
                            <h1 className="text-2xl font-bold">Tất cả sản phẩm</h1>
                            <div className="flex items-center space-x-1">
                                <span className="font-bold">{{
                                    store.products.length || 0
                                }}</span>
                                <div className="flex items-center justify-between w-full">
                                    <span className="text-sm text-neutral-700">sản phẩm</span>
                                </div>
                            </div>
                        </div>
                        <Select v-model="selectedFilter" @change="updateSelect">
                            <SelectTrigger class="w-[180px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem v-for="(select, index) in selects" :key="index" :value="select.value">
                                        {{ select.name }}
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div v-if="store.products.length > 0" class="grid lg:grid-cols-4 grid-cols-2 gap-4">
                        <div v-for="(item, index) in store.products" :key="index">
                            <Card :product="item" />
                        </div>
                    </div>
                    <div class="flex items-center justify-center flex-col space-y-5" v-else>
                        <Feather color="#557fc3" class="w-32 h-32" />
                        <h2 class="text-2xl tracking-tight font-medium">Product Not Found</h2>
                        <Button @click="handleReset">Reset</Button>
                    </div>
                </div>
            </div>
        </div>
    </Container>
</template> 