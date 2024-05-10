<script setup>
defineProps({
  images: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>

<template>
  <div class="px-4 hidden md:block">
    <h2 class="font-semibold tracking-wide text-sm">
      Tất cả hình ảnh ({{ images.length }})
    </h2>

    <div class="grid md:grid-cols-5 lg:grid-cols-6 gap-4 mt-2">
      <a
        v-for="(item, index) in images"
        :key="index"
        :href="item.url"
        target="_blank"
        class="rounded-md w-[80px] h-[80px] object-cover hover:cursor-pointer bg-cover"
        :style="{ backgroundImage: `url(${item.url})` }"
      />
    </div>
  </div>
</template>
