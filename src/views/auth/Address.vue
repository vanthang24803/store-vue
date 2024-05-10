<script setup>
import { ref, watchEffect } from "vue";
import ProfileBar from "@/components/profile/ProfileBar.vue";
import Spinner from "@/components/main/Spinner.vue";
import Container from "@/components/ui/Container.vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { useTitle } from "@vueuse/core";
import Separator from "@/components/ui/separator/Separator.vue";
import Button from "@/components/ui/button/Button.vue";
import { Check, Plus, X } from "lucide-vue-next";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "vee-validate";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { _http } from "@/lib/api";

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1).max(255),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

const address = ref([]);
const loading = ref(false);
const { toast } = useToast();

const auth = useAuthStore();
const route = useRoute();
const create = ref(false);

const toggleCreate = () => {
  create.value = !create.value;
};

const fetchData = async () => {
  try {
    const response = await _http.get(
      `/api/auth/profile/${route.params.id}/address`,
      { headers: { Authorization: `Bearer ${auth.token}` } },
    );

    if (response.status === 200) {
      address.value = response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

watchEffect(fetchData);

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const response = await _http.post(
      `/api/auth/profile/${route.params.id}/address`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      },
    );

    if (response.data === 200) {
      toast({
        description: "Success",
      });
      fetchData();
    }
  } catch (error) {
    console.log(error);
  }
});

const activeAddress = async (addressId) => {
  try {
    const response = await _http.put(
      `/api/auth/profile/${route.params.id}/address/${addressId}/active`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      },
    );

    if (response.status == 200) {
      toast({
        description: "Success",
      });
      fetchData();
    }
  } catch (error) {
    console.log(error);
  }
};
useTitle(`Danh sách địa chỉ -  ${auth.user.name}`);
</script>

<template>
  <Container>
    <div class="flex flex-col space-y-8">
      <div class="flex items-center justify-center flex-col space-y-4">
        <h1 class="text-2xl md:text-3xl font-bold tracking-tighter">
          Danh sách địa chỉ
        </h1>
        <Separator class="h-1 bg-black rounded w-[100px]" />
      </div>

      <div
        class="flex flex-col lg:flex-row md:px-12 px-4 space-y-4 lg:space-y-0"
      >
        <ProfileBar />

        <Spinner v-show="loading" />

        <div
          v-show="address"
          class="flex flex-col space-y-4 w-full bg-white p-4 rounded-md"
        >
          <div class="flex items-center justify-between">
            <h2 class="uppercase font-semibold tracking-tight">
              THÔNG TIN Địa chỉ
            </h2>
            <Button size="icon" @click="toggleCreate">
              <Plus v-if="!create" class="w-5 h-5" />
              <X v-else class="w-5 h-5" />
            </Button>
          </div>

          <form
            @submit="onSubmit"
            class="flex flex-col space-y-6"
            v-if="create"
          >
            <FormField v-slot="{ componentField }" name="name">
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Hà nội"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <Button class="w-[200px]">Submit</Button>
          </form>

          <div v-else>
            <div
              class="flex flex-col space-y-3 pt-2"
              v-for="(item, index) in address"
              :key="index"
            >
              <div class="flex items-center justify-between">
                <div
                  class="p-3 border rounded-md flex items-center justify-between hover:cursor-pointer hover:bg-neutral-100/80 w-full"
                  @click="activeAddress(item.id)"
                >
                  <p class="text-sm mx-2">
                    {{ item.name }}
                  </p>
                  <Check v-show="item.status" class="text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Container>
</template>
