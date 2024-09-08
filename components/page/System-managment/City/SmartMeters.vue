<script setup>
import { SmartMetersSchema } from "~/schema/SmartMeters"


var SmartMetersDataForm = reactive({
    name: "",
    serialNumber: "",
    referenceNumber: "",
    deviceModelId: 1,
    deviceStatus: 1,
    classify: 0,
    deviceType: 0,
    originId: 1,
    deviceIdentificationId: 1,
    connactionType: 0,
    customerId: '',
    dataCollectionUnitId: 1,
    lowVoltageStationId: 1,
    governorateId: 1,
    cityId: 1,
    mahalla: "",
    street: "",
    house: ""


})
const SmartMetersModalAdd = ref(false)

const citys = ref([])
const governorates = ref([])
const deviceModels = ref([])
const deviceIdentifications = ref([])
const origins = ref([])
const customers = ref([])
const dataCollectionUnits = ref([])
const lowVoltageStations = ref([])

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

    var tempDeviceModel = []
    const _deviceModel = await useDeviceModel().get({ Name: '', GovernorateId: '' }, 1, 10000)
    for (let index = 0; index < _deviceModel.response?.result.length; index++) {
        tempDeviceModel.push({
            key: _deviceModel.response?.result[index].name,
            value: _deviceModel.response?.result[index].id,
        });
    }
    deviceModels.value = tempDeviceModel

    var tempDeviceIdentification = []
    const _deviceIdentification = await useDeviceIdentification().get({ Name: '', GovernorateId: '' }, 1, 10000)
    for (let index = 0; index < _deviceIdentification.response?.result.length; index++) {
        tempDeviceIdentification.push({
            key: _deviceIdentification.response?.result[index].name,
            value: _deviceIdentification.response?.result[index].id,
        });
    }
    deviceIdentifications.value = tempDeviceIdentification

    var tempOrigin = []
    const _origin = await useOrigin().get({ Name: '', GovernorateId: '' }, 1, 10000)
    for (let index = 0; index < _origin.response?.result.length; index++) {
        tempOrigin.push({
            key: _origin.response?.result[index].name,
            value: _origin.response?.result[index].id,
        });
    }
    origins.value = tempOrigin

    var tempCustomers = []
    const customer = await useCustomer().get({ Name: '', GovernorateId: '' }, 1, 1, 10000)
    for (let index = 0; index < customer.response?.result.length; index++) {
        tempCustomers.push({
            key: customer.response?.result[index].firstName,
            value: customer.response?.result[index].id,
        });
    }
    customers.value = tempCustomers

    var tempDataCollectionUnits = []
    const DCU = await useDataCollectionUnit().get({ Name: '' }, useRoute().params.id, 1, 999)
    for (let index = 0; index < DCU.response?.result.length; index++) {
        tempDataCollectionUnits.push({
            key: DCU.response?.result[index].name,
            value: DCU.response?.result[index].id,
        });
    }
    dataCollectionUnits.value = tempDataCollectionUnits


    var tempLowVoltageStations = []
    const lowVoltageStation = await useLowVoltageStation().get({ Name: '', GovernorateId: '' }, useRoute().params.id, 1, 10000)
    for (let index = 0; index < lowVoltageStation.response?.result.length; index++) {
        tempLowVoltageStations.push({
            key: lowVoltageStation.response?.result[index].name,
            value: lowVoltageStation.response?.result[index].id,
        });
    }
    lowVoltageStations.value = tempLowVoltageStations



})

const errors = ref()
const isLoading = ref(false)
const handlerAddSmartMeters = async () => {
    const result = SmartMetersSchema.safeParse(SmartMetersDataForm);

    if (!result.success) {
        errors.value = result.error.format()
        return;
    }
    isLoading.value = true
    const { _, response, error, __ } = await useSmartMeters().create(SmartMetersDataForm)
    if (response != null) {
        SmartMetersModalAdd.value = false
        isLoading.value = false
        errors.value = ''
        SmartMetersDataForm = {}
        getAllData();
    }
    else{
        alert(error.response.data.message)
        isLoading.value = false

    }


}


const SmartMeters = ref([])
const isLoadingGetData = ref(false)

const filter = ref({
    Name: '',
    Load: '',

})

