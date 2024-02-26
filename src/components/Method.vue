<script setup>
import { Check, MapPin, Package2 } from 'lucide-vue-next';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { info } from '@/constant';
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input'

const props = defineProps({
    sendChecked: Boolean,
    storeChecked: Boolean,
    handleCheckboxChange: Function,
})

</script>

<template>
    <div>
        <div class="w-full rounded-md border border-neutral-200 p-4 flex flex-col space-y-4">
            <div class="flex items-center space-x-2" @click="handleCheckboxChange('send')">
                <div class="w-4 h-4 rounded flex items-center justify-center border border-neutral-700">
                    <Check v-if="sendChecked" class="w-4 h-4" />
                </div>
                <Label for="send">Giao tận nơi</Label>
            </div>
            <div class="flex flex-col space-y-2" v-if="sendChecked">
                <Separator />
                <FormField v-slot="{ componentField }" name="address">
                    <FormItem>
                        <FormControl>
                            <Input type="text" placeholder="Địa chỉ" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
            </div>

            <Separator />
            <div class="flex items-center space-x-2" @click="handleCheckboxChange('store')">
                <div class="w-4 h-4 rounded flex items-center justify-center border border-neutral-700">
                    <Check v-if="storeChecked" class="w-4 h-4" />
                </div>
                <Label for="store">Nhận tại cửa hàng</Label>
            </div>
        </div>

       <div class="my-2">
        <div v-if="sendChecked" class="w-full rounded-md border border-neutral-200 p-4 flex flex-col space-y-2">
            <div class="flex items-center justify-center">
                <Package2 class="w-20 h-20" />
            </div>
            <span class="text-[12px] text-center">
                Vui lòng chọn tỉnh / thành để có danh sách phương thức vận chuyển.
            </span>
        </div>

        <div v-if="storeChecked" class="w-full rounded-md border border-neutral-200 p-4 flex flex-col space-y-2">
            <div class="flex items-center space-x-2 text-sm">
                <MapPin />
                <span>{{ info.address }}</span>
            </div>
        </div>
       </div>
    </div>
</template>