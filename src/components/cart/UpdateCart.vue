<script setup>
import { ref } from "vue";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";

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
  <div class="flex space-x-2 items-center">
    <Button class="w-7 h-7" variant="outline" @click="handleMinus"> - </Button>

    <Button disabled class="w-8 h-8" variant="ghost">
      {{ total }}
    </Button>

    <Button class="w-7 h-7" variant="outline" @click="handlePlus"> + </Button>
  </div>
</template>
