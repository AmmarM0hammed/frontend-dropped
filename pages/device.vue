<script setup>

const header = ref(['المعرف', 'الاسم', 'تاريخ الانشاء'])
const body = ref([
    "id",
    "name",
    "creationDate",

])
const deviceModal = useDeviceModel();
const filter = ref([
    {
        title: 'الاسم',
        key: 'Name',
        type: "text",

    },



])
const adddeviceModalModal = ref(false)

import { DeviceModal, DeviceIdentificationSchema } from "~/schema/Device"

const deviceModalFormData = ref({
    type: 'add',
    schema: DeviceModal,
    title: "اضافة جهاز",
    composables: useDeviceModel(),
    inputs: [
        {
            type: 'text',
            title: 'الاسم',
            key: 'name'
        },

    ]
})



const handlerClose = () => {
    adddeviceModalModal.value = false
}



const headerDeviceIdentification = ref(['المعرف', 'الاسم', 'تاريخ الانشاء'])

const bodyDeviceIdentification = ref([
    "id",
    "name",
    "creationDate",

])


const DeviceIdentification = useDeviceIdentification();

const filterDeviceIdentification = ref([
    {
        title: 'الاسم',
        key: 'Name',
        type: "text",

    },

])
const addDeviceIdentificationModal = ref(false)



const DeviceIdentificationFormData = ref({
    type: 'add',
    schema: DeviceIdentificationSchema,
    title: "اضافة تعريف",
    composables: useDeviceIdentification(),
    inputs: [
        {
            type: 'text',
            title: 'اسم ',
            key: 'name'
        },

    ]
})

const handlerDeviceIdentificationClose = () => {
    addDeviceIdentificationModal.value = false
}






const headerOrigin = ref(["المعرف", "الاسم", "تاريخ الانشاء"])
const bodyOrigin = ref([
    "id",
    "name",
    "creationDate",

])

const Origin = useOrigin();
const filterOrigin = ref([
    {
        title: 'الاسم',
        key: 'name',
        type: "text",

    }


])

const addOriginModal = ref(false)
import { OriginSchema } from "~/schema/Origin"

const OriginFormData = ref({
    type: 'add',
    schema: OriginSchema,
    title: "اضافة منشأ",
    composables: useOrigin(),
    inputs: [
        {
            type: 'text',
            title: 'الاسم',
            key: 'name'
        },
    ]
})

const handlerCloseOrigin = () => {
    addOriginModal.value = false
}



const currentTap = ref(0)

</script>

<template>

    <br>
    <div class="flex flex-row item-center gap-10  justify-end  w-full ">

        <div class="flex flex-row gap-5 items-center">
            <div @click="currentTap = 2"
                :class="currentTap == 2 ? ' border-primary font-semibold' : 'text-gray-500 font-medium border-transparent'"
                class="flex justify-center item-center jui-btn   border-b-[3px]  py-1 px-2">
                المنشأ
            </div>
            <div @click="currentTap = 1"
                :class="currentTap == 1 ? ' border-primary font-semibold' : 'text-gray-500 font-medium border-transparent'"
                class="flex justify-center item-center jui-btn   border-b-[3px]  py-1 px-2">
                تعريف الجهاز
            </div>

            <div @click="currentTap = 0"
                :class="currentTap == 0 ? ' border-primary font-semibold' : 'text-gray-500 font-medium border-transparent'"
                class="flex justify-center item-center jui-btn    border-b-[3px]  py-1 px-2">
                الاجهزة
            </div>



        </div>

        <div class="">
            <button @click="adddeviceModalModal = true" class="btn text-sm " v-if="currentTap == 0">
                <Icon name="ph:plus" size="19" />
                اضافة جهاز
            </button>
            <button @click="addDeviceIdentificationModal = true" class="btn text-sm " v-if="currentTap == 1">
                <Icon name="ph:plus" size="19" />
                اضافة تعريف
            </button>
            <button @click="addOriginModal = true" class="btn text-sm " v-if="currentTap == 2">
                <Icon name="ph:plus" size="19" />
                اضافة منشأ
            </button>
        </div>
    </div>
    <br>

    <div class=" py-14 pl-5" v-if="currentTap == 0">
        <UITable @closeAddModal="handlerClose" :addFormModal="adddeviceModalModal" :addForm="deviceModalFormData"
            :hasAdd="false" :filter="filter" :header="header" :body="body" :data="deviceModal"
            :composables="deviceModal" />
    </div>

    <div class=" py-14 pl-5" v-if="currentTap == 1">
        <UITable @closeAddModal="handlerDeviceIdentificationClose" :addFormModal="addDeviceIdentificationModal"
            :addForm="DeviceIdentificationFormData" :hasAdd="false" :filter="filterDeviceIdentification"
            :header="headerDeviceIdentification" :body="bodyDeviceIdentification" :data="DeviceIdentification"
            :composables="DeviceIdentification" />
    </div>

    <div class=" py-14 pl-5" v-if="currentTap == 2">
        <UITable @closeAddModal="handlerCloseOrigin" :addFormModal="addOriginModal" :addForm="OriginFormData"
            :hasAdd="false" :filter="filterOrigin" :header="headerOrigin" :body="bodyOrigin"
            :data="Origin" :composables="Origin" />
    </div>









    <!-- <UIModal v-if="adddeviceModalModal" @close="adddeviceModalModal = false">
        <p class="text-lg text-center">اضافة منطقة</p>
        <br>
        <form>
            <UITextInput placeholder="الأسم" label="true" />
            <br>
            <UISelect placeholder="المحافظة" :data="[{
                key: 'test',
                value: 'text'
            }]" />

            <br>
            <button class="btn btn-block text-sm">أضافة</button>
        </form>
    </UIModal> -->






</template>

<style scoped>
.active {
    font-weight: 600;
}
</style>