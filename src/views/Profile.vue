<script setup>
import axios from 'axios';
import { useHead } from '@unhead/vue'
import { ref, watchEffect, onMounted } from 'vue';
import { useForm } from 'vee-validate'
import { useAuthStore } from '@/store/auth';
import { useRoute } from 'vue-router';
import Container from '@/components/ui/Container.vue';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ProfileBar from '@/components/ProfileBar.vue';

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import {
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage
} from '@/components/ui/form'
import { useToast } from '@/components/ui/toast/use-toast'
import UploadAvatar from '@/components/UploadAvatar.vue';

const formSchema = toTypedSchema(z.object({
   email: z.string().min(1).max(255),
   firstName: z.string().min(1).max(50),
   lastName: z.string().min(1).max(50),
   address: z.string().min(1).max(255),
}))

const form = useForm({
   validationSchema: formSchema,
})

const profile = ref();
const loading = ref(false);
const update = ref(false);

const auth = useAuthStore();
const route = useRoute();
const { toast } = useToast();


const fetchData = async () => {
   try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile/${route.params.id}`,
         { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      profile.value = response.data;


   }
   catch (error) {
      console.error(error);
   }
}

onMounted(fetchData);

watchEffect(() => {
   if (profile.value) {
      form.setValues({
         email: profile.value.email,
         firstName: profile.value.firstName,
         lastName: profile.value.lastName,
         address: profile.value.address,
      });

      useHead({
         title: `Trang cá nhân -  ${profile.value.firstName} ${profile.value.lastName}`
      })
   }
});



const handleUpdate = () => {
   update.value = !update.value;
}

const onSubmit = form.handleSubmit(async (values) => {
   try {
      loading.value = true;
      const response = await axios.put(
         `${import.meta.env.VITE_API_URL}/api/auth/profile/${route.params.id}`,
         values,
         {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${auth.token}`
            },
         }
      );

      if (response.status == 200) {
         update.value = false;
         toast({
            description: 'Cập nhật thành công!'
         })

         fetchData();
      }

   } catch (error) {
      console.log(error);
      toast({
         description: 'Vui lòng thử lại'
      })
   } finally {
      loading.value = false;
   }
})


</script>

<template>
   <Container>
      <div class="flex flex-col space-y-8">
         <div class="flex items-center justify-center flex-col  space-y-4">
            <h1 class="text-2xl md:text-3xl font-bold tracking-tighter">Tài khoản của bạn</h1>
            <Separator class="h-1 bg-black rounded w-[100px]" />
         </div>

         <div class="flex flex-col lg:flex-row  md:px-12 px-4 space-y-4 lg:space-y-0">
            <ProfileBar />

            <div class="flex flex-col space-y-4 w-full bg-white p-4 rounded-md">
               <h2 class="uppercase font-semibold tracking-tight">
                  THÔNG TIN TÀI KHOẢN
               </h2>
               <form @submit="onSubmit" class="flex flex-col space-y-3" v-if="update">
                  <FormField v-slot="{ componentField }" name="email">
                     <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                           <Input type="email" placeholder="Email.." v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  </FormField>

                  <FormField v-slot="{ componentField }" name="firstName">
                     <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                           <Input type="text" placeholder="First name..." v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  </FormField>

                  <FormField v-slot="{ componentField }" name="lastName">
                     <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                           <Input type="text" placeholder="Last name..." v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  </FormField>
                  <FormField v-slot="{ componentField }" name="address">
                     <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                           <Input type="text" placeholder="Address..." v-bind="componentField" />
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
                     <UploadAvatar :profile="profile" :id="auth.user.id" :fetch-data="fetchData" />
                  </div>
                  <p class="antialiased"> Tên: {{ profile?.firstName }} {{ profile?.lastName }}</p>
                  <p class="antialiased"> Email: {{ profile?.email }}</p>

                  <div class="pb-2">
                     <p v-if="profile?.address != ''">
                        Địa chỉ: {{ profile?.address }}
                     </p>
                     <p v-else>Địa chỉ: Đang cập nhật</p>
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