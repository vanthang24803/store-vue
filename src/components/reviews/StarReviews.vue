<script setup>
import Stars from './Star.vue';
import ProcessStar from "./Process.vue"


const props = defineProps({
    reviews: {
        type: Array,
        required: true,
        default: () => [],
    },
});

const reviews = props.reviews;

const totalReviews = reviews.length;

const rankStar = (
    reviews.reduce((sum, review) => sum + review.star, 0) / totalReviews
).toFixed(1);

const starCount = Math.round(Number(rankStar));

const starStats = Array(5)
    .fill(0)
    .reduce((acc, _, index) => {
        const total = reviews.reduce(
            (sum, review) => sum + (review.star === index + 1 ? 1 : 0),
            0
        );
        const percentage = (Number(total) / totalReviews) * 100;
        acc[index + 1] = { total, percentage };
        return acc;
    }, {});

</script>

<template>
    <div class="flex flex-col lg:basis-1/3 md:basis-1/2 ">
        <p class="font-bold tracking-wide text-sm">Tổng quan</p>
        <div class="flex items-center space-x-4 my-2">
            <p class="text-3xl font-bold">
                {{ rankStar }}
            </p>
            <Stars :stars="starCount" :size="24" />
        </div>

        <p className="text-sm text-neutral-500">({{ totalReviews }} đánh giá)</p>
        <div class="flex flex-col space-y-2 pt-2">
            <div v-for="([star, { total, percentage }]) in Object.entries(starStats).reverse()" :key="star"
                class="flex items-center space-x-3">
                <Stars :stars="parseInt(star)" />
                <ProcessStar :percentage="percentage" />
                <p class="text-xs text-neutral-600">{{ total }}</p>
            </div>
        </div>

    </div>
</template>