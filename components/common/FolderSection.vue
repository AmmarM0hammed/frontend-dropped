<script setup>

defineProps({
    title: {},
    iconFolder: {},
    iconColor: {},
    data: {}
})

const emit = defineEmits(['edit'])


const handlerEdit = (item)=>{
    emit('edit',item)
}

</script>


<template>
    <div dir="rtl" class="pl-3">
        <slot /><br>
        <div class="w-full py-6 px-5  rounded-2xl bg-white min-h-96 h-fit jui-shadow">
            <div class="flex flex-row items-center justify-between gap-3">
                <div class="flex flex-row items-center gap-3">
                    <Icon name="teenyicons:screen-outline" size="20" class="text-primary" />
                    <p class="text-lg font-medium">{{ title }}</p>
                </div>


            </div>
            <div class="flex justify-center pt-5">
                <hr width="90%">
            </div>


            <br>

            <div class="flex gap-5 flex-wrap">
                <UIFolderCard @edit="(_data)=>handlerEdit(_data)" :title="item" v-for="(item, index) in data" :key="index"
                    :icon="iconFolder" :color="iconColor" />
            </div>



        </div>
    </div>


</template>