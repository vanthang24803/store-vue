<script setup>
import { ref } from 'vue';
import { useCartStore } from '@/store/cart';
import { Button } from '@/components/ui/button'

const props = defineProps({
    productId: String,
    optionId: String,
    quantity: Number,
});


let total = ref(props.quantity);
const cart = useCartStore();

const handleMinus = () => {
    total.value = total.value > 0 ? total.value - 1 : 0;
    if (total.value < 1) {
        cart.removeItem(props.productId, props.optionId);
    } else {
        cart.updateQuantity(props.productId, props.optionId, total.value);
    }
};

const handlePlus = () => {
    total.value = total.value + 1;
    cart.updateQuantity(props.productId, props.optionId, total.value);
};

</script>

<template>
    <div className="flex space-x-2 items-center">
        <Button className="w-6 h-6" variant="outline" @click="handleMinus">
            -
        </Button>

        <Button disabled className="w-8 h-8" variant="ghost">
            {{ total }}
        </Button>

        <Button className="w-6 h-6" variant="outline" @click="handlePlus">
            +
        </Button>
    </div>
</template>

