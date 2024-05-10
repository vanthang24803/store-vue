<script setup>
import { ref } from "vue";
import { statusReview, starReview } from "@/constant";
import { Button } from "@/components/ui/button";

const props = defineProps({
  onChangeStatus: Function,
  onChangeStar: Function,
});

const activeIndex = ref(0);
const activeStar = ref(null);

const selectStatus = (index) => {
  activeIndex.value = index;
  props.onChangeStatus(statusReview[index].value);
};

const selectStar = (index) => {
  activeStar.value = index;
  props.onChangeStar(starReview[index].value);
};
</script>

<template>
  <div
    class="mt-3 flex items-center space-x-2 overflow-scroll md:overflow-hidden"
  >
    <div class="flex items-center space-x-2">
      <Button
        v-for="(item, index) in statusReview"
        :key="index"
        @click="selectStatus(index)"
        :variant="activeIndex === index ? 'primary' : 'outline'"
      >
        {{ item.name }}
      </Button>
    </div>
    <div class="flex items-center space-x-2">
      <Button
        v-for="(item, index) in starReview"
        :key="index"
        @click="selectStar(index)"
        :variant="activeStar === index ? 'primary' : 'outline'"
      >
        {{ item.name }}
      </Button>
    </div>
  </div>
</template>
