<script setup>
import { ref } from 'vue';

const props = defineProps({
    title: {},
    icon: {},
    color: {},
})

const emit = defineEmits(['edit'])



const handlerMenu = (event) => {
    const menu = document.querySelector(`.context-${props.title.id}-${props.title.name}`);

    document.addEventListener('contextmenu', function (event) {
        if (event.target.closest(`.card-${props.title.id}-${props.title.name}`)) {
            event.preventDefault();

            var x = event.clientX + window.scrollX;
            var y = event.clientY + window.scrollY;
            menu.style.left = x + 'px';
            menu.style.top = y + 'px';

            menu.classList.remove('hidden');
            menu.classList.add('fade-in');
        }
    });

    document.addEventListener('click', function (event) {
        if (!event.target.closest(`.context-${props.title.id}-${props.title.name}`)) {
            menu.classList.add('fade-out');
            setTimeout(() => {
                menu.classList.add('hidden');
                menu.classList.remove('fade-in', 'fade-out');
            }, 300);
        }
    });
};

const handlerDropdown = () => {
    const menu = document.querySelector('.dropdown');
    menu.classList.remove('hidden');
    menu.classList.add('fade-in');

}

onMounted(() => {
    handlerMenu();
});


const showModal = ref(false)
</script>

<template>
    <UIModal v-if="showModal" @close="showModal = false">
        <p class="text-center text-xl font-medium">تفاصيل</p>
    </UIModal>
    <div :class="`context-${title.id}-${title.name}`"
        class=" hidden flex-col py-2 border-2 bg-white jui-shadow rounded-2xl border-gray-50 0 w-40 absolute h-fit text-center z-50">
        <div @click="emit('edit', title)"
            class="jui-btn text-lg items-center py-3 rounded-xl hover:bg-gray-100 justify-center flex gap-2 text-center text-primary">
            تعديل
            <Icon name="basil:edit-outline" size="20" />
        </div>
        <div
            class="jui-btn text-lg items-center py-3 rounded-xl hover:bg-gray-100 justify-center flex gap-2 text-center text-red-500">
            حذف
            <Icon name="hugeicons:delete-02" size="20" />
        </div>
    </div>

    <div @contextmenu.prevent="handlerMenu" :class="`card-${title.id}-${title.name}`" @click="showModal = true"
        class="flex flex-col border-2 relative border-gray-50 transition-all hover:border-primary gap-3 items-center p-5 justify-center w-40 h-40 jui-btn jui-shadow2 rounded-2xl ">
        <Icon :name="icon" size="55" class="text-primary" :class="color" />
        <p class="text-lg">{{ title?.name }}</p>
        <Icon name="charm:menu-kebab" size="17" class="text-gray-500 absolute h-6 top-4 right-4 jui-btn"
            @click="handlerDropdown" />
        <div
            class="top-9 dropdown hidden right-4 flex-col py-2 border-2 bg-white jui-shadow rounded-2xl border-gray-50 0 w-40 absolute h-fit text-center z-50">
            <div
                class="jui-btn text-lg items-center py-3 rounded-xl hover:bg-gray-100 justify-center flex gap-2 text-center text-primary">
                تعديل
                <Icon name="basil:edit-outline" size="20" />
            </div>
            <div
                class="jui-btn text-lg items-center py-3 rounded-xl hover:bg-gray-100 justify-center flex gap-2 text-center text-red-500">
                حذف
                <Icon name="hugeicons:delete-02" size="20" />
            </div>
        </div>
    </div>
</template>


<style scoped>
.context {
    opacity: 0;
    transition: opacity 0.3s ease;
}

.context.fade-in {
    opacity: 1;
}

.context.fade-out {
    opacity: 0;
}

.hidden {
    display: none;
}

.jui-shadow2 {
    /* box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, .04); */
}
</style>