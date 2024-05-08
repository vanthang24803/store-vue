<script setup>
import { ref } from "vue";
import { price } from "@/lib/format";
import { format } from "date-fns";


import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'


import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { PartyPopper } from "lucide-vue-next";
import Spinner from "../main/Spinner.vue";
import { BarChart } from "lucide-vue-next";
import { Separator } from "../ui/separator";
import { useQuery } from "@tanstack/vue-query";
import { fetchCustomer } from "@/api/overview";

const select = ref("day");

const { isLoading, data: users } = useQuery({
    queryKey: ['customers', select],
    queryFn: () => fetchCustomer(select),
    keepPreviousData: true,
})


</script>

<template>
    <div class="p-2">
        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-1">
                <CardTitle class="text-xl font-bold">
                    Customers
                </CardTitle>
                <CardDescription>
                    <PartyPopper class="w-4 h-4" />
                </CardDescription>
            </CardHeader>
            <CardDescription class="pb-4 px-6">
                <template v-if="select === 'day'">
                    Top customers of the {{ format(new Date(), 'dd/MM/yyyy') }}
                </template>
                <template v-else-if="select === 'month'">
                    Top customers of {{ format(new Date(), 'MMMM yyyy') }}
                </template>
                <template v-else-if="select === 'year'">
                    Top customers of {{ format(new Date(), 'yyyy') }}
                </template>
            </CardDescription>
            <CardContent>
                <Tabs :default-value="select" @update:model-value="select = $event">
                    <TabsList className="grid w-full grid-cols-3 dark:bg-gray-900/90 bg-neutral-200/90">
                        <TabsTrigger value="day">Day</TabsTrigger>
                        <TabsTrigger value="month">Month</TabsTrigger>
                        <TabsTrigger value="year">Year</TabsTrigger>
                    </TabsList>
                    <TabsContent :value="select">
                        <Spinner v-if="isLoading" />
                        <Card v-else class="w-full mt-2">
                            <div class="flex flex-col p-4 gap-4" v-if="users && users.length > 0">
                                <div class="flex items-center justify-between" v-for="(user, index) in users"
                                    :key="user.id">
                                    <div class="flex items-center space-x-4">
                                        <Avatar>
                                            <AvatarImage :src="user.avatar" :alt="user.lastName" />
                                            <AvatarFallback>
                                                {{ user.lastName[0] }}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div class="flex flex-col space-y-1 text-sm ">
                                            <div class="flex items-center space-x-2">
                                                <template v-if="index < 3">
                                                    <img :src="`/${index + 1}.png`" alt="rank" width="20" height="20"
                                                        class="object-cover" />
                                                </template>
                                                <h3 class="font-semibold">
                                                    {{ user.firstName }} {{ user.lastName }}
                                                </h3>
                                            </div>
                                            <span class="text-[13px] text-muted-foreground">
                                                {{ user.email }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="flex items-end flex-col">
                                        <p class="text-[14px] font-semibold tracking-tighter">
                                            +{{ price(user.totalPrice) }}₫
                                        </p>
                                        <span class="text-[12px] text-muted-foreground">
                                            +
                                            {{ user.totalOrder > 1
                                                ? `${user.totalOrder} orders`
                                                : `${user.totalOrder} order` }}
                                        </span>
                                    </div>
                                </div>
                                <Separator />
                                <div class="flex items-center justify-between ">
                                    <h3 class="text-base font-semibold">
                                        Total
                                    </h3>
                                    <div class="flex flex-col items-end">
                                        <p class="text-[14px] font-bold tracking-tighter">
                                            +
                                            {{ price(
                                                users.reduce(
                                                    (total, user) => total + user.totalPrice,
                                                    0
                                                )
                                            ) }}
                                            ₫
                                        </p>
                                        <span class="text-[12px] text-muted-foreground">
                                            +
                                            {{ users.reduce(
                                                (total, user) => total + user.totalOrder,
                                                0
                                            ) > 1
                                                ? `${users.reduce(
                                                    (total, user) => total + user.totalOrder,
                                                    0
                                                )} orders`
                                                : `${users.reduce(
                                                    (total, user) => total + user.totalOrder,
                                                    0
                                                )} order` }}

                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center justify-center p-8" v-else>
                                <BarChart class="w-20 h-20" />
                                <span class="text-[12px] text-muted-foreground">
                                    No Analytics!
                                </span>
                            </div>
                        </Card>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    </div>
</template>
