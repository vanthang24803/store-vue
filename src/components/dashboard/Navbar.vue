<script setup>
import { useAuthStore } from '@/store/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const auth = useAuthStore();

</script>

<template>
    <nav class="p-4 border-b h-full flex items-center justify-end bg-white shadow-sm ">
        <Avatar>
            <AvatarImage :src="auth.user.avatar" :alt="auth.user.name" />
            <AvatarFallback>A</AvatarFallback>
        </Avatar>
    </nav>
</template>
