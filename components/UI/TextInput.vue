<template>
    <div dir="rtl">

        <p v-if="label" class="text-start text-sm text-zinc-500">{{ placeholder }}</p>
        <input :id="`input-${placeholder}`" :placeholder="placeholder" class="block mt-2 dark:bg-background bg-gray-100 dark:text-white  w-full bg-input py-3 rounded-xl text-sm px-4 transition-all  
              border-transparent border-2 hover:border-primary focus:border-primary outline-none
            " :class="class" :type="inputType" v-model="inputComputed" autocomplete="off" :maxlength="max">
        <p v-if="error" class="text-red-400 text-[14px] font-medium w-full text-start pt-2 px-2">
            {{ error }}
        </p>
    </div>

</template>

<script setup>
const emit = defineEmits(['update:input'])

const props = defineProps({
    class: {
        type: String,
        default: '',
    },
    input: {
        type: Object,
        required: true,
    },
    placeholder: {
        type: String,
        default: '',
    },
    inputType: {
        type: String,
        default: 'text',
    },
    max: {
        type: Number,
        default: null,
    },
    autoFocus: {
        type: Boolean,
        default: false,
    },
    error: {
        type: String,
        default: '',
    },
    label: {
        type: [Boolean],
        default: true,
    },
});
const { input, placeholder, inputType, max, autoFocus, error } = toRefs(props)

onMounted(() => {
    if (autoFocus.value) {
        document.getElementById(`input-${placeholder.value}`).focus()
    }
})

const inputComputed = computed({
    get: () => input.value,
    set: (val) => emit('update:input', val)
})
</script>