<script setup>
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-vue-next";

defineProps({
  price: Array,
  selectedPrice: String,
  updateState: Function,
});
</script>

<template>
  <div class="my-1 flex flex-col space-y-3 text-sm font-medium">
    <Separator />
    <div
      v-for="(item, index) in price"
      :key="index"
      className="flex items-center space-x-2"
    >
      <div
        className="w-4 h-4 rounded flex items-center justify-center border border-neutral-700"
        @click="updateState(item.value)"
      >
        <Check v-if="selectedPrice === item.value" className="w-4 h-4" />
      </div>
      <Label>{{ item.name }}</Label>
    </div>
  </div>
</template>
