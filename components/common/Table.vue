<script setup>

const isLoading = ref(false);
const props = defineProps({
  header: {},
  body: {},

  hasButton: {
    default: true,
    type: Boolean,
  },

  composables: {},
  filter: {
    default: null,
  },

  hasAdd: {
    default: false,
  },
  addForm: {},
  hasEdit: {
    default: false,
  },
  editForm: {},
  addFormModal: {
    default: false,
  },
  isFees: {
    default: false,
  },
  isCertificate: {
    default: false,
  },
  isReCertificate: {
    default: false,
  },
  hasEditButton: {
    default: true,
  },
  isRelease: {
    default: false,
  },
  isNonConformityReports: {
    default: false,
  },
  isAuding: {
    default: false,
  },
  showPrintIcon: {
    default: false,
  },
});

const emit = defineEmits([
  "closeAddModal",
  "viewInfo",
  "edit",
  "share",
  "changePassword",
]);

const data = ref([]);
const _filter = ref(null);

const pageIndex = ref(1);
const pageSize = ref(10);
const getAllData = async () => {
  if (!props.isDoucment) {
    isLoading.value = true;
    const { _, response, error, refresh } = await props.composables.get(
      _filter.value,
      pageIndex.value,
      pageSize.value
    );
    data.value = response;
    isLoading.value = false;
    modal.value = false;
  } else {
    // _filter.value?.push({Type:props.bookType})

    isLoading.value = true;
    const { _, response, error, refresh } = await props.composables.get(
      _filter.value,
      pageIndex.value,
      pageSize.value
    );
    data.value = response;
    isLoading.value = false;
    modal.value = false;
  }
};

onMounted(() => {
  _filter.value = Object.fromEntries(
    props.filter?.map((filterItem) => [filterItem.key, ""]) || []
  );

  const isEmpty = Object.keys(_filter.value).length === 0;
  const allEmpty = Object.values(_filter.value).every((value) => value === "");

  if (isEmpty || allEmpty) {
    console.log("The filter object is empty or all values are empty strings.");
  }

  getAllData();
});

const sortedColumn = ref(null);
const sortDirection = ref(null);

