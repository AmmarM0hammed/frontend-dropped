<script setup>

const header = ref(['المعرف', 'الاسم الاول', 'الاسم الثاني' , "اسم الام"])
const body = ref([
    "id",
    "firstName",
    "secondName",
    "motherName",
    "governorateName",

])
const city = useCity();
const filter = ref([
    {
        title: 'الاسم',
        key: 'Name',
        type: "text",

    },
    {
        title: 'المحافظة',
        key: 'GovernorateId',
        type: "select",
        data: useGovernorate()
    },


])
const addCityModal = ref(false)

import { Customer } from "~/schema/Customer"

const cityFormData = ref({
    type: 'add',
    schema: Customer,
    title: "اضافة مستخدم",
    composables: useCustomer(),
    inputs: [
        {
            type: 'text',
            title: 'اسم المدينة',
            key: 'name'
        },
       
    ]
})



const handlerClose = ()=>{
    addCityModal.value = false
}






</script>

<template>

    <br>
    <div class="flex flex-row item-center gap-10  justify-end  w-full ">

   

        <div class="">
            <button @click="addCityModal = true" class="btn text-sm ">
                <Icon name="ph:plus" size="19" />
                اضافة مستخدم
            </button>
           
        </div>
    </div>
    <br>

    <div class=" py-14 pl-5" >
        <UITable @closeAddModal="handlerClose" :addFormModal="addCityModal" :addForm="cityFormData" :hasAdd="false" :filter="filter" :header="header" :body="body" :data="city"
            :composables="city" />
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