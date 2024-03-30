<script setup>
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router';
import { useHead } from '@unhead/vue'

const router = useRouter();


useHead({
    title: 'Không tìm thấy trang | Sách là bạn'
})

</script>

<template>
    <div class="flex flex-col space-y-4 items-center justify-center h-screen bg-zinc-100/90">
        <h1 class="text-6xl md:text-9xl font-bold tracking-tight">404</h1>
        <h2 class="text-3xl md:text-4xl font-semibold tracking-tight">Không tìm thấy trang</h2>
        <p class="text-sm md:text-base text-muted-foreground text-center">Trang bạn đang tìm kiếm có thể đã bị xóa, chuyển
            đi, thay đổi link hoặc chưa bao giờ tồn tại.</p>
        <Button class="p-4" @click="() => router.push({ path: '/' })">Trở về trang chủ</Button>
    </div>
</template>

