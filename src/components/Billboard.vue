<script setup>
const props = defineProps({
    billboards: [],
})

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Autoplay from 'embla-carousel-autoplay'

</script>

<template>
    <Carousel class="relative w-full" :opts="{
        align: 'start',
        loop: true,
    }" :plugins="[Autoplay({
        delay: 2000,
    })]">
        <CarouselContent>
            <CarouselItem v-for="(item, index) in billboards" :key="index" class="rounded-md flex items-center justify-normal">
                <RouterLink :to="item.url" class="flex items-center justify-center">
                    <img :src="item.thumbnail" :alt="item.name"
                        class="rounded-md lg:h-[60vh] object-cover hover:scale-105 transform transition-transform duration-500" />
                </RouterLink>
            </CarouselItem>
        </CarouselContent>
    </Carousel>
</template>