const props = defineProps({
    cityID: {}
})
const PageIndex = ref(1);
const PageSize = ref(10000);
const getAllData = async () => {
    isLoadingGetData.value = true;
    const { _, response, error, __ } = await useSmartMeters().get(filter.value, props.cityID, PageIndex.value, PageSize.value);
    SmartMeters.value = response.result
    isLoadingGetData.value = false
}
onMounted(() => getAllData())


const editItem = ref()
const SmartMetersModalEdit = ref(false)

const editID = ref()
const handlerEdit = (item) => {
    editItem.value = item;
    SmartMetersModalEdit.value = true;
    editID.value = item.id


    SmartMetersDataForm.name = item.name;
    SmartMetersDataForm.serialNumber = item.serialNumber;
    SmartMetersDataForm.referenceNumber = item.referenceNumber;
    SmartMetersDataForm.address = item.address;

    SmartMetersDataForm.companyId = item.company.id;
    SmartMetersDataForm.governorateId = item.governorate.id;
    SmartMetersDataForm.cityId = item.city.id;
    SmartMetersDataForm.originId = item.origin.id;
    SmartMetersDataForm.deviceModelId = item.deviceModel.id;
    SmartMetersDataForm.deviceIdentificationId = item.deviceIdentification.id;




};

const handlerEditSmartMeters = async () => {
    const result = SmartMetersSchema.safeParse(SmartMetersDataForm);

    if (!result.success) {
        errors.value = result.error.format()

        return;
    }

    isLoading.value = true
    const { _, response, error, __ } = await useDataCollectionUnit().update(editID.value, SmartMetersDataForm)


    SmartMetersModalEdit.value = false
    isLoading.value = false
    errors.value = ''
    SmartMetersDataForm = {}
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
    await useSmartMeters().remove(deleteID.value)
    isLoadingButton.value = false
    deleteModal.value = false;
    getAllData()

}

