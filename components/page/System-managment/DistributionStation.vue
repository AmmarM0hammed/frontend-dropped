<script setup>
import { DistributionStation } from "~/schema/DistributionStation"


var distributionStationDataForm = reactive({
    name: '',
    serialNumber: "",
    referenceNumber: "",
    incomingVoltage: null,
    outgoingVoltage: null,
    capacity: null,
    capacityUnit: null,
    governorateId: 1,
    cityId: 1,
    latitud: null,
    longitud: null
})
const distributionStationModalAdd = ref(false)
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
const handlerAddDistributionStation = async () => {
    const result = DistributionStation.safeParse(distributionStationDataForm);

    if (!result.success) {
        errors.value = result.error.format()

        return;
    }
    distributionStationDataForm.latitud = mapPostion.value.lat
    distributionStationDataForm.longitud = mapPostion.value.lng
    isLoading.value = true
    const { _, response, error, __ } = await useDistributionStation().create(distributionStationDataForm)
    distributionStationModalAdd.value = false
    isLoading.value = false
    errors.value = ''
    distributionStationDataForm = {}
    getAllData();


}


const distributionStation = ref([])
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
const PageSize = ref(1000);
const getAllData = async () => {
    isLoadingGetData.value = true;
    const { _, response, error, __ } = await useDistributionStation().get(filter.value, PageIndex.value, PageSize.value);
    distributionStation.value = response.result
    isLoadingGetData.value = false
}
onMounted(() => getAllData())


const editItem = ref()
const distributionStationModalEdit = ref(false)

const editID = ref()
const handlerEdit = (item) => {
    editItem.value = item;
    distributionStationModalEdit.value = true;
    editID.value = item.id
    distributionStationDataForm.name = item.name;
    distributionStationDataForm.serialNumber = item.serialNumber;
    distributionStationDataForm.referenceNumber = item.referenceNumber;
    distributionStationDataForm.incomingVoltage = item.incomingVoltage;
    distributionStationDataForm.outgoingVoltage = item.outgoingVoltage;
    distributionStationDataForm.capacity = item.capacity;
    distributionStationDataForm.capacityUnit = item.capacityUnit;
    distributionStationDataForm.governorateId = item.governorate.id;
    distributionStationDataForm.cityId = item.city.id;
    distributionStationDataForm.latitud = item.latitud;
    distributionStationDataForm.longitud = item.longitud;
};

const handlerEditDistributionStation = async () => {
    const result = DistributionStation.safeParse(distributionStationDataForm);

    if (!result.success) {
        errors.value = result.error.format()

        return;
    }
    distributionStationDataForm.latitud = mapPostion.value.lat
    distributionStationDataForm.longitud = mapPostion.value.lng
    isLoading.value = true
    const { _, response, error, __ } = await useDistributionStation().update(editID.value, distributionStationDataForm)


    distributionStationModalEdit.value = false
    isLoading.value = false
    errors.value = ''
    distributionStationDataForm = {}
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
    await useDistributionStation().remove(deleteID.value)
    isLoadingButton.value = false
    deleteModal.value = false;
    getAllData()

}

const handlerCloseModal = () => {
    distributionStationDataForm = {
        name: '',
        serialNumber: "",
        referenceNumber: "",
        incomingVoltage: null,
        outgoingVoltage: null,
        capacity: null,
        capacityUnit: null,
        governorateId: 1,
        cityId: 1,
        latitud: null,
        longitud: null
    }
    distributionStationModalEdit.value = false
    distributionStationModalAdd.value = false
}


const viewModal = ref(false)
const viewData = ref('')

const handlerViewData = (data) => {
    viewModal.value = true;
    viewData.value = data
}

const removeFilter = ()=>{
    filter.value.Name = ''
    getAllData()
}

</script>


