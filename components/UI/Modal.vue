<script setup>

const emit = defineEmits(["close"]);

useHead({
  bodyAttrs: {
    class: "overflow-hidden"
  }
});


defineProps({
  height: {
    type: String,
    default: "500px",
  },
  width: {
    type: String,
    default: "24rem",
  }
})

onMounted(() => {
  document.querySelector('#bg-modal').classList.add("fadeIn")
  document.querySelector('#modal').classList.add("fadeIn")
  document.querySelector('#modal').classList.add("scaleIn")
})

const handlerClose = () => {


  document.querySelector('#bg-modal').classList.add("fadeOut")
  document.querySelector('#modal').classList.add("scaleOut")

  setTimeout(() => {
    emit('close')
  }, 200)

}



</script>

<template>



  <div id="bg-modal" @click="handlerClose"
    class="fixed  left-0 top-0 z-[65] overflow-y-hidden w-full h-full bg-black bg-opacity-50 flex flex-row justify-center items-center">

  </div>

  <div class="fixed w-[100vw] left-0 h-screen  top-0 z-[65] flex flex-row items-center justify-center">
    <div id="modal" :style="{ height: height, width: width }"
      class="fixed overflow-auto z-[70] p-5 rounded-3xl bg-white  max-h-[95vh]">
      <Icon name="ep:close" size="25px" class="cursor-pointer jui-btn" @click="handlerClose" />
      <div class="py-5 relative">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>






.fadeIn {
  animation: fadeIn 0.2s ease-in-out;
}

.scaleIn {
  animation: scaleIn 0.2s ease-in-out;
}


@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(.5);
  }

  to {
    transform: scale(1);

  }
}

.fadeOut {
  animation: fadeOut 0.2s ease-in-out;
}

.scaleOut {
  animation: scaleOut 0.2s cubic-bezier(0.075, 0.82, 0.165, 1) forwards;

}


@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@keyframes scaleOut {
  from {
    /* transform: scale(1); */
    opacity: 1;

  }

  to {
    transform: scale(.5);
    opacity: 0;

  }
}
</style>