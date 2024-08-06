<script setup>

const header = ref(["المعرف", "التصنيف" , "كيلواط لكل ساعة" , "المحافظة" , "الحالة" , "السعر"])
const body = ref([
    "id",
    "classify",
    "forKWH",
    "governorate.name",
    "isActive",
    "price",

])
const _ElectricityServicePrice = useElectricityServicePrice();
const filter = ref([
  

])
const addElectricityServicePriceModal = ref(false)

import { ElectricityServicePrice } from "~/schema/ElectricityServicePrice"

const ElectricityServicePriceFormData = ref({
    type: 'add',
    schema: ElectricityServicePrice,
    title: "اضافة سعر خدمة الكهرباء",
    composables: useElectricityServicePrice(),
    inputs: [
     
        {
            type: 'select',
            title: 'التصنيف',
            key: 'classify',
            data: [
                {
                    key: 'منزلي',
                    value: 0,
                },
                {
                    key: 'تجاري',
                    value: 1,
                },
                {
                    key: 'الصناعية',
                    value: 2,
                },
                {
                    key: 'الزراعية',
                    value: 3,
                },
                {
                    key: 'حكومي',
                    value: 4,
                },
            ]
        },
        {
            type: 'number',
            title: 'السعر',
            key: 'price',
           
        },
        {
            type: 'number',
            title: 'كيلو واط لكل ساعة',
            key: 'forKWH',
           
        },
        {
            type: 'checkbox',
            title: ' هل نشط ؟ ',
            key: 'isActive',
           
        },
        {
            type: 'select',
            title: 'المحافظة',
            key: 'governorateId',
            data:useGovernorate()
           
        },
    ]
})

const handlerClose = () => {
    addElectricityServicePriceModal.value = false
}



const headerBill = ref(['المعرف', 'المحافظة'])
const bodyBill = ref([
    "id",
    "name",

])
const Bill = useBill();
const filterBill = ref([
    {
        title: 'الاسم',
        key: 'Name',
        type: "text",

    },
])
const addBillModal = ref(false)
import { BillSchema } from "~/schema/Bill"

const billFormData = ref({
    type: 'add',
    schema: BillSchema,
    title: "اضافة فاتورة",
    composables: useBill(),
    inputs: [
        {
            type: 'text',
            title: 'المعرف',
            key: 'serialNumber'
        },
        {
            type: 'date',
            title: 'التاريخ من ',
            key: 'from'
        },
        {
            type: 'date',
            title: 'التاريخ الى ',
            key: 'to'
        },

    ]
})

const handlerBillClose = () => {
    addBillModal.value = false
}


const headerPeakTime = ref([ 'الاسم' , "الوصف" , "وقت التشغيل" , "وقت الانتهاء" , "النسبة" , "الحالة" , "المحافظة" , "المدينة"])
const bodyPeakTime = ref([
    "name",
    "description",
    "startTime",
    "endTime",
    "percentage",
    "isActive",
    "governorate.name",
    "city.name",

])
const PeakTime = usePeakTime();
const filterPeakTime = ref([
    {
        title: 'الاسم',
        key: 'Name',
        type: "text",

    },
])
const addPeakTimeModal = ref(false)
import { PeakTimeSchema } from "~/schema/PeakTime"

const peakTimeFormData = ref({
    type: 'add',
    schema: PeakTimeSchema,
    title: "اضافة وقت ذروة",
    composables: usePeakTime(),
    inputs: [
        {
            type: 'text',
            title: 'الاسم',
            key: 'name'
        },
        {
            type: 'text',
            title: 'الوصف',
            key: 'description'
        },
        {
            type: 'date',
            title: 'وقت التشغيل ',
            key: 'startTime'
        },
        {
            type: 'date',
            title: 'وقت الانتهاء ',
            key: 'endTime'
        },
        {
            type: 'number',
            title: 'النسبة ',
            key: 'percentage'
        },
        {
            type: 'checkbox',
            title: 'نشط ؟  ',
            key: 'isActive'
        },
        {
            type: 'select',
            title: 'المحافظة  ',
            key: 'governorateId',
            data:useGovernorate()
        },
        {
            type: 'select',
            title: 'المنطقة  ',
            key: 'cityId',
            data:useCity()
        },

    ]
})

const handlerPeakTimeClose = () => {
    addPeakTimeModal.value = false
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
                وقت الذروة
            </div>
            <div @click="currentTap = 1"
                :class="currentTap == 1 ? ' border-primary font-semibold' : 'text-gray-500 font-medium border-transparent'"
                class="flex justify-center item-center jui-btn   border-b-[3px]  py-1 px-2">
                الفواتير
            </div>

            <div @click="currentTap = 0"
                :class="currentTap == 0 ? ' border-primary font-semibold' : 'text-gray-500 font-medium border-transparent'"
                class="flex justify-center item-center jui-btn    border-b-[3px]  py-1 px-2">
                سعر خدمة الكهرباء
            </div>



        </div>

        <div class="">
            <button @click="addElectricityServicePriceModal = true" class="btn text-sm " v-if="currentTap == 0">
                <Icon name="ph:plus" size="19" />
                اضافة سعر خدمة الكهرباء
            </button>
            <button @click="addBillModal = true" class="btn text-sm " v-if="currentTap == 1">
                <Icon name="ph:plus" size="19" />
                اضافة فاتورة
            </button>
            <button @click="addPeakTimeModal = true" class="btn text-sm " v-if="currentTap == 2">
                <Icon name="ph:plus" size="19" />
                اضافة وقت الذروة
            </button>
        </div>
    </div>
    <br>

    <div class=" py-14 pl-5" v-if="currentTap == 0">
        <UITable @closeAddModal="handlerClose" :addFormModal="addElectricityServicePriceModal" :addForm="ElectricityServicePriceFormData" :hasAdd="false"
            :filter="filter" :header="header" :body="body" :data="_ElectricityServicePrice" :composables="_ElectricityServicePrice" />
    </div>

    <div class=" py-14 pl-5" v-if="currentTap == 1">
        <UITable @closeAddModal="handlerBillClose" :addFormModal="addBillModal"
            :addForm="billFormData" :hasAdd="false" :filter="filterBill" :header="headerBill"
            :body="bodyBill" :data="Bill" :composables="Bill" />
    </div>

    <div class=" py-14 pl-5" v-if="currentTap == 2">
        <UITable @closeAddModal="handlerPeakTimeClose" :addFormModal="addPeakTimeModal"
            :addForm="peakTimeFormData" :hasAdd="false" :filter="filterPeakTime" :header="headerPeakTime"
            :body="bodyPeakTime" :data="PeakTime" :composables="PeakTime" />
    </div>


    <!-- <UIModal v-if="addElectricityServicePriceModal" @close="addElectricityServicePriceModal = false">
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