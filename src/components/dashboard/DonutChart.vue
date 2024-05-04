<script setup>
import { _http } from '@/lib/api';
import { ref, onMounted } from "vue";
import { Chart } from 'chart.js/auto'; // Import Chart from chart.js

const chart = ref(null);

const fetchData = async () => {
    try {
        const response = await _http.get(`/api/order/chart`);

        if (response.status === 200) {
            const data = response.data;
            const chartData = {
                labels: Object.keys(data),
                datasets: [{
                    label: 'Monthly Sales',
                    data: Object.values(data),
                    backgroundColor: generateColors(Object.keys(data).length), // Assign colors to each segment
                    borderColor: 'rgba(255, 255, 255, 1)', // Border color
                    borderWidth: 1
                }]
            };

            if (chart.value) {
                chart.value.destroy();
            }
            chart.value = new Chart(document.getElementById('donutChart'), {
                type: 'doughnut',
                data: chartData,
                options: {
                    plugins: {
                        legend: {
                            position: 'bottom', 
                        }
                    }
                }
            });
        } else {
            console.error('Failed to fetch data');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

onMounted(() => {
    fetchData();
})

function generateColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        colors.push(`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`);
    }
    return colors;
}
</script>

<template>
    <canvas id="donutChart" />
</template>
