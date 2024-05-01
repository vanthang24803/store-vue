<script setup>

import { onMounted, ref } from "vue";
import Menubar from "./Menubar.vue";
import Search from "./Search.vue";
import Cart from "./Cart.vue";
import Logo from "./Logo.vue";
import Menu from "./Menu.vue";
import { LogOut, Settings, ShoppingCart, User } from 'lucide-vue-next';
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
import UserSvg from "@/components/svg/UserSvg.vue"
import { statusRanking, statusRankingIcon } from '@/constant';
import { price } from "@/lib/format";
import { calculatePercentage } from "@/lib/ranking"
import { _http } from "@/lib/api";


const auth = useAuthStore();

const router = useRouter();

const profile = ref({});

let rank = ref();
let percentage = ref(0);
let totalOrder = ref(0);

const fetchProfile = async () => {
    try {
        const response = await _http.get(`/api/auth/profile/${auth.user.id}`,
            { headers: { Authorization: `Bearer ${auth.token}` } }
        );

        if (response.status === 200) {
            profile.value = response.data.profile
            rank.value = calculatePercentage(profile.value?.totalPrice);
            percentage.value = rank.value.percentage
        }
    }
    catch (error) {
        console.error(error);
    }
}

const fetchOrder = async () => {
    const response = await _http.get(
        `/api/order/${auth.user?.id}/user`
    );

    if (response.status == 200) {
        totalOrder.value = response.data.filter((c) => c.status != "SUCCESS").length
    }
};


onMounted(() => {
    if (auth.isLogin) {
        Promise.all([fetchOrder(), fetchProfile()]);
    }
});



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

                        <div class="flex flex-col text-[12px] p-2 space-y-1">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center space-x-2">
                                    <span>Cấp bậc: {{ statusRanking[profile?.rank] }}</span>
                                    <img :src="statusRankingIcon[profile?.rank]" :alt="statusRanking[profile?.rank]"
                                        class="w-5 h-5 object-cover">
                                </div>
                                <span>{{ price(profile?.totalPrice) }}₫</span>

                            </div>
                            <div class="w-full rounded h-[3px] bg-neutral-200">
                                <div class="rounded h-[3px]" :class="percentage > 0 ? 'bg-green-500' : 'bg-neutral-100'"
                                    :style="{ width: `${percentage}%` }" />
                            </div>
                        </div>
                        <DropdownMenuSeparator />

                        <DropdownMenuGroup>
                            <DropdownMenuItem @click="router.push({ path: `/profile/${auth.user.id}` })">
                                <User class="w-4 h-4 mr-2" />
                                <span>Trang cá nhân</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem @click="router.push({ path: `/profile/${auth.user.id}/orders` })">
                                <ShoppingCart class="w-4 h-4 mr-2" />
                                <div class="flex items-center space-x-2">
                                    <span>Đơn hàng của bạn</span>
                                    <div class="flex items-center justify-center w-5 h-5 rounded-full text-white bg-red-500 text-sm animate-bounce"
                                        v-show="totalOrder > 0">
                                        {{ totalOrder }}
                                    </div>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem @click="router.push({ path: `/profile/${auth.user.id}/settings` })">
                                <Settings class="mr-2 h-4 w-4" />
                                <span>Cài đặt</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem @click="auth.logout">
                                <LogOut class="mr-2 h-4 w-4" />
                                <span>Đăng xuất</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <UserSvg v-else @click="router.push({ path: '/login' })" />
                <Cart />
                <Menu />
            </div>
        </div>
    </nav>
</template>
