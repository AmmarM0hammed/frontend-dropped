<script setup>

const isLoading = ref(false)
const coupon = useCoupon();

const data = ref([]);

const getAllData = async () => {


    isLoading.value = true;
    const { _, response, error, refresh } = await coupon.get();
    data.value = response;
    isLoading.value = false;

};

onMounted(() => {
    getAllData()
})


const handlerDelete = async (id) => {
    isLoading.value = true;
    const { _, response, error, refresh } = await coupon.deletePoint(id);
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
    title: '',
    price: 0,
    images: null,
})

const handlerAddPoint = async () => {
  

    isLoading.value = true;

    const formData = new FormData();
    formData.append('title', form.value.title);
    formData.append('price', form.value.price);
    formData.append('images', form.value.images); 

    try {
        const { _, response, error, refresh } = await coupon.addPoint(formData);  
     
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

    <UIModal  @close="showAdd = false" v-if="showAdd">
      
        <div class="w-full gap-2 text-center flex flex-col">
            <p class="text-center">Add Store</p>
            <UITextInput placeholder="Title" v-model:input="form.title" />
            <UITextInput placeholder="Price" v-model:input="form.price" input-type="number" />
            <UITextInput placeholder="Image" input-type="file" v-model:input="form.image" @change="e => form.images = e.target.files[0]" />
        
            <button v-if="!isLoading"   class="btn bg-black" @click="handlerAddPoint">Save Store</button>
            <button v-else  class="btn bg-black/50" >Save Store .....</button>

        </div>
    </UIModal>


    <p class="text-3xl font-semibold">Store</p>

    <br>
    <button class="btn bg-black" @click="showAdd = true">Add Store</button>
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
                    <span class="font-medium">Price</span>
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
                        <a :href="`http://185.218.125.120:6901/${item.images}`" target="_blank">
                            <img :src="`http://185.218.125.120:6901/${item.images}`" alt="">
                        </a>
                    </div>
                </td>
                <td>{{ item.title }}</td>
                <td>{{ item.price }}</td>
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