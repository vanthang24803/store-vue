<script setup>

import Menubar from "./Menubar.vue";
import Search from "./Search.vue";
import Cart from "./Cart.vue";
import Logo from "./Logo.vue";
import Menu from "./Menu.vue";

</script>

<template>
    <nav
        className="fixed top-0 w-full h-14 border-b px-6 shadow-sm dark:bg-slate-700 bg-white flex items-center z-50 text-sm">
        <div className="md:max-w-screen-xl mx-auto flex items-center w-full justify-between">
            <div className="flex items-center space-x-8">
                <Logo />
                <div class="md:flex items-center space-x-8 hidden">
                    <Menubar />
                </div>
            </div>
            <Search />
            <div class="flex items-center space-x-3">
                <Cart />
                <Menu />
            </div>
        </div>
    </nav>
</template>


