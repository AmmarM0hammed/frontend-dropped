<script setup>

const isLoading = ref(false)
const props = defineProps({
    header: {},
    body: {},


    hasButton: {
        default: true,
        type: Boolean
    },

    composables: {},
    filter: {
        default: null
    },

    hasAdd: {
        default: false
    },
    addForm: {},
    hasEdit: {
        default: false
    },
    editForm: {},
    addFormModal: {
        default: false
    }



})


const emit = defineEmits(['closeAddModal'])

const data = ref([])
const _filter = ref(null)

const pageIndex = ref(1)
const pageSize = ref(10)
const getAllData = async () => {
    isLoading.value = true;
    const { _, response, error, refresh } = await props.composables.get(_filter.value, pageIndex.value, pageSize.value);
    data.value = response
    isLoading.value = false;
    modal.value = false

}

onMounted(() => {
    _filter.value = Object.fromEntries(
        props.filter?.map((filterItem) => [filterItem.key, '']) || null
    );
    getAllData()
})

const sortedColumn = ref(null);
const sortDirection = ref(null);

const sortedData = computed(() => {
    if (sortedColumn.value === null) return data.value.result;
    const direction = sortDirection.value === 'asc' ? 1 : -1;
    return [...data.value.result].sort((a, b) => {
        const aValue = getNestedValue(a, props.body[sortedColumn.value]);
        const bValue = getNestedValue(b, props.body[sortedColumn.value]);
        if (aValue < bValue) return -1 * direction;
        if (aValue > bValue) return 1 * direction;
        return 0;
    });
});

const clearSort = () => {
    sortedColumn.value = null;
    sortDirection.value = null;
};
const sortCounter = ref(0)
const handlerSort = (index) => {
    if (sortCounter.value < 2) {
        if (sortedColumn.value === index) {
            sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
        } else {
            sortedColumn.value = index;
            sortDirection.value = 'asc';
        }

        sortCounter.value++;
    }
    else {
        clearSort()
        sortCounter.value = 0
    }
};

const getNestedValue = (obj, path) => {
    if (typeof path !== 'string') return undefined
    return path.split('.').reduce((o, p) => (o ? o[p] : undefined), obj)
}

const modal = ref(false)

const resetFilter = () => {
    for (let index = 0; index < props.filter.length; index++) {

        _filter.value[props.filter[index].key] = ''

    }
    getAllData()
}

const isFilterEmpty = ref(false)

const isAnyFilterNotEmpty = computed(() => {
    if (!_filter.value) {
        return false;
    }
    for (let index = 0; index < props.filter.length; index++) {
        if (_filter.value[props.filter[index].key] != '')
            return true;

    }

});

watch(
    isAnyFilterNotEmpty,
    (newVal) => {
        isFilterEmpty.value = newVal;
    },
    { immediate: true }
);

const handlerPagination = async (index) => {
    if (pageIndex.value > data.value.count) {

        pageIndex.value = 1
        await getAllData();
        return;
    };
    pageIndex.value = (index + 1);
    await getAllData();
}


const handlerClose = () => {
    emit('closeAddModal')
}
const handlerCreate = () => getAllData()



const showEditModal = ref(false)
const editData = ref()
const handlerEdit = (item, edit) => {
    editData.value = item
    showEditModal.value = true
}



const showDeleteModal = ref(false)
const deleteID = ref()
const loadingDelete = ref(false)
const handlerDelete = (id) => {
    showDeleteModal.value = true
    deleteID.value = id;
}

const _handlerDelete = async () => {
    loadingDelete.value = true
    const { _, response, error, __ } = await props.composables.remove(deleteID.value)
    loadingDelete.value = false

    showDeleteModal.value = false
    getAllData()
}

const formatDate = (d) => {
  const date = new Date(d);
  const formattedDate = date.toLocaleString('en-US', { timeZone: 'America/New_York', hour12: true }).replace(/T/, '-').replace(/\..+/, '');


  return formattedDate
}


</script>

