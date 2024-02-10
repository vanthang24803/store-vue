<script setup>

import { RouterLink } from "vue-router";
import Menubar from "./Menubar.vue";
import Search from "./Search.vue";
import Cart from "./Cart.vue";

</script>

<template>
    <nav
        className="fixed top-0 w-full h-14 border-b px-6 shadow-sm dark:bg-slate-700 bg-white flex items-center z-50 text-sm">
        <div className="md:max-w-screen-xl mx-auto flex items-center w-full justify-between">
            <div className="flex items-center space-x-8">
                <RouterLink to="/">
                    <img src="../assets/logo.png" alt="logo" className="w-auto h-10 object-cover">
                </RouterLink>
                <div class="flex items-center space-x-8">
                    <Menubar />
                </div>
            </div>
            <Search />
            <Cart />
        </div>
    </nav>
</template>


