<script setup>
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Copy, Edit, Trash } from "lucide-vue-next";

defineProps({
    id: Object,
})


</script>

<template>
    
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
                <Copy size="18" class="mr-2" /> Copy 
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Edit size="18" class="mr-2" /> Update
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Trash size="18" class="mr-2" /> Delete 
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
