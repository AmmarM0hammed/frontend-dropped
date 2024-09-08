<script setup>
import { Customer } from "~/schema/Customer"

const data = ref([])
const isLoading = ref(false)
const filter = ref({
name: ''
})
const pageIndex = ref(1)
const pageSize = ref(10)
const getData = async () => {
    isLoading.value = true;
    const { _, response, error, __ } = await useCustomer().get(filter.value, pageIndex.value, pageSize.value);
    data.value = response
    isLoading.value = false;

}
onMounted(() => getData())

const cities = ref([])
const governorates = ref()
const customerTypes = ref([
    {
        key:"منزلي",
        value:1
    },
    {
        key:"تجاري",
        value:2
    },
    {
        key:"صناعي",
        value:3
    },
    {
        key:"زراعة",
        value:4
    },
    {
        key:"حكومي",
        value:5
    },
])

onMounted(async () => {
    var tempCity = []
    const city = await useCity().get({ Name: '', GovernorateId: '' }, 1, 10000)
    for (let index = 0; index < city.response?.result.length; index++) {
        tempCity.push({
            key: city.response?.result[index].name,
            value: city.response?.result[index].id,
        });
    }
    cities.value = tempCity

    var tempGovernorates = []
    const governorate = await useGovernorate().get({ Name: '', GovernorateId: '' }, 1, 10000)
    for (let index = 0; index < governorate.response?.result.length; index++) {
        tempGovernorates.push({
            key: governorate.response?.result[index].name,
            value: governorate.response?.result[index].id,
        });
    }
    governorates.value = tempGovernorates

})


const viewModal = ref(false)
const viewData = ref([])
const handlerViewData = (data) => {
    viewModal.value = true;
    viewData.value = data
}


const addModal = ref(false)
const addFormData = ref({
    firstName: '',
    secondName: '',
    thirdName: '',
    surname: '',
    birthDate: "2024-07-10T17:44:41.938Z",
    motherName: '',
    phoneNumber: '',
    customerType: 1,
    governorateId: 1,
    cityId: 1,
    mahalla: '',
    street: '',
    house: '',
    latitud: 0,
    longitud: 0,
    customerDocument: [
        {
            name: '',
            path: ''
        }
    ]
})

const UnifiedCard = ref('')
const UnifiedCardApi = ref('')

const ResidenceCard = ref('')
const ResidenceCardApi = ref('')

const errors = ref()

const hanlderAddCustomer = async () => {
    alert("test")
    const result = Customer.safeParse(addFormData.value)
    if (!result.success) {
        errors.value = result.error.format();
        return;
    }

}

</script>

