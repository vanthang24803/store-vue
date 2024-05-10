<script setup>
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import { price, selects } from "@/constant/index";
import Container from "@/components/ui/Container.vue";
import { ChevronRight, Check, Feather } from "lucide-vue-next";
import Card from "@/components/card/Card.vue";

import { RouterLink } from "vue-router";
import { Separator } from "../ui/separator";

defineProps({
  category: String,
  selectedPrice: String,
  selectedFilter: String,
  image: String,
  products: [],
  updateState: Function,
  handleReset: Function,
});
</script>

<template>
  <Container>
    <div className="flex items-center space-x-3 text-sm font-medium">
      <RouterLink to="/">Trang chủ</RouterLink>
      <ChevronRight class="w-4 h-4" />
      <span>{{ category }}</span>
    </div>
    <div className=" lg:flex w-full lg:space-x-12">
      <div
        className="hidden lg:flex lg:flex-row flex-col space-y-4 lg:space-y-0 my-4"
      >
        <div className="w-[300px] max-h-[220px] bg-white rounded-md py-2 px-4">
          <div
            className="flex flex-1 items-center justify-between py-1 font-medium transition-all hover:font-bold [&[data-state=open]>svg]:rotate-180 hover:cursor-pointer"
          >
            <h1 className="font-bold">Lọc giá</h1>
          </div>
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
                <Check
                  v-if="selectedPrice === item.value"
                  className="w-4 h-4"
                />
              </div>
              <Label>{{ item.name }}</Label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <img :src="image" alt="billboard" className="rounded-md" />

        <div className="flex space-y-2 flex-col">
          <div className="flex items-center justify-between">
            <div
              className="flex lg:flex-row flex-col space-y-2 lg:space-y-0 lg:items-center lg:space-x-6 w-full"
            >
              <h1 className="text-2xl font-bold">Tất cả sản phẩm</h1>
              <div className="flex items-center space-x-1">
                <span className="font-bold">{{ products || 0 }}</span>
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm text-neutral-700">sản phẩm</span>
                </div>
              </div>
            </div>
            <Select
              v-model="props.selectedFilter"
              @change="store.updateState(selectedPrice, selectedFilter)"
            >
              <SelectTrigger class="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    v-for="(select, index) in selects"
                    :key="index"
                    :value="select.value"
                  >
                    {{ select.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div
            v-if="products > 0"
            class="grid lg:grid-cols-4 grid-cols-2 gap-4"
          >
            <div v-for="(item, index) in products" :key="index">
              <Card :product="item" />
            </div>
          </div>
          <div
            class="flex items-center justify-center flex-col space-y-5"
            v-else
          >
            <Feather color="#557fc3" class="w-32 h-32" />
            <h2 class="text-2xl tracking-tight font-medium">
              Product Not Found
            </h2>
            <Button @click="handleReset">Reset</Button>
          </div>
        </div>
      </div>
    </div>
  </Container>
</template>
