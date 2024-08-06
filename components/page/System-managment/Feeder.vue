<script setup>
import { FeederSchema } from "~/schema/Feeder"


var FeederDataForm = reactive({
    name: "",
    load: null,
    distributionStationId:1,
    governorateId: 1,
    cityId: 1
})
const FeederModalAdd = ref(false)

const citys = ref([])
const governorates = ref([]) 
const distributionStation = ref([]) 
onMounted(async () => {
    var tempCity = []
    const city = await useCity().get({ Name: '', GovernorateId: '' }, 1, 10000)
    for (let index = 0; index < city.response?.result.length; index++) {
        tempCity.push({
            key: city.response?.result[index].name,
            value: city.response?.result[index].id,
        });
    }
    citys.value = tempCity

    var tempGovernorates = []
    const governorate = await useGovernorate().get({ Name: '', GovernorateId: '' }, 1, 10000)
    for (let index = 0; index < governorate.response?.result.length; index++) {
        tempGovernorates.push({
            key: governorate.response?.result[index].name,
            value: governorate.response?.result[index].id,
        });
    }
    governorates.value = tempGovernorates


    var tempdistributionStation = []
    const _distributionStation = await useDistributionStation().get({ Name: '', GovernorateId: '' }, 1, 10000)
    for (let index = 0; index < _distributionStation.response?.result.length; index++) {
        tempdistributionStation.push({
            key: _distributionStation.response?.result[index].name,
            value: _distributionStation.response?.result[index].id,
        });
    }
    distributionStation.value = tempdistributionStation
})


const errors = ref()
const isLoading = ref(false)
const handlerAddFeeder = async () => {
    const result = FeederSchema.safeParse(FeederDataForm);

    if (!result.success) {
        errors.value = result.error.format()
        return;
    }
    isLoading.value = true
    const { _, response, error, __ } = await useFeeder().create(FeederDataForm)
    FeederModalAdd.value = false
    isLoading.value = false
    errors.value = ''
    FeederDataForm = {}
    getAllData();


}


const Feeder = ref([])
const isLoadingGetData = ref(false)

const filter = ref({
    Name: '',
    Load: '',

})
const PageIndex = ref(1);
const PageSize = ref(10000);
const getAllData = async () => {
    isLoadingGetData.value = true;
    const { _, response, error, __ } = await useFeeder().get(filter.value, PageIndex.value, PageSize.value);
    Feeder.value = response.result
    isLoadingGetData.value = false
}
onMounted(() => getAllData())


const editItem = ref()
const FeederModalEdit = ref(false)

const editID = ref()
const handlerEdit = (item) => {
    editItem.value = item;
    FeederModalEdit.value = true;
    editID.value = item.id

    FeederDataForm.name = item.name;
    FeederDataForm.load = item.load;
    FeederDataForm.distributionStationId = item.distributionStation.id;
    FeederDataForm.governorateId = item.governorate.id;
    FeederDataForm.cityId = item.city.id;

};

const handlerEditFeeder = async () => {
    const result = FeederSchema.safeParse(FeederDataForm);

    if (!result.success) {
        errors.value = result.error.format()

        return;
    }

    isLoading.value = true
    const { _, response, error, __ } = await useFeeder().update(editID.value, FeederDataForm)


    FeederModalEdit.value = false
    isLoading.value = false
    errors.value = ''
    FeederDataForm = {}
    getAllData();

}


const deleteModal = ref(false)
const deleteID = ref()
const isLoadingButton = ref(false)
const handlerDelete = (id) => {
    deleteModal.value = true;
    deleteID.value = id
}
const _handlerDelete = async () => {
    isLoadingButton.value = true
    await useFeeder().remove(deleteID.value)
    isLoadingButton.value = false
    deleteModal.value = false;
    getAllData()

}

const handlerCloseModal = () => {
    FeederDataForm = {
        name: "",
        load: null,
        distributionStationId: 0,
        governorateId: 0,
        cityId: 0
    }
    FeederModalEdit.value = false
    FeederModalAdd.value = false
}


const viewModal = ref(false)
const viewData = ref('')

const handlerViewData = (data) => {
    viewModal.value = true;
    viewData.value = data
}

const removeFilter = () => {
    filter.value.Name = ''
    getAllData()
}

</script>


