<script setup>
import { useCartStore } from "@/store/filter.js";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Card from "@/components/card/Card.vue";

const props = defineProps({
  category: String,
});

const store = useCartStore();

store.updateState(null, null, props.category);
</script>

<template>
  <div class="flex flex-col space-y-4 md:space-y-4 my-6">
    <span class="text-2xl font-bold">Sản phẩm liên quan</span>
    <Carousel
      :opts="{ align: 'start', loop: true }"
      :plugins="[
        Autoplay({
          delay: 2000,
        }),
      ]"
      class="w-full"
    >
      <CarouselContent>
        <CarouselItem
          v-for="(item, index) in store.products.slice(0, 10)"
          :key="index"
          class="basis-1/2 lg:basis-1/5"
        >
          <div class="p-1">
            <Card :product="item" />
          </div>
        </CarouselItem>
      </CarouselContent>
      <div class="hidden lg:block">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  </div>
</template>
