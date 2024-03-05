<script setup>
import { ref, watchEffect } from 'vue';
import axios from 'axios';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from '@/components/ui/select'

const setAddress = ref('');
const provinces = ref([]);
const districts = ref([]);
const wards = ref([]);

const props = defineProps({
    address: String
})

const selectedProvince = ref(null);
const selectedDistrict = ref(null);
const selectedWard = ref(null);

watchEffect(async () => {
    const response = await axios.get("https://vapi.vnappmob.com/api/province/");
    if (response.status === 200) {
        provinces.value = response.data.results;
    }
});

watchEffect(async () => {
    if (selectedProvince.value) {
        const response = await axios.get(`https://vapi.vnappmob.com/api/province/district/${selectedProvince.value}`);
        if (response.status === 200) {
            districts.value = response.data.results;
        }
    }
});

watchEffect(async () => {
    if (selectedDistrict.value) {
        const response = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${selectedDistrict.value}`);
        if (response.status === 200) {
            wards.value = response.data.results;
        }
    }
});
``

const emit = defineEmits(['updateAddress']);

watchEffect(() => {
    if (selectedProvince.value && selectedDistrict.value) {
        const provinceName = getProvinceName(selectedProvince.value);
        const districtName = getDistrictName(selectedDistrict.value);
        const wardName = getWardName(selectedWard.value);
        let  address = `${provinceName || ''}, ${districtName || ''}, ${wardName || ''}`;

        emit('updateAddress', address);
    }
});

const getProvinceName = (id) => provinces.value.find(province => province.province_id === id)?.province_name;
const getDistrictName = (id) => districts.value.find(district => district.district_id === id)?.district_name;
const getWardName = (id) => wards.value.find(ward => ward.ward_id === id)?.ward_name;
</script>


<template>
    <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select v-model="selectedProvince">
            <SelectTrigger class="w-full">
                {{ getProvinceName(selectedProvince) || 'Tỉnh / thành' }}
            </SelectTrigger>
            <SelectContent>
                <SelectItem v-for="item in provinces" :key="item.province_id" :value="item.province_id">
                    {{ item.province_name }}
                </SelectItem>
            </SelectContent>
        </Select>

        <Select v-model="selectedDistrict">
            <SelectTrigger class="w-full">
                {{ getDistrictName(selectedDistrict) || 'Quận / huyện' }}
            </SelectTrigger>
            <SelectContent>
                <SelectItem v-for="item in districts" :key="item.district_id" :value="item.district_id">
                    {{ item.district_name }}
                </SelectItem>
            </SelectContent>
        </Select>

        <Select v-model="selectedWard">
            <SelectTrigger class="w-full">
                {{ getWardName(selectedWard) || 'Phường xã' }}
            </SelectTrigger>
            <SelectContent>
                <SelectItem v-for="item in wards" :key="item.ward_id" :value="item.ward_id">
                    {{ item.ward_name }}
                </SelectItem>
            </SelectContent>
        </Select>
    </div>
</template>
