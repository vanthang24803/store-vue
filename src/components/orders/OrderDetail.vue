<script setup>
import { useCartStore } from "@/store/cart";
import { ScrollArea } from "../ui/scroll-area";
import { formatPrice, price } from "@/lib/format";
import { Separator } from "../ui/separator";
import { codPrice } from "@/constant";

defineProps({
  ship: Boolean,
  totalPrice: Number,
  priceCod: Number,
});

const cart = useCartStore();
</script>

<template>
  <div class="hidden lg:block w-full bg-neutral-50 p-8">
    <ScrollArea class="max-h-svh">
      <div
        class="flex flex-col space-y-3"
        v-for="(item, index) in cart.items"
        :key="index"
      >
        <RouterLink
          :to="`/product/${item.product.id}`"
          target="_blank"
          class="flex items-start space-x-2 my-2"
        >
          <img
            :src="item.product.thumbnail"
            :alt="item.product.name"
            class="w-[15%] relative"
          />
          <div class="flex items-center justify-between w-full">
            <div class="flex flex-col text-sm">
              <span>{{ item.product.name }}</span>
              <span class="text-xs text-neutral-500">
                {{ item.product.options[0].name }}
              </span>
              <span class="mt-2 text-neutral-700"> x{{ item.quantity }} </span>
            </div>

            <p class="text-sm">
              {{
                formatPrice(
                  item.product.options[0].price,
                  item.product.options[0].sale,
                )
              }}₫
            </p>
          </div>
        </RouterLink>
      </div>
    </ScrollArea>
    <div class="my-4 flex flex-col space-y-6 w-full">
      <Separator />
      <div class="flex flex-col space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-sm text-neutral-600">Tạm tính</span>
          <span class="text-sm font-medium">
            {{ cart.totalPrice }}
          </span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-neutral-600">Phí vận chuyển</span>
          <span v-if="ship" class="text-sm font-medium">
            {{ price(codPrice) }}₫
          </span>
          <span v-else> - </span>
        </div>
      </div>
      <Separator />
    </div>

    <div class="flex items-center justify-between w-full">
      <p class="text-neutral-600">Tổng cộng</p>

      <div class="flex items-center space-x-2">
        <span>VND</span>
        <p v-if="ship" class="text-xl font-semibold">{{ price(priceCod) }}₫</p>
        <p v-else class="text-xl font-semibold">{{ cart.totalPrice }}</p>
      </div>
    </div>
  </div>
</template>
