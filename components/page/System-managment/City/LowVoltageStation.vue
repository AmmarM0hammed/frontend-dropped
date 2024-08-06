<script setup>
import { LowVoltageStationSchema } from "~/schema/LowVoltageStation"


var LowVoltageStationDataForm = reactive({
  name: '',
  serialNumber: '',
  referenceNumber: '',
  incomingVoltage: null,
  outgoingVoltage: null,
  capacity: null,
  capacityUnit: null,
  transformerType: null,
  connactionType: null,
  feederId: 1,
  governorateId: 1,
  cityId: 1,
  dataCollectionUnitId: 1

})
const LowVoltageStationModalAdd = ref(false)

const citys = ref([])
const governorates = ref([])
const feeders = ref([])
const dataCollectionUnit = ref([])
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



  var tempFeeders = []
  const _feeders = await useFeeder().get({ Name: '', GovernorateId: '' }, 1, 10000)
  for (let index = 0; index < _feeders.response?.result.length; index++) {
    tempFeeders.push({
      key: _feeders.response?.result[index].name,
      value: _feeders.response?.result[index].id,
    });
  }
  feeders.value = tempFeeders

  var tempDataCollectionUnit = []
  const _dataCollectionUnit = await useDataCollectionUnit().get({ Name: '' }, useRoute().params.id, 1, 10000)
  for (let index = 0; index < _dataCollectionUnit.response?.result.length; index++) {
    tempDataCollectionUnit.push({
      key: _dataCollectionUnit.response?.result[index].name,
      value: _dataCollectionUnit.response?.result[index].id,
    });
  }
  dataCollectionUnit.value = tempDataCollectionUnit
})

const errors = ref()
const isLoading = ref(false)
const handlerAddLowVoltageStation = async () => {
  const result = LowVoltageStationSchema.safeParse(LowVoltageStationDataForm);

  if (!result.success) {
    errors.value = result.error.format()
    console.log(errors.value)
    return;
  }
  isLoading.value = true
  const { _, response, error, __ } = await useLowVoltageStation().create(LowVoltageStationDataForm)
  LowVoltageStationModalAdd.value = false
  isLoading.value = false
  errors.value = ''
  LowVoltageStationDataForm = {}
  getAllData();


}


const LowVoltageStation = ref([])
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
  const { _, response, error, __ } = await useLowVoltageStation().get(filter.value, props.cityID, PageIndex.value, PageSize.value);
  LowVoltageStation.value = response.result
  isLoadingGetData.value = false
}
onMounted(() => getAllData())


const editItem = ref()
const LowVoltageStationModalEdit = ref(false)

const editID = ref()
const handlerEdit = (item) => {
  editItem.value = item;
  LowVoltageStationModalEdit.value = true;
  editID.value = item.id

  LowVoltageStationDataForm.name = item.name;
  LowVoltageStationDataForm.serialNumber = item.serialNumber;
  LowVoltageStationDataForm.referenceNumber = item.referenceNumber;
  LowVoltageStationDataForm.incomingVoltage = item.incomingVoltage;
  LowVoltageStationDataForm.outgoingVoltage = item.outgoingVoltage;
  LowVoltageStationDataForm.capacity = item.capacity;
  LowVoltageStationDataForm.capacityUnit = item.capacityUnit;
  LowVoltageStationDataForm.transformerType = item.transformerType;
  LowVoltageStationDataForm.connactionType = item.connactionType;
  LowVoltageStationDataForm.feederId = item.feeder.id;
  LowVoltageStationDataForm.governorateId = item.governorate.id;
  LowVoltageStationDataForm.cityId = item.city.id;
  LowVoltageStationDataForm.dataCollectionUnitId = item.dataCollectionUnit.id;



};

const handlerEditLowVoltageStation = async () => {
  const result = LowVoltageStationSchema.safeParse(LowVoltageStationDataForm);

  if (!result.success) {
    errors.value = result.error.format()

    return;
  }

  isLoading.value = true
  const { _, response, error, __ } = await useLowVoltageStation().update(editID.value, LowVoltageStationDataForm)


  LowVoltageStationModalEdit.value = false
  isLoading.value = false
  errors.value = ''
  LowVoltageStationDataForm = {}
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
  await useLowVoltageStation().remove(deleteID.value)
  isLoadingButton.value = false
  deleteModal.value = false;
  getAllData()

}

