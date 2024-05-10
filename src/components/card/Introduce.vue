<script setup>
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus } from "lucide-vue-next";

const show = ref(false);

defineProps({
  data: Object,
});

function formatText(text) {
  return text.replace(/\n/g, "<br>");
}
</script>

<template>
  <div class="w-full p-4 md:p-6 rounded-md bg-white flex flex-col space-y-4">
    <div class="flex flex-col space-y-2">
      <span class="text-xl font-bold uppercase">MÔ TẢ SẢN PHẨM</span>
      <Separator />
    </div>

    <p class="text-sm" v-html="formatText(data.detail)" />

    <div v-if="!show" class="flex items-center justify-center">
      <Button
        variant="outline"
        class="hover:bg-transparent text-[#417505] hover:text-[#65b10d] space-x-4"
        @click="show = true"
      >
        <Plus class="w-4 h-4" />
        <span> Xem thêm nội dung </span>
      </Button>
    </div>

    <div v-show="show" class="flex flex-col space-y-1 text-sm">
      <div class="text-sm" v-html="formatText(data.introduction)" />
      <div class="flex items-center justify-center">
        <Button
          variant="outline"
          class="hover:bg-transparent text-[#417505] hover:text-[#65b10d] space-x-4"
          @click="show = false"
        >
          <Minus class="w-4 h-4" />
          <span>Rút gọn nội dung </span>
        </Button>
      </div>
    </div>
  </div>
</template>
