<script setup>
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

defineProps({
    method: String
})

const router = useRouter();

</script>

<template>
    <Button :size="icon" @click="router.push({ path: `${method}/new` })">
        <Plus />
    </Button>
</template>
