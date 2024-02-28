<script setup>
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();

</script>

<template>
    <div class="flex flex-col space-y-4 lg:basis-1/4">
        <h2 class="uppercase font-semibold tracking-tight">
            TÀI KHOẢN
        </h2>
        <RouterLink :to="`/profile/${auth.user.id}`" class="hover:text-[#417505] font-medium text-sm">Thông tin tài khoản
        </RouterLink>

        <RouterLink :to="`/profile/${auth.user.id}/address`" class="hover:text-[#417505] font-medium text-sm">Địa chỉ
        </RouterLink>

        <RouterLink :to="`/profile/${auth.user.id}/orders`" class="hover:text-[#417505] font-medium text-sm">Đơn hàng
        </RouterLink>

        <span class="hover:text-[#417505] font-medium text-sm hover:cursor-pointer" @click="auth.logout">
            Đăng xuất
        </span>
    </div>
</template>