<script setup>
import Logo from '@/components/Logo.vue';
import Modal from '@/components/Modal.vue';
import { ref } from 'vue';
import { statusList } from '@/constant';
import { price } from '@/lib/format';
import { format } from "date-fns";

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useHead } from '@unhead/vue'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Spinner from '@/components/Spinner.vue';

let error = ref("");
let order = ref();
let loading = ref(false);
let hasSearched = ref(false);

const router = useRouter();

const formSchema = toTypedSchema(z.object({
  id: z.string().min(1),
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  loading.value = true;
  hasSearched.value = true;
  error.value = "";
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/order/${values.id}`
      );

      if (response.status == 200) {
        order.value = response.data;
      }
    } catch (error) {
      if (error.response && error.response.status == 404) {
        error.value = "ĐƠn hàng không tồn tại";
      }
    } finally {
      loading.value = false;
    }
  };

  fetchData();
})

function reset() {
  order.value = null;
  error.value = "";
  form.resetForm();
}

useHead({
  title: 'Tra cứu đơn hàng | AMAK Store'
})

</script>

<template>
  <Modal>
    <Logo />
    <div class="flex flex-col my-2">
      <h2 class="text-xl font-semibold">Tìm kiếm</h2>
      <span class="text-neutral-800 text-sm">
        đơn hàng của AMASK Store
      </span>
    </div>
    <Spinner v-show="loading" />
    
    <div v-if="order">
      <div class="flex flex-col space-y-2">
        <div class="flex space-x-2">
          <span>Mã đơn hàng:</span>
          <span class="font-medium hover:cursor-pointer text-sm md:text-base overflow-auto line-clamp-1">
            {{ order?.id }}
          </span>
        </div>
        <div class="flex items-center space-x-2">
          <span>Người đặt hàng:</span>
          <span class="font-semibold">{{ order?.name }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <span>SĐT:</span>
          <span class="font-semibold">
            {{ order?.numberPhone }}
          </span>
        </div>
        <div class="flex items-center space-x-2 overflow-hidden">
          <span>Địa chỉ:</span>
          <span class="line-clamp-1 font-semibold">
            {{ order?.address }}
          </span>
        </div>

        <div class="flex items-center space-x-2">
          <span>Thành tiền:</span>
          <span class="font-semibold">
            {{ price(order?.totalPrice) }}₫
          </span>
        </div>

        <div class="flex items-center space-x-2">
          <span>Trạng thái:</span>
          <span class="font-semibold">
            {{ statusList[order?.status] }}
          </span>
        </div>

        <div class="flex items-center space-x-2">
          <span>Ngày đặt:</span>
          <span class="font-semibold">
            {{ order?.createAt ? format(new Date(order.createAt), "dd-MM-yyyy HH:mm:ss") : '' }}
          </span>
        </div>
        <div class="flex flex-col">
          <span>Danh sách sản phẩm:</span>
          <div class="text-sm space-y-1 my-2">
            <p v-for="(item, index) in order?.products" :key="index">
              - {{ item.name }} - {{ item.option }} x{{ item.quantity }}</p>
          </div>
        </div>

        <div class="flex items-center justify-between space-x-2">
          <Button class="w-full" variant="secondary" @click="reset">
            Thoát
          </Button>
          <Button class="w-full" @click="() => router.push({ path: '/' })">
            Trang chủ
          </Button>
        </div>
      </div>
    </div>
    <div v-else>
      <div>
        <FormField v-slot="{ componentField }" name="id">
          <FormItem>
            <FormLabel>Nhập vào mã vận đơn</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button type="submit" :disabled="loading" class="my-4" @click="onSubmit">
          Submit
        </Button>
      </div>
    </div>
  </Modal>
</template>