<template>
    <UIModal width="50vw" height="fit-content" v-if="distributionStationModalAdd" @close="handlerCloseModal">
        <p class="text-xl text-center font-medium">اضافة محطة</p>
        <br>
        <form @submit.prevent="" class="w-full gap-2 flex flex-col items-center">

            <div class="w-full">
                <UITextInput placeholder="الاسم" v-model:input="distributionStationDataForm.name"
                    :error="(errors && errors.name) ? errors.name._errors[0] : ''" />
            </div>
            <div class="w-full">

                <UITextInput placeholder="الرقم التسلسلي" v-model:input="distributionStationDataForm.serialNumber"
                    :error="(errors && errors.serialNumber) ? errors.serialNumber._errors[0] : ''" />
            </div>

            <div class="w-full">
                <UITextInput placeholder="الرقم المرجعي" v-model:input="distributionStationDataForm.referenceNumber"
                    :error="(errors && errors.referenceNumber) ? errors.referenceNumber._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UITextInput inputType="number" placeholder="الجهد الوارد"
                    v-model:input="distributionStationDataForm.incomingVoltage" type="number"
                    :error="(errors && errors.incomingVoltage) ? errors.incomingVoltage._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UITextInput inputType="number" placeholder="الجهد الصادر"
                    v-model:input="distributionStationDataForm.outgoingVoltage" type="number"
                    :error="(errors && errors.outgoingVoltage) ? errors.outgoingVoltage._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UITextInput inputType="number" placeholder="السعة" v-model:input="distributionStationDataForm.capacity"
                    type="number" :error="(errors && errors.capacity) ? errors.capacity._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UITextInput inputType="number" placeholder="وحدة السعة"
                    v-model:input="distributionStationDataForm.capacityUnit"
                    :error="(errors && errors.capacityUnit) ? errors.capacityUnit._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UISelect :data="governorates" placeholder="المحافظة"
                    v-model:input="distributionStationDataForm.governorateId" type="number"
                    :error="(errors && errors.governorateId) ? errors.governorateId._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UISelect :data="citys" placeholder="المدينة" v-model:input="distributionStationDataForm.cityId"
                    type="number" :error="(errors && errors.cityId) ? errors.cityId._errors[0] : ''" />
            </div>
        </form>
        <br>

        <div class="map">
            <CommonMap @postion="getPostion" :lat="distributionStationDataForm.latitud"
                :lng="distributionStationDataForm.longitud" />
        </div>
        <br>

        <button v-if="!isLoading" @click="handlerAddDistributionStation()" class="btn btn-block text-sm">
            اضافة
        </button>
        <button v-else class="btn btn-block text-sm">
            <Icon name="mdi:loading" size="22" class="text-white animate-spin" />
        </button>
    </UIModal>

    <UIModal width="50vw" height="fit-content" v-if="distributionStationModalEdit" @close="handlerCloseModal">
        <p class="text-xl text-center font-medium">تعديل محطة</p>
        <br>
        <form @submit.prevent="" class="w-full gap-2 flex flex-col items-center">

            <div class="w-full">
                <UITextInput placeholder="الاسم" v-model:input="distributionStationDataForm.name"
                    :error="(errors && errors.name) ? errors.name._errors[0] : ''" />
            </div>
            <div class="w-full">

                <UITextInput placeholder="الرقم التسلسلي" v-model:input="distributionStationDataForm.serialNumber"
                    :error="(errors && errors.serialNumber) ? errors.serialNumber._errors[0] : ''" />
            </div>

            <div class="w-full">
                <UITextInput placeholder="الرقم المرجعي" v-model:input="distributionStationDataForm.referenceNumber"
                    :error="(errors && errors.referenceNumber) ? errors.referenceNumber._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UITextInput inputType="number" placeholder="الجهد الوارد"
                    v-model:input="distributionStationDataForm.incomingVoltage" type="number"
                    :error="(errors && errors.incomingVoltage) ? errors.incomingVoltage._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UITextInput inputType="number" placeholder="الجهد الصادر"
                    v-model:input="distributionStationDataForm.outgoingVoltage" type="number"
                    :error="(errors && errors.outgoingVoltage) ? errors.outgoingVoltage._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UITextInput inputType="number" placeholder="السعة" v-model:input="distributionStationDataForm.capacity"
                    type="number" :error="(errors && errors.capacity) ? errors.capacity._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UITextInput inputType="number" placeholder="وحدة السعة"
                    v-model:input="distributionStationDataForm.capacityUnit"
                    :error="(errors && errors.capacityUnit) ? errors.capacityUnit._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UISelect :data="governorates" placeholder="المحافظة"
                    v-model:input="distributionStationDataForm.governorateId" type="number"
                    :error="(errors && errors.governorateId) ? errors.governorateId._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UISelect :data="citys" placeholder="المدينة" v-model:input="distributionStationDataForm.cityId"
                    type="number" :error="(errors && errors.cityId) ? errors.cityId._errors[0] : ''" />
            </div>



        </form>
        <br>

        <div class="map">
            <CommonMap @postion="getPostion" :lat="distributionStationDataForm.latitud"
                :lng="distributionStationDataForm.longitud" />
        </div>
        <br>

        <button v-if="!isLoading" @click="handlerEditDistributionStation()" class="btn btn-block text-sm">
            تعديل
        </button>
        <button v-else class="btn btn-block text-sm">
            <Icon name="mdi:loading" size="22" class="text-white animate-spin" />
        </button>
    </UIModal>

    <UIModal v-if="deleteModal" @close="deleteModal = false" height="fit-content">
        <p class="text-center text-lg font-semibold ">هل تريد حذف هذه المحطة ؟ </p>
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
        <div class="flex flex-col gap-3 px-2 py-5 text-sm" >
            <div class="flex flex-row justify-between">
                <p class="font-medium">{{viewData.name}}</p>
                <p class="font-medium">: الاسم</p>
            </div>
            <div class="flex flex-row justify-between">
                <p class="font-medium">{{viewData.serialNumber}}</p>
                <p class="font-medium">: الرقم التسلسلي</p>
            </div>
            <div class="flex flex-row justify-between">
                <p class="font-medium">{{viewData.referenceNumber}}</p>
                <p class="font-medium">: الرقم المرجعي</p>
            </div>
            <div class="flex flex-row justify-between">
                <p class="font-medium">{{viewData.capacity}}</p>
                <p class="font-medium">: السعة</p>
            </div>
            <div class="flex flex-row justify-between">
                <p class="font-medium">{{viewData.capacityUnit}}</p>
                <p class="font-medium">: وحدة السعة</p>
            </div>
            <div class="flex flex-row justify-between">
                <p class="font-medium">{{viewData.incomingVoltage}}</p>
                <p class="font-medium">: الجهد الوارد</p>
            </div>
            <div class="flex flex-row justify-between">
                <p class="font-medium">{{viewData.governorate.name}}</p>
                <p class="font-medium">: المحافظة</p>
            </div>
            <div class="flex flex-row justify-between">
                <p class="font-medium">{{viewData.city.name}}</p>
                <p class="font-medium">: المدينة</p>
            </div>
            <br>
            <div class="w-full">
                <CommonShowMap :index="viewData.id" :position="{lat:viewData.latitud,lng:viewData.longitud}" />
            </div>
        </div>
    </UIModal>





    <br>
    <CommonFolderSection @view="(data) => handlerViewData(data)" @delete="(id) => handlerDelete(id)"
        @edit="(data) => handlerEdit(data)" v-if="!isLoadingGetData" :data="distributionStation" title="محطات التوزيع"
        iconFolder="hugeicons:folder-01" iconColor="text-blue-500">
        <div class="flex flex-row gap-4 items-center">
            <button class="btn text-sm mt-1 " @click="distributionStationModalAdd = true">
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