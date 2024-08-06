<script setup>

const id = useRoute().params.id;
const data = ref([])
const getAllData = async () => {
    const { _, response, error, refresh } = await useSmartMeters().getByID(id);
    data.value = response.result;
}
onMounted(() => {
    // getAllData()

    data.value = useSmartMetersStore().data
})
</script>

<template>
    <br>

    <div class="w-full py-6 px-5  rounded-2xl   h-fit ">
        <div class="flex flex-col  justify-start gap-3" dir="rtl">
            <div class="flex flex-row items-start gap-3">
                <Icon name="teenyicons:screen-outline" size="20" class="text-primary" />
                <p class="text-lg font-medium">{{ data.name }}</p>
            </div>

            <br>

            <div class="flex bg-white jui-shadow p-5 rounded-xl flex-row items-center justify-between px-12 gap-12 w-full ">
                <div class="flex flex-col justify-center items-center gap-3 w-fit">
                    <p class="text-md font-medium  ">نوع الاتصال</p>
                    <span class="border  w-full"></span>
                    <p class="text-sm font-medium  ">{{data.connactionType || "لا يوجد"}}</p>

                </div>

                <div class="flex flex-col justify-center items-center gap-3 w-fit">
                    <p class="text-md font-medium  ">التصنيف</p>
                    <span class="border  w-full"></span>
                    <p class="text-sm font-medium  ">{{data.classify || "لا يوجد"}}</p>

                </div>

                <div class="flex flex-col justify-center items-center gap-3 w-fit">
                    <p class="text-md font-medium  ">الشركة</p>
                    <span class="border  w-full"></span>
                    <p class="text-sm font-medium  ">{{data.company?.name || "لا يوجد"}}</p>

                </div>
                <div class="flex flex-col justify-center items-center gap-3 w-fit">
                    <p class="text-md font-medium  ">المحافظة</p>
                    <span class="border  w-full"></span>
                    <p class="text-sm font-medium  ">{{data.governorate?.name || "لا يوجد"}}</p>

                </div>
                <div class="flex flex-col justify-center items-center gap-3 w-fit">
                    <p class="text-md font-medium  ">المدينة</p>
                    <span class="border  w-full"></span>
                    <p class="text-sm font-medium  ">{{data.city?.name || "لا يوجد"}}</p>

                </div>
                <div class="flex flex-col justify-center items-center gap-3 w-fit">
                    <p class="text-md font-medium  ">المستخدم</p>
                    <span class="border  w-full"></span>
                    <p class="text-sm font-medium  ">{{data.customer?.name || "لا يوجد"}}</p>

                </div>
            </div>


            <br>

            <div class="flex flex-row bg-white jui-shadow p-5 rounded-xl items-center justify-between px-12 w-full ">
                <div class="flex flex-col justify-center items-center gap-3 w-fit">
                    <p class="text-md font-medium  ">وحدة التجميع</p>
                    <span class="border  w-full"></span>
                    <p class="text-sm font-medium  ">{{data.dataCollectionUnit?.name || "لا يوجد"}}</p>

                </div>

                <div class="flex flex-col justify-center items-center gap-3 w-fit">
                    <p class="text-md font-medium  ">تعريف الجهاز</p>
                    <span class="border  w-full"></span>
                    <p class="text-sm font-medium  ">{{data.deviceIdentification?.name || "لا يوجد"}}</p>

                </div>

                <div class="flex flex-col justify-center items-center gap-3 w-fit">
                    <p class="text-md font-medium  ">الجهاز</p>
                    <span class="border  w-full"></span>
                    <p class="text-sm font-medium  ">{{data.deviceModel?.name || "لا يوجد"}}</p>

                </div>
                <div class="flex flex-col justify-center items-center gap-3 w-fit">
                    <p class="text-md font-medium  ">حالة الجهاز</p>
                    <span class="border  w-full"></span>
                    <p class="text-sm font-medium  ">{{data.deviceStatus || "لا يوجد"}}</p>

                </div>
                <div class="flex flex-col justify-center items-center gap-3 w-fit">
                    <p class="text-md font-medium  ">نوع الجهاز</p>
                    <span class="border  w-full"></span>
                    <p class="text-sm font-medium  ">{{data.deviceType || "لا يوجد"}}</p>

                </div>
              
            </div>

            <br>

            <div class="flex flex-row bg-white jui-shadow p-5 rounded-xl items-center justify-between px-12 w-full ">
                <div class="flex flex-col justify-center items-center gap-3 w-fit">
                    <p class="text-md font-medium  ">المنزل</p>
                    <span class="border  w-full"></span>
                    <p class="text-sm font-medium  ">{{data.house || "لا يوجد"}}</p>

                </div>

                <div class="flex flex-col justify-between px-12 items-center gap-3 w-fit">
                    <p class="text-md font-medium  ">المحلة</p>
                    <span class="border  w-full"></span>
                    <p class="text-sm font-medium  ">{{data.mahalla || "لا يوجد"}}</p>

                </div>

                <div class="flex flex-col justify-between  items-center gap-3 w-fit">
                    <p class="text-md font-medium  ">الشارع</p>
                    <span class="border  w-full"></span>
                    <p class="text-sm font-medium  ">{{data.street || "لا يوجد"}}</p>

                </div>
                <div class="flex flex-col justify-between  items-center gap-3 w-fit">
                    <p class="text-md font-medium  ">المنشأ</p>
                    <span class="border  w-full"></span>
                    <p class="text-sm font-medium  ">{{data.origin?.name || "لا يوجد"}}</p>

                </div>
               
            </div>
            <br>

            <div class="flex flex-row bg-white jui-shadow p-5 rounded-xl items-center justify-between px-12 w-full ">
                <div class="flex flex-col justify-center items-center gap-3 w-fit">
                    <p class="text-md font-medium  ">محطة الجهد المنخفض</p>
                    <span class="border  w-full"></span>
                    <p class="text-sm font-medium  ">{{data.lowVoltageStation?.name || "لا يوجد"}}</p>

                </div>

                <div class="flex flex-col justify-between px-12 items-center gap-3 w-fit">
                    <p class="text-md font-medium  ">الرقم المرجعي</p>
                    <span class="border  w-full"></span>
                    <p class="text-sm font-medium  ">{{data.referenceNumber|| "لا يوجد"}}</p>

                </div>

                <div class="flex flex-col justify-center items-center gap-3 w-fit">
                    <p class="text-md font-medium  ">الرقم</p>
                    <span class="border  w-full"></span>
                    <p class="text-sm font-medium  ">{{data.serialNumber || "لا يوجد"}}</p>

                </div>
              
              
            </div>

            <br>
            <div class="flex flex-row bg-white jui-shadow p-5 rounded-xl items-center justify-between px-12 w-full ">
                <div class="flex flex-col justify-center items-center gap-3 w-fit">
                    <p class="text-md font-medium  ">المنزل</p>
                    <span class="border  w-full"></span>
                    <p class="text-sm font-medium  ">{{data.house || "لا يوجد"}}</p>

                </div>

                <div class="flex flex-col justify-center items-center gap-3 w-fit">
                    <p class="text-md font-medium  ">المحلة</p>
                    <span class="border  w-full"></span>
                    <p class="text-sm font-medium  ">{{data.mahalla || "لا يوجد"}}</p>

                </div>

                <div class="flex flex-col justify-center items-center gap-3 w-fit">
                    <p class="text-md font-medium  ">الشارع</p>
                    <span class="border  w-full"></span>
                    <p class="text-sm font-medium  ">{{data.street || "لا يوجد"}}</p>

                </div>
                <div class="flex flex-col justify-center items-center gap-3 w-fit">
                    <p class="text-md font-medium  ">المنشأ</p>
                    <span class="border  w-full"></span>
                    <p class="text-sm font-medium  ">{{data.origin?.name || "لا يوجد"}}</p>

                </div>
               
            </div>


        </div>
    </div>

</template>