<script setup>

import { useHead } from "@unhead/vue";
import Navbar from "@/components/dashboard/overview/Navbar.vue";
import Sidebar from "@/components/dashboard/overview/Sidebar.vue"
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-vue-next";


useHead({
    title: "Dashboard | AMAK Store"
})

</script>

<template>
    <div class="h-full hidden lg:block">
        <div className="h-20 md:pl-60 fixed inset-y-0 w-full z-50">
            <Navbar />
        </div>
        <div class="flex h-full w-60 flex-col fixed inset-y-0 z-50">
            <Sidebar />
        </div>
        <main class="lg:pl-64 pt-24 px-4">
            <RouterView />
        </main>
    </div>
    <div class="h-svh lg:hidden flex flex-col space-y-4 items-center justify-center">
        <AlertTriangle class="w-24 h-24" />
        <div class="flex flex-col text-center text-sm md:text-base">
            <p>Trang này không hỗ trợ kích thước màn hình của bạn.</p>
            <p>Vui lòng truy cập trên thiết bị phù hợp!</p>
        </div>
        <RouterLink to="/">
            <Button variant="primary">Trở về trang chủ</Button>
        </RouterLink>
    </div>
</template>
