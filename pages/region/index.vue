<script setup>

const header = ref(['المعرف', 'اسم المنطقة', 'المحافظة'])
const body = ref([
    "id",
    "name",
    "governorateName",

])
const city = useCity();
const filter = ref([
    {
        title: 'الاسم',
        key: 'Name',
        type: 0,

    },
    {
        title: 'المحافظة',
        key: 'GovernorateId',
        type: 0,
        data: []
    },


])
const addCityModal = ref(false)



import {City} from "~/schema/City"

const cityFormData = ref({
    type: 'add',
    schema: City,
    title: "اضافة مدينة",
    composables: useCity(),
    inputs: [
        {
            type: 'text',
            title: 'اسم المدينة',
            key: 'name'
        },
        {
            type: 'select',
            title: 'اسم المحافظة',
            key: 'governorateId',
            data:useGovernorate()
        },
    ]
})



const handlerClose = ()=>{
    addCityModal.value = false
}



const headerGovernorate = ref(['المعرف', 'المحافظة'])

const bodyGovernorate = ref([
    "id",
    "name",

])
const governorate = useGovernorate();

const filterGovernorate = ref([
    {
        title: 'الاسم',
        key: 'Name',
        type: 0,

    },
  


])
const addGovernorateModal = ref(false)



import {Governorate} from "~/schema/Governorate"

const governorateFormData = ref({
    type: 'add',
    schema: Governorate,
    title: "اضافة محافظة",
    composables: useGovernorate(),
    inputs: [
        {
            type: 'text',
            title: 'اسم المحافظة',
            key: 'name'
        },
       
    ]
})

const handlerGovernorateClose = ()=>{
    addGovernorateModal.value = false
}



const currentTap = ref(0)

</script>

<template>

    <br>
    <div class="flex flex-row item-center gap-10  justify-end  w-full ">

        <div class="flex flex-row gap-5 items-center">
            <div @click="currentTap = 1"
                :class="currentTap == 1 ? ' border-primary font-semibold' : 'text-gray-500 font-medium border-transparent'"
                class="flex justify-center item-center jui-btn   border-b-[3px]  py-1 px-2">
                المحافظات
            </div>

            <div @click="currentTap = 0"
                :class="currentTap == 0 ? ' border-primary font-semibold' : 'text-gray-500 font-medium border-transparent'"
                class="flex justify-center item-center jui-btn    border-b-[3px]  py-1 px-2">
                المناطق
            </div>



        </div>

        <div class="">
            <button @click="addCityModal = true" class="btn text-sm " v-if="currentTap == 0">
                <Icon name="ph:plus" size="19" />
                اضافة منطقة
            </button>
            <button @click="addGovernorateModal = true" class="btn text-sm " v-if="currentTap == 1">
                <Icon name="ph:plus" size="19" />
                اضافة محافظة
            </button>
        </div>
    </div>
    <br>

    <div class=" py-14 pl-5" v-if="currentTap == 0">
        <UITable @closeAddModal="handlerClose" :addFormModal="addCityModal" :addForm="cityFormData" :hasAdd="false" :filter="filter" :header="header" :body="body" :data="city"
            :composables="city" />
    </div>

    <div class=" py-14 pl-5" v-if="currentTap == 1">
        <UITable 
         @closeAddModal="handlerGovernorateClose" :addFormModal="addGovernorateModal" :addForm="governorateFormData"
         :hasAdd="false" :filter="filterGovernorate" :header="headerGovernorate" :body="bodyGovernorate"
            :data="governorate" :composables="governorate" />
    </div>









    <!-- <UIModal v-if="addCityModal" @close="addCityModal = false">
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