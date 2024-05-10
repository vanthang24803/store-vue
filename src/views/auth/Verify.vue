<script setup>
import { ref, computed, watchEffect } from "vue";
import { useHead } from "@unhead/vue";
import Modal from "@/components/ui/Modal.vue";
import { Button } from "@/components/ui/button";
import { useRouter, useRoute } from "vue-router";
import Spinner from "@/components/main/Spinner.vue";
import { useAuthStore } from "@/store/auth";

const loading = ref(false);
const active = ref(false);

const router = useRouter();
const route = useRoute();

const auth = useAuthStore();

const userId = computed(() => route.query.userId);
const token = computed(() => route.query.token);

watchEffect(() => {
  try {
    loading.value = true;
    auth.verifyAccount(
      userId.value,
      encodeURIComponent(token.value.replaceAll(" ", "+")),
    );
    active.value = true;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
});

useHead({
  title: "Verify Account",
});
</script>

<template>
  <Modal>
    <Spinner v-show="loading" />
    <div
      class="py-2 flex items-center justify-center flex-col space-y-6"
      v-show="active"
    >
      <img src="/email-send.svg" alt="svg" loading="lazy" class="w-56 h-56" />
      <h1 class="text-center font-bold md:text-lg">
        Xác minh tài khoản thành công!
      </h1>

      <div class="flex items-center justify-center space-x-6 mt-8">
        <Button
          variant="primary"
          class="w-[150px]"
          size="default"
          @click="router.push({ path: '/' })"
        >
          Trở về trang chủ
        </Button>
      </div>
    </div>
  </Modal>
</template>
