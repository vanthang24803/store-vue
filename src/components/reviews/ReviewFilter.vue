<script setup>
import { ref, watchEffect } from 'vue';
import { get } from '@/lib/api';
import Spinner from '../main/Spinner.vue';
import BottomPagination from '../main/BottomPagination.vue';
import Separator from '../ui/separator/Separator.vue';
import ReviewContent from './ReviewContent.vue';
import Filter from "./Filter.vue"

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const loading = ref(false);
const reviews = ref([]);
const status = ref("Lasted")
const star = ref(null);
let currentPage = ref(1);
let totalReviews = ref(0);

const onChangeStatus = (newStatus) => {
    status.value = newStatus;
}

const onChangeStar = (newStar) => {
    star.value = newStar;
}


const fetchReviews = async () => {
    try {
        loading.value = true;

        let URL = `/api/product/${props.id}/review?Status=${status.value}`

        if (star.value != null) {
            URL += `&Star=${star.value}`;
        }

        const response = await get(URL);

        if (response.status === 200) {
            reviews.value = response.data;

            totalReviews.value = response.data.length;
            reviews.value = response.data.slice((currentPage.value - 1) * 5, currentPage.value * 5)
        }

    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false;
    }
}

watchEffect(() => {
    fetchReviews();
});

const changePage = (number) => {
    currentPage.value = number;
    fetchReviews();
}

</script>

<template>
    <Spinner v-if="loading" />
    <div class="flex flex-col" v-else>
        <h2 class="font-bold tracking-wide">Lọc theo</h2>
        <Filter :onChangeStatus="onChangeStatus" :onChangeStar="onChangeStar" />
        <Separator class="my-4" />
        <div class="flex flex-col space-y-4" v-if="reviews && reviews.length > 0">
            <div class="flex flex-col space-y-3">
                <ReviewContent v-for="(item, index) in reviews" :key="index" :review="item" />
            </div>
            <div class="flex justify-end">
                <BottomPagination :currentPage="currentPage" :total="totalReviews" :changePage="changePage" />
            </div>
        </div>
        <div class="flex items-center justify-center flex-col space-y-3 " v-else>
            <img src="https://cdn-icons-png.flaticon.com/512/6381/6381554.png" alt="icon" width="60" height="60"
                class="object-cover">
            <p class="text-center text-sm  tracking-tight">
                Không tìm thấy nhận xét phù hợp.
            </p>
        </div>
    </div>

</template>