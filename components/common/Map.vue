<script setup>
import { Loader } from '@googlemaps/js-api-loader'

const useGeolocation = () => {
  const coords = ref({ latitude: 33.312805, longitude: 44.361488 })
  
  const isSupported = typeof window !== 'undefined' && 'navigator' in window && 'geolocation' in navigator

  let watcher = null
  onMounted(() => {
    if (isSupported)
      watcher = navigator.geolocation.watchPosition(
        position => (coords.value = position.coords)
      )

    // Check if navigator is defined before accessing it

        
    
  })

  onUnmounted(() => {
    if (watcher) navigator.geolocation.clearWatch(watcher)
  })

  return { coords, isSupported }
}

const props = defineProps({
  lat:null,
  lng:null
})
const emit = defineEmits(['postion'])

const GOOGLE_MAPS_API_KEY = 'AIzaSyC4oHW8zf-2h2cFHkuJn8xJlxdUEg2dIXg'

let map = null
let marker = null

const addMarkerOnMapClick = (position) => {
  if (!marker) {
    marker = new google.maps.Marker({
      position: position,
      map: map
    })
  } else {
    marker.setPosition(position)
  }
}

const { coords } = useGeolocation()
const currPos = computed(() => ({
  lat: coords.value.latitude,
  lng: coords.value.longitude
}))

const setCoords = (latitude, longitude) => {
    coords.latitude = latitude;
    coords.longitude = longitude;
};
const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY })

onMounted(async () => {
  await loader.load()
  map = new google.maps.Map(document.getElementById('map'), {
    center: currPos.value,
    zoom: 15
  })
  setCoords(props.lat,props.lng)

  emit('postion', currPos.value)

  addMarkerOnMapClick(currPos.value)

  map.addListener('click', (e) => {
    const position = { lat: e.latLng.lat(), lng: e.latLng.lng() }
    addMarkerOnMapClick(position)

    emit('postion', position)
  })
})
</script>

<template>
  <div id="map"  class="w-full" style="height: 400px; border-radius: 15px;" />
</template>
