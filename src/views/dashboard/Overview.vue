<script setup>
import BarChart from "@/components/dashboard/overview/BarChart.vue";
import DonutChart from "@/components/dashboard/overview/DonutChart.vue";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import Section from "@/components/dashboard/overview/Section.vue";
import RecentSales from "@/components/dashboard/overview/RecentSales.vue";
</script>

<template>
  <div class="flex flex-col gap-5 mb-4">
    <Section />

    <ResizablePanelGroup direction="horizontal" class="hidden lg:block">
      <ResizablePanel :default-size="65">
        <BarChart />
      </ResizablePanel>
      <ResizableHandle disabled />
      <ResizablePanel
        :default-size="35"
        class="lg:flex items-center justify-center hidden"
      >
        <div class="flex flex-col gap-4">
          <p class="text-sm font-medium">Sale Overview:</p>
          <DonutChart />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
    <RecentSales />
  </div>
</template>
