<script setup>
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable'
import Customers from "./Customers.vue"

</script>

<template>
    <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>One</ResizablePanel>
        <ResizableHandle disabled />
        <ResizablePanel>
            <Customers />
        </ResizablePanel>
    </ResizablePanelGroup>
</template>
