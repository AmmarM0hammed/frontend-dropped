<template>
  <div dir="rtl">
    <p  class=" text-sm text-zinc-500">{{ placeholder }}</p>

      <select  :id="`input-${placeholder}`" :placeholder="placeholder" class="block mt-2 dark:bg-background bg-gray-100 dark:text-white  w-full bg-input py-3 rounded-xl text-sm px-4 transition-all  
            border-transparent border-2 hover:border-primary focus:border-primary outline-none
          " :class="class" :type="inputType" v-model="inputComputed"  :maxlength="max">
          <option selected value="test" >{{ placeholder }}</option>



          <option  v-for="(item, index) in data" :key="index" :value="item.value" >
            {{ item.key }}
          </option>

      </select>
      <p v-if="error" class="text-red-400 text-[14px] font-medium w-full text-start pt-2 px-2">
          {{ error }}
      </p>
  </div>

</template>

<script setup>
const emit = defineEmits(['update:input'])

const props = defineProps(['class', 'input', 'placeholder', 'inputType', 'max', 'autoFocus', 'error','data'])
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