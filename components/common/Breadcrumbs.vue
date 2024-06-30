<script setup>

const breadcrumbs = ref([]);


const hasParam = ()=>{
  const param = useRoute().params.id;
  if(param == null) return false;
  else return true;
}

const updateBreadcrumbs = () => {
  const routeSegments = useRoute().path.split('/').filter(segment => (segment !== '' && segment !== 'ar-IQ' && segment !== 'en-US'));
  
  if (hasParam()) {
    routeSegments.pop(); 
  }

  breadcrumbs.value = routeSegments.map((segment, index) => ({
    label: segment ,
    to: `/${routeSegments.slice(0, index + 1).join('/')}`,
  }));
};

watchEffect(() => {
  updateBreadcrumbs();
});


</script>

<template>

  <nav>
      <ul class="flex flex-row-reverse gap-5 bg-breadcrumb text-primary w-full justify-center  md:justify-normal md:w-fit px-5 py-1 rounded-md">
        <li><NuxtLink :to="localePath('/')">/ الرئيسية  </NuxtLink></li>
        <li v-if="hasParam" v-for="(crumb, index) in breadcrumbs" :key="index">


          <nuxt-link  :to="localePath(crumb.to)">{{ ($t(crumb.label)) }}</nuxt-link>
          <span v-if="index < breadcrumbs.length - 1"> </span>

        </li>
      </ul>
    </nav>
</template>
