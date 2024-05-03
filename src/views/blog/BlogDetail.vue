<script setup>
import Container from '@/components/ui/Container.vue';
import { useHead } from '@unhead/vue';
import { useRoute } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import { _http } from '@/lib/api';
import { decodeSlug } from '@/lib/slug';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import Detail from '@/components/blog/Detail.vue';

const route = useRoute();

const blog = ref(null);

const fetchBlog = async () => {
    const res = await _http.get(`/api/blog/${decodeSlug(route.params.slug)}`);
    if (res.status === 200) {
        blog.value = res.data;
    }
};

onMounted(() => {
    fetchBlog();
});

watch(() => {
    useHead({
        title: blog.value?.title,
        meta: [
            { name: 'description', content: blog.value?.content },
        ],
    });
})

</script>

<template>
    <Container>
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href="/blogs">Tất cả bài viết</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>{{ blog?.title }}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <Detail :blog="blog" v-show="blog"/>
    </Container>
</template>
