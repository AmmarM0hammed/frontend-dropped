<script setup>

const emit = defineEmits(['update:input'])

const props = defineProps(['class', 'input', 'autoFocus', "title"])
const { input, placeholder, inputType, max, autoFocus, error } = toRefs(props)



const inputComputed = computed({
    get: () => input.value,
    set: (val) => emit('update:input', val)
})

</script>


<template>

    <div  class="flex flex-row items-center w-full  justify-end py-2 px-2 gap-3">
        <p class="text-textDefualt text-[15px]">{{ title }}</p>
        <div class="switch !pt-2 ">
            <input v-model="inputComputed" type="checkbox" id="check1" class="toggle before:!bg-primary">
        </div>

    </div>
</template>

<style scoped>
@import url("~/assets/css/jui.css");
</style>