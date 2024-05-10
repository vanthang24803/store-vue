<script setup>
import Modal from "@/components/ui/Modal.vue";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useHead } from "@unhead/vue";
import { price } from "@/lib/format";
import { format } from "date-fns";
import { statusList } from "@/constant";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/main/Spinner.vue";
import { useToast } from "@/components/ui/toast/use-toast";
import confetti from "canvas-confetti";
import { _http } from "@/lib/api";

const { toast } = useToast();

let isLoading = ref(false);
let order = ref();
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  try {
    isLoading.value = true;
    const response = await _http.get(`/api/order/${route.params.id}`);
    order.value = response.data;
    confetti();
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
});

const onCopy = () => {
  navigator.clipboard.writeText(route.params.id);
  toast({
    description: "Mã vận đơn đã được copy !",
  });
};

useHead({
  title: "Đơn hàng | AMAK Store",
});
</script>

<template>
  <Modal>
    <div v-if="order">
      <h1 className="text-2xl font-bold text-center uppercase tracking-tighter">
        Chúc Mừng
      </h1>
      <span className="flex items-center justify-center text-[14px] mt-4">
        Đơn hàng của bạn đã được đặt thành công!
      </span>
      <div className="flex flex-col space-y-1  pt-4">
        <div className="flex space-x-2">
          <span>Mã đơn hàng:</span>
          <span
            className="font-medium hover:cursor-pointer text-sm md:text-base overflow-auto line-clamp-1"
            @click="onCopy"
          >
            {{ route.params.id }}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span>Người đặt hàng:</span>
          <span className="font-semibold">{{ order?.name }}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>SĐT:</span>
          <span className="font-semibold">{{ order?.numberPhone }}</span>
        </div>
        <div className="flex items-center space-x-2 overflow-hidden">
          <span>Địa chỉ:</span>
          <span className="line-clamp-1 font-semibold">
            {{ order?.address }}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span>Thành tiền:</span>
          <span className="font-semibold">{{ price(order?.totalPrice) }}₫</span>
        </div>

        <div className="flex items-center space-x-2">
          <span>Trạng thái:</span>
          <span className="font-semibold">{{ statusList[order?.status] }}</span>
        </div>

        <div className="flex items-center space-x-2">
          <span>Ngày đặt:</span>
          <span className="font-semibold">
            {{
              order?.createAt
                ? format(new Date(order.createAt), "dd-MM-yyyy HH:mm:ss")
                : ""
            }}
          </span>
        </div>
        <div className="flex flex-col">
          <span>Danh sách sản phẩm:</span>
          <div className="text-sm space-y-1 my-2">
            <p v-for="(item, index) in order?.products" :key="index">
              - {{ item.name }} - {{ item.option }} x{{ item.quantity }}
            </p>
          </div>
        </div>
        <Button @click="() => router.push({ path: '/' })"> Trang chủ </Button>
      </div>
    </div>
    <Spinner v-else />
  </Modal>
</template>
