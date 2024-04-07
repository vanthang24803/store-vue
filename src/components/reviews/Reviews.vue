<script setup>
import { ref, onMounted } from 'vue';
import { get } from '@/lib/api';
import Spinner from '../Spinner.vue';
import StarReviews from './StarReviews.vue';
import Images from './Images.vue';
import { Separator } from '../ui/separator';

const props = defineProps({
   productId: {
      type: String,
      required: true,
   },
});
const loading = ref(false);
const reviews = ref([]);
const images = ref([]);

const fetchReviews = async () => {
   try {
      loading.value = true;

      const response = await get(`/api/product/${props.productId}/review`)

      if (response.status === 200) {
         reviews.value = response.data;

         images.value = reviews.value?.flatMap((review) => review.images);
      }

   } catch (error) {
      console.log(error)
   } finally {
      loading.value = false;
   }
}

onMounted(fetchReviews)

</script>

<template>
   <div class="w-full p-4 md:p-6 rounded-md bg-white flex flex-col">
      <h2 class="font-bold ">
         Khách hàng đánh giá
      </h2>

      <Spinner v-if="loading" />
      <div class="py-4" v-else>
         <div class="flex flex-col space-y-8 md:space-y-10" v-if="reviews.length > 0">
            <div class="flex flex-col md:flex-row w-full space-y-4">
               <StarReviews :reviews="reviews" />
               <div class="w-[2px] h-[200px] bg-neutral-200 hidden md:block mx-4" />
               <Images :images="images" />
            </div>
            <Separator />
         </div>

         <div class="flex items-center justify-center flex-col space-y-3" v-else>
            <img src="https://cdn-icons-png.flaticon.com/512/6381/6381554.png" width="60" height="60" alt="icon"
               loading="lazy" />
            <p class="text-center text-sm  tracking-tight">
               Chưa có đánh giá nào cho sản phẩm này
            </p>
         </div>
      </div>
   </div>
</template>