<script setup>
import { _http } from '@/lib/api';
import { ChevronRight } from 'lucide-vue-next';
import { ref, onMounted, watchEffect } from 'vue';
import Spinner from './Spinner.vue';
import { useRouter } from 'vue-router';
import { generateSlug } from "@/lib/slug"
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const blogs = ref([]);
const loading = ref(false);
const fetchBlogs = async () => {
  try {
    loading.value = true;
    const response = await _http.get(`/api/blog`);

    if (response.status == 200) {
      blogs.value = response.data;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const firstBlog = ref(null);
const restBlog = ref([]);


watchEffect(() => {
  const [first, ...rest] = blogs.value.slice(0, 4);
  firstBlog.value = first;
  restBlog.value = rest;
});

onMounted(() => {
  fetchBlogs();
});

const router = useRouter();
</script>

<template>
  <div class="my-6 md:my-8 w-full bg-white rounded-md p-6">
    <RouterLink to="/blogs" class="flex items-center justify-between">
      <h2 class="text-lg font-bold">Thông Báo Bản Quyền</h2>
      <div class="flex items-center text-sm space-x-1 text-sky-500 font-semibold">
        <p>Xem thêm</p>
        <ChevronRight class="w-4 h-4" />
      </div>
    </RouterLink>
    <div>
      <Spinner v-if="loading" />
      <div v-else class="flex md:flex-row flex-col my-4 space-y-4 md:space-y-0 md:space-x-4">
        <div v-if="firstBlog" class="md:basis-1/2 w-full flex flex-col hover:cursor-pointer space-y-2"
          @click="router.push(`/blogs/${generateSlug(firstBlog.title, firstBlog.id)}`)">
          <img :src="firstBlog.thumbnail" :alt="firstBlog.authorName" width="95%"
            class="rounded-md hover:cursor-pointer" :title="firstBlog.title">
          <h3 class="font-bold text-lg mt-4 hover:hover:text-[#65b10d]">
            {{ firstBlog.title }}
          </h3>
          <p class="text-xs ">
            {{ format(firstBlog.createAt, "d 'tháng' M, yyyy", {
              locale: vi,
            }) }}
          </p>
        </div>
        <div class="md:basis-1/2 w-full flex flex-col space-y-4 lg:space-y-6" v-if="restBlog.length > 0">
          <div class="flex space-x-4 hover:cursor-pointer" v-for="item in restBlog" :key="item.id"
            @click="router.push(`/blogs/${generateSlug(item.title, item.id)}`)">
            <img :src="item.thumbnail" :alt="item.authorName" width="190"
              class="rounded-md hover:cursor-pointer" :title="item.title">
            <div class="flex flex-col">
              <h4 class="font-medium text-[14px] hover:hover:text-[#65b10d]">
                {{ item.title }}
              </h4>
              <span class="text-xs">
                {{ format(item.createAt, "d 'tháng' M, yyyy", {
                  locale: vi,
                }) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>