<script setup>
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import Separator from "../ui/separator/Separator.vue";

defineProps({
    blog: Object,
})

</script>

<template>
    <div class="mt-4 flex flex-col space-y-6">
        <div class="w-full min-h-[600px] bg-white rounded p-4 md:p-6 flex flex-col space-y-8">
            <div class="flex flex-col space-y-2">
                <h1 class="font-bold text-lg md:text-xl">{{ blog?.title }}</h1>
                <div class="flex items-center space-x-4 text-sm text-neutral-500 font-medium">
                    <p>Tác giả : {{ blog?.authorName }}</p>
                    <p>
                        {{ format(blog?.createAt || new Date(), "d 'tháng' M, yyyy HH:ss", {
                            locale: vi,
                        }) }}
                    </p>
                </div>
                <img :src="blog?.thumbnail" :alt="blog?.title" :title="blog?.title"
                    class="lg:h-[500px] md:h-[240px] object-contain rounded my-4" />
                <div class="text-xs md:text-sm py-4 md:py-8" v-html="blog?.content" />
                <Separator />
                <div class="flex items-center justify-between text-sm">
                    <p>
                        Đang xem: <b>{{ blog?.title }}</b>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
