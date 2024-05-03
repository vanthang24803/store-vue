<script setup>

import { useHead } from "@unhead/vue";
import Navbar from "@/components/dashboard/Navbar.vue";
import Sidebar from "@/components/dashboard/Sidebar.vue"


useHead({
    title : "Dashboard | AMAK Store"
})

</script>

<template>
    <div class="h-full">
        <div className="h-20 md:pl-60 fixed inset-y-0 w-full z-50">
            <Navbar />
        </div>
        <div class="hidden md:flex h-full w-60 flex-col fixed inset-y-0 z-50">
            <Sidebar />
        </div>
        <main class="md:pl-64 pt-24 h-full">
            <RouterView />
        </main>
    </div>
</template>
