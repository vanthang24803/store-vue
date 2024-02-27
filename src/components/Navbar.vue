<script setup>

import Menubar from "./Menubar.vue";
import Search from "./Search.vue";
import Cart from "./Cart.vue";
import Logo from "./Logo.vue";
import Menu from "./Menu.vue";
import { LogOut, Settings, ShoppingCart, User,UserRound } from 'lucide-vue-next';
import { useRouter } from "vue-router";
import { useAuthStore } from '@/store/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const auth = useAuthStore();

const router = useRouter();

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
            <div class="flex items-center space-x-4 hover:cursor-pointer">
                <DropdownMenu v-if="auth.isLogin">
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage :src="auth.user.avatar" :alt="auth.user.name" />
                            <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent class="w-56">
                        <DropdownMenuLabel>{{ auth.user.name }}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem @click="router.push({ path: `profile/${auth.user.id}` })">
                                <User class="w-4 h-4 mr-2" />
                                <span>Trang cá nhân</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem @click="router.push({ path: `profile/${auth.user.id}/orders` })">
                                <ShoppingCart class="w-4 h-4 mr-2" />
                                <span>Đơn hàng của bạn</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem @click="router.push({ path: `profile/${auth.user.id}/settings` })">
                                <Settings class="mr-2 h-4 w-4" />
                                <span>Cài đặt</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                @click="auth.logout"                            
                            >
                                <LogOut class="mr-2 h-4 w-4" />
                                <span>Đăng xuất</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                <UserRound stroke-width="1.75" v-else class="w-6 h-6" @click="router.push({ path: 'login' })" />
                <Cart />
                <Menu />
            </div>
        </div>
    </nav>
</template>


