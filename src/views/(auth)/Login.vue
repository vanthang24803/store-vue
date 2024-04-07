<script setup>
import { ref } from 'vue';
import { useHead } from '@unhead/vue'
import Modal from '@/components/Modal.vue';
import Logo from '@/components/Logo.vue';

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
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';

const router = useRouter();
const auth = useAuthStore();

useHead({
    title: 'Đăng Nhập - AMAK Store'
})

const formSchema = toTypedSchema(z.object({
    email: z.string().min(1).max(255),
    password: z.string().min(1).max(255),
}))

const { handleSubmit } = useForm({
    validationSchema: formSchema,
})

const loading = ref(false);

const onSubmit = handleSubmit(async (values) => {
    loading.value = true;
    try {
        await auth.login(values.email, values.password, router);
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
})


</script>


<template>
    <Modal>
        <Logo />
        <div class="flex flex-col">
            <h2 class="text-xl font-semibold subpixel-antialiased">
                Login
            </h2>
            <span class="font-medium text-sm">
                to continue to AMAK Store
            </span>
        </div>

        <form @submit="onSubmit" class="flex flex-col space-y-3 py-2">
            <FormField v-slot="{ componentField }" name="email">
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="Email..." v-bind="componentField" autocomplete="off" :disabled="loading" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="password">
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="Password..." v-bind="componentField" autocomplete="off" :disabled="loading" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <Button variant="link" class="flex justify-end" @click="router.push({ path: 'forgot-password' })">Forgot
                password</Button>

            <Button type="submit" :disabled="loading">
                Login
            </Button>
        </form>

        <div class="flex items-center space-x-1 text-sm">
            <p> No account? </p>
            <RouterLink to="/register" class="text-sm text-sky-500">
                Create now
            </RouterLink>
        </div>
    </Modal>
</template>