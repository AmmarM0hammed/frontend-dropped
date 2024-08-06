<script setup>
import { ref } from 'vue';

const props = defineProps({
    data: {},
    icon: {},
    color: {},
})

const emit = defineEmits(['edit', 'delete','view'])



const handlerMenu = (event) => {
    const menu = document.querySelector(`.context-${props.data.id}-${name.value}`);

    document.addEventListener('contextmenu', function (event) {
        if (event.target.closest(`.card-${props.data.id}-${name.value}`)) {
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
        if (!event.target.closest(`.context-${props.data.id}-${name.value}`)) {
            menu.classList.add('fade-out');
            setTimeout(() => {
                menu.classList.add('hidden');
                menu.classList.remove('fade-in', 'fade-out');
            }, 5);
        }
    });
};

const handlerDropdown = () => {
    const menu = document.querySelector('.dropdown');
    menu.classList.remove('hidden');
    menu.classList.add('fade-in');

}

const name = ref('')

onMounted(() => {
    name.value = props.data.name.replace(/\s+/g, '');
    handlerMenu();
});


const showModal = ref(false)

const handlerView = (data)=>{
    emit('view',data)
}
</script>

<template>
 
    <div :class="`context-${data.id}-${name}`"
        class=" hidden flex-col py-2 border-2 bg-white jui-shadow rounded-2xl border-gray-50 0 w-40 absolute h-fit text-center z-50">
        <div @click="emit('edit', data)"
            class="jui-btn text-lg items-center py-3 rounded-xl hover:bg-gray-100 justify-center flex gap-2 text-center text-primary">
            تعديل
            <Icon name="basil:edit-outline" size="20" />
        </div>
        <div @click="emit('delete', data.id)"
            class="jui-btn text-lg items-center py-3 rounded-xl hover:bg-gray-100 justify-center flex gap-2 text-center text-red-500">
            حذف
            <Icon name="hugeicons:delete-02" size="20" />
        </div>
    </div>

    <div @contextmenu.prevent="handlerMenu" :class="`card-${data.id}-${name}`" @click="handlerView(data)"
        class="flex flex-col border-2 relative border-gray-50 transition-all hover:border-primary gap-3 items-center p-5 justify-center w-40 h-40 jui-btn jui-shadow2 rounded-2xl ">
        <Icon :name="icon" size="55" class="text-primary" :class="color" />
        <p class="text-lg text-center">{{ data?.name }}</p>
        <Icon name="charm:menu-kebab" size="17" class="text-gray-500 absolute h-6 top-4 right-4 jui-btn" />
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