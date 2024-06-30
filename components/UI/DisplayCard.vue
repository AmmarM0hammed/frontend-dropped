<script setup>

defineProps({
    class: {},
})

</script>

<template>
    <div class="relative w-96 h-96 z-50 rounded-sm" :class="class">
        <div class="bg-effect w-full overflow-hidden h-full bg-black/15 relative backdrop-blur-[.3px]" >
            <slot />
        </div>
        <div class=" w-4 h-4 border-t-2 border-r-2 border-primary top-2 right-2 absolute"></div>
        <div class=" w-4 h-4 border-t-2 border-l-2 border-primary top-2 left-2 absolute"></div>

        <div class=" w-4 h-4 border-b-2 border-r-2 border-primary bottom-2 right-2 absolute"></div>
        <div class=" w-4 h-4 border-b-2 border-l-2 border-primary bottom-2 left-2 absolute"></div>

    </div>
</template>

<style scoped>
.bg-effect {
    background: rgb(2, 0, 36);
    background: radial-gradient(circle, rgba(2, 0, 36, 0) 50%, rgba(255, 255, 255, 0.05) 100%);
    border: .1px solid rgba(90, 107, 255, 0.2) ;
}
</style>