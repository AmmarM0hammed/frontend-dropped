<script setup>


const companys = ref([])

const filter = ref({
    Name: '',
    GovernorateId: '',
    CityId: '',
})

const PageIndex = ref(1)
const PageSize = ref(10)
const isLoading = ref(false)

const companyFormData = ref({
    name: '',
    regeon: [
        {
            governorateId: 1,
            cityId: 1
        }
    ]
})

const handlerAddForm = () => {
    companyFormData.value.regeon.push({
        governorateId: 1,
        cityId: 1
    })
}
const getCompanyData = async () => {
    isLoading.value = true
    const { _, response, error, refresh } = await useCompany().get(filter.value, PageIndex.value, PageSize.value)
    companys.value = response
    isLoading.value = false
}

const formatDate = (d) => {
    const date = new Date(d);
    const formattedDate = date.toLocaleString('en-US', { timeZone: 'America/New_York', hour12: true }).replace(/T/, '-').replace(/\..+/, '');


    return formattedDate
}

const companyDetailsModal = ref(false);
const companyDetails = ref([])
const handlerCompanyDetails = (item) => {
    companyDetailsModal.value = true;
    companyDetails.value = item;
}


const handlerRemoveForm = (index) => {
    companyFormData.value.regeon.splice(index, 1);
}

const citys = ref([])
const governorates = ref([])
onMounted(async () => {
    getCompanyData()


    var tempCity = []
    var tempGovernorate = []
    const city = await useCity().get({}, 1, 1000);
    const governorate = await useGovernorate().get({}, 1, 1000);



    for (let index = 0; index < city.response?.result.length; index++) {
        tempCity.push({
            key: city.response?.result[index].name,
            value: city.response?.result[index].id,
        });
    }
    for (let index = 0; index < governorate.response?.result.length; index++) {
        tempGovernorate.push({
            key: governorate.response?.result[index].name,
            value: governorate.response?.result[index].id,
        });
    }
    citys.value = tempCity;
    governorates.value = tempGovernorate;

})


import { Company } from "~/schema/Company"
const isLoadingButton = ref(false)
const errors = ref()
const addCompanyModal = ref(false)
const hanlderAddCompany = async () => {
    const result = Company.safeParse(companyFormData.value)

    if (!result.success) {
        errors.value = result.error.format()
        return;
    }


    isLoadingButton.value = true

    await useCompany().create(companyFormData.value)

    companyDetailsModal.value = false
    companyFormData.value.name = ""
    companyFormData.value.regeon = []
    companyFormData.value.regeon.push({
        governorateId: 1,
        cityId: 1,
    })
    errors.value = ''
    addCompanyModal.value = false
    getCompanyData();


    isLoadingButton.value = false
}

const companyID = ref()
const companyEdit = ref()
const editCompanyModal = ref(false)
const handlerCompanyEdit = (data) => {
    companyID.value = data.id
    companyEdit.value = data

    companyFormData.value.name = data.name;
    companyFormData.value.regeon = data.regeons;
    editCompanyModal.value = true;
}

const hanlderEditCompany = async () => {
    const result = Company.safeParse(companyFormData.value)
    if (!result.success) {
        errors.value = result.error.format()
        return;
    }
    isLoadingButton.value = true
    await useCompany().update(companyID.value, companyFormData.value)
    companyDetailsModal.value = false
    companyFormData.value.regeon = []
    companyFormData.value.name = ""

    companyFormData.value.regeon.push({
        governorateId: 1,
        cityId: 1,
    })
    errors.value = ''
    getCompanyData();
    editCompanyModal.value = false

    isLoadingButton.value = false
}


const showDeleteModal = ref(false)

const deleteID = ref()
const handlerDelete = (id) => {
    showDeleteModal.value = true
    deleteID.value = id;
}

const _handlerDelete = async () => {
    isLoadingButton.value = true
    await useCompany().remove(deleteID.value)
    isLoadingButton.value = false

    showDeleteModal.value = false
    getCompanyData()
}


const handlerCloseModal = () => {
    addCompanyModal.value = false
    editCompanyModal.value = false
    companyDetailsModal.value = false
    companyFormData.value.regeon = []
    companyFormData.value.regeon.push({
        governorateId: 1,
        cityId: 1,
    })
    companyFormData.value.name = ""
}


</script>

