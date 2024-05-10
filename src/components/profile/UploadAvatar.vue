<script setup>
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ref, nextTick } from "vue";
import axios from "axios";
import { useAuthStore } from "@/store/auth";

const props = defineProps({
  fetchData: Function,
  profile: Object,
  id: String,
});

const auth = useAuthStore();

const fileInputRef = ref(null);

const avatar = ref(auth.user?.avatar);

const open = ref(false);

const loading = ref(false);

const handleAvatarClick = () => {
  nextTick(() => {
    if (fileInputRef.value instanceof HTMLElement) {
      fileInputRef.value.click();
    }
  });
};

const handleFileChange = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    const url = URL.createObjectURL(file);
    avatar.value = url;
  }
};

const onSubmit = async () => {
  const formData = new FormData();
  if (fileInputRef.value?.files?.length) {
    formData.append("id", props.id || "");
    formData.append("file", fileInputRef.value.files[0]);
  }

  loading.value = true;

  axios
    .post(
      `${import.meta.env.VITE_API_URL}/api/auth/${props.id}/avatar`,
      formData,
      { headers: { Authorization: `Bearer ${auth.token}` } },
    )
    .then((response) => {
      if (response.status == 200) {
        props.fetchData();
        open.value = false;
      }
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger>
      <Avatar class="w-24 h-24 hover:cursor-pointer" @click="handleAvatarClick">
        <AvatarImage :src="auth.user.avatar" />
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[450px]">
      <DialogHeader>
        <DialogTitle>Edit avatar</DialogTitle>
        <DialogDescription class="text-xs">
          Make changes to your avatar profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div class="flex flex-col space-y-4 items-center justify-center">
        <Avatar class="w-36 h-36" @click="handleAvatarClick">
          <AvatarImage :src="avatar" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <Input
          type="file"
          :ref="fileInputRef"
          style="display: none"
          @change="handleFileChange"
        />
      </div>
      <DialogFooter>
        <Button
          type="submit"
          @click="onSubmit"
          :disabled="loading || profile?.avatar == avatar"
        >
          Save changes
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
