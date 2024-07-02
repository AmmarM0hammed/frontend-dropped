<script setup>

const header = ref(['الاسم', "اسم المستخدم", "الصلاحية", "المحافظة", "الشركة"])
const body = ref([
    "fullName",
    "userName",
    "role",
    "governorate.name",
    "company",

])

const user = useUser();
const filter = ref([
    {
        title: 'الاسم',
        key: 'FullName',
        type: "text",

    },
 
   



])

const addUserModal = ref(false)
import { User } from "~/schema/User"

const userFormData = ref({
    type: 'add',
    schema: User,
    title: "اضافة مستخدم",
    composables: useUser(),
    inputs: [
        {
            type: 'text',
            title: 'الاسم الكامل',
            key: 'fullName'
        },
        {
            type: 'text',
            title: 'اسم المستخدم',
            key: 'userName',

        },
        {
            type: 'password',
            title: 'كلمة السر',
            key: 'password',
        },
        {
            type: 'select',
            title: 'الصلاحية',
            key: 'role',
            data: [
                {
                    key: 'مدير',
                    value: 0
                },
                {
                    key: 'مدينة',
                    value: 1
                },
                {
                    key: 'شركة',
                    value: 2
                },
                {
                    key: 'مستخدم',
                    value: 3
                },
            ]
        },
        {
            type: 'select',
            title: 'المحافظة',
            key: 'governorateId',
            data: useGovernorate()
        },
        {
            type: 'select',
            title: 'الشركة',
            key: 'companyId',
            data: useCompany()
        },
    ]
})

const handlerClose = () => {
    addUserModal.value = false
}




</script>

<template>

    <br>
    <div class="flex flex-row item-center gap-10  justify-end  w-full ">


        <div class="">
            <button @click="addUserModal = true" class="btn text-sm ">
                <Icon name="ph:plus" size="19" />
                اضافة مستخدم
            </button>

        </div>
    </div>
    <br>

    <div class=" py-14 pl-5">
        <UITable @closeAddModal="handlerClose" :addFormModal="addUserModal" :addForm="userFormData" :hasAdd="false"
            :filter="filter" :header="header" :body="body" :data="user" :composables="user" />
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