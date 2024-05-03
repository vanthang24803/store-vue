<script setup>
import { _http } from "@/lib/api";
import { ref, onMounted } from "vue";
import Spinner from "../main/Spinner.vue";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { generateSlug } from "@/lib/slug"
import { useRouter } from "vue-router";


const blogs = ref([]);
const loading = ref(false);

const fetchBlogs = async () => {
    try {
        loading.value = true;
        const response = await _http.get(`/api/blog`);

        if (response.status === 200) {
            blogs.value = response.data;
            console.log(response.data);
        }
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};

onMounted(fetchBlogs);

const router = useRouter();


</script>

<template>
    <div class="w-full min-h-[300px] rounded">
        <Spinner v-if="loading" />
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div v-for="item in blogs" :key="item.id" class="flex flex-col hover:cursor-pointer bg-white"
                @click="router.push(`/blogs/${generateSlug(item.title , item.id)}`)">
                <img :src="item.thumbnail" :alt="item.title" :title="item.title" class=" object-fill rounded-t-md" />
                <div class="py-6 bg-white p-4 flex flex-col space-y-2 rounded-b-md">
                    <h2 class="font-bold text-lg md:text-xl hover:hover:text-[#65b10d]">
                        {{ item.title }}
                    </h2>
                    <div class="flex items-center space-x-4 text-sm text-neutral-500 font-medium">
                        <p>Tác giả : {{ item.authorName }}</p>
                        <p>
                            {{ format(item.createAt, "d 'tháng' M, yyyy HH:ss", {
                                locale: vi,
                            }) }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>