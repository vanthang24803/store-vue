<script setup>
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import Stars from './Star.vue';
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { Separator } from '../ui/separator';

defineProps({
    review: {
        type: Object,
        required: true,
    },
});


const starList = {
    5: "Tuyệt vời",
    4: "Hài lòng",
    3: "Bình thường",
    2: "Không hài lòng",
    1: "Tệ",
};

</script>

<template>
    <div class="flex flex-col space-y-4">
        <div class="flex justify-between">
            <div class="lg:basis-1/3 basis-1/2">
                <div class="w-full flex md:flex-row flex-col items-center space-x-3">
                    <Avatar class="hover:cursor-pointer">
                        <AvatarImage :src="review.customerAvatar" :alt="review.customerName"
                            :title="review.customerName" />
                    </Avatar>

                    <p class="text-sm font-semibold">{{ review.customerName }}</p>
                </div>
            </div>
            <div class="lg:basis-2/3 md:basis-1/2 flex flex-col space-y-2 w-full">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <Stars :stars="review.star" />
                        <p class="text-sm font-semibold">
                            {{ starList[review.star] }}
                        </p>
                    </div>
                </div>
                <div class="text-sm py-2" v-html="review.content" />
                <div class="grid grid-cols-4 md:grid-cols-6 gap-4" v-show="review.images.length > 0">
                    <a v-for="(item, index) in review.images" :key="index" target="_blank" :href="item.url"
                        class="rounded-md w-[80px] h-[80px] object-cover hover:cursor-pointer bg-cover"
                        :style="{ backgroundImage: `url(${item.url})` }" />
                </div>
                <span class="text-xs text-neutral-400 font-medium">
                    Đánh giá vào {{ formatDistanceToNow(review.createAt, {
                        locale: vi,
                        addSuffix: true,
                    }) }}
                </span>
                <div class="py-4">
                    <Separator />
                </div>
            </div>
        </div>
    </div>
</template>