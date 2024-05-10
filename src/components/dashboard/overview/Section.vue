<script setup>
import { price } from "@/lib/format";
import { useQuery } from "@tanstack/vue-query";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchTotalProducts, fetchTotalRevenue } from "@/api/overview";

const { data: totalRevenue } = useQuery({
  queryKey: ["revenue"],
  queryFn: fetchTotalRevenue,
});

const { data: totalProduct } = useQuery({
  queryKey: ["totalProduct"],
  queryFn: fetchTotalProducts,
});
</script>

<template>
  <div class="grid gap-4 grid-cols-2 md:grid-cols-4">
    <Card>
      <CardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
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
      <CardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle class="text-sm font-medium">Sales</CardTitle>
        <CreditCard class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">+{{ totalRevenue?.totalOrder }}</div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle class="text-sm font-medium"> Total Products Sale </CardTitle>
        <Check class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">{{ totalRevenue?.totalProduct }}</div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle class="text-sm font-medium"> Products In Stock </CardTitle>
        <Package class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">{{ totalProduct }}</div>
      </CardContent>
    </Card>
  </div>
</template>