<template>

    <br>
    {{errors}}
    <div class="flex flex-row item-center gap-10  justify-end  w-full ">


        <div class="">
            <button @click="addModal = true" class="btn text-sm ">
                <Icon name="ph:plus" size="19" />
                اضافة عميل
            </button>

        </div>
    </div>
    <br>
    <div class="w-full flex justify-start" dir="rtl">
        <UITextInput @keypress.enter="getData()" placeholder="الاسم" v-model:input="filter.name"
            class="!bg-gray-100 !w-96" />

    </div>
    <br>

    <div class="relative mx-2 overflow-x-auto shadow-md sm:rounded-lg mytable" dir="rtl">

        <table dir="rtl" class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-s  text-white uppercase bg-primary dark:bg-gray-700 dark:text-gray-400">
                <tr class="">
                    <th scope="col" class="px-6 py-3   ">
                        الاسم الكامل
                    </th>
                    <th scope="col" class="px-6 py-3   ">
                        اسم الام
                    </th>
                    <th scope="col" class="px-6 py-3   ">
                        المواليد
                    </th>
                    <th scope="col" class="px-6 py-3   ">
                        المحافظة
                    </th>
                    <th scope="col" class="px-6 py-3   ">
                        المدينة
                    </th>
                    <th scope="col" class="px-6 py-3   ">
                        المنزل
                    </th>
                    <th scope="col" class="px-6 py-3   ">
                        المحلة
                    </th>
                    <th scope="col" class="px-6 py-3   ">
                        الشارع
                    </th>
                    <th scope="col" class="px-6 py-3   ">
                        رقم الهاتف
                    </th>
                    <th scope="col" class="px-6 py-3   ">
                        التعديلات
                    </th>


                </tr>
            </thead>
            <tbody v-if="!isLoading">

                <tr v-for="(item, index) in data?.result || 0" :key="index">
                    <td scope="row"
                        class="px-6  py-4 font-medium text-md text-gray-900 whitespace-nowrap dark:text-white">{{
                            item.firstName }} {{ item.secondName }} {{ item.thirdName }} {{ item.surname }}</td>

                    <td scope="row"
                        class="px-6  py-4 font-medium text-md text-gray-900 whitespace-nowrap dark:text-white">{{
                            item.motherName }}</td>

                    <td scope="row"
                        class="px-6  py-4 font-medium text-md text-gray-900 whitespace-nowrap dark:text-white">{{
                            item.birthDate || "لا يوجد" }}</td>

                    <td scope="row"
                        class="px-6  py-4 font-medium text-md text-gray-900 whitespace-nowrap dark:text-white">{{
                            item.governorate.name || "لا يوجد" }}</td>


                    <td scope="row"
                        class="px-6  py-4 font-medium text-md text-gray-900 whitespace-nowrap dark:text-white">{{
                            item.city.name || "لا يوجد" }}</td>


                    <td scope="row"
                        class="px-6  py-4 font-medium text-md text-gray-900 whitespace-nowrap dark:text-white">{{
                            item.house || "لا يوجد" }}</td>


                    <td scope="row"
                        class="px-6  py-4 font-medium text-md text-gray-900 whitespace-nowrap dark:text-white">{{
                            item.mahalla || "لا يوجد" }}</td>


                    <td scope="row"
                        class="px-6  py-4 font-medium text-md text-gray-900 whitespace-nowrap dark:text-white">{{
                            item.street || "لا يوجد" }}</td>
                    <td scope="row"
                        class="px-6  py-4 font-medium text-md text-gray-900 whitespace-nowrap dark:text-white">{{
                            item.phoneNumber || "لا يوجد" }}
                    </td>


                    <td class="py-4 text-center">
                        <div class="flex gap-2 justify-center ">


                            <div class="tooltip jui-btn" @click="handlerDelete(item.id)">
                                <div class="tooltip-text">حذف</div>
                                <div>
                                    <Icon name="basil:trash-outline" color="#FF8181" size="22" />
                                </div>
                            </div>
                            <div class="tooltip jui-btn" @click="handlerEdit(item, body)">
                                <div class="tooltip-text">تعديل</div>
                                <div>
                                    <Icon name="basil:edit-outline" color="#969696" size="22" />
                                </div>
                            </div>
                            <div class="tooltip jui-btn" @click="handlerViewData(item)">
                                <div class="tooltip-text">مشاهدة</div>
                                <div>
                                    <Icon name="ph:eye" color="#969696" size="22" />
                                </div>
                            </div>

                        </div>
                    </td>


                </tr>

            </tbody>


        </table>
        <Transition>
            <div v-show="isLoading" class="w-full  h-96 flex ">
                <UILoading />
            </div>
        </Transition>

    </div>




    <UIModal v-if="viewModal" @close="viewModal = false">
        <div class="flex flex-col items-center">
            <p class="text-lg text-center">مشاهدة التفاصيل</p>
            <CommonShowMap :position="{ lat: viewData.latitud, lng: viewData.longitud }" />
        </div>
    </UIModal>



    <UIModal height="fit-content" @close="addModal = false" v-if="addModal">
        <div class="flex flex-col gap-2 w-full">
            <p class="text-lg text-center">إضافة عميل جديد</p>
            <UITextInput placeholder="الاسم الأول" v-model:input="addFormData.firstName"
                :error="errors?.firstName?._errors[0] || null" />

            <UITextInput placeholder="الاسم الثاني" v-model:input="addFormData.secondName"
                :error="errors?.secondName?._errors[0] || null" />

            <UITextInput placeholder="الاسم الثالث" v-model:input="addFormData.thirdName"
                :error="errors?.thirdName?._errors[0] || null" />

            <UITextInput placeholder="اللقب" v-model:input="addFormData.surname"
                :error="errors?.surname?._errors[0] || null" />

            <UITextInput inputType="date" placeholder="تاريخ الميلاد" v-model:input="addFormData.birthDate" :error="errors?.birthDate?._errors[0] || null" />

            <UITextInput placeholder="اسم الأم" v-model:input="addFormData.motherName"
                :error="errors?.motherName?._errors[0] || null" />

            <UITextInput placeholder="رقم الهاتف" v-model:input="addFormData.phoneNumber"
                :error="errors?.phoneNumber?._errors[0] || null" />
            <UISelect placeholder="نوع العميل" v-model:input="addFormData.customerType" :data="customerTypes" />
            <UISelect placeholder="المحافظة" v-model:input="addFormData.governorateId" :data="governorates" />
            <UISelect placeholder="المدينة" v-model:input="addFormData.cityId" :data="cities" />

            <UITextInput placeholder="المحلة" v-model:input="addFormData.mahalla"
                :error="errors?.mahalla?._errors[0] || null" />

            <UITextInput placeholder="الشارع" v-model:input="addFormData.street"
                :error="errors?.street?._errors[0] || null" />

            <UITextInput placeholder="المنزل" v-model:input="addFormData.house"
                :error="errors?.house?._errors[0] || null" />



            <br>
            <button v-if="!isLoading" class="btn text-sm" @click="hanlderAddCustomer()">إضافة</button>
            <button v-else class="btn text-sm">
                <Icon name="mdi:loading" size="22" class="text-white animate-spin" />
            </button>
        </div>
    </UIModal>










</template>
<style scoped>
.tooltip {
    position: relative;
    width: -moz-fit-content;
    width: fit-content;
    height: -moz-fit-content;
    height: fit-content;
    border-radius: 100%;

}

.tooltip .tooltip-text {
    position: absolute;
    background-color: #323232;
    color: white;
    font-size: 13px;
    padding: 5px 10px;
    width: -moz-max-content;
    width: max-content;
    border-radius: 10px;
    text-align: center;
    top: -35px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
    opacity: 0;
    visibility: hidden;
    transition: all, 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.tooltip .tooltip-text::before {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    border-radius: 2px;
    background-color: inherit;
    z-index: -1;
}

.tooltip:hover .tooltip-text {
    opacity: 1;
    /* top: -35px; */
    visibility: visible;
}

.tooltip .tooltip-text::after {
    content: "";
    width: 100%;
    height: 100%;
    bottom: -20px;
    left: 0;
    background-color: red;
    position: absolute;
    opacity: 0;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
