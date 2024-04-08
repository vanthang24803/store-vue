<script setup>
import { useAuthStore } from '@/store/auth';
import { useRoute } from 'vue-router';
import Button from '../ui/button/Button.vue';

const auth = useAuthStore();

const route = useRoute();

const pathName = route.path;

const method = [
    {
        path: `/profile/${auth.user.id}`,
        name: "Thông tin tài khoản"
    }, {
        path: `/profile/${auth.user.id}/address`,
        name: "Địa chỉ"
    },
    {
        path: `/profile/${auth.user.id}/orders`,
        name: 'Đơn hàng'
    }
]

</script>

<template>
    <div class="lg:flex flex-col space-y-4 lg:basis-1/4 hidden">
        <h2 class="uppercase font-semibold tracking-tight">
            TÀI KHOẢN
        </h2>
        <div v-for="(item, index) in method" :key="index">
            <RouterLink :to="item.path">
                <Button :variant="pathName === item.path ? 'primary' : 'ghost'" class="w-[200px] flex justify-start">{{
            item.name
        }}</Button>
            </RouterLink>
        </div>

        <Button class="hover:text-[#417505] font-medium text-sm hover:cursor-pointer w-[200px] flex justify-normal" @click="auth.logout" variant="ghost">
            Đăng xuất
        </Button>
    </div>
</template>