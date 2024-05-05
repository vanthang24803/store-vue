<script setup>
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable'
import Customers from "./Customers.vue"
import SellingProducts from './SellingProducts.vue';

</script>

<template>
    <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
            <SellingProducts />
        </ResizablePanel>
        <ResizableHandle disabled />
        <ResizablePanel>
            <Customers />
        </ResizablePanel>
    </ResizablePanelGroup>
</template>
