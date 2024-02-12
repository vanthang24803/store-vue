<script setup>
import { ref } from 'vue';
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus, Minus } from 'lucide-vue-next';

const show = ref(false);

const props = defineProps({
    data: Object,
})


</script>

<template>
    <div class="w-full p-4 md:p-6 rounded-md bg-white flex flex-col space-y-4">
        <div class="flex flex-col space-y-2">
            <span class="text-xl font-bold uppercase">MÔ TẢ SẢN PHẨM</span>
            <Separator />
        </div>

        <div class="flex flex-col space-y-1 text-sm">
            <span>Tác giả: {{ data.author }}</span>
            <span>Dịch giả: {{ data.translator }}</span>
            <span>Thể loại: {{ data.category }}</span>
            <span>Khổ sách: {{ data.format }}</span>
            <span>Số trang: {{ data.numberOfPage }}</span>
            <span>ISBN: {{ data.isbn }}</span>
            <span>NXB liên kết: {{ data.publisher }}</span>
            <span>Phát hành: {{ data.company }}</span>
            <span>Quà tặng kèm: {{ data.gift.replace(/\n/g, ', ') }}</span>
        </div>

        <div v-if="!show" class="flex items-center justify-center">
            <Button variant="outline" class="hover:bg-transparent text-[#417505]  hover:text-[#65b10d] space-x-4"
                @click="show = true">
                <Plus class="w-4 h-4" />
                <span> Xem thêm nội dung </span>
            </Button>
        </div>

        <div v-show="show" class="flex flex-col space-y-1 text-sm">
            <span>Giá bìa: {{ data.price }}</span>
            <span>Phát hành: {{ data.released }}</span>
            <div class="flex flex-col space-y-1 text-sm">
                <div class="flex flex-col space-y-1">
                    <span>Giới thiệu:</span>
                    <span>{{ data.introduce }}</span>
                </div>
            </div>
            <div class="flex items-center justify-center">
                <Button variant="outline" class="hover:bg-transparent text-[#417505]  hover:text-[#65b10d] space-x-4"
                    @click="show = false">
                    <Minus class="w-4 h-4" />
                    <span>Rút gọn nội dung </span>
                </Button>
            </div>
        </div>
    </div>
</template>
  

  