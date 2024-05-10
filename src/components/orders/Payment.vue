<script setup>
import { Check } from "lucide-vue-next";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PaymentType } from "@/constant";

defineProps({
  payment: String,
  handleBankChange: Function,
});
</script>

<template>
  <div>
    <span class="font-bold text-lg tracking-tight">Phương thức thanh toán</span>
    <div
      class="w-full rounded-md border border-neutral-200 p-4 flex flex-col space-y-2"
    >
      <div
        class="flex flex-col space-y-4"
        v-for="(item, index) in PaymentType"
        :key="index"
      >
        <div class="flex items-center space-x-2 mt-2">
          <div
            class="w-4 h-4 rounded flex items-center justify-center border border-neutral-700"
            @click="() => handleBankChange(item.type)"
          >
            <Check v-if="payment === item.type" class="w-4 h-4" />
          </div>
          <Label :htmlFor="item.name">{{ item.name }}</Label>
        </div>
        <Separator />
      </div>
    </div>
  </div>
</template>
