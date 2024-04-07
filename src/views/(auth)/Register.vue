<script setup>
import { ref } from 'vue';
import Modal from '@/components/Modal.vue';
import Logo from '@/components/Logo.vue';
import { useTitle } from '@vueuse/core'
import axios from "axios";

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/toast/use-toast'

useTitle('Đăng ký - AMAK Store')
const { toast } = useToast()

const formSchema = toTypedSchema(z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().min(1).max(255),
  password: z.string().min(1).max(255),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const loading = ref(false);
const active = ref(false);

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/register`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      active.value = true;
      toast({
        title: 'Email đã được gửi',
      });
    }

  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
})


</script>

<template>
  <Modal>
    <div class="py-2 flex items-center justify-center flex-col space-y-6" v-if="active">
      <img src="/email-send.svg" alt="svg" loading="lazy" class="w-56 h-56">
      <h1 class="text-center font-bold md:text-lg">
        Account verification email has been sent!
      </h1>

      <div class="flex items-center justify-center space-x-6 mt-8">
        <Button variant="outline" class="w-[150px]" size="default" @click="active = false">
          Exit
        </Button>
        <Button variant="primary" class="w-[150px]" size="default">
          Resend Email
        </Button>
      </div>
    </div>

    <div class="flex flex-col" v-else>
      <Logo />
      <div class="flex flex-col space-y-2 pt-2">
        <h2 class="text-xl font-semibold subpixel-antialiased">
          Register
        </h2>
        <span class="font-medium text-sm">
          to continue to AMAK Store
        </span>
      </div>

      <form @submit="onSubmit" class="flex flex-col space-y-3 py-2">
        <div className="flex items-center justify-between space-x-2">
          <FormField v-slot="{ componentField }" name="firstName">
            <FormItem>
              <FormLabel>Firstname</FormLabel>
              <FormControl>
                <Input type="name" placeholder="Firstname..." v-bind="componentField" autocomplete="off"
                  :disabled="loading" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="lastName">
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Last name..." v-bind="componentField" autocomplete="off"
                  :disabled="loading" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="Email..." v-bind="componentField" autocomplete="off "
                :disabled="loading" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="Password..." v-bind="componentField" autocomplete="off"
                :disabled="loading" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button type="submit" :disabled="loading">
          Submit
        </Button>
      </form>

      <div class="flex items-center space-x-1 text-sm">
        <p> Have an account? </p>
        <RouterLink to="/login" class="text-sm text-sky-500">
          Login now
        </RouterLink>
      </div>
    </div>
  </Modal>
</template>