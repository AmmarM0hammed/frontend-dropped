<script setup>

const isLoading = ref(false)
const user = useUser();

const data = ref([]);

const getAllData = async () => {


    isLoading.value = true;
    const { _, response, error, refresh } = await user.get();
    data.value = response.user;
    isLoading.value = false;

};


const userSelect = ref([])
onMounted(async () => {
    await getAllData()
    userSelect.value = data.value.map(e => ({
        key: e.name,
        value: e.id
    }));

})

const handlerDelete = async (id) => {
    isLoading.value = true;
    const { _, response, error, refresh } = await user.deletePoint(id);
    data.value = response;
    isLoading.value = false;
    getAllData()
}

const showAdd = ref(false)

const mapPostion = ref()
const getPostion = (postion) => {
    mapPostion.value = postion
}

const form = ref({
    id: '',
    point: 0,

})

const handlerAddPoint = async () => {


    isLoading.value = true;

    const formData = new FormData();
    formData.append('user_id', form.value.id);
    formData.append('points', form.value.point);

    try {
        const { _, response, error, refresh } = await user.addPoints(formData);

        showAdd.value = false;
        getAllData();
    } catch (err) {
        alert('An error occurred while adding the point.');
        console.error(err);
    } finally {
        isLoading.value = false;
    }
};


</script>

<template>
    <UIModal @close="showAdd = false" v-if="showAdd">

        <div class="w-full gap-2 text-center flex flex-col">
            {{ form }}
            <p class="text-center">Add Point</p>
            <UISelect placeholder="User" :data="userSelect" v-model:input="form.id" />
            <UITextInput placeholder="Point" v-model:input="form.point" />

            <br>
            <button v-if="!isLoading" class="btn bg-black" @click="handlerAddPoint">Save Point</button>
            <button v-else class="btn bg-black/50">Save Point .....</button>

        </div>
    </UIModal>


    <p class="text-3xl font-semibold">Points</p>

    <br>
    <button class="btn bg-black" @click="showAdd = true">Set Points</button>
    <br>
    <br>
    <table dir="ltr" class="w-full px-2 text-sm text-left rtl:text-right text-primary">
        <thead class="text-sm font-light text-grayJUI bg-[#5C61F2]/5">
            <tr class="rounded-xl text-center">
                <th scope="col" class="px-6 py-3">
                    <span class="font-medium">#</span>
                </th>
                <th scope="col" class="px-6 py-3">
                    <span class="font-medium">Name</span>
                </th>
                <th scope="col" class="px-6 py-3">
                    <span class="font-medium">Email</span>
                </th>
                <th scope="col" class="px-6 py-3">
                    <span class="font-medium">Points</span>
                </th>


                <th scope="col" class="px-6 py-3">
                    <span class="font-medium">Action</span>
                </th>
            </tr>
        </thead>
        <tbody v-if="!isLoading">
            <tr class="text-center text-md" v-for="(item, index) in data" :key="index">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>

                <td>{{ item.email }}</td>
                <td>
                    <div class="">
                        {{ item.point }}
                    </div>
                </td>
                <td>
                    <Icon @click="handlerDelete(item.id)" name="fluent:delete-28-regular"
                        class="text-red-500 text-2xl cursor-pointer jui-btn" />
                </td>
            </tr>
        </tbody>

        <div v-else>
            <div class="w-[1300px] h-96 items-center absolute justify-center flex ">
                <Icon name="mdi-light:loading" size="50" class="text-5xl animate-spin" />
            </div>
        </div>
    </table>

</template>


<style scoped></style>