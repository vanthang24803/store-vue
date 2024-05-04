<script setup>
import { _http } from '@/lib/api';
import { ref, onMounted } from "vue";
import { Chart } from 'chart.js/auto';

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
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)',
                        'rgba(208, 203, 207, 0.2)',
                        'rgba(211, 203, 207, 0.2)',
                        'rgba(220, 203, 207, 0.2)',
                        'rgba(216, 203, 207, 0.2)',
                        'rgba(242, 203, 207, 0.2)',
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 0.5
                }]
            };

            if (chart.value) {
                chart.value.destroy();
            }
            chart.value = new Chart(document.getElementById('barChart'), {
                type: 'bar',
                data: chartData,
                options: {
                    plugins: {
                        legend: {
                            display: false
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



</script>

<template>
    <canvas id="barChart" class="p-2" />
</template>
