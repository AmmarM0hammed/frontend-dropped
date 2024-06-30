<script setup>

import { FeederSchema } from "~/schema/Feeder"


var FeederDataForm = reactive({
    name: null,
    serialNumber: "",
    referenceNumber: "",
    incomingVoltage: null,
    outgoingVoltage: null,
    capacity: null,
    capacityUnit: null,
    governorateId: null,
    cityId: null,
    latitud: null,
    longitud: null
})
const FeederModalAdd = ref(false)
const mapPostion = ref()
const getPostion = (postion) => {
    mapPostion.value = postion
}

const citys = ref([])
const governorates = ref([])
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
})

// TODO:FIX ZOD
const errors = ref()
const isLoading = ref(false)
const handlerAddFeeder = async () => {
    const result = Feeder.safeParse(FeederModalAdd);

    if (result.success) {
        errors.value = result.error.format()

        return;
    }   
    FeederDataForm.latitud = mapPostion.value.lat
    FeederDataForm.longitud = mapPostion.value.lng
    isLoading.value = true
    const { _, response, error, __ } = await useFeeder().create(FeederDataForm)
    FeederModalAdd.value = false
    isLoading.value = false
    errors.value = ''
    FeederDataForm = {}

}


const Feeder = ref([])
const isLoadingGetData = ref(false)

const filter = ref({
    Name: '',
    SerialNumber: '',
    ReferenceNumber: '',
    IncomingVoltage: '',
    OutgoingVoltage: '',
    Capacity: '',
    CapacityUnit: '',
    GovernorateId: '',
    CityId: '',
})
const PageIndex = ref(1);
const PageSize = ref(10);
const getAllData = async () => {
    isLoadingGetData.value = true;
    const { _, response, error, __ } = await useFeeder().get(filter.value, PageIndex.value, PageSize.value);
    Feeder.value = response.result
    isLoadingGetData.value = false
}
onMounted(() => getAllData())


const editItem = ref()

const editID = ref()
const handlerEdit = (item) => {
    editItem.value = item;
    FeederModalAdd.value = true;
    editID.value = item.id
    FeederDataForm.name = item.name;
    FeederDataForm.serialNumber = item.serialNumber;
    FeederDataForm.referenceNumber = item.referenceNumber;
    FeederDataForm.incomingVoltage = item.incomingVoltage;
    FeederDataForm.outgoingVoltage = item.outgoingVoltage;
    FeederDataForm.capacity = item.capacity;
    FeederDataForm.capacityUnit = item.capacityUnit;
    FeederDataForm.governorateId = item.governorateId;
    FeederDataForm.cityId = item.cityId;
    FeederDataForm.latitud = item.latitud;
    FeederDataForm.longitud     = item.longitud;
};




</script>


<template>
    <UIModal width="50vw" height="fit-content" v-if="FeederModalAdd"
        @close="FeederModalAdd = false">
        <p class="text-xl text-center font-medium">اضافة مغذيات</p>
        <br>
        <form @submit.prevent="handlerAddFeeder" class="w-full gap-2 flex flex-col items-center">

            <div class="w-full">
                <UITextInput placeholder="الاسم" v-model:input="FeederDataForm.name"
                    :error="(errors && errors.name) ? errors.name._errors[0] : ''" />
            </div>
            <div class="w-full">

                <UITextInput placeholder="الرقم التسلسلي" v-model:input="FeederDataForm.serialNumber"
                    :error="(errors && errors.serialNumber) ? errors.serialNumber._errors[0] : ''" />
            </div>

            <div class="w-full">
                <UITextInput placeholder="الرقم المرجعي" v-model:input="FeederDataForm.referenceNumber"
                    :error="(errors && errors.referenceNumber) ? errors.referenceNumber._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UITextInput inputType="number" placeholder="الجهد الوارد"
                    v-model:input="FeederDataForm.incomingVoltage" type="number"
                    :error="(errors && errors.incomingVoltage) ? errors.incomingVoltage._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UITextInput inputType="number" placeholder="الجهد الصادر"
                    v-model:input="FeederDataForm.outgoingVoltage" type="number"
                    :error="(errors && errors.outgoingVoltage) ? errors.outgoingVoltage._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UITextInput inputType="number" placeholder="السعة" v-model:input="FeederDataForm.capacity"
                    type="number" :error="(errors && errors.capacity) ? errors.capacity._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UITextInput inputType="number" placeholder="وحدة السعة"
                    v-model:input="FeederDataForm.capacityUnit"
                    :error="(errors && errors.capacityUnit) ? errors.capacityUnit._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UISelect :data="governorates" placeholder="المحافظة"
                    v-model:input="FeederDataForm.governorateId" type="number"
                    :error="(errors && errors.governorateId) ? errors.governorateId._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UISelect :data="citys" placeholder="المدينة" v-model:input="FeederDataForm.cityId"
                    type="number" :error="(errors && errors.cityId) ? errors.cityId._errors[0] : ''" />
            </div>



        </form>
        <br>

        <div class="map">
            <CommonMap @postion="getPostion" :lat="FeederDataForm.latitud" :lng="FeederDataForm.longitud" />
        </div>
        <br>

        <button v-if="!isLoading" @click="handlerAddFeeder()" class="btn btn-block text-sm">
            اضافة
        </button>
        <button v-else class="btn btn-block text-sm">
            <Icon name="mdi:loading" size="22" class="text-white animate-spin" />
        </button>
    </UIModal>
  
    <br>
    <CommonFolderSection @edit="(data) => handlerEdit(data)" v-if="!isLoadingGetData" :data="Feeder"
        title="محطات التوزيع" iconFolder="hugeicons:folder-01" iconColor="text-blue-500">
        <div class="flex flex-row gap-4 items-center">
            <button class="btn text-sm mt-1 " @click="FeederModalAdd = true">
                <Icon name="ph:plus" size="19" />
                اضافة محطة
            </button>
            <button class="btn-icon jui-btn px-[12px] mt-2">
                <Icon name="hugeicons:filter" size="22" />
            </button>
            <UITextInput v-model:input="filter.Name" @keypress.enter="getAllData" placeholder="الاسم" :label="false"
                class="!w-96" />
        </div>
    </CommonFolderSection>
    <UILoading v-else />

</template>