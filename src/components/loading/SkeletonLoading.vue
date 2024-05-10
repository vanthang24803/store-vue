<script setup>
import Skeleton from "@/components/ui/skeleton/Skeleton.vue";

defineProps({
  items: Number,
});
</script>

<template>
  <div class="grid lg:grid-cols-5 grid-cols-2 gap-4 lg:gap-6">
    <Skeleton
      v-for="(_, index) in Array.from({ length: items })"
      :key="index"
      class="w-full h-[30vh] md:h-[38vh] bg-white"
    />
  </div>
</template>
