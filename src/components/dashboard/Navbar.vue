<script setup>
import { useAuthStore } from '@/store/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Toggle from '../theme/Toggle.vue';

const auth = useAuthStore();

</script>

<template>
    <nav class="p-4 border-b h-full flex items-center justify-end  light:bg-white  shadow-sm ">
        <div class="flex items-center gap-4">
            <Toggle />
            <Avatar>
                <AvatarImage :src="auth.user.avatar" :alt="auth.user.name" />
                <AvatarFallback>A</AvatarFallback>
            </Avatar>
        </div>
    </nav>
</template>
