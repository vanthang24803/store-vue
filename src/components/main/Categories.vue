<script setup>
import { categories } from "@/constant";
import { RouterLink } from "vue-router";
</script>

<template>
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
    <RouterLink
      v-for="(item, index) in categories"
      :to="item.url"
      :key="index"
      className="overflow-hidden rounded-md"
    >
      <img
        :src="item.thumbnail"
        :alt="item.name"
        className="rounded-md hover:scale-105 transform transition-transform duration-500"
      />
    </RouterLink>
  </div>
</template>
