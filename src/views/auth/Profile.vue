<script setup>
import { ref, watchEffect, onMounted } from "vue";
import { useForm } from "vee-validate";
import { useAuthStore } from "@/store/auth";
import { useRoute } from "vue-router";
import Container from "@/components/ui/Container.vue";
import { Separator } from "@/components/ui/separator";
import ProfileBar from "@/components/profile/ProfileBar.vue";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/toast/use-toast";
import UploadAvatar from "@/components/profile/UploadAvatar.vue";
import { useTitle } from "@vueuse/core";
import { statusRanking, statusRankingIcon } from "@/constant";
import { price } from "@/lib/format";
import Spinner from "@/components/main/Spinner.vue";
import { _http } from "@/lib/api";

const formSchema = toTypedSchema(
  z.object({
    email: z.string().min(1).max(255),
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

const profile = ref();
const loading = ref(false);
const update = ref(false);

const auth = useAuthStore();
const route = useRoute();
const { toast } = useToast();

const fetchData = async () => {
  try {
    const response = await _http.get(`/api/auth/profile/${route.params.id}`, {
      headers: { Authorization: `Bearer ${auth.token}` },
    });

    if (response.status === 200) {
      profile.value = response.data.profile;
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(fetchData);

watchEffect(() => {
  if (profile.value) {
    form.setValues({
      email: profile.value.email,
      firstName: profile.value.firstName,
      lastName: profile.value.lastName,
    });

    useTitle(
      `Trang cá nhân -  ${profile.value.firstName} ${profile.value.lastName}`,
    );
  }
});

const handleUpdate = () => {
  update.value = !update.value;
};

const onSubmit = form.handleSubmit(async (values) => {
  try {
    loading.value = true;
    const response = await _http.put(
      `/api/auth/profile/${route.params.id}`,
      values,
    );

    if (response.status == 200) {
      update.value = false;
      toast({
        description: "Cập nhật thành công!",
      });

      fetchData();
    }
  } catch (error) {
    console.log(error);
    toast({
      description: "Vui lòng thử lại",
    });
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <Container>
    <div class="flex flex-col space-y-8">
      <div class="flex items-center justify-center flex-col space-y-4">
        <h1 class="text-2xl md:text-3xl font-bold tracking-tighter">
          Tài khoản của bạn
        </h1>
        <Separator class="h-1 bg-black rounded w-[100px]" />
      </div>

      <div
        class="flex flex-col lg:flex-row md:px-12 px-4 space-y-4 lg:space-y-0"
      >
        <ProfileBar />

        <Spinner v-show="loading" />

        <div
          v-show="profile"
          class="flex flex-col space-y-4 w-full bg-white p-4 rounded-md"
        >
          <h2 class="uppercase font-semibold tracking-tight">
            THÔNG TIN TÀI KHOẢN
          </h2>
          <form
            @submit="onSubmit"
            class="flex flex-col space-y-3"
            v-if="update"
          >
            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email.."
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="firstName">
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="First name..."
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="lastName">
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Last name..."
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <Button type="submit" :disabled="loading" class="lg:w-1/3">
              Xác nhận
            </Button>
          </form>
          <div class="flex flex-col space-y-2 pb-4" v-else>
            <div class="flex items-center justify-center my-4">
              <UploadAvatar
                :profile="profile"
                :id="auth.user.id"
                :fetch-data="fetchData"
              />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 text-sm">
              <p class="antialiased">
                Tên: {{ profile?.firstName }} {{ profile?.lastName }}
              </p>
              <p class="antialiased">Email: {{ profile?.email }}</p>

              <div class="flex items-start space-x-2">
                <span> Thành viên: {{ statusRanking[profile?.rank] }}</span>
                <img
                  :src="statusRankingIcon[profile?.rank]"
                  :alt="statusRanking[profile?.rank]"
                  class="w-5 h-5 object-cover"
                />
              </div>
              <span>Tổng đơn hàng đã mua: {{ profile?.totalOrder }}</span>
              <span>Tổng chi tiêu: {{ price(profile?.totalPrice) }}₫</span>
            </div>
            <Button class="lg:w-[160px] w-full" @click="handleUpdate">
              Cập nhật thông tin
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Container>
</template>
