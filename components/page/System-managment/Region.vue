<script setup>



const isLoading = ref(false)



const Region = ref([])

const filter = ref({
    Name: '',

})
const PageIndex = ref(1);
const PageSize = ref(10000);
const isLoadingGetData = ref(false)
const getAllData = async () => {
    isLoadingGetData.value = true;
    const { _, response, error, __ } = await useCity().get(filter.value, PageIndex.value, PageSize.value);
    Region.value = response.result
    isLoadingGetData.value = false
}
onMounted(() => getAllData())


const editItem = ref()
const RegionModalEdit = ref(false)




const removeFilter = () => {
    filter.value.Name = ''
    getAllData()
}

</script>


<template>


    <br>
    <CommonFolderSection @view="(data) => navigateTo(`./system-management/city/${data.id}`)" @delete="(id) => navigateTo('/region')"
        @edit="(data) =>  navigateTo('/region')" v-if="!isLoadingGetData" :data="Region" title="المناطق"
        iconFolder="hugeicons:city-03" iconColor="text-blue-500">
        <div class="flex flex-row gap-4 items-center">
            <button class="btn text-sm mt-1 " @click="RegionModalAdd = true">
                <Icon name="ph:plus" size="19" />
                اضافة منطقة
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