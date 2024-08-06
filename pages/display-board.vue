<script setup>
import ApexCharts from 'apexcharts';


definePageMeta({
    layout: 'auth-layout'
})
const progressBars = reactive([25, 50, 75, 90, 17, 17, 17]);

const updateHeights = () => {
    progressBars.forEach((_, index) => {
        progressBars[index] = Math.floor(Math.random() * 100);
    });
};

onMounted(() => {
    setInterval(updateHeights, 2000);
});

var options = {
    chart: {
        height: 280,
        type: "area",
        toolbar: {
            autoSelected: "pan",
            show: false
        },
        foreColor: "#ccc",
    },
    dataLabels: {
        enabled: false
    },

    series: [
        {
            name: "مؤشر",
            data: [24, 23, 38, 45, 19, 23, 2]
        },
        {
            name: "مؤشر",
            data: [5, 15, 23, 2, 5, 23, 2]
        },
        {
            name: "مؤشر",
            data: [5, 2, 23, 2, 5, 5, 2]
        },
    ],
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.1,
            stops: [0, 90, 55],
        }
    },
    
    grid: {
        borderColor: "#fff",
        clipMarkers: false,
        yaxis: {
            lines: {
                show: false
            }
        }
    },
    dataLabels: {
        enabled: false
    },
    tooltip: {
        theme: "dark"
    },

};

onMounted(() => {
    var chart = new ApexCharts(document.querySelector("#chart1"), options);
    chart.render();
})

const mapModal = ref(false)
const city = ref()
const handlerOpenModal = (data) => {
    const sound = new Audio('./spark2.mp3');
    sound.play()
    city.value = data
    setTimeout(() => {
        mapModal.value = true
    }, 500)

}
</script>

