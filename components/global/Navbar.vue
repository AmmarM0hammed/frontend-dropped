<template>
    <div
        class="bg-white z-50  float-left shadow-navbar flex justify-between flex-row-reverse items-center md:w-[calc(100%_-_300px)] mx-2 rounded-xl mt-2 fixed px-5 h-16 ">
        <CommonBreadcrumbs />
        <div class="flex flex-row items-center gap-4">
            <NuxtLink to="#"
                class="bg-secondary jui-btn h-[45px] w-[45px] flex items-center justify-center rounded-2xl">
                <Icon name="ph:user" size="25" class="text-primary" />
            </NuxtLink>
            <NuxtLink to="#"
                class="bg-secondary jui-btn h-[45px] w-[45px] flex items-center justify-center rounded-2xl">
                <Icon name="icon-park-outline:setting-two" size="25" class="text-primary" />
            </NuxtLink>
            <NuxtLink to="#"
                class="bg-secondary jui-btn h-[45px] w-[45px] flex items-center justify-center rounded-2xl">
                <Icon name="hugeicons:notification-01" size="25" class="text-primary" />
            </NuxtLink>
        </div>

    </div>
</template>

<style scoped>
.shadow-navbar {
    box-shadow: 0px 1px 25px 1px rgba(0, 0, 0, .05);
}
</style>