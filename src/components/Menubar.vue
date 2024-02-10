<script setup>
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { menubar } from "@/constant";

</script>


<template>
    <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
                <NavigationMenuTrigger>Danh mục sản phẩm</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-3 lg:w-[600px]">
                        <li v-for="component in menubar" :key="component.title">
                            <NavigationMenuLink asChild>
                                <a class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    :href="component.href">
                                    <div class="text-sm font-semibold leading-none ">{{ component.title }}</div>
                                </a>
                            </NavigationMenuLink>
                        </li>
                    </ul>
                </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem class="lg:block hidden">
                <router-link to="/collections/sach-ban-chay">
                    <NavigationMenuLink class="navigationMenuTriggerStyle">
                        Sách bán chạy
                    </NavigationMenuLink>
                </router-link>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
</template>
  

  