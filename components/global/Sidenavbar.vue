
<script setup>

const links = ref([
    {title : "ملخص النظام" , icon : "icon-park-outline:system" , path:'/' },
    {title : "ادارة المنظومة" , icon : "solar:display-linear" , path:'/system-management' },
    // {title : "ادارة الاجهزة" , icon : "ph:devices-light",path:"/device" },
    {title : "ادارة المناطق" , icon : "ic:outline-place",path:"/region" },
    {title : "الشركات" , icon : "f7:building-2",path:"/company" },
    {title : "ادارة المستخدمين" , icon : "ph:users" , path:'/users' },
    {title : "ادارة الفواتير" , icon : "uil:bill" },
    {title : "تسجيل الخروج" , icon : "mdi-light:logout" },

    
])


</script>

<template>

    <div class="w-[270px] bg-primary fixed h-screen right-0">
        <div class="flex flex-col items-center py-8  w-full">
            <div class="logo flex justify-end px-10 items-center w-full gap-2">
                <p class="font-medium text-white text-xl">ادارة التحكم</p>
                <img src="~/assets/images/logo.svg" class="w-12 h-12"/>
            </div>
            <br>
        
            
            <div class="menu flex flex-col gap-2 w-full px-2">
                <NuxtLink :to="item.path" v-for="(item, index) in links" :key="index" class="text-white py-4 rounded-2xl jui-btn flex justify-end items-center gap-5 px-8 hover:bg-opacity-15 hover:bg-black"
                :class="useRoute().fullPath === item.path ? 'bg-opacity-15 bg-black' :'' "
                >
                    <p class="text-md">{{item.title}}</p>
                    <Icon :name="item.icon" size="25" />
                </NuxtLink>
            </div>
        </div>
    </div>

</template>