const handlerCloseModal = () => {
    SmartMetersDataForm = {
        name: "",
        load: null,
        distributionStationId: 0,
        governorateId: 0,
        cityId: 0
    }
    SmartMetersModalEdit.value = false
    SmartMetersModalAdd.value = false
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

const handlerView = (data) => {
    useSmartMetersStore().data = data
    return navigateTo(`/system-management/city/smart-meters/${data.id}`)
}
</script>


<template>


    <UIModal width="50vw" height="fit-content" v-if="SmartMetersModalAdd" @close="handlerCloseModal">


        {{ errors }}
        <p class="text-xl text-center font-medium">اضافة عداد الذكية
        </p>
        <br>
        <form @submit.prevent="" class="w-full gap-2 flex flex-col items-center">
            <div class="w-full">
                <UITextInput placeholder="الاسم" v-model:input="SmartMetersDataForm.name"
                    :error="(errors && errors.name) ? errors.name._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UITextInput placeholder="المحلة" v-model:input="SmartMetersDataForm.mahalla"
                    :error="(errors && errors.mahalla) ? errors.mahalla._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UITextInput placeholder="الشارع" v-model:input="SmartMetersDataForm.street"
                    :error="(errors && errors.street) ? errors.street._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UITextInput placeholder="المنزل" v-model:input="SmartMetersDataForm.house"
                    :error="(errors && errors.house) ? errors.house._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UITextInput placeholder="الرقم التسلسلي" v-model:input="SmartMetersDataForm.serialNumber"
                    :error="(errors && errors.serialNumber) ? errors.serialNumber._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UITextInput placeholder="رقم المرجع" v-model:input="SmartMetersDataForm.referenceNumber"
                    :error="(errors && errors.referenceNumber) ? errors.referenceNumber._errors[0] : ''" />
            </div>

            <div class="w-full">
                <UITextInput inputType="number" placeholder="تصنيف" v-model:input="SmartMetersDataForm.classify"
                    :error="(errors && errors.classify) ? errors.classify._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UITextInput inputType="number" placeholder="نوع الجهاز" v-model:input="SmartMetersDataForm.deviceType"
                    :error="(errors && errors.deviceType) ? errors.deviceType._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UITextInput inputType="number" placeholder="نوع الاتصال"
                    v-model:input="SmartMetersDataForm.connactionType"
                    :error="(errors && errors.connactionType) ? errors.connactionType._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UISelect :data="lowVoltageStations" placeholder="محطة جهد المنخفض"
                    v-model:input="SmartMetersDataForm.lowVoltageStationId" type="number"
                    :error="(errors && errors.lowVoltageStationId) ? errors.lowVoltageStationId._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UISelect :data="dataCollectionUnits" placeholder="وحدة التجميع"
                    v-model:input="SmartMetersDataForm.dataCollectionUnitId" type="number"
                    :error="(errors && errors.dataCollectionUnitId) ? errors.dataCollectionUnitId._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UISelect :data="customers" placeholder="المستخدم" v-model:input="SmartMetersDataForm.customerId"
                    type="number" :error="(errors && errors.customerId) ? errors.customerId._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UISelect :data="deviceModels" placeholder="الجهاز" v-model:input="SmartMetersDataForm.deviceModelId"
                    type="number" :error="(errors && errors.deviceModelId) ? errors.deviceModelId._errors[0] : ''" />
            </div>

            <div class="w-full">
                <UISelect :data="[
                    { key: 'فعال', value: '1' },
                    { key: 'غير فعال', value: '2' },
                    { key: 'قيد الصيانة', value: '3' },
                    { key: 'خارج الخدمة', value: '4' },

                ]" placeholder="حالة الجهاز" v-model:input="SmartMetersDataForm.deviceStatus" type="number"
                    :error="(errors && errors.deviceStatus) ? errors.deviceStatus._errors[0] : ''" />
            </div>

            <div class="w-full">
                <UISelect :data="deviceIdentifications" placeholder="تعريف الجهاز"
                    v-model:input="SmartMetersDataForm.deviceIdentificationId" type="number"
                    :error="(errors && errors.deviceIdentificationId) ? errors.deviceIdentificationId._errors[0] : ''" />
            </div>

            <div class="w-full">
                <UISelect :data="origins" placeholder="المنشأ" v-model:input="SmartMetersDataForm.originId"
                    type="number" :error="(errors && errors.originId) ? errors.originId._errors[0] : ''" />
            </div>

            <div class="w-full">
                <UISelect :data="governorates" placeholder="المحافظة" v-model:input="SmartMetersDataForm.governorateId"
                    type="number" :error="(errors && errors.governorateId) ? errors.governorateId._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UISelect :data="citys" placeholder="المدينة" v-model:input="SmartMetersDataForm.cityId" type="number"
                    :error="(errors && errors.cityId) ? errors.cityId._errors[0] : ''" />
            </div>

        </form>
        <br>
        <button v-if="!isLoading" @click="handlerAddSmartMeters()" class="btn btn-block text-sm">اضافة</button>
        <button v-else class="btn btn-block text-sm">
            <Icon name="mdi:loading" size="22" class="text-white animate-spin" />
        </button>
    </UIModal>

    <UIModal width="50vw" height="fit-content" v-if="SmartMetersModalEdit" @close="handlerCloseModal">
        <p class="text-xl text-center font-medium">تعديل عداد الذكية</p>
        <br>
        <form @submit.prevent="" class="w-full gap-2 flex flex-col items-center">
            <div class="w-full">
                <UITextInput placeholder="الاسم" v-model:input="SmartMetersDataForm.name"
                    :error="(errors && errors.name) ? errors.name._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UITextInput placeholder="الرقم التسلسلي" v-model:input="SmartMetersDataForm.serialNumber"
                    :error="(errors && errors.serialNumber) ? errors.serialNumber._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UITextInput placeholder="رقم المرجع" v-model:input="SmartMetersDataForm.referenceNumber"
                    :error="(errors && errors.referenceNumber) ? errors.referenceNumber._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UITextInput placeholder="العنوان" v-model:input="SmartMetersDataForm.address"
                    :error="(errors && errors.address) ? errors.address._errors[0] : ''" />
            </div>


            <div class="w-full">
                <UISelect :data="deviceModels" placeholder="الجهاز" v-model:input="SmartMetersDataForm.deviceModelId"
                    type="number" :error="(errors && errors.deviceModelId) ? errors.deviceModelId._errors[0] : ''" />
            </div>

            <div class="w-full">
                <UISelect :data="deviceIdentifications" placeholder="تعريف الجهاز"
                    v-model:input="SmartMetersDataForm.deviceIdentificationId" type="number"
                    :error="(errors && errors.deviceIdentificationId) ? errors.deviceIdentificationId._errors[0] : ''" />
            </div>

            <div class="w-full">
                <UISelect :data="origins" placeholder="المنشأ" v-model:input="SmartMetersDataForm.originId"
                    type="number" :error="(errors && errors.originId) ? errors.originId._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UISelect :data="companys" placeholder="الشركة" v-model:input="SmartMetersDataForm.companyId"
                    type="number" :error="(errors && errors.companyId) ? errors.companyId._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UISelect :data="governorates" placeholder="المحافظة" v-model:input="SmartMetersDataForm.governorateId"
                    type="number" :error="(errors && errors.governorateId) ? errors.governorateId._errors[0] : ''" />
            </div>
            <div class="w-full">
                <UISelect :data="citys" placeholder="المدينة" v-model:input="SmartMetersDataForm.cityId" type="number"
                    :error="(errors && errors.cityId) ? errors.cityId._errors[0] : ''" />
            </div>

        </form>
        <br>
        <button v-if="!isLoading" @click="handlerEditSmartMeters()" class="btn btn-block text-sm">تعديل</button>
        <button v-else class="btn btn-block text-sm">
            <Icon name="mdi:loading" size="22" class="text-white animate-spin" />
        </button>
    </UIModal>

    <UIModal v-if="deleteModal" @close="deleteModal = false" height="fit-content">
        <p class="text-center text-lg font-semibold ">هل تريد حذف هذه العداد الذكية ؟ </p>
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
                <p class="font-medium">{{ viewData.serialNumber }}</p>
                <p class="font-medium">: الرقم التسلسلي</p>
            </div>
            <div class="flex flex-row justify-between">
                <p class="font-medium">{{ viewData.referenceNumber }}</p>
                <p class="font-medium">: الرقم المرجعي</p>
            </div>
            <div class="flex flex-row justify-between">
                <p class="font-medium">{{ viewData.capacity }}</p>
                <p class="font-medium">: السعة</p>
            </div>
            <div class="flex flex-row justify-between">
                <p class="font-medium">{{ viewData.capacityUnit }}</p>
                <p class="font-medium">: وحدة السعة</p>
            </div>
            <div class="flex flex-row justify-between">
                <p class="font-medium">{{ viewData.incomingVoltage }}</p>
                <p class="font-medium">: الجهد الوارد</p>
            </div>
            <div class="flex flex-row justify-between">
                <p class="font-medium">{{ viewData.governorate.name }}</p>
                <p class="font-medium">: المحافظة</p>
            </div>
            <div class="flex flex-row justify-between">
                <p class="font-medium">{{ viewData.city.name }}</p>
                <p class="font-medium">: المدينة</p>
            </div>
            <div class="flex flex-row justify-between">
                <p class="font-medium">{{ viewData.connactionType }}</p>
                <p class="font-medium">: نوع الاتصال</p>
            </div>
            <div class="flex flex-row justify-between">
                <p class="font-medium">{{ viewData.feeder.name }}</p>
                <p class="font-medium">: المغذي</p>
            </div>
            <div class="flex flex-row justify-between">
                <p class="font-medium">{{ viewData.transformerType }}</p>
                <p class="font-medium">: نوع المحول</p>
            </div>
            <br>

        </div>
    </UIModal>





    <br>
    <CommonFolderSection @view="(data) => handlerView(data)" @delete="(id) => handlerDelete(id)"
        @edit="(data) => handlerEdit(data)" v-if="!isLoadingGetData" :data="SmartMeters" title="عداد الذكية"
        iconFolder="mdi:powerline" iconColor="text-blue-500">
        <div class="flex flex-row gap-4 items-center">
            <button class="btn text-sm mt-1 " @click="SmartMetersModalAdd = true">
                <Icon name="ph:plus" size="19" />
                اضافة عداد الذكية
            </button>
            <button @click="removeFilter()" class="btn-icon jui-btn px-[12px] mt-2" v-if="filter.Name != ''">
                <Icon name="hugeicons:filter-remove" size="22" />
            </button>
            <UITextInput v-model:input:input="filter.Name" @keypress.enter="getAllData" placeholder="الاسم"
                :label="false" class="!w-96" />
        </div>
    </CommonFolderSection>
    <div class="w-full h-screen flex flex-row items-center justify-center" v-else>
        <UILoading />
    </div>

</template>