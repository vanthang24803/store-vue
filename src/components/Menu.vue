<script setup>
import { menubar } from "@/constant/index"
import { Menu } from 'lucide-vue-next';
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
</script>

<template>
    <div class="block md:hidden">
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost">
                    <Menu class="w-4 h-4" />
                </Button>
            </SheetTrigger>
            <SheetContent side="bottom">
                <div class="flex flex-col space-y-4 mt-8">
                    <div class="flex flex-col space-y-6 ">
                        <div v-for="(item, index) in menubar" :key="index">
                            <router-link :to="item.href" class="font-semibold">
                                <SheetClose>{{ item.title }}</SheetClose>
                            </router-link>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    </div>
</template>