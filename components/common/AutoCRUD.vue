<script setup>

const props = defineProps({
    type: String,
    inputs: Array,
    composables: {},
    schema: {},
    title: String,
    width: {
        type: Number,
        default: 'fit-content'
    },
    editData: {}
})

const emit = defineEmits(['close', 'create']);

const data = ref({})

const getInitialValue = (type) => {
    switch (type) {
        case 'text':
        case 'select':
        case 'image':
        case 'password':
        case 'date':
            return '';
        case 'checkbox':
            return false;
        case 'number':
            return null;
        default:
            return null;
    }
};

const selectData = ref({})

onMounted(async () => {
    // Initialize data for each input
    props.inputs.forEach(input => {
        data.value[input.key] = getInitialValue(input.type);
    });

    // Process select inputs
    for (const input of props.inputs) {
        if (input.type == "select") {
            if (!Array.isArray(input.data)) {
                var inputData = [];
                const { _, response, error, __ } = await input.data?.get({ Name: '' }, 1, 1000);

                for (let index = 0; index < response?.result.length; index++) {
                    inputData.push({
                        key: response?.result[index].name,
                        value: response?.result[index].id,
                    });
                }

                selectData.value[input.key] = inputData;
            } else {
                selectData.value[input.key] = input.data;
            }
        }
    }

    // If editing, populate data with existing values
    if (props.type == 'edit') {
        props.inputs.forEach(input => {
            data.value[input.key] = props.editData[input.key];
        });
    }
});
const errors = ref()
const isLoading = ref(false)
const handlerAdd = async () => {
    if (props.type == 'add') {
        const result = props.schema.safeParse(data.value)
        if (!result.success) {
            console.log(result.error.format())
            errors.value = result.error.format();
            return;
        }
        isLoading.value = true;
        await props.composables.create(data.value)
        errors.value = ''
        isLoading.value = false;

        emit('close')
        emit('create')
    }
    else {
        const result = props.schema.safeParse(data.value)
        if (!result.success) {

            errors.value = result.error.format();
            return;
        }
        isLoading.value = true;
        await props.composables.update(data.value, props?.editData.id)
        errors.value = ''
        isLoading.value = false;

        emit('close')
        emit('create')
    }



}


</script>

<template>
    <UIModal height="fit-content" @close="$emit('close')">

        <p class="text-textDefault text-xl text-center">{{ title }}</p>
        <div class="flex flex-col space-y-4 py-2 w-full">
            <div class="w-full " v-for="(item, index) in inputs" :key="index">
                <div v-if="item.type == 'text'">
                    <UITextInput :placeholder="item.title" v-model:input="data[item.key]"
                        :error="(errors && errors[item.key]) ? errors?.[item.key]._errors[0] : ''" />
                </div>
                <div v-else-if="item.type == 'password'">
                    <UITextInput input-type="password" :placeholder="item.title" v-model:input="data[item.key]"
                        :error="(errors && errors[item.key]) ? errors?.[item.key]._errors[0] : ''" />
                </div>
                <div v-else-if="item.type == 'select'">
                    <UISelect :error="(errors && errors[item.key]) ? errors?.[item.key]._errors[0] : ''"
                        :placeholder="item.title" :data="selectData[item.key]" :options="item.composables"
                        v-model:input="data[item.key]" />

                </div>
                <div v-else-if="item.type == 'checkbox'">

                    <div class="switch flex items-center gap-2  justify-end">
                        <p class="text-sm">{{item.title}}</p>
                        <input v-model="data[item.key]" type="checkbox" id="check1" class="toggle">
                    </div>
                </div>
                <div v-else-if="item.type == 'number'">
                    <UITextInput input-type="number" :placeholder="item.title" v-model:input="data[item.key]"
                        :error="(errors && errors[item.key]) ? errors?.[item.key]._errors[0] : ''" />
                    <!-- <UINumberInput :placeholder="item.title" v-model="data[item.key]" /> -->
                </div>
                <div v-else-if="item.type == 'image'">
                    image
                    <!-- <UIImageInput :label="item.title" v-model="data[item.key]" :multiple="item.isMultiple" /> -->
                </div>
                <div v-else-if="item.type == 'date'">
                    <UITextInput input-type="date" :placeholder="item.title" v-model:input="data[item.key]"
                    :error="(errors && errors[item.key]) ? errors?.[item.key]._errors[0] : ''" />
                </div>
            </div>

            <br>
            <button v-if="!isLoading" @click="handlerAdd()" class="btn btn-block text-sm">
                {{ type == 'add' ? 'اضافة' : 'تعديل' }}
            </button>
            <button v-else class="btn btn-block text-sm">
                <Icon name="mdi:loading" size="22" class="text-white animate-spin" />
            </button>
        </div>
    </UIModal>
</template>

<style scoped>
.switch input[type=checkbox] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
}

.switch input[type=checkbox]:focus {
    outline: 0;
}

.switch .toggle {
    height: 30px;
    width: 53px;
    border-radius: 15px;
    position: relative;
    overflow: hidden;
    background: #E4E7E8;
    transition: all, 0.2s ease-in-out;
}

.switch .toggle:active {
    transform: scale(95%);
}

.switch .toggle:active {
    transform: scale(95%);
}

.switch .toggle:after {
    content: "";
    position: absolute;
    top: 50%;
    transform: translate(2px, -50%);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: white;
    transition: all, 0.2s ease-in-out;
}

.switch .toggle::before {
    content: "";
    position: absolute;
    width: inherit;
    height: inherit;
    background-color: rgba(91, 88, 230,1);
    top: 0;
    left: -100%;
    transition: all, 0.2s ease-in-out;
}

.switch .toggle:checked::before {
    left: 0;
}

.switch .toggle:checked:after {
    transform: translate(27px, -50%);
}
</style>