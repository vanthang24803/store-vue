<script setup>
import { ref, onMounted } from "vue";
import { fetchDonutChart } from '@/api/overview';

const chart = ref(null);

onMounted(() => {
    fetchDonutChart(chart);
})


</script>

<template>
    <canvas id="donutChart" />
</template>
