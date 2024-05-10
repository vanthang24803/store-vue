<script setup>
import { ref } from "vue";
import { useHead } from "@unhead/vue";
import Modal from "@/components/ui/Modal.vue";
import Logo from "@/components/main/Logo.vue";

import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { loginSchema } from "@/schema/auth";
import SocialButton from "@/components/main/SocialButton.vue";

import GoogleIcon from "@/assets/google.svg";
import FacebookIcon from "@/assets/fb.png";
import GithubIcon from "@/assets/github.png";
import useSocialLogin from "@/hooks/use-social-login";

const router = useRouter();
const authStore = useAuthStore();

useHead({
  title: "Đăng Nhập - AMAK Store",
});

const formSchema = toTypedSchema(loginSchema);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const loading = ref(false);

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  try {
    await authStore.login(values.email, values.password, router);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});

const { loginWithFacebook, loginWithGoogle, loginWithGithub } =
  useSocialLogin();
</script>

<template>
  <Modal>
    <Logo />
    <div class="flex flex-col">
      <h2 class="text-xl font-semibold subpixel-antialiased">Login</h2>
      <span class="font-medium text-sm"> to continue to AMAK Store </span>
    </div>

    <form @submit="onSubmit" class="flex flex-col space-y-3 py-2">
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              type="email"
              placeholder="Email..."
              v-bind="componentField"
              autocomplete="off"
              :disabled="loading"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input
              type="password"
              placeholder="Password..."
              v-bind="componentField"
              autocomplete="off"
              :disabled="loading"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <span
        class="flex justify-end text-sm underline cursor-pointer text-neutral-800"
        @click="router.push({ path: 'forgot-password' })"
        >Forgot password</span
      >

      <Button type="submit" :disabled="loading"> Login </Button>
    </form>
    <div class="flex flex-col space-y-2 py-2">
      <SocialButton
        :click="loginWithGoogle"
        :image="GoogleIcon"
        provider="google"
      />
      <SocialButton
        :click="loginWithFacebook"
        :image="FacebookIcon"
        provider="facebook"
      />

      <SocialButton
        :click="loginWithGithub"
        :image="GithubIcon"
        provider="github"
      />
    </div>

    <div class="flex items-center space-x-2 text-sm pt-3">
      <p>No account?</p>
      <RouterLink to="/register" class="text-sm text-sky-500">
        Create now
      </RouterLink>
    </div>
  </Modal>
</template>