<template>

    <div class="fixed w-screen h-screen top-0 z-0 bg-black bgImage">
        <!-- <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
                <defs>
                    <pattern id='a' patternUnits='userSpaceOnUse' width='29' height='50.115'
                        patternTransform='scale(.5) rotate(55)'>
                        <rect x='0' y='0' width='100%' height='100%' fill='hsla(231, 37%, 7%, 1)' />
                        <path
                            d='M14.498 16.858L0 8.488.002-8.257l14.5-8.374L29-8.26l-.002 16.745zm0 50.06L0 58.548l.002-16.745 14.5-8.373L29 41.8l-.002 16.744zM28.996 41.8l-14.498-8.37.002-16.744L29 8.312l14.498 8.37-.002 16.745zm-29 0l-14.498-8.37.002-16.744L0 8.312l14.498 8.37-.002 16.745z'
                            stroke-width='1' stroke='hsla(241, 74%, 62%, 0.24)' fill='none' />
                    </pattern>
                </defs>
                <rect width='800%' height='800%' transform='translate(-58,-0.23)' fill='url(#a)' />
            </svg> -->


    </div>

    <div class="w-96 h-96 bg-[#5B58E6]/70 blur-[300px] top-8 left-12 rounded-full absolute z-50"></div>
    <div class="w-96 h-96 bg-[#5B58E6]/70 blur-[300px] bottom-8 right-12 rounded-full absolute z-50"></div>
    <div class="w-screen h-screen">

        <div class="flex flex-row gap-5 py-5 justify-center">
            <UIDisplayCard class="!h-36 !w-80">
                <div class="w-full h-full relative flex  p-5 items-center justify-evenly">
                    <div class="flex gap-3  ">
                        <div class="text-primary mt-2 bg-[#5B58E6]/20 h-fit p-3 rounded-xl">
                            <Icon name="eos-icons:system-group" size="25" />
                        </div>

                        <div class="flex flex-col gap-1  items-end justify-center">
                            <div class="flex flex-col items-end">
                                <p class="text-lg font-semibold text-white">32,500w</p>
                                <p class="text-sm font-medium  text-gray-400">الاستهلاك</p>
                            </div>
                            <p class="text-xs   text-green-500">
                                40% هذا الشهر
                            </p>
                        </div>



                        <div class="px-3">
                            <div class="relative size-20  p-1">
                                <div
                                    class="border-2 border-dashed border-primary  rounded-full w-full h-full absolute top-0 left-0 spin !duration-1000">
                                </div>
                                <svg class="size-full" width="36" height="36" viewBox="0 0 36 36"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <!-- Background Circle -->
                                    <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-gray-200"
                                        stroke-width="2"></circle>
                                    <!-- Progress Circle inside a group with rotation -->
                                    <g class="origin-center -rotate-90 transform">
                                        <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-blue-600"
                                            stroke-width="2" stroke-dasharray="100" stroke-dashoffset="20"></circle>
                                    </g>
                                </svg>
                                <!-- Percentage Text -->
                                <div class="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                    <span class="text-center text-sm font-bold text-white">72%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </UIDisplayCard>
            <UIDisplayCard class="!h-36 !w-80">
                <div class="w-full h-full relative flex  p-5 items-center justify-evenly">
                    <div class="flex gap-3  ">
                        <div class="text-primary mt-2 bg-[#5B58E6]/20 h-fit p-3 rounded-xl">
                            <Icon name="material-symbols:power-plug-outline" size="25" />
                        </div>

                        <div class="flex flex-col gap-1  items-end justify-center">
                            <div class="flex flex-col items-end">
                                <p class="text-lg font-semibold text-white">50%</p>
                                <p class="text-sm font-medium  text-gray-400">التوفير</p>
                            </div>
                            <p class="text-xs   text-red-500">
                                60% هذا الشهر
                            </p>
                        </div>



                        <div class="px-3">
                            <div class="relative size-20  p-1">
                                <div
                                    class="border-2 border-dashed border-primary  rounded-full w-full h-full absolute top-0 left-0 spin !duration-1000">
                                </div>
                                <svg class="size-full" width="36" height="36" viewBox="0 0 36 36"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <!-- Background Circle -->
                                    <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-gray-200"
                                        stroke-width="2"></circle>
                                    <!-- Progress Circle inside a group with rotation -->
                                    <g class="origin-center -rotate-90 transform">
                                        <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-blue-600"
                                            stroke-width="2" stroke-dasharray="100" stroke-dashoffset="20"></circle>
                                    </g>
                                </svg>
                                <!-- Percentage Text -->
                                <div class="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                    <span class="text-center text-sm font-bold text-white">72%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </UIDisplayCard>
            <UIDisplayCard class="!h-36 !w-80">
                <div class="w-full h-full relative flex  p-5 items-center justify-evenly">
                    <div class="flex gap-3  ">
                        <div class="text-primary mt-2 bg-[#5B58E6]/20 h-fit p-3 rounded-xl">
                            <Icon name="material-symbols:power-plug-off-outline-sharp" size="25" />
                        </div>

                        <div class="flex flex-col gap-1  items-end justify-center">
                            <div class="flex flex-col items-end">
                                <p class="text-lg font-semibold text-white">230</p>
                                <p class="text-sm font-medium  text-gray-400">الانقطاع</p>
                            </div>
                            <p class="text-xs   text-orange-400">
                                40% زيادة
                            </p>
                        </div>



                        <div class="px-3">
                            <div class="relative size-20  p-1">
                                <div
                                    class="border-2 border-dashed border-primary  rounded-full w-full h-full absolute top-0 left-0 spin !duration-1000">
                                </div>
                                <svg class="size-full" width="36" height="36" viewBox="0 0 36 36"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <!-- Background Circle -->
                                    <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-gray-200"
                                        stroke-width="2"></circle>
                                    <!-- Progress Circle inside a group with rotation -->
                                    <g class="origin-center -rotate-90 transform">
                                        <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-blue-600"
                                            stroke-width="2" stroke-dasharray="100" stroke-dashoffset="20"></circle>
                                    </g>
                                </svg>
                                <!-- Percentage Text -->
                                <div class="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                    <span class="text-center text-sm font-bold text-white">72%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </UIDisplayCard>
            <UIDisplayCard class="!h-36 !w-80">
                <div class="w-full h-full relative flex  p-5 items-center justify-evenly">
                    <div class="flex gap-3  ">
                        <div class="text-primary mt-2 bg-[#5B58E6]/20 h-fit p-3 rounded-xl">
                            <Icon name="mage:electricity" size="25" class="" />
                        </div>

                        <div class="flex flex-col gap-1  items-end justify-center">
                            <div class="flex flex-col items-end">
                                <p class="text-lg font-semibold text-white">60%</p>
                                <p class="text-sm font-medium  text-gray-400">الجهد</p>
                            </div>
                            <p class="text-xs   text-green-500">
                                40% هذا الشهر
                            </p>
                        </div>



                        <div class="px-3">
                            <div class="relative size-20  p-1">
                                <div
                                    class="border-2 border-dashed border-primary  rounded-full w-full h-full absolute top-0 left-0 spin !duration-1000">
                                </div>
                                <svg class="size-full" width="36" height="36" viewBox="0 0 36 36"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <!-- Background Circle -->
                                    <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-gray-200"
                                        stroke-width="2"></circle>
                                    <!-- Progress Circle inside a group with rotation -->
                                    <g class="origin-center -rotate-90 transform">
                                        <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-blue-600"
                                            stroke-width="2" stroke-dasharray="100" stroke-dashoffset="20"></circle>
                                    </g>
                                </svg>
                                <!-- Percentage Text -->
                                <div class="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                    <span class="text-center text-sm font-bold text-white">72%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </UIDisplayCard>

        </div>
        <div class="flex flex-row gap-5 py-5 justify-center">
            <UIDisplayCard class="!h-96 !w-72">
                <div class="flex justify-center p-5 gap-3 flex-col items-center">
                    <p class="text-lg w-full text-end text-primary">المؤشرات</p>
                    <div class="flex space-x-7">
                        <div v-for="(bar, index) in progressBars" :key="index"
                            class="flex flex-col flex-nowrap justify-end w-2 h-64 bg-[#5B58E6]/20 rounded-full overflow-hidden"
                            role="progressbar" :aria-valuenow="bar" aria-valuemin="0" aria-valuemax="100">
                            <div class="rounded-full overflow-hidden bg-primary transition-all duration-1000"
                                :style="{ height: bar + '%' }"></div>
                        </div>
                    </div>
                </div>
            </UIDisplayCard>

            <UIDisplayCard class="!h-96 !w-[620px]">
                <div class="flex py-2 pr-5 flex-col  w-full">
                    <p class="text-lg w-full text-end text-primary">المؤشرات</p>
                    <br>
                    <div id="chart1"></div>
                </div>
            </UIDisplayCard>

            <UIDisplayCard class="!h-96 !w-96">
                <div class="flex py-2 pr-5 flex-col  w-full">
                    <p class="text-lg w-full text-end text-primary">الاستهلاك</p>
                    <br>

                    <div class="flex flex-col px-5 justify-center">
                        <svg id="SvgjsSvg1369" width="298" height="190.65245056152344"
                            xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
                            xmlns:svgjs="http://svgjs.dev" class="apexcharts-svg" xmlns:data="ApexChartsNS"
                            transform="translate(0, 0)" style="background: transparent;">
                            <foreignObject x="0" y="0" width="298" height="190.65245056152344">
                                <div class="apexcharts-legend" xmlns="http://www.w3.org/1999/xhtml"></div>
                            </foreignObject>
                            <g id="SvgjsG1371" class="apexcharts-inner apexcharts-graphical"
                                transform="translate(37, 0)">
                                <defs id="SvgjsDefs1370">
                                    <clipPath id="gridRectMaskeubaldwxf">
                                        <rect id="SvgjsRect1372" width="232" height="250" x="-3" y="-1" rx="0" ry="0"
                                            opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fff">
                                        </rect>
                                    </clipPath>
                                    <clipPath id="forecastMaskeubaldwxf"></clipPath>
                                    <clipPath id="nonForecastMaskeubaldwxf"></clipPath>
                                    <clipPath id="gridRectMarkerMaskeubaldwxf">
                                        <rect id="SvgjsRect1373" width="230" height="252" x="-2" y="-2" rx="0" ry="0"
                                            opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fff">
                                        </rect>
                                    </clipPath>
                                    <linearGradient id="SvgjsLinearGradient1378" x1="0" y1="1" x2="1" y2="1">
                                        <stop id="SvgjsStop1379" stop-opacity="1" stop-color="rgba(242,242,242,1)"
                                            offset="0"></stop>
                                        <stop id="SvgjsStop1380" stop-opacity="1" stop-color="rgba(0,227,210,1)"
                                            offset="1"></stop>
                                        <stop id="SvgjsStop1381" stop-opacity="1" stop-color="rgba(0,227,210,1)"
                                            offset="1"></stop>
                                    </linearGradient>
                                    <linearGradient id="SvgjsLinearGradient1389" x1="0" y1="1" x2="1" y2="1">
                                        <stop id="SvgjsStop1390" stop-opacity="1" stop-color="#5B58E6" offset="0">
                                        </stop>
                                        <stop id="SvgjsStop1391" stop-opacity="1" stop-color="rgba(0,227,210,1)"
                                            offset="1"></stop>
                                        <stop id="SvgjsStop1392" stop-opacity="1" stop-color="rgba(0,227,210,1)"
                                            offset="1"></stop>
                                    </linearGradient>
                                </defs>
                                <g id="SvgjsG1374" class="apexcharts-radialbar">
                                    <g id="SvgjsG1375">
                                        <g id="SvgjsG1376" class="apexcharts-tracks">
                                            <g id="SvgjsG1377" class="apexcharts-radialbar-track apexcharts-track"
                                                rel="1">
                                                <path id="apexcharts-radialbarTrack-0"
                                                    d="M 65.16250160204422 160.83749839795576 A 67.65243902439025 67.65243902439025 0 1 1 160.83749839795576 160.83749839795576"
                                                    fill="none" fill-opacity="1" stroke-opacity="1"
                                                    stroke-linecap="butt" stroke-width="0" stroke-dasharray="0"
                                                    class="apexcharts-radialbar-area"
                                                    data:pathOrig="M 65.16250160204422 160.83749839795576 A 67.65243902439025 67.65243902439025 0 1 1 160.83749839795576 160.83749839795576">
                                                </path>
                                            </g>
                                        </g>
                                        <g id="SvgjsG1383">
                                            <g id="SvgjsG1388" class=" apexcharts-series apexcharts-radial-series"
                                                rel="1" data:realIndex="0">
                                                <path id="SvgjsPath1393"
                                                    d="M 65.16250160204422 160.83749839795576 A 67.65243902439025 67.65243902439025 0 1 1 175.27439846984652 139.4339138450518"
                                                    fill="none" fill-opacity="0.85" stroke="#5B58E6" stroke-opacity="1"
                                                    stroke-linecap="butt" stroke-width="21.060975609756095"
                                                    stroke-dasharray="2"
                                                    class="apexcharts-radialbar-area apexcharts-radialbar-slice-0"
                                                    data:angle="248" data:value="90" index="0" j="0"
                                                    data:pathOrig="M 65.16250160204422 160.83749839795576 A 67.65243902439025 67.65243902439025 0 1 1 175.27439846984652 139.4339138450518">
                                                </path>
                                                <text x="113" y="143" text-anchor="middle" dominant-baseline="auto"
                                                    font-size="16px" font-weight="600" fill="#5B58E6"
                                                    class="apexcharts-text apexcharts-datalabel-label"
                                                    style="font-family: Helvetica, Arial, sans-serif;">الاستهلاك</text>
                                            </g>
                                            <circle id="SvgjsCircle1384" r="62.65243902439025" cx="113" cy="113"
                                                class="apexcharts-radialbar-hollow" fill="transparent"></circle>
                                            <g id="SvgjsG1385" class="apexcharts-datalabels-group"
                                                transform="translate(0, 0) scale(1)" style="opacity: 1;">
                                                <text id="SvgjsText1386" font-family="Helvetica, Arial, sans-serif"
                                                    x="113" y="143" text-anchor="middle" dominant-baseline="auto"
                                                    font-size="16px" font-weight="600" fill="var(--primary-color)"
                                                    class="apexcharts-text apexcharts-datalabel-label"
                                                    style="font-family: Helvetica, Arial, sans-serif;"></text>
                                                <text id="SvgjsText1387" font-family="Helvetica, Arial, sans-serif"
                                                    x="113" y="119" text-anchor="middle" dominant-baseline="auto"
                                                    font-size="22px" font-weight="400" fill="#5B58E6"
                                                    class="apexcharts-text apexcharts-datalabel-value"
                                                    style="font-family: Helvetica, Arial, sans-serif;">92%</text>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                                <line id="SvgjsLine1394" x1="0" y1="0" x2="226" y2="0" stroke="#b6b6b6"
                                    stroke-dasharray="0" stroke-width="1" stroke-linecap="butt"
                                    class="apexcharts-ycrosshairs"></line>
                                <line id="SvgjsLine1395" x1="0" y1="0" x2="226" y2="0" stroke-dasharray="0"
                                    stroke-width="0" stroke-linecap="butt" class="apexcharts-ycrosshairs-hidden">
                                </line>
                            </g>
                        </svg>


                        <div class="flex flex-col gap-5  justify-center w-full">
                            <div class="flex flex-col w-full gap-2">
                                <p class="text-primary text-end text-sm">الاستهلاك الشهري</p>
                                <!-- Progress -->
                                <div class="flex rounded-full w-full h-2 bg-gray-200 overflow-hidden dark:bg-neutral-700"
                                    role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                    <div class="flex flex-col justify-center overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500"
                                        style="width: 25%"></div>
                                </div>
                                <!-- End Progress -->
                            </div>
                            <div class="flex flex-col w-full gap-2">
                                <p class="text-primary text-end text-sm">الاستهلاك الشهري</p>
                                <!-- Progress -->
                                <div class="flex rounded-full w-full h-2 bg-gray-200 overflow-hidden dark:bg-neutral-700"
                                    role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                    <div class="flex flex-col justify-center overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500"
                                        style="width: 25%"></div>
                                </div>
                                <!-- End Progress -->
                            </div>
                        </div>



                    </div>
                </div>
            </UIDisplayCard>



        </div>
        <div class="flex flex-row gap-5 md:px-24 py-5 justify-center">

            <UIDisplayCard class="!h-[450px] !w-96">
                <p class="text-lg w-full text-end text-primary p-5">خارطة المناطق</p>

                <div class="flex   h-[350px] z-50 p-5  overflow-hidden">

                    <UIIraqMap @clickGov="(_city)=>handlerOpenModal(_city)" />
                </div>
            </UIDisplayCard>
            <UIDisplayCard class="!h-[450px] !w-full flex-1">
                <p class="text-lg w-full text-end text-primary p-5">السجلات</p>

                <div class="flex flex-col gap-2 px-5 items-centers w-full" dir="rtl">
                    <div class="flex flex-row justify-between bg-[#5B58E6]/15 px-5 py-2 ">
                        <p class="text-primary">الاسم</p>
                        <p class="text-primary">الصلاحية</p>
                        <p class="text-primary">التعديل</p>
                        <p class="text-primary">الحالة</p>
                        <p class="text-primary">التاريخ</p>
                    </div>

                    <div v-for="(item, index) in 5" :key="index"
                        class="flex text-center flex-row justify-between bg-black/25 px-5 py-2 ">
                        <p class="text-primary text-center w-10">عمار</p>
                        <p class="text-primary w-10 px-5">مدير</p>
                        <p class="text-primary w-10 ">المناطق</p>
                        <p class="text-primary ">
                            <span v-if="index % 2 == 0"
                                class="bg-green-500 bg-opacity-15 rounded-sm text-green-600 text-xs px-3 text">انجز</span>
                            <span v-else
                                class="bg-orange-500 bg-opacity-15 rounded-sm text-orange-600 text-xs px-3 text">جاري</span>


                        </p>
                        <p class="text-primary text-center  text-[12px]">2024/7/1</p>
                    </div>
                    <div :key="index" class="flex text-center flex-row justify-between bg-black/25 px-5 py-2 ">
                        <p class="text-primary text-center w-10">عمار</p>
                        <p class="text-primary w-10 px-5">مدير</p>
                        <p class="text-primary w-10 ">المناطق</p>
                        <p class="text-primary ">

                            <span class="bg-red-500 bg-opacity-15 rounded-sm text-red-600 text-xs px-3 text">مغلق</span>
                        </p>
                        <p class="text-primary text-center  text-[12px]">2024/7/1</p>
                    </div>


                </div>
            </UIDisplayCard>

        </div>






    </div>







    <UIDisplayBoardModal v-if="mapModal" @close="mapModal = false">
        <div class="flex px-5 flex-col">
            <p class="text-xl text-primary">تفاصيل {{ city }}</p>
            <br>

            <div class="flex flex-row justify-between">
                <div class="flex flex-col gap-2 text-center">
                    <div class="relative size-24">
                        <svg class="size-full" width="36" height="36" viewBox="0 0 36 36"
                            xmlns="http://www.w3.org/2000/svg">
                            <!-- Background Circle -->
                            <circle cx="18" cy="18" r="16" fill="none"
                                class="stroke-current  dark:text-neutral-700" stroke-width="2"></circle>
                            <!-- Progress Circle inside a group with rotation -->
                            <g class="origin-center -rotate-90 transform">
                                <circle cx="18" cy="18" r="16" fill="none"
                                    class="stroke-current text-primary dark:text-blue-500" stroke-width="2"
                                    stroke-dasharray="100" stroke-dashoffset="80"></circle>
                            </g>
                        </svg>
                        <!-- Percentage Text -->
                        <div class="absolute top-1/2 start-6 transform -translate-y-1/2 ">
                            <span class="text-center text-lg  text-white dark:text-white">20%</span>
                        </div>
                    </div>
                    <p class="text-primary  text-md">الجهد</p>
                </div>
                <div class="flex flex-col gap-2 text-center">
                    <div class="relative size-24">
                        <svg class="size-full" width="36" height="36" viewBox="0 0 36 36"
                            xmlns="http://www.w3.org/2000/svg">
                            <!-- Background Circle -->
                            <circle cx="18" cy="18" r="16" fill="none"
                                class="stroke-current  dark:text-neutral-700" stroke-width="2"></circle>
                            <!-- Progress Circle inside a group with rotation -->
                            <g class="origin-center -rotate-90 transform">
                                <circle cx="18" cy="18" r="16" fill="none"
                                    class="stroke-current text-red-500 dark:text-blue-500" stroke-width="2"
                                    stroke-dasharray="100" stroke-dashoffset="20"></circle>
                            </g>
                        </svg>
                        <!-- Percentage Text -->
                        <div class="absolute top-1/2 start-6 transform -translate-y-1/2 ">
                            <span class="text-center text-lg  text-white dark:text-white">80%</span>
                        </div>
                    </div>
                    <p class=" text-red-500 text-md">الاستهلاك</p>
                </div>
                <div class="flex flex-col gap-2 text-center">
                    <div class="relative size-24">
                        <svg class="size-full" width="36" height="36" viewBox="0 0 36 36"
                            xmlns="http://www.w3.org/2000/svg">
                            <!-- Background Circle -->
                            <circle cx="18" cy="18" r="16" fill="none"
                                class="stroke-current  dark:text-neutral-700" stroke-width="2"></circle>
                            <!-- Progress Circle inside a group with rotation -->
                            <g class="origin-center -rotate-90 transform">
                                <circle cx="18" cy="18" r="16" fill="none"
                                    class="stroke-current text-orange-500 dark:text-blue-500" stroke-width="2"
                                    stroke-dasharray="100" stroke-dashoffset="40"></circle>
                            </g>
                        </svg>
                        <!-- Percentage Text -->
                        <div class="absolute top-1/2 start-6 transform -translate-y-1/2 ">
                            <span class="text-center text-lg  text-white dark:text-white">60%</span>
                        </div>
                    </div>
                    <p class=" text-orange-500 text-md">الضغط</p>
                </div>

            </div>
        </div>
    </UIDisplayBoardModal>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Changa:wght@200..800&display=swap');

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.spin {
    animation: spin 9s linear infinite;
}

* {

    font-family: "Changa", sans-serif;



}

#chart1 {
    max-width: 650px;

}

.bgImage {
    background-image: url("~/assets/images/wire.png") ;
}
</style>