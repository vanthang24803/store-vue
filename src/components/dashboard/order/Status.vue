<script setup>
const statusList = {
  PENDING: "#dc2626",
  CREATE: "#f59e0b",
  SHIPPING: "#0284c7",
  SUCCESS: "#16a34a",
};

defineProps({
  status: String,
});
</script>

<template>
  <div class="flex items-center space-x-2">
    <div
      class="w-3 h-3 rounded-full"
      :style="{ backgroundColor: statusList[status] }"
    ></div>
    <span>{{ status }}</span>
  </div>
</template>
