<script setup>
import BarChart from '@/components/dashboard/BarChart.vue';
import DonutChart from '@/components/dashboard/DonutChart.vue';

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Section from '@/components/dashboard/Section.vue';
import RecentSales from '@/components/dashboard/RecentSales.vue';

</script>

<template>
    <div class="flex flex-col gap-4">
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">
                        Home
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>Overview</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>

        <Section />

        <ResizablePanelGroup direction="horizontal" class="hidden lg:block">
            <ResizablePanel :default-size="65">
                <BarChart />
            </ResizablePanel>
            <ResizableHandle disabled />
            <ResizablePanel :default-size="35" class=" lg:flex items-center justify-center hidden">
                <div class="flex flex-col gap-4">
                    <p class="text-sm font-medium">Sale Overview:</p>
                    <DonutChart />
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>

        <RecentSales />
    </div>
</template>