const sortedData = computed(() => {
  if (sortedColumn.value === null) return data.value.result;
  const direction = sortDirection.value === "asc" ? 1 : -1;
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
const sortCounter = ref(0);
const handlerSort = (index) => {
  if (sortCounter.value < 2) {
    if (sortedColumn.value === index) {
      sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
    } else {
      sortedColumn.value = index;
      sortDirection.value = "asc";
    }

    sortCounter.value++;
  } else {
    clearSort();
    sortCounter.value = 0;
  }
};

const getNestedValue = (obj, path) => {
  if (typeof path !== "string") return undefined;
  return path.split(".").reduce((o, p) => (o ? o[p] : undefined), obj);
};

const modal = ref(false);

const resetFilter = () => {
  for (let index = 0; index < props.filter.length; index++) {
    _filter.value[props.filter[index].key] = "";
  }
  getAllData();
};

const isFilterEmpty = ref(false);

const isAnyFilterNotEmpty = computed(() => {
  if (!_filter.value) {
    return false;
  }
  for (let index = 0; index < props.filter.length; index++) {
    if (_filter.value[props.filter[index].key] != "") return true;
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
  if (index < 1 || index > data.value.total) return; // Validate page index

  pageIndex.value = index;
  await getAllData();
};

const paginatedPages = computed(() => {
  const totalPages = data.value.totalPages || 0;
  const range = 3;
  let start = Math.max(pageIndex.value - range, 1);
  let end = Math.min(pageIndex.value + range, totalPages);

  if (pageIndex.value <= range) {
    end = Math.min(2 * range + 1, totalPages);
  } else if (pageIndex.value + range >= totalPages) {
    start = Math.max(totalPages - 2 * range, 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

const startPage = computed(() => Math.max(pageIndex.value - 2, 1));
const endPage = computed(() => Math.min(pageIndex.value + 2, data.value.count));

const formatDate = (d) => {
  const date = new Date(d);
  if (isNaN(date.getTime())) {
    return "-";
  }
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "America/New_York",
  });

  return formattedDate;
};
const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

const showColumnDropdown = ref(false);
const handlerShowColumnMenu = () => {
  showColumnDropdown.value = !showColumnDropdown.value;
};

const tableData = ref([]);

onMounted(() => {
  for (let i = 0; i < props.header.length; i++) {
    tableData.value.push({
      title: props.header[i],
      key: props.body[i],
      isShow: true,
    });
  }
});

const scrollContainer = ref(null);
let isMouseDown = false;
let startX;
let scrollLeft;

const onMouseDown = (e) => {
  isMouseDown = true;
  startX = e.pageX - scrollContainer.value.offsetLeft;
  scrollLeft = scrollContainer.value.scrollLeft;
  scrollContainer.value.classList.add("active");
};

const onMouseUp = () => {
  isMouseDown = false;
  scrollContainer.value.classList.remove("active");
  scrollContainer.value.classList.remove("scrolling");
};

const onMouseLeave = () => {
  isMouseDown = false;
};

const onMouseMove = (e) => {
  if (!isMouseDown) return;
  scrollContainer.value.classList.add("scrolling");

  e.preventDefault();
  const x = e.pageX - scrollContainer.value.offsetLeft;
  const walk = (x - startX) * 2;
  scrollContainer.value.scrollLeft = scrollLeft - walk;
};

const showDeleteModal = ref(false);
const deleteID = ref();
const loadingDelete = ref(false);
const handlerDelete = (id) => {
  showDeleteModal.value = true;
  deleteID.value = id;
};

const _handlerDelete = async () => {
  loadingDelete.value = true;
  const { _, response, error, __ } = await props.composables.remove(
    deleteID.value
  );
  loadingDelete.value = false;

  showDeleteModal.value = false;
  getAllData();
};

const handlerToggleActive = async (id) => {
  loadingDelete.value = true;
  const { _, response, error, __ } = await props.composables.toggleActive(id);
  loadingDelete.value = false;

  getAllData();
};

const isDrowdownRows = ref(false);
const handlerDropdownRows = (number) => { };
const handlerClose = () => {
  emit("closeAddModal");
};

const showEditModal = ref(false);
const editData = ref();
const handlerEdit = (item, edit) => {
  editData.value = item;
  showEditModal.value = true;
};

const handlerCreate = () => getAllData();

const handlerInfo = (item) => {
  useGeneralStore().certificate = item;
  return navigateTo("/certificate-of-conformity/view");
};
const handlerReCertificate = (item) => {
  useGeneralStore().certificate = item;
  return navigateTo("/certificate/reissue/");
};

const showTransferToAdminModal = ref(false);
const TransferToAdmin = ref();
const handlerTrnasfer = (item, edit) => {
  TransferToAdmin.value = item;
  showTransferToAdminModal.value = true;
};

const _handlerTrnasfer = async () => {
  loadingDelete.value = true;
  const { _, response, error, __ } = await props.composables?.transferToAdmin(
    TransferToAdmin.value.id,
    true,
    ""
  );
  loadingDelete.value = false;

  showTransferToAdminModal.value = false;
  getAllData();
};

const showPaymentModal = ref(false);
const Payment = ref();
const handlerPayment = (item) => {
  Payment.value = item;
  showPaymentModal.value = true;
};

const _handlerPayment = async () => {
  loadingDelete.value = true;
  const { _, response, error, __ } = await props.composables?.payment(
    Payment.value.id
  );
  loadingDelete.value = false;

  showPaymentModal.value = false;
  getAllData();
};

const showApproveModal = ref(false);
const loadingApprove = ref(false);
const loadingReject = ref(false);

const Approve = ref();
const note = ref("");
const handlerApprove = (item) => {
  Approve.value = item;
  showApproveModal.value = true;
};

const _handlerApprove = async (type) => {
  if (type == 0) {
    loadingApprove.value = true;
    const { _, response, error, __ } = await props.composables?.approveAdmin(
      Approve.value.id,
      true,
      note.value
    );
    loadingApprove.value = false;
    note.value = "";

    showApproveModal.value = false;
    getAllData();
  } else {
    loadingReject.value = true;
    const { _, response, error, __ } = await props.composables?.approveAdmin(
      Approve.value.id,
      false,
      note.value
    );
    loadingReject.value = false;
    note.value = "";
    showApproveModal.value = false;
    getAllData();
  }
};

const showLaunchDocumentsModal = ref(false);
const LaunchDocuments = ref();
const handlerLaunchDocuments = (item) => {
  useGeneralStore().certificate = item;
  return navigateTo("/certificate-of-conformity/launch-documents");
};

const showViewCargoLancModal = ref(false);
const ViewCargoLanc = ref();
const handlerViewCargoLanc = (item) => {
  showViewCargoLancModal.value = true;
  ViewCargoLanc.value = item;
};


const handlerReleaseDocuments = (item) => {
  return navigateTo(`/certificate-of-conformity/launch-documents?id=${item.id}`);
}


const handlerPDF = (item)=>{
  window.location.href = item.doc.fullUrl
}

</script>

<template>
  <UiModal v-if="modal" @close="modal = false" height="fit-content" width="fit-content">
    <p class="text-xl text-center font-medium">تصفية البحث</p>
    <br />
    <div class="flex flex-col gap-3 w-full">
      <div v-for="(item, index) in filter" :key="index" class="w-full" v-if="index != 0">
        <UiTextInput @keypress.enter="getAllData()" :placeholder="item.title" v-model:input="_filter[item.key]"
          class="bg-gray-50" />
        <br />
      </div>
      <br />
      <button class="btn btn-block" @click="getAllData()">البحث</button>
    </div>
  </UiModal>

  <UiModal height="fit-content" @close="showDeleteModal = false" v-if="showDeleteModal">
    <div class="flex flex-col items-center gap-2">
      <Icon name="clarity:remove-line" size="80" class="text-red-500" />
      <p class="text-lg font-medium">Do you want to delete This Item ?</p>
      <br />

      <div class="flex gap-2">
        <button v-if="!loadingDelete" class="btn px-7 bg-primary !opacity-100" @click="_handlerDelete">
          Delete
        </button>
        <button v-else class="btn px-7 cursor-not-allowed !opacity-50" disabled>
          Delete
          <Icon name="mdi:loading" class="animate-spin" />
        </button>
        <button class="btn px-7 bg-[#5C61F2]/10 text-primary font-medium" @click="showDeleteModal = false">
          Cancel
        </button>
      </div>
    </div>
  </UiModal>

  <UiModal height="fit-content" @close="showTransferToAdminModal = false" v-if="showTransferToAdminModal">
    <div class="flex flex-col items-center gap-2">
      <Icon name="material-symbols-light:info-outline" size="100" class="text-primary" />
      <p class="text-lg font-medium">
        Do you want to Transfer to Administration ?
      </p>
      <br />

      <div class="flex gap-2">
        <button v-if="!loadingDelete" class="btn px-7 bg-primary !opacity-100" @click="_handlerTrnasfer">
          Transfer
        </button>
        <button v-else class="btn px-7 cursor-not-allowed !opacity-50" disabled>
          Transfer
          <Icon name="mdi:loading" class="animate-spin" />
        </button>
        <button class="btn px-7 bg-[#5C61F2]/10 text-primary font-medium" @click="showTransferToAdminModal = false">
          Cancel
        </button>
      </div>
    </div>
  </UiModal>

  <UiModal class="!w-[500px]" height="fit-content" @close="showApproveModal = false" v-if="showApproveModal">
    <div class="flex flex-col items-center gap-2">
      <Icon name="material-symbols-light:info-outline" size="100" class="text-primary" />
      <p class="text-lg font-medium text-center">
        Are you sure you want to approve or reject the certificate?
      </p>
      <hr />
      <p class="text-sm text-center text-gray-400">
        You won't be able to retrieve this data after making the decision.
      </p>
      <br />

      <UiTextInput placeholder="Note" v-model:input="note" class="!w-80" />
      <br />

      <div class="flex gap-2">
        <button v-if="!loadingApprove" class="btn px-7 bg-green-500 !opacity-100" @click="_handlerApprove(0)">
          Approve
        </button>
        <button v-else class="btn px-7 cursor-not-allowed !opacity-50" disabled>
          Approve
          <Icon name="mdi:loading" class="animate-spin" />
        </button>

        <button v-if="!loadingReject" class="btn px-7 bg-red-500 !opacity-100" @click="_handlerApprove(1)">
          Reject
        </button>
        <button v-else class="btn px-7 cursor-not-allowed !opacity-50" disabled>
          Reject
          <Icon name="mdi:loading" class="animate-spin" />
        </button>
      </div>
    </div>
  </UiModal>

  <UiModal height="fit-content" @close="showPaymentModal = false" v-if="showPaymentModal">
    <div class="flex flex-col items-center gap-2">
      <Icon name="fluent:payment-20-regular" size="100" class="text-primary" />
      <p class="text-lg font-medium">Do you want to Payment ?</p>
      <br />
      <p v-if="useUserStore().user.role == 6" class="text-center text-sm">
        Amount Due to Office
        <span class="text-green-500 bg-green-50 text-center px-1 rounded-md">
          {{ formatPrice(Payment.officeTax) }}
        </span>
      </p>
      <p v-else class="text-center text-sm">
        Amount Due to Entry Point
        <span class="text-green-500 bg-green-50 text-center px-1 rounded-md">
          {{ formatPrice(Payment.entryTax) }}
        </span>
      </p>
      <br />

      <div class="flex gap-2">
        <button v-if="!loadingDelete" class="btn px-7 bg-primary !opacity-100" @click="_handlerPayment">
          Pay
        </button>
        <button v-else class="btn px-7 cursor-not-allowed !opacity-50" disabled>
          Pay
          <Icon name="mdi:loading" class="animate-spin" />
        </button>
        <button class="btn px-7 bg-[#5C61F2]/10 text-primary font-medium" @click="showPaymentModal = false">
          Cancel
        </button>
      </div>
    </div>
  </UiModal>

  <UiModal height="fit-content" width="80% !important" @close="showViewCargoLancModal = false"
    v-if="showViewCargoLancModal">
    <div class="flex flex-col items-center gap-2">
      <table dir="ltr" class="w-full px-2 text-sm text-left rtl:text-right text-primary">
        <thead class="text-sm font-light text-grayJUI bg-[#5C61F2]/5">
          <tr class="rounded-xl">
            <th>Name and Number</th>
            <th>Cargo Value</th>
            <th>Cargo Value in USD</th>
            <th>Description</th>
            <th>Cargo Count</th>
            <th>Insert Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in ViewCargoLanc.coc.cargos" :key="index"
            class="bg-white border-b text-black hover:bg-gray-100 transition-all">
            <td>{{ item.name }}</td>
            <td>{{ item.value }}</td>
            <td>{{ item.valueUsd }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.count }}</td>
            <td>{{ item.createdAt }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </UiModal>

  <div class="flex flex-row w-full items-center justify-between pb-3 gap-2" v-if="_filter">
    <div class="flex items-center gap-2">
      <div class="pt-2 flex gap-2 items-center mb-1 relative" dir="ltr">
        <slot name="buttons" />
        <button class="btn px-6 text-primary bg-[#5C61F2]/5 flex gap-2 items-center"
          @click="showColumnDropdown = !showColumnDropdown">
          <span>Column</span>
          <Icon name="circum:view-column" size="20" />
        </button>
        <Transition name="slide-down" dir="ltr">
          <div v-show="showColumnDropdown"
            class="bg-white flex flex-col gap-2 min-w-52 px-2 py-2 w-fit max-h-80 h-fit z-20 rounded-xl absolute shadow-xl top-14 ml-32 overflow-y-auto">
            <div v-for="(item, index) in tableData" :key="index"
              class="flex flex-row px-2 gap-2 justify-between py-2 items-center">
              <div class="flex checkbox checkbox-sm jui-btn cursor-pointer flex-row gap-2 items-center">
                <input type="checkbox" :id="`checkbox-${index}`" v-model="item.isShow"
                  class="!w-6 !h-6 text-center before:p-2 after:-p-1 after:-m-[3px] !rounded-lg hover:!shadow-none before:!bg-primary" />
                <label :for="`checkbox-${index}`" class="text-[15px] text-grayJUI cursor-pointer">{{ item.title }}
                </label>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <div v-if="filter.length > 2" class="flex gap-2 items-center mb-1">
        <div class="pt-2">
          <button class="btn px-6 text-primary bg-[#5C61F2]/5 flex gap-2 items-center" @click="modal = true">
            <span>Filter</span>
            <Icon name="mdi:filter-variant" size="20" />
          </button>
        </div>
      </div>

      <div v-if="filter.length >= 2" v-for="(item, index) in filter" :key="index" class="md:w-96 w-full">
        <div v-if="item.type == 'text'">
          <UITextInput @keypress.enter="getAllData()" :placeholder="item.title" v-model:input="_filter[item.key]" />
          <br />
        </div>
        <div v-else-if="item.type == 'select'">
          <UISelect @change="getAllData()" :placeholder="item.title" v-model:input="_filter[item.key]" />
          <br />
        </div>
      </div>
      <div v-else class="md:w-96 w-full">
        <!-- <UiSelect v-model:input="filter[0].key" :placeholder="filter[0].key" :data="filter[0].data" /> -->
        <UITextInput @keypress.enter="getAllData()" :placeholder="filter[0].title"
          v-model:input="_filter[filter[0].key]" class="!bg-[#E2E2E2]/10" />
        <br />
      </div>

      <div class="flex gap-1 items-center pt-1">
        <button v-if="isFilterEmpty" @click="resetFilter"
          class="btn flex gap-2 items-center px-6 bg-black/5 text-black">
          <span>الغاء</span>

          <Icon name="mdi:filter-variant-remove" size="20" />
        </button>
      </div>
    </div>

    <!-- <div class="relative">
            <div @click="isDrowdownRows = !isDrowdownRows"
                class="flex flex-row items-center gap-2 text-sm text-grayJUI jui-btn">
                الصفوف
                <Icon name="formkit:down" />
            </div>


            <div class="w-24 h-24 z-[45] left-3 absolute jui-shadow">
            </div>

        </div> -->
  </div>
  <div class="relative overflow-x-auto overflow-y-hidden w-full rounded-lg mytable" @mousedown="onMouseDown"
    @mouseup="onMouseUp" @mouseleave="onMouseLeave" @mousemove="onMouseMove" ref="scrollContainer">
    <table dir="ltr" class="w-full px-2 text-sm text-left rtl:text-right text-primary">
      <thead class="text-sm font-light text-grayJUI bg-[#5C61F2]/5">
        <tr class="rounded-xl">
          <th @click="handlerSort(index)" scope="col" class="px-3 py-3 jui-btn" v-for="(item, index) in tableData"
            :key="index" v-show="item?.isShow">
            <div class="flex font-medium text-nowrap flex-nowrap items-center gap-2">
              {{ item.title }}
              <Icon name="fluent:arrow-sort-20-regular" size="15" v-if="sortedColumn != index" />

              <Icon name="icon-park-outline:down" size="15" v-if="sortedColumn === index && sortCounter === 1" />
              <Icon name="icon-park-outline:up" size="15" v-if="sortedColumn === index && sortCounter === 2" />
            </div>
          </th>

          <th scope="col" class="px-6 py-3" v-if="!isFees">
            <span class="font-medium">Action</span>
          </th>
        </tr>
      </thead>
      <tbody v-if="!isLoading">
        <tr v-for="(item, index) in sortedData" :key="index"
          class="bg-white border-b text-black hover:bg-gray-100 transition-all">
          <td v-for="(_body, index) in tableData" :key="index" scope="row" v-show="_body?.isShow"
            class="px-6 py-4 font-medium text-[13px] text-black group transition-all">
            <span class="text-start">
              <span v-if="item[_body.key]?.length > 30"
                class="line-clamp-2 max-w-24 w-24 group-hover:max-w-fit group-hover:w-96 transition-all  overflow-hidden overflow-ellipsis">
                {{ getNestedValue(item, _body.key) || "لا يوجد" }}
              </span>

              <span v-else-if="_body.key == 'role'" class="line-clamp-2">
                <p v-for="(role, index) in Roles" :key="index"
                  class="text-primary bg-[#3521B5]/5 text-center px-1 rounded-md">
                  {{ role.value == item.role ? role.name : "" }}
                </p>
              </span>
              <span v-else-if="_body.key == 'itemImg.fullUrl'" class="line-clamp-2">
                <div class="max-12 max-h-12 rounded-xl">
                  <img :src="item.itemImg.fullUrl" alt="" />
                </div>
              </span>
              <span v-else-if="_body.key == 'paymentFor'" class="line-clamp-2">
                <p v-for="(payment, index) in PaymentMethod" :key="index"
                  class="text-primary bg-[#3521B5]/5 text-center px-1 rounded-md">
                  {{ payment.value + 1 == item.paymentFor ? payment.name : "" }}
                </p>
              </span>
              <span v-else-if="_body.key == 'productInformation.cargo'" class="line-clamp-2">
                <p v-for="(cargo, index) in CargoType" :key="index"
                  class="text-primary bg-[#3521B5]/5 text-center px-1 rounded-md">
                  {{
                    cargo.value == item.productInformation?.cargo
                      ? cargo.name
                      : ""
                  }}
                </p>
              </span>
              <span v-else-if="_body.key == 'status'" class="line-clamp-2">
                <p v-for="(status, index) in CertificateStatus" :key="index"
                  class="text-primary bg-[#3521B5]/5 text-center px-1 rounded-md">
                  {{ status.value == item?.status ? status.name : "" }}
                </p>
              </span>
              <span v-else-if="_body.key == 'coc.status' && !showPrintIcon" class="line-clamp-2">
                <p v-for="(status, index) in CertificateStatus" :key="index"
                  class="text-primary bg-[#3521B5]/5 text-center px-1 rounded-md">
                  {{ status.value == item?.coc.status ? status.name : "" }}
                </p>
              </span>
              <span v-else-if="_body.key == 'coc.status' && showPrintIcon" class="line-clamp-2">
                <p class="text-primary bg-[#3521B5]/5 text-center px-1 rounded-md">
                  Completed
                </p>
              </span>
              <span v-else-if="
                _body.key == 'createdAt' ||
                _body.key == 'issueDate' ||
                _body.key == 'assignedTo.createdAt' ||
                _body.key == 'expireDate'
              " class="line-clamp-2">
                {{ formatDate(getNestedValue(item, _body.key) || "Not Found") }}
              </span>

              <span v-else-if="_body.key == 'cocNo'">
                <p class="">
                  {{ getNestedValue(item, _body.key) || "-" }}
                </p>
              </span>
              <span v-else-if="_body.key?.startsWith('fees')" class="line-clamp-2">
                <!-- {{ _body.key }} -->
                <p class="text-green-500 bg-green-50 text-center px-1 rounded-md">
                  {{
                    formatPrice(getNestedValue(item, _body.key) || "Not Found")
                  }}
                </p>
              </span>

              <span v-else class="max-w-28 w-28 line-clamp-2">{{
                getNestedValue(item, _body.key)
              }}</span>
            </span>
          </td>

          <td class="py-4 text-center" v-if="isAuding">
            <div class="flex gap-2 justify-center">
              <div class="tooltip jui-btn" @click="handlerApprove(item)">
                <div class="tooltip-text">Approve</div>
                <div>
                  <Icon name="material-symbols-light:order-approve-outline" class="text-green-500" size="23" />
                </div>
              </div>
            </div>
          </td>
          <td class="py-4 text-center" v-if="!isFees && !isCertificate && !isRelease && !isAuding">
            <div class="flex gap-2 justify-center">
              <div class="tooltip jui-btn" @click="handlerDelete(item.id)">
                <div class="tooltip-text">Delete</div>
                <div>
                  <Icon name="basil:trash-outline" class="text-red-500" size="22" />
                </div>
              </div>
              <div class="tooltip jui-btn" @click="handlerEdit(item, body)" v-if="hasEditButton">
                <div class="tooltip-text">Edit</div>
                <div>
                  <Icon name="basil:edit-outline" class="text-[#969696]" size="22" />
                </div>
              </div>

              <slot />
            </div>
          </td>
          <td class="py-4 text-center" v-if="isCertificate">


            <div class="flex gap-2 justify-center">

              <div v-if="showPrintIcon" class="tooltip jui-btn" @click="handlerPDF(item)">
                <div class="tooltip-text">Print</div>
                <div>
                  <Icon name="fluent:print-32-light" class="text-primary" size="20" />
                </div>
              </div>


              <div class="tooltip jui-btn" @click="handlerInfo(item)" v-if="useUserStore().user.role != 3">
                <div class="tooltip-text">Info</div>
                <div>
                  <Icon name="material-symbols-light:info-outline" class="text-primary" size="22" />
                </div>
              </div>
              <div class="tooltip jui-btn" @click="handlerTrnasfer(item)" v-if="
                item.status == 0 &&
                useUserStore().user.role != 4 &&
                useUserStore().user.role != 3 &&
                !isNonConformityReports
              ">
                <div class="tooltip-text">Transfer to Administration</div>
                <div>
                  <Icon name="cil:transfer" class="text-primary" size="20" />
                </div>
              </div>
              <div class="tooltip jui-btn" @click="handlerPayment(item)" v-if="
                useUserStore().user.role == 6 &&
                item.officeTax != null &&
                item.officeTaxes == null
              ">
                <div class="tooltip-text">Payment</div>
                <div>
                  <Icon name="fluent:payment-20-regular" class="text-primary" size="20" />
                </div>
              </div>
              <div class="tooltip jui-btn" @click="handlerPayment(item)" v-if="
                useUserStore().user.role == 3 &&
                item.entryTax != null &&
                item.entryTaxes == null
              ">
                <div class="tooltip-text">Payment</div>
                <div>
                  <Icon name="fluent:payment-20-regular" class="text-primary" size="20" />
                </div>
              </div>
              <div class="tooltip jui-btn" @click="handlerApprove(item)" v-if="
                item.roleForAction != 3 &&
                item.status == 2 &&
                useUserStore().user.role == 6 &&
                item.officeTax != null &&
                item.officeTaxes != null
              ">
                <div class="tooltip-text">Approve</div>
                <div>
                  <Icon name="material-symbols-light:order-approve-outline" class="text-green-500" size="23" />
                </div>
              </div>
              <div class="tooltip jui-btn" @click="handlerApprove(item)" v-if="
                item.status == 2 &&
                useUserStore().user.role == 4 &&
                item.roleForAction == 4
              ">
                <div class="tooltip-text">Approve</div>
                <div>
                  <Icon name="material-symbols-light:order-approve-outline" class="text-green-500" size="23" />
                </div>
              </div>
              <div class="tooltip jui-btn" @click="handlerApprove(item)" v-if="
                item.status == 1 &&
                useUserStore().user.role == 5 &&
                item.actionReason == null
              ">
                <div class="tooltip-text">Approve</div>
                <div>
                  <Icon name="material-symbols-light:order-approve-outline" class="text-green-500" size="23" />
                </div>
              </div>
              <!-- <div class="tooltip jui-btn" @click="handlerTrnasfer(item)">
                                <div class="tooltip-text">Print</div>
                                <div>
                                    <Icon name="fluent:print-32-light" class="text-primary" size="20" />
                                </div>
                            </div> -->
              <div class="tooltip jui-btn" @click="handlerReCertificate(item)" v-if="
                item.type == 0 &&
                !isReCertificate &&
                item.status == 0 &&
                useUserStore().user.role != 4
              ">
                <div class="tooltip-text">Re-Certificate</div>
                <div>
                  <Icon name="basil:edit-outline" class="text-[#969696]" size="22" />
                </div>
              </div>
              <div class="tooltip jui-btn" @click="handlerReleaseDocuments(item)" v-if="useUserStore().user.role == 3">
                <div class="tooltip-text">Release Documents</div>
                <div>
                  <Icon name="ph:plus-thin" class="text-primary" size="22" />
                </div>
              </div>
              <div class="tooltip jui-btn" @click="handlerLaunchDocuments(item)" v-if="useUserStore().user.role == 3">
                <div class="tooltip-text">Info</div>
                <div>
                  <Icon name="material-symbols-light:info-outline" class="text-primary" size="22" />
                </div>
              </div>

              <slot />
            </div>
          </td>
          <td class="py-4 text-center" v-if="isRelease">
            <div class="flex gap-2 justify-center">
              <!-- PRINT LANC -->
              <div class="tooltip jui-btn" @click="handlerPDF(item)">
                <div class="tooltip-text">Print</div>
                <div>
                  <Icon name="fluent:print-32-light" class="text-primary" size="20" />
                </div>
              </div>
              <div class="tooltip jui-btn" @click="handlerViewCargoLanc(item)">
                <div class="tooltip-text">Cargos</div>
                <div>
                  <Icon name="ph:shipping-container-thin" class="text-primary" size="20" />
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Transition>
      <div v-show="isLoading" class="w-full justify-center flex">
        <UiLoading />
      </div>
    </Transition>
  </div>
  <br />

  <nav class="pagination pagination-primary flex flex-row-reverse">
    <ul class="flex items-center justify-center">
      <li class="prev" v-if="pageIndex > 1" @click="handlerPagination(pageIndex - 1)">
        <a href="#">Preview</a>
      </li>

      <li v-if="startPage > 1" class="flex items-center gap-2">
        <a href="#" @click="handlerPagination(1)">1</a>
        <span>...</span>
      </li>

      <li v-for="page in paginatedPages" :key="page" @click="handlerPagination(page)">
        <a href="#" class="px-1" :class="{ '!bg-primary !text-white': page === pageIndex }">{{ page }}</a>
      </li>

      <li v-if="endPage < data?.totalPages" class="flex items-center gap-2">
        <span>...</span>
        <a href="#" @click="handlerPagination(data?.totalPages)">{{
          data?.totalPages
        }}</a>
      </li>

      <li class="next" v-if="pageIndex < data?.totalPages" @click="handlerPagination(pageIndex + 1)">
        <a href="#">Next</a>
      </li>
    </ul>
  </nav>

  <ServiceAutoCRUD v-if="addFormModal" @create="handlerCreate" @close="handlerClose" :type="addForm?.type"
    :inputs="addForm?.inputs" :composables="addForm?.composables" :schema="addForm?.schema" :title="addForm?.title"
    :width="addForm?.width" />

  <ServiceAutoCRUD :editData="editData" v-if="showEditModal" @close="showEditModal = false" type="edit"
    :inputs="addForm?.inputs" @create="handlerCreate" :composables="addForm?.composables" :schema="addForm?.schema"
    title="Edit" :width="addForm?.width" />
</template>

<style scoped>
.active {
  cursor: grab;
  /* user-select: none; */
}

.scrolling {
  cursor: grabbing;
  user-select: none;
}

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

.slide-down-enter-active,
.slide-down-leave-active {
  transition: max-height 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  overflow: hidden;
}

.slide-down-enter-to,
.slide-down-leave-from {
  overflow: hidden;
}
</style>
