
<script setup>

const links = ref([
    {title : "Points" , icon : "tdesign:location" , path:'/' },
    {title : "Store" , icon : "hugeicons:coupon-percent" , path:'/coupons' },
    {title : "Users" , icon : "ph:user" , path:'/users' },
    {title : "Points" , icon : "ph:coin-light" , path:'/points' },
    {title : "Logout" , icon : "mdi-light:logout" , path:'/logout' },
])


</script>

<template>

    <div dir="ltr" class="z-50 w-[270px] bg-white shadow-xl fixed h-screen left-0">
        <div dir="ltr" class="flex flex-col items-center py-8  w-full">
            <div class="logo flex flex-row-reverse justify-end px-10 items-center w-full gap-2">
                <p class="font-medium text-black text-xl">Dashboard</p>
                <img src="~/assets/images/logo.png" class="w-12 h-12"/>
            </div>
            <br>
        
            
            <div class="menu flex flex-col gap-1 w-full px-2">
                <NuxtLink :to="item.path" v-for="(item, index) in links" :key="index" class="text-black py-4 rounded-2xl jui-btn flex flex-row-reverse justify-end items-center gap-5 px-8 hover:bg-opacity-15 hover:bg-black"
                :class="useRoute().fullPath === item.path ? 'bg-opacity-15 bg-black' :'' "
                >
                    <p class="text-md">{{item.title}}</p>
                    <Icon :name="item.icon" size="25" />
                </NuxtLink>
            </div>
        </div>
    </div>

</template>