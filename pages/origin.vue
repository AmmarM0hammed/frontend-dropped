<script setup>

const headerOrigin = ref(["المعرف"  , "الاسم" , "تاريخ الانشاء"])
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




</script>

<template>

    <br>
    <div class="flex flex-row item-center gap-10  justify-end  w-full ">
        <div class="">
            <button @click="addOriginModal = true" class="btn text-sm ">
                <Icon name="ph:plus" size="19" />
                اضافة منشأ
            </button>

        </div>
    </div>
    <br>

    <div class=" py-14 pl-5">
        <UITable @closeAddModal="handlerCloseOrigin" :addFormModal="addOriginModal" :addForm="OriginFormData" :hasAdd="false"
            :filterOrigin="filterOrigin" :headerOrigin="headerOrigin" :bodyOrigin="bodyOrigin" :data="Origin" :composables="Origin" />
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