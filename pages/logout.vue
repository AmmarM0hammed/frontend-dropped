<script setup>


onMounted(()=>{
    useUserStore().user.token = '';
    return navigateTo('/auth/login')
})

</script>