<script setup>
import { _http } from "@/lib/api";
import { ref, onMounted } from "vue";
import { price } from "@/lib/format";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const totalRevenue = ref();
const totalProduct = ref();

const fetchTotalProducts = async () => {
    const response = await _http.get(`/api/product/total`)
    if (response.status === 200) {
        totalProduct.value = response.data;
    }
}

const fetchTotalRevenue = async () => {
    const response = await _http.get(`/api/order/statistical?Status=Success`)
    if (response.status === 200) {
        totalRevenue.value = response.data;
    }
}

onMounted(() => {
    Promise.all([fetchTotalProducts(), fetchTotalRevenue()]);
})

</script>

<template>
    <div class="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ price(totalRevenue?.totalPrice) }}₫
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Sales</CardTitle>
          <CreditCard class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">+{{ totalRevenue?.totalOrder }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            Total Products Sale
          </CardTitle>
          <Check class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ totalRevenue?.totalProduct }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            Products In Stock
          </CardTitle>
          <Package class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ totalProduct }}</div>
        </CardContent>
      </Card>
    </div>
</template>
