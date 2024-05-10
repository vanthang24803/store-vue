<script setup>
import { defineProps } from "vue";

defineProps({
  percentage: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div
    class="bg-neutral-200 rounded-full h-[4.75px] dark:bg-gray-700 w-[200px] mx-2"
  >
    <div
      class="bg-sky-600 h-[4.75px] rounded-full"
      :style="{ width: `${percentage}%` }"
    />
  </div>
</template>
