<script setup>

const isLoading = ref(false)
const points = usePoints();

const data = ref([]);

const getAllData = async () => {


    isLoading.value = true;
    const { _, response, error, refresh } = await points.get();
    data.value = response;
    isLoading.value = false;

};

onMounted(() => {
    getAllData()
})


const handlerDelete = async (id) => {
    isLoading.value = true;
    const { _, response, error, refresh } = await points.deletePoint(id);
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
    latitud: null,
    longitud: null,
    title: '',
    description: '',
    link: '',
    images: null,
})

const handlerAddPoint = async () => {
  

    isLoading.value = true;

    const formData = new FormData();
    formData.append('title', form.value.title);
    formData.append('description', form.value.description);
    formData.append('link', form.value.link);
    formData.append('latitude', mapPostion.value.lat);
    formData.append('longitude', mapPostion.value.lng);
    formData.append('image', form.value.images); 

    try {
        const { _, response, error, refresh } = await points.addPoint(formData);  
     
            showAdd.value = false;
            getAllData();
    } catch (err) {
        alert('An error occurred while adding the point.');
        console.error(err);
    } finally {
        isLoading.value = false;
    }
};

watch(()=> mapPostion.value , ()=>{
    form.value.latitud = mapPostion.value.lat
    form.value.longitud = mapPostion.value.lng
})
</script>

<template>

    <UIModal height="90%" @close="showAdd = false" v-if="showAdd">
      
        <div class="w-full gap-2 text-center flex flex-col">
            <p class="text-center">Add Point</p>
            <UITextInput placeholder="Title" v-model:input="form.title" />
            <UITextInput placeholder="Description" v-model:input="form.description" />
            <UITextInput placeholder="Link" v-model:input="form.link" />
            <UITextInput placeholder="Image" input-type="file" v-model:input="form.image" @change="e => form.images = e.target.files[0]" />
            <div class="map">
                <CommonMap @postion="getPostion" :lat="form.latitud" :lng="form.longitud" />
            </div>
            <button v-if="!isLoading"   class="btn bg-black" @click="handlerAddPoint">Save Point</button>
            <button v-else  class="btn bg-black/50" >Save Point .....</button>

        </div>
    </UIModal>


    <p class="text-3xl font-semibold">Points</p>

    <br>
    <button class="btn bg-black" @click="showAdd = true">Add Point</button>
    <br>
    <br>
    <table dir="ltr" class="w-full px-2 text-sm text-left rtl:text-right text-primary">
        <thead class="text-sm font-light text-grayJUI bg-[#5C61F2]/5">
            <tr class="rounded-xl text-center">
                <th scope="col" class="px-6 py-3">
                    <span class="font-medium">#</span>
                </th>
                <th scope="col" class="px-6 py-3">
                    <span class="font-medium">Image</span>
                </th>
                <th scope="col" class="px-6 py-3">
                    <span class="font-medium">Title</span>
                </th>
                <th scope="col" class="px-6 py-3">
                    <span class="font-medium">Description</span>
                </th>
                <th scope="col" class="px-6 py-3">
                    <span class="font-medium">Link</span>
                </th>
                <th scope="col" class="px-6 py-3">
                    <span class="font-medium">Action</span>
                </th>
            </tr>
        </thead>
        <tbody v-if="!isLoading">
            <tr class="text-center text-md" v-for="(item, index) in data" :key="index">
                <td>{{ item.id }}</td>
                <td>
                    <div class="w-12 h-12">
                        <a :href="`http://185.218.125.120:6901/${item.image}`" target="_blank">
                            <img :src="`http://185.218.125.120:6901/${item.image}`" alt="">
                        </a>
                    </div>
                </td>
                <td>{{ item.title }}</td>
                <td>{{ item.description }}</td>
                <td><a :href="item.link" target="_blank">LINK</a></td>
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