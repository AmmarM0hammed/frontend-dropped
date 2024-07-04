<template>
    <div :id="`map${index}`" class="w-full" style="height: 350px; border-radius: 15px;"></div>
  </template>
  
  <script setup>
  import { onMounted, defineProps } from 'vue';
  import { Loader } from '@googlemaps/js-api-loader';
  
  const props = defineProps({
    position: Object,
    index: Number
  });
  
  const GOOGLE_MAPS_API_KEY = 'AIzaSyDpugSLagAriIejIn2M5c0T2jMNErAusJo'; // Replace with your Google Maps API key
  const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY ,});
  let map = null;
  
  const addMarker = (position) => {
  if (!marker) {
    marker = new google.maps.Marker({
      position: position,
      map: map
    })
  } else {
    marker.setPosition(position)
  }
}

  onMounted(async () => {
    await loader.load();
    map = new google.maps.Map(document.getElementById(`map${props.index}`), {
      center: props.position,
      zoom: 15,
      draggable:false
    });

    marker = new google.maps.Marker({
      position: props.position,
      map: map
    })
  });
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>
  