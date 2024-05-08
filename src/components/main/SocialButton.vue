<script setup>
import Button from '../ui/button/Button.vue';

import { computed } from "vue"

const props = defineProps({
    image: String,
    click: Function,
    provider: String,
});

const capitalizedProvider = computed(
    () => props.provider.charAt(0).toUpperCase() + props.provider.slice(1)
);

</script>

<template>
    <Button @click="click" class="bg-white hover:bg-white text-black flex items-center justify-start gap-8 px-6 py-2">
        <div class="w-10 md:w-20 lg:w-24">
            <img :src="image" :alt="provider" class="w-5 h-5 object-fill">
        </div>
        <span class="font-medium">Sign In with {{ capitalizedProvider }}</span>
    </Button>
</template>
