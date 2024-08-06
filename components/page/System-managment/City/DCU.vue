<script setup>
import { DCUSchema } from "~/schema/DCU"


var DCUDataForm = reactive({
  name: '',
  serialNumber: '',
  referenceNumber: '',
  address: '',
  companyId: 1,
  governorateId: 1,
  cityId: 1,
  originId: 1,
  deviceModelId: 1,
  deviceIdentificationId: 1
  

})
const DCUModalAdd = ref(false)

const citys = ref([])
const governorates = ref([])
const companys = ref([])
const deviceModels = ref([])
const deviceIdentifications = ref([])
const origins = ref([])

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

  var tempCompanys = []
  const company = await useCompany().get({ Name: '', GovernorateId: '' }, 1, 10000)
  for (let index = 0; index < company.response?.result.length; index++) {
    tempCompanys.push({
      key: company.response?.result[index].name,
      value: company.response?.result[index].id,
    });
  }
  companys.value = tempCompanys

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



})

const errors = ref()
const isLoading = ref(false)
const handlerAddDCU = async () => {
  const result = DCUSchema.safeParse(DCUDataForm);

  if (!result.success) {
    errors.value = result.error.format()
    console.log(errors.value)
    return;
  }
  isLoading.value = true
  const { _, response, error, __ } = await useDataCollectionUnit().create(DCUDataForm)
  DCUModalAdd.value = false
  isLoading.value = false
  errors.value = ''
  DCUDataForm = {}
  getAllData();


}


const DCU = ref([])
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
  const { _, response, error, __ } = await useDataCollectionUnit().get(filter.value, props.cityID, PageIndex.value, PageSize.value);
  DCU.value = response.result
  isLoadingGetData.value = false
}
onMounted(() => getAllData())


const editItem = ref()
const DCUModalEdit = ref(false)

const editID = ref()
const handlerEdit = (item) => {
  editItem.value = item;
  DCUModalEdit.value = true;
  editID.value = item.id


  DCUDataForm.name = item.name;
  DCUDataForm.serialNumber = item.serialNumber;
  DCUDataForm.referenceNumber = item.referenceNumber;
  DCUDataForm.address = item.address;

  DCUDataForm.companyId = item.company.id;
  DCUDataForm.governorateId = item.governorate.id;
  DCUDataForm.cityId = item.city.id;
  DCUDataForm.originId = item.origin.id;
  DCUDataForm.deviceModelId = item.deviceModel.id;
  DCUDataForm.deviceIdentificationId = item.deviceIdentification.id;




};

const handlerEditDCU = async () => {
  const result = DCUSchema.safeParse(DCUDataForm);

  if (!result.success) {
    errors.value = result.error.format()

    return;
  }

  isLoading.value = true
  const { _, response, error, __ } = await useDataCollectionUnit().update(editID.value, DCUDataForm)


  DCUModalEdit.value = false
  isLoading.value = false
  errors.value = ''
  DCUDataForm = {}
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
  await useDCU().remove(deleteID.value)
  isLoadingButton.value = false
  deleteModal.value = false;
  getAllData()

}

