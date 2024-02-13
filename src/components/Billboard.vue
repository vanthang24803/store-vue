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
    }" 
    :plugins="[Autoplay({
    delay: 2000,
    })]"
    >
        <CarouselContent>
            <CarouselItem v-for="(item, index) in billboards" :key="index" class="w-full rounded-md">
                <AspectRatio :ratio="16 / 9" class="bg-muted">
                    <RouterLink :to="item.url" class="flex items-center justify-center">
                        <img :src="item.thumbnail" :alt="item.name"
                            class="rounded-xl lg:w-[80%] w-full object-cover hover:scale-105 transform transition-transform duration-500" />
                    </RouterLink>
                </AspectRatio>
            </CarouselItem>
        </CarouselContent>
        <CarouselPrevious class="hidden lg:flex " />
        <CarouselNext class="hidden lg:flex" />
    </Carousel>
</template>


