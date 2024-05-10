<script setup>
import { ref, onMounted } from "vue";
import { fetchBarChart } from "@/api/overview";

const chart = ref(null);

onMounted(() => {
  fetchBarChart(chart);
});
</script>

<template>
  <canvas id="barChart" class="p-2" />
</template>