const handlerCloseModal = () => {
  LowVoltageStationDataForm = {
    name: "",
    load: null,
    distributionStationId: 0,
    governorateId: 0,
    cityId: 0
  }
  LowVoltageStationModalEdit.value = false
  LowVoltageStationModalAdd.value = false
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
  <UIModal width="50vw" height="fit-content" v-if="LowVoltageStationModalAdd" @close="handlerCloseModal">
    <p class="text-xl text-center font-medium">اضافة محطة الجهد المنخفض</p>
    <br>
    <form @submit.prevent="" class="w-full gap-2 flex flex-col items-center">
      <div class="w-full">
        <UITextInput placeholder="الاسم" v-model:input="LowVoltageStationDataForm.name"
          :error="(errors && errors.name) ? errors.name._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UITextInput placeholder="الرقم التسلسلي" v-model:input="LowVoltageStationDataForm.serialNumber"
          :error="(errors && errors.serialNumber) ? errors.serialNumber._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UITextInput placeholder="رقم المرجع" v-model:input="LowVoltageStationDataForm.referenceNumber"
          :error="(errors && errors.referenceNumber) ? errors.referenceNumber._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UITextInput inputType="number" placeholder="الجهد الداخل"
          v-model:input="LowVoltageStationDataForm.incomingVoltage"
          :error="(errors && errors.incomingVoltage) ? errors.incomingVoltage._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UITextInput inputType="number" placeholder="الجهد الخارج"
          v-model:input="LowVoltageStationDataForm.outgoingVoltage"
          :error="(errors && errors.outgoingVoltage) ? errors.outgoingVoltage._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UITextInput inputType="number" placeholder="السعة" v-model:input="LowVoltageStationDataForm.capacity"
          :error="(errors && errors.capacity) ? errors.capacity._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UITextInput inputType="number" placeholder="وحدة السعة" v-model:input="LowVoltageStationDataForm.capacityUnit"
          :error="(errors && errors.capacityUnit) ? errors.capacityUnit._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UITextInput placeholder="نوع المحول" v-model:input="LowVoltageStationDataForm.transformerType"
          inputType="number" :error="(errors && errors.transformerType) ? errors.transformerType._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UITextInput placeholder="نوع الاتصال" v-model:input="LowVoltageStationDataForm.connactionType"
          inputType="number" :error="(errors && errors.connactionType) ? errors.connactionType._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UISelect :data="feeders" placeholder="معرف المغذي" v-model:input="LowVoltageStationDataForm.feederId"
          type="number" :error="(errors && errors.feederId) ? errors.feederId._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UISelect :data="governorates" placeholder="المحافظة" v-model:input="LowVoltageStationDataForm.governorateId"
          type="number" :error="(errors && errors.governorateId) ? errors.governorateId._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UISelect :data="citys" placeholder="المدينة" v-model:input="LowVoltageStationDataForm.cityId" type="number"
          :error="(errors && errors.cityId) ? errors.cityId._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UISelect :data="dataCollectionUnit" placeholder="معرف وحدة جمع البيانات"
          v-model:input="LowVoltageStationDataForm.dataCollectionUnitId" type="number"
          :error="(errors && errors.dataCollectionUnitId) ? errors.dataCollectionUnitId._errors[0] : ''" />
      </div>
    </form>
    <br>
    <button v-if="!isLoading" @click="handlerAddLowVoltageStation()" class="btn btn-block text-sm">اضافة</button>
    <button v-else class="btn btn-block text-sm">
      <Icon name="mdi:loading" size="22" class="text-white animate-spin" />
    </button>
  </UIModal>

  <UIModal width="50vw" height="fit-content" v-if="LowVoltageStationModalEdit" @close="handlerCloseModal">
    <p class="text-xl text-center font-medium">تعديل مغذي</p>
    <br>
    <form @submit.prevent="" class="w-full gap-2 flex flex-col items-center">

      <div class="w-full">
        <UITextInput placeholder="الاسم" v-model:input="LowVoltageStationDataForm.name"
          :error="(errors && errors.name) ? errors.name._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UITextInput placeholder="الرقم التسلسلي" v-model:input="LowVoltageStationDataForm.serialNumber"
          :error="(errors && errors.serialNumber) ? errors.serialNumber._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UITextInput placeholder="رقم المرجع" v-model:input="LowVoltageStationDataForm.referenceNumber"
          :error="(errors && errors.referenceNumber) ? errors.referenceNumber._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UITextInput inputType="number" placeholder="الجهد الداخل"
          v-model:input="LowVoltageStationDataForm.incomingVoltage"
          :error="(errors && errors.incomingVoltage) ? errors.incomingVoltage._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UITextInput inputType="number" placeholder="الجهد الخارج"
          v-model:input="LowVoltageStationDataForm.outgoingVoltage"
          :error="(errors && errors.outgoingVoltage) ? errors.outgoingVoltage._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UITextInput inputType="number" placeholder="السعة" v-model:input="LowVoltageStationDataForm.capacity"
          :error="(errors && errors.capacity) ? errors.capacity._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UITextInput inputType="number" placeholder="وحدة السعة" v-model:input="LowVoltageStationDataForm.capacityUnit"
          :error="(errors && errors.capacityUnit) ? errors.capacityUnit._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UITextInput placeholder="نوع المحول" v-model:input="LowVoltageStationDataForm.transformerType"
          inputType="number" :error="(errors && errors.transformerType) ? errors.transformerType._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UITextInput placeholder="نوع الاتصال" v-model:input="LowVoltageStationDataForm.connactionType"
          inputType="number" :error="(errors && errors.connactionType) ? errors.connactionType._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UISelect :data="feeders" placeholder="معرف المغذي" v-model:input="LowVoltageStationDataForm.feederId"
          type="number" :error="(errors && errors.feederId) ? errors.feederId._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UISelect :data="governorates" placeholder="المحافظة" v-model:input="LowVoltageStationDataForm.governorateId"
          type="number" :error="(errors && errors.governorateId) ? errors.governorateId._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UISelect :data="citys" placeholder="المدينة" v-model:input="LowVoltageStationDataForm.cityId" type="number"
          :error="(errors && errors.cityId) ? errors.cityId._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UISelect :data="dataCollectionUnit" placeholder="معرف وحدة جمع البيانات"
          v-model:input="LowVoltageStationDataForm.dataCollectionUnitId" type="number"
          :error="(errors && errors.dataCollectionUnitId) ? errors.dataCollectionUnitId._errors[0] : ''" />
      </div>



    </form>
    <br>


    <button v-if="!isLoading" @click="handlerEditLowVoltageStation()" class="btn btn-block text-sm">
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
  <CommonFolderSection @view="(data) => handlerViewData(data)" @delete="(id) => handlerDelete(id)"
    @edit="(data) => handlerEdit(data)" v-if="!isLoadingGetData" :data="LowVoltageStation" title="محطة الجهد المنخفض"
    iconFolder="mdi:powerline" iconColor="text-blue-500">
    <div class="flex flex-row gap-4 items-center">
      <button class="btn text-sm mt-1 " @click="LowVoltageStationModalAdd = true">
        <Icon name="ph:plus" size="19" />
        اضافة محطة الجهد المنخفض
      </button>
      <button @click="removeFilter()" class="btn-icon jui-btn px-[12px] mt-2" v-if="filter.Name != ''">
        <Icon name="hugeicons:filter-remove" size="22" />
      </button>
      <UITextInput v-model:input:input="filter.Name" @keypress.enter="getAllData" placeholder="الاسم" :label="false"
        class="!w-96" />
    </div>
  </CommonFolderSection>
  <div class="w-full h-screen flex flex-row items-center justify-center" v-else>
    <UILoading />
  </div>

</template>