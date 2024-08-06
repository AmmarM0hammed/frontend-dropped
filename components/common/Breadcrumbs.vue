<script setup>

const breadcrumbs = ref([]);


const arabic = ref([
  {
    label: 'system-management',
    ar: 'ادارة المنظومة'
  },
  {
    label: 'device',
    ar: 'ادارة الاجهزة'
  },
  
  {
    label: 'customer',
    ar: 'العملاء'
  },
  {
    label: 'region',
    ar: 'ادارة المناطق'
  },
  {
    label: 'company',
    ar: 'الشركات'
  },
  
  {
    label: 'users',
    ar: 'المستخدمين'
  },
  {
    label: 'report',
    ar: 'ادارة الفواتير'
  },
  {
    label: 'city',
    ar: 'مدينة'
  },
  {
    label: 'smart-meters',
    ar: 'عداد الذكية'
  },
  

])
const hasParam = () => {
  const param = useRoute().params.id;
  if (param == null) return false;
  else return true;
}

const isUUID = (segment) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(segment);
};

const updateBreadcrumbs = () => {
  const routeSegments = useRoute().path.split('/').filter(segment => (segment !== '' && segment !== 'ar-IQ' && segment !== 'en-US'));


  breadcrumbs.value = routeSegments.map((segment, index) => ({
    label: isUUID(segment) ? 'عنصر' : arabic.value.find((el) => el.label === segment)?.ar || segment,
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


          <nuxt-link  :to="localePath(crumb.to)"> {{ ($t(crumb.label)) }} </nuxt-link>
          <!-- <span v-if="index < breadcrumbs.length - 1"> </span> -->

        </li>
      </ul>
    </nav>
</template>