const handlerCloseModal = () => {
  DCUDataForm = {
    name: "",
    load: null,
    distributionStationId: 0,
    governorateId: 0,
    cityId: 0
  }
  DCUModalEdit.value = false
  DCUModalAdd.value = false
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
  <UIModal width="50vw" height="fit-content" v-if="DCUModalAdd" @close="handlerCloseModal">
    <p class="text-xl text-center font-medium">اضافة محطة الجهد المنخفض</p>
    <br>
    <form @submit.prevent="" class="w-full gap-2 flex flex-col items-center">
      <div class="w-full">
        <UITextInput placeholder="الاسم" v-model:input="DCUDataForm.name"
          :error="(errors && errors.name) ? errors.name._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UITextInput placeholder="الرقم التسلسلي" v-model:input="DCUDataForm.serialNumber"
          :error="(errors && errors.serialNumber) ? errors.serialNumber._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UITextInput placeholder="رقم المرجع" v-model:input="DCUDataForm.referenceNumber"
          :error="(errors && errors.referenceNumber) ? errors.referenceNumber._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UITextInput  placeholder="العنوان"
          v-model:input="DCUDataForm.address"
          :error="(errors && errors.address) ? errors.address._errors[0] : ''" />
      </div>
     
  
      <div class="w-full">
        <UISelect :data="deviceModels" placeholder="الجهاز" v-model:input="DCUDataForm.deviceModelId"
          type="number" :error="(errors && errors.deviceModelId) ? errors.deviceModelId._errors[0] : ''" />
      </div>

      <div class="w-full">
        <UISelect :data="deviceIdentifications" placeholder="تعريف الجهاز" v-model:input="DCUDataForm.deviceIdentificationId"
          type="number" :error="(errors && errors.deviceIdentificationId) ? errors.deviceIdentificationId._errors[0] : ''" />
      </div>
     
      <div class="w-full">
        <UISelect :data="origins" placeholder="المنشأ" v-model:input="DCUDataForm.originId"
          type="number" :error="(errors && errors.originId) ? errors.originId._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UISelect :data="companys" placeholder="الشركة" v-model:input="DCUDataForm.companyId"
          type="number" :error="(errors && errors.companyId) ? errors.companyId._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UISelect :data="governorates" placeholder="المحافظة" v-model:input="DCUDataForm.governorateId"
          type="number" :error="(errors && errors.governorateId) ? errors.governorateId._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UISelect :data="citys" placeholder="المدينة" v-model:input="DCUDataForm.cityId" type="number"
          :error="(errors && errors.cityId) ? errors.cityId._errors[0] : ''" />
      </div>
      
    </form>
    <br>
    <button v-if="!isLoading" @click="handlerAddDCU()" class="btn btn-block text-sm">اضافة</button>
    <button v-else class="btn btn-block text-sm">
      <Icon name="mdi:loading" size="22" class="text-white animate-spin" />
    </button>
  </UIModal>

  <UIModal width="50vw" height="fit-content" v-if="DCUModalEdit" @close="handlerCloseModal">
    <p class="text-xl text-center font-medium">تعديل مغذي</p>
    <br>
    <form @submit.prevent="" class="w-full gap-2 flex flex-col items-center">
      <div class="w-full">
        <UITextInput placeholder="الاسم" v-model:input="DCUDataForm.name"
          :error="(errors && errors.name) ? errors.name._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UITextInput placeholder="الرقم التسلسلي" v-model:input="DCUDataForm.serialNumber"
          :error="(errors && errors.serialNumber) ? errors.serialNumber._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UITextInput placeholder="رقم المرجع" v-model:input="DCUDataForm.referenceNumber"
          :error="(errors && errors.referenceNumber) ? errors.referenceNumber._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UITextInput  placeholder="العنوان"
          v-model:input="DCUDataForm.address"
          :error="(errors && errors.address) ? errors.address._errors[0] : ''" />
      </div>
     
  
      <div class="w-full">
        <UISelect :data="deviceModels" placeholder="الجهاز" v-model:input="DCUDataForm.deviceModelId"
          type="number" :error="(errors && errors.deviceModelId) ? errors.deviceModelId._errors[0] : ''" />
      </div>

      <div class="w-full">
        <UISelect :data="deviceIdentifications" placeholder="تعريف الجهاز" v-model:input="DCUDataForm.deviceIdentificationId"
          type="number" :error="(errors && errors.deviceIdentificationId) ? errors.deviceIdentificationId._errors[0] : ''" />
      </div>
     
      <div class="w-full">
        <UISelect :data="origins" placeholder="المنشأ" v-model:input="DCUDataForm.originId"
          type="number" :error="(errors && errors.originId) ? errors.originId._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UISelect :data="companys" placeholder="الشركة" v-model:input="DCUDataForm.companyId"
          type="number" :error="(errors && errors.companyId) ? errors.companyId._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UISelect :data="governorates" placeholder="المحافظة" v-model:input="DCUDataForm.governorateId"
          type="number" :error="(errors && errors.governorateId) ? errors.governorateId._errors[0] : ''" />
      </div>
      <div class="w-full">
        <UISelect :data="citys" placeholder="المدينة" v-model:input="DCUDataForm.cityId" type="number"
          :error="(errors && errors.cityId) ? errors.cityId._errors[0] : ''" />
      </div>
      
    </form>
    <br>
    <button v-if="!isLoading" @click="handlerEditDCU()" class="btn btn-block text-sm">تعديل</button>
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
        <p class="font-medium">{{ viewData.address }}</p>
        <p class="font-medium">: العنوان</p>
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
        <p class="font-medium">{{ viewData.deviceIdentification.name }}</p>
        <p class="font-medium">: تعريف الجهاز</p>
      </div>
      <div class="flex flex-row justify-between">
        <p class="font-medium">{{ viewData.deviceModel.name }}</p>
        <p class="font-medium">: نوع الجهاز</p>
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
        <p class="font-medium">{{ viewData.origin?.name || "لا يوجد" }}</p>
        <p class="font-medium">: المنشأ</p>
      </div>
    
      <div class="flex flex-row justify-between">
        <p class="font-medium">{{ viewData.company.name }}</p>
        <p class="font-medium">: الشركة</p>
      </div>
    
      <!-- <div class="flex flex-row justify-between">
        <p class="font-medium">{{ viewData.feeder.name }}</p>
        <p class="font-medium">: المغذي</p>
      </div> -->
     
      <br>
     
    </div>
  </UIModal>





  <br>
  <CommonFolderSection @view="(data) => handlerViewData(data)" @delete="(id) => handlerDelete(id)"
    @edit="(data) => handlerEdit(data)" v-if="!isLoadingGetData" :data="DCU" title="وحدة تجميع"
    iconFolder="mdi:powerline" iconColor="text-blue-500">
    <div class="flex flex-row gap-4 items-center">
      <button class="btn text-sm mt-1 " @click="DCUModalAdd = true">
        <Icon name="ph:plus" size="19" />
        اضافة وحدة تجميع
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