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

onMounted(() => {
    getAllData()
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
    name: '',
    email: '',
    password: '',
    role: 0,
})

const handlerAddPoint = async () => {


    isLoading.value = true;

    const formData = new FormData();
    formData.append('name', form.value.name);
    formData.append('email', form.value.email);
    formData.append('password', form.value.password);
    formData.append('role', form.value.role);

    try {
        const { _, response, error, refresh } = await user.create(formData);

        showAdd.value = false;
        getAllData();
    } catch (err) {
        alert('An error occurred while adding the point.');
        console.error(err);
    } finally {
        isLoading.value = false;
    }
};

watch(() => mapPostion.value, () => {
    form.value.latitud = mapPostion.value.lat
    form.value.longitud = mapPostion.value.lng
})
</script>

<template>

    <UIModal @close="showAdd = false" v-if="showAdd">

        <div class="w-full gap-2 text-center flex flex-col">
            <p class="text-center">Add Store</p>
            <UITextInput placeholder="Name" v-model:input="form.name" />
            <UITextInput placeholder="Email" v-model:input="form.email" input-type="email" />
            <UITextInput placeholder="Password" input-type="password" v-model:input="form.password" />

            <button v-if="!isLoading" class="btn bg-black" @click="handlerAddPoint">Save User</button>
            <button v-else class="btn bg-black/50">Save User .....</button>

        </div>
    </UIModal>


    <p class="text-3xl font-semibold">Users</p>

    <br>
    <button class="btn bg-black" @click="showAdd = true">Add Users</button>
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