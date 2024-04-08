<script setup>
import { RouterLink } from "vue-router";
import { info, footer } from "@/constant";
import { Mail, MapPin, Phone } from "lucide-vue-next";
import { Separator } from '@/components/ui/separator'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
</script>

<template>
    <div>
        <div class="max-w-screen-xl lg:block hidden mx-auto  py-8 border-t-[1px]">
            <div class="flex justify-between pb-6">
                <div class="flex flex-col space-y-3">
                    <p class="text-xl font-semibold text-[#417505]">{{ info.title }}</p>
                    <div class="flex items-center space-x-3 text-sm">
                        <MapPin class="w-4 h-4" />
                        <span class="line-clamp-2 font-medium">{{ info.address }}</span>
                    </div>
                    <div class="flex items-center space-x-3 text-sm">
                        <Phone class="w-4 h-4" />
                        <span class="line-clamp-2 font-medium">{{ info.phone }}</span>
                    </div>
                    <div class="flex items-center space-x-3 text-sm">
                        <Mail class="w-4 h-4" />
                        <span class="line-clamp-2 font-medium">{{ info.email }}</span>
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-8">
                    <div v-for="(item, index) in footer" class="flex flex-col space-y-3" :key="index">
                        <p class="text-xl font-semibold text-[#417505]">
                            {{ item.title }}
                        </p>
                        <ol className="flex flex-col space-y-2 text-sm">
                            <RouterLink v-for="(label, i) in item.data" :to="label.url" :key="i"
                                className="hover:text-[#65b10d] font-medium">
                                {{ label.name }}
                            </RouterLink>
                        </ol>
                    </div>
                </div>
            </div>

            <Separator />

            <span class="mt-4 flex items-center justify-center text-sm text-neutral-600">
                Copyright © 2024 AMAK Store. Powered by
                <a href="https://github.com/vanthang24803" class="mx-1 hover:text-[#65b10d] font-medium" target="_blank">
                    May Nguyen
                </a>
            </span>
        </div>

        <div class="lg:hidden flex flex-col ">
            <Accordion type="single" collapsible class="w-full px-4 md:px-8">
                <AccordionItem value="item-1">
                    <AccordionTrigger class="hover:text-[#417505]">
                        {{ info.title }}
                    </AccordionTrigger>
                    <AccordionContent>
                        <div class="flex flex-col space-y-2">
                            <div class="flex items-center space-x-3 text-sm">
                                <MapPin class="w-4 h-4" />
                                <span class="line-clamp-2 font-medium">
                                    {{ info.address }}
                                </span>
                            </div>
                            <div class="flex items-center space-x-3 text-sm">
                                <Phone class="w-4 h-4" />
                                <span class="line-clamp-2 font-medium">{{ info.phone }}</span>
                            </div>
                            <div class="flex items-center space-x-3 text-sm">
                                <Mail class="w-4 h-4" />
                                <span class="line-clamp-2 font-medium">{{ info.email }}</span>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem v-for="(value, num) in footer" value={num.toString()} key={num}>
                    <AccordionTrigger class="hover:text-[#417505]">
                        {{ value.title }}
                    </AccordionTrigger>
                    <AccordionContent>
                        <div class="flex flex-col space-y-2">
                            <RouterLink v-for="(a, _) in value.data" :to="a.url"
                                class="line-clamp-2 font-medium text-sm hover:text-[#65b10d]" :key="_">
                                {{ a.name }}
                            </RouterLink>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Separator />

            <span class="my-4 flex items-center justify-center text-sm text-neutral-600">
                Copyright © 2024 AMAK Store. Powered by
                <a href="https://github.com/vanthang24803" class="mx-1 hover:text-[#65b10d] font-medium" target="_blank">
                    May Nguyen
                </a>
            </span>
        </div>
    </div>
</template>