<template>
    <UIModal v-if="modal" @close="modal = false" height="fit-content">
        <p class="text-xl text-center font-medium">تصفية البحث</p>
        <br>
        <div v-for="(item, index) in filter" :key="index" class=" w-full" v-if="index != 0">
            <UITextInput @keypress.enter="getAllData()" :placeholder="item.title" v-model:input="_filter[item.key]"
                class="bg-gray-50" />
            <br>
        </div>
        <br>
        <button class="btn btn-block" @click="getAllData()">البحث</button>
    </UIModal>

    <div class="flex flex-row w-full item-center  gap-5" dir="rtl" v-if="_filter">

        <div v-if="filter.length <= 2" v-for="(item, index) in filter" :key="index" class="md:w-96 w-full">
            <div v-if="item.type == 'text'">
                <UITextInput @keypress.enter="getAllData()" :placeholder="item.title"
                    v-model:input="_filter[item.key]" />
                <br>
            </div>
            <div v-else-if="item.type == 'select'">
                <UISelect @change="getAllData()" :placeholder="item.title"
                    v-model:input="_filter[item.key]"  />
                <br>
            </div>
        </div>
        <div v-else class="md:w-96 w-full">
            <UITextInput @keypress.enter="getAllData()" :placeholder="filter[0].title"
                v-model:input="_filter[filter[0].key]" />
            <br>
        </div>


        <div v-if="filter.length > 2" class="flex gap-1 items-center mb-1">
            <button @click="modal = true" class="btn-icon jui-btn px-[12px] mt-2">
                <Icon name="hugeicons:filter" size="22" />
            </button>
        </div>
        <div class="flex gap-1 items-center mb-1">
            <button v-if="isFilterEmpty" @click="resetFilter" class="btn-icon jui-btn px-[12px] mt-2">
                <Icon name="hugeicons:filter-remove" size="22" />
            </button>

        </div>

    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mytable" dir="rtl">

        <table dir="rtl" class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-s  text-white uppercase bg-primary dark:bg-gray-700 dark:text-gray-400">
                <tr class="">
                    <th @click="handlerSort(index)" scope="col" class="px-6 py-3 jui-btn  "
                        v-for="(item, index) in header" :key="index">
                        <div class="flex text-nowrap flex-nowrap items-center gap-2  ">
                            {{ item }}
                            <Icon name="fluent:arrow-sort-20-regular" size="17" v-if="sortedColumn != index" />

                            <Icon name="icon-park-outline:down" size="17"
                                v-if="sortedColumn === index && sortCounter === 1" />
                            <Icon name="icon-park-outline:up" size="17"
                                v-if="sortedColumn === index && sortCounter === 2" />

                        </div>
                    </th>

                    <th scope="col" class="px-6 py-3" v-if="hasButton">
                        <span class="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>
            <tbody v-if="!isLoading">
                <tr v-for="(item, index) in sortedData" :key="index"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td v-for="(_body, index) in body" :key="index" scope="row"
                        class="px-6  py-4 font-medium text-md text-gray-900 whitespace-nowrap dark:text-white">

                        <span v-if="_body == 'role'">
                            {{ item[_body] == '0' ? 'مدير' : '' }}
                            {{ item[_body] == '1' ? 'مدينة' : '' }}
                            {{ item[_body] == '2' ? 'شركة' : '' }}
                            {{ item[_body] == '3' ? 'مستخدم' : '' }}
                        </span>
                        <span v-else-if="_body == 'startTime' || _body == 'endTime' || _body == 'creationDate'"> 
                            {{ formatDate(item[_body]) }}
                        </span>
                        <span v-else-if="_body == 'isActive'"> 
                            <p v-if="item[_body]" class="text-green-500 w-fit  px-2 bg-green-500/10 rounded-md text-xs ">نشط</p>
                            <p v-else class="text-red-500 bg-red-500/10 px-2 w-fit rounded-md text-xs ">غير نشط</p>
                        </span>
                        <span v-else> {{ getNestedValue(item, _body) || "لا يوجد" }}</span>
                    </td>

                    <td class="py-4 text-center" v-if="hasButton">
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
    <br>

    <nav class="pagination pagination-primary flex flex-row-reverse">
        <ul>

            <li @click="handlerPagination(index)" v-for="(item, index) in data?.count || 0" :key="index">
                <a href="#" :class="((index + 1) == pageIndex) ? '!bg-primary !text-white' : ''">{{ index + 1 }}</a>
            </li>

            <li class="next" v-if="pageIndex < data?.count" @click="handlerPagination(pageIndex++)">
                <a href="#">التالي</a>
            </li>


        </ul>
    </nav>




    <CommonAutoCRUD v-if="addFormModal" @create="handlerCreate" @close="handlerClose" :type="addForm?.type"
        :inputs="addForm?.inputs" :composables="addForm?.composables" :schema="addForm?.schema" :title="addForm?.title"
        :width="addForm?.width" />

    <CommonAutoCRUD :editData="editData" v-if="showEditModal" @close="showEditModal = false" type="edit"
        :inputs="addForm?.inputs" @create="handlerCreate" :composables="addForm?.composables" :schema="addForm?.schema"
        title="تعديل" :width="addForm?.width" />

    <UIModal v-if="showDeleteModal" @close="showDeleteModal" height="fit-content">
        <p class="text-center text-lg font-semibold ">هل تريد حذف هذا العنصر ؟ </p>
        <br>
        <div class="flex flex-row gap-5 justify-center">
            <button v-if="!loadingDelete" @click="_handlerDelete" class="btn text-sm ">حذف</button>
            <button v-else class="btn text-sm ">
                <Icon name="mdi:loading" size="20" class="animate-spin" />
            </button>
            <button @click="showDeleteModal = false"
                class="btn text-sm border-2 border-primary !bg-transparent text-primary hover:text-white hover:!bg-primary">الغاء</button>
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