<template>
    <UIModal width="50vw" height="fit-content" v-if="FeederModalAdd" @close="handlerCloseModal">
        <p class="text-xl text-center font-medium">اضافة مغذي</p>
        <br>
        <form @submit.prevent="" class="w-full gap-2 flex flex-col items-center">

            <div class="w-full">
                <UITextInput placeholder="الاسم" v-model:input="FeederDataForm.name"
                    :error="(errors && errors.name) ? errors.name._errors[0] : ''" />
            </div>
            
            <div class="w-full">
                <UITextInput inputType="number" placeholder="الحمل" v-model:input="FeederDataForm.load"
                    :error="(errors && errors.load) ? errors.capacityUnit._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UISelect :data="distributionStation" placeholder="محطة التوزيع" v-model:input="FeederDataForm.distributionStationId"
                    type="number" :error="(errors && errors.governorateId) ? errors.governorateId._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UISelect :data="governorates" placeholder="المحافظة" v-model:input="FeederDataForm.governorateId"
                    type="number" :error="(errors && errors.governorateId) ? errors.governorateId._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UISelect :data="citys" placeholder="المدينة" v-model:input="FeederDataForm.cityId" type="number"
                    :error="(errors && errors.cityId) ? errors.cityId._errors[0] : ''" />
            </div>
        </form>
        <br>


        <button v-if="!isLoading" @click="handlerAddFeeder()" class="btn btn-block text-sm">
            اضافة
        </button>
        <button v-else class="btn btn-block text-sm">
            <Icon name="mdi:loading" size="22" class="text-white animate-spin" />
        </button>
    </UIModal>

    <UIModal width="50vw" height="fit-content" v-if="FeederModalEdit" @close="handlerCloseModal">
        <p class="text-xl text-center font-medium">تعديل مغذي</p>
        <br>
        <form @submit.prevent="" class="w-full gap-2 flex flex-col items-center">

            <div class="w-full">
                <UITextInput placeholder="الاسم" v-model:input="FeederDataForm.name"
                    :error="(errors && errors.name) ? errors.name._errors[0] : ''" />
            </div>
            
            <div class="w-full">
                <UITextInput inputType="number" placeholder="الحمل" v-model:input="FeederDataForm.load"
                    :error="(errors && errors.load) ? errors.load._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UISelect :data="distributionStation" placeholder="محطة التوزيع" v-model:input="FeederDataForm.distributionStationId"
                    type="number" :error="(errors && errors.distributionStationId) ? errors.distributionStationId._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UISelect :data="governorates" placeholder="المحافظة" v-model:input="FeederDataForm.governorateId"
                    type="number" :error="(errors && errors.governorateId) ? errors.governorateId._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UISelect :data="citys" placeholder="المدينة" v-model:input="FeederDataForm.cityId" type="number"
                    :error="(errors && errors.cityId) ? errors.cityId._errors[0] : ''" />
            </div>



        </form>
        <br>

      
        <button v-if="!isLoading" @click="handlerEditFeeder()" class="btn btn-block text-sm">
            تعديل
        </button>
        <button v-else class="btn btn-block text-sm">
            <Icon name="mdi:loading" size="22" class="text-white animate-spin" />
        </button>
    </UIModal>

    <UIModal v-if="deleteModal" @close="deleteModal = false" height="fit-content">
        <p class="text-center text-lg font-semibold ">هل تريد حذف هذه مغذي ؟ </p>
        <br>
        <div class="flex flex-row gap-5 justify-center">
            <button v-if="!isLoadingButton" @click="_handlerDelete" class="btn text-sm ">حذف</button>
            <button v-else class="btn text-sm ">
                <Icon name="mdi:loading" size="20" class="animate-spin" />
            </button>
            <button @click="deleteModal = false"
                class="btn text-sm border-2 border-primary !bg-transparent text-primary hover:text-white hover:!bg-primary">الغاء</button>
        </div>
    </UIModal>



    <UIModal height="fit-content" v-if="viewModal" @close="viewModal = false">
        <p class="text-center text-xl font-medium">تفاصيل</p>
        <div class="flex flex-col gap-3 px-2 py-5 text-sm">
            <div class="flex flex-row justify-between">
                <p class="font-medium">{{ viewData.name }}</p>
                <p class="font-medium">: الاسم</p>
            </div>
            
            <div class="flex flex-row justify-between">
                <p class="font-medium">{{ viewData.load }}</p>
                <p class="font-medium">: الحمل</p>
            </div>
            
            <div class="flex flex-row justify-between">
                <p class="font-medium">{{ viewData.distributionStation.name }}</p>
                <p class="font-medium">: محطةالتوزيع</p>
            </div>
            
            <div class="flex flex-row justify-between">
                <p class="font-medium">{{ viewData.governorate.name }}</p>
                <p class="font-medium">: المحافظة</p>
            </div>
            <div class="flex flex-row justify-between">
                <p class="font-medium">{{ viewData.city.name }}</p>
                <p class="font-medium">: المدينة</p>
            </div>
            <br>
          
        </div>
    </UIModal>





    <br>
    <CommonFolderSection @view="(data) => handlerViewData(data)" @delete="(id) => handlerDelete(id)"
        @edit="(data) => handlerEdit(data)" v-if="!isLoadingGetData" :data="Feeder" title="المغذيات"
        iconFolder="ph:network-duotone" iconColor="text-blue-500">
        <div class="flex flex-row gap-4 items-center">
            <button class="btn text-sm mt-1 " @click="FeederModalAdd = true">
                <Icon name="ph:plus" size="19" />
                اضافة محطة
            </button>
            <button @click="removeFilter()" class="btn-icon jui-btn px-[12px] mt-2" v-if="filter.Name != ''">
                <Icon name="hugeicons:filter-remove" size="22" />
            </button>
            <UITextInput v-model:input="filter.Name" @keypress.enter="getAllData" placeholder="الاسم" :label="false"
                class="!w-96" />
        </div>
    </CommonFolderSection>
    <div class="w-full h-screen flex flex-row items-center justify-center" v-else>
        <UILoading />
    </div>

</template>