<template>


    <UIModal @close="handlerCloseModal" v-if="companyDetailsModal" dir="rtl">
        <div class="flex flex-col gap-4" dir="rtl">
            <div class="flex flex-row justify-between px-5 items-start border-b border-spacing-y-12"
                v-for="(item, index) in companyDetails" :key="index">
                <div class="flex flex-col">
                    <p class="text-xl font-medium">{{ item.governorateName }}</p>
                    <p class="text-md">{{ item.cityName }}</p>
                </div>
                <div>
                    <p class="text-sm text-gray-500 pt-1">{{ formatDate(item.creationDate) }}</p>
                </div>

            </div>
        </div>
    </UIModal>

    <UIModal height="fit-content" @close="handlerCloseModal" v-if="addCompanyModal">
        <div class="flex flex-col gap-2 w-full">
            <p class="text-lg text-center">اضافة شركة جديدة</p>
            <UITextInput placeholder="اسم الشركة" v-model:input="companyFormData.name"
                :error="(errors && errors.name) ? errors.name._errors[0] : null" />
            <div class="flex flex-col justify-center gap-1 " v-for="(item, index) in companyFormData.regeon"
                :key="index">
                <div class="flex justify-center pt-2" v-if="index != 0" @click="handlerRemoveForm(index)">
                    <div class="bg-red-400 flex gap-1 rounded-lg jui-btn w-fit text-xs py-1 px-2 text-white">
                        حذف
                        <Icon name="clarity:remove-line" size="16" />
                    </div>
                </div>
                <UISelect placeholder="المحافظة" v-model:input="item.governorateId" :data="governorates" />
                <UISelect placeholder="المدينة" v-model:input="item.cityId" :data="citys" />
                <br>
                <hr>
            </div>
            <div class="w-full flex justify-center">
                <button @click="handlerAddForm"
                    class="bg-transparent transition-all text-primary hover:bg-primary hover:text-white border-[2px] w-fit p-[5px] px-[7px] rounded-xl border-primary jui-btn">
                    <Icon name="ph:plus" size="21" class="" />
                </button>
            </div>
            <br>
            <button v-if="!isLoadingButton" class="btn text-sm" @click="hanlderAddCompany()">اضافة</button>
            <button v-else class="btn text-sm">
                <Icon name="mdi:loading" size="22" class="text-white animate-spin" />
            </button>
        </div>
    </UIModal>
    <UIModal height="fit-content" @close="handlerCloseModal" v-if="editCompanyModal">
        <div class="flex flex-col gap-2 w-full">
            <p class="text-lg text-center">تعديل الشركة </p>
            <UITextInput placeholder="اسم الشركة" v-model:input="companyFormData.name"
                :error="(errors && errors.name) ? errors.name._errors[0] : null" />
            <div class="flex flex-col justify-center gap-1 " v-for="(item, index) in companyFormData.regeon"
                :key="index">
                <div class="flex justify-center pt-2" v-if="index != 0" @click="handlerRemoveForm(index)">
                    <div class="bg-red-400 flex gap-1 rounded-lg jui-btn w-fit text-xs py-1 px-2 text-white">
                        حذف
                        <Icon name="clarity:remove-line" size="16" />
                    </div>
                </div>
                <UISelect placeholder="المحافظة" v-model:input="item.governorateId" :data="governorates" />
                <UISelect placeholder="المدينة" v-model:input="item.cityId" :data="citys" />
                <br>
                <hr>
            </div>
            <div class="w-full flex justify-center">
                <button @click="handlerAddForm"
                    class="bg-transparent transition-all text-primary hover:bg-primary hover:text-white border-[2px] w-fit p-[5px] px-[7px] rounded-xl border-primary jui-btn">
                    <Icon name="ph:plus" size="21" class="" />
                </button>
            </div>
            <br>
            <button v-if="!isLoadingButton" class="btn text-sm" @click="hanlderEditCompany()">تعديل</button>
            <button v-else class="btn text-sm">
                <Icon name="mdi:loading" size="22" class="text-white animate-spin" />
            </button>
        </div>
    </UIModal>

    <UIModal v-if="showDeleteModal" @close="showDeleteModal" height="fit-content">
        <p class="text-center text-lg font-semibold ">هل تريد حذف هذه الشركة ؟ </p>
        <br>
        <div class="flex flex-row gap-5 justify-center">
            <button v-if="!isLoadingButton" @click="_handlerDelete" class="btn text-sm ">حذف</button>
            <button v-else class="btn text-sm ">
                <Icon name="mdi:loading" size="20" class="animate-spin" />
            </button>
            <button @click="showDeleteModal = false"
                class="btn text-sm border-2 border-primary !bg-transparent text-primary hover:text-white hover:!bg-primary">الغاء</button>
        </div>
    </UIModal>

    <br>
    <div class="flex flex-row item-center gap-10  justify-end  w-full ">


        <div class="">
            <button @click="addCompanyModal = true" class="btn text-sm ">
                <Icon name="ph:plus" size="19" />
                اضافة شركة
            </button>
        </div>
    </div>
    <br>

    <div class="flex flex-row flex-wrap gap-2 px-10 py-5 z-5" dir="rtl">
        <div v-if="!isLoading" v-for="(item, index) in companys?.result" :key="index"
            class="flex overflow-hidden flex-col items-center justify-evenly py-5 transition-all  gap-5 bg-white jui-shadow h-60 w-52 rounded-3xl relative">
            <div class="flex flex-col gap-2 items-center">
                <Icon name="f7:building-2" size="55" class="text-primary" />
                <p class="text-lg text-center break-words line-clamp-5">{{ item.name }} </p>

            </div>

            <div class=" w-full h-fit items-end flex flex-row gap-4 justify-center">
                <div @click="handlerCompanyDetails(item.regeons)" class="tooltip cursor-pointer jui-btn">
                    <div class="tooltip-text">مشاهدة</div>
                    <Icon name="carbon:view" class="text-gray-600" size="23" />
                </div>
                <div @click="handlerCompanyEdit(item)" class="tooltip cursor-pointer jui-btn">
                    <div class="tooltip-text">تعديل</div>
                    <Icon name="basil:edit-outline" class="text-primary" size="23" />
                </div>
                <div @click="handlerDelete(item.id)" class="tooltip cursor-pointer jui-btn">
                    <div class="tooltip-text">حذف</div>
                    <Icon name="hugeicons:delete-02" class="text-red-500" size="23" />
                </div>
            </div>
        </div>

        <div v-else class="flex flex-col items-cetner justify-center w-full h-[600px] ">
            <UILoading />
        </div>

    </div>












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
