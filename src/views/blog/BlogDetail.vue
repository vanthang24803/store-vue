<script setup>
import Container from '@/components/ui/Container.vue';
import { useHead } from '@unhead/vue';
import { useRoute } from 'vue-router';
import {  watch } from 'vue';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import Detail from '@/components/blog/Detail.vue';
import { useQuery } from '@tanstack/vue-query'
import { fetchBlogDetail } from '@/api/blog';

const route = useRoute();

const { data: blog } = useQuery({
    queryKey: ['blog-detail', route.params.slug],
    queryFn: () => fetchBlogDetail(route.params.slug)
})


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
        <Detail :blog="blog" v-show="blog" />
    </Container>
</template>
