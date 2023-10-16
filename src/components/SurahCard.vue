<template>
  <router-link :to="{ name: 'surah', params: { nomor: props.nomor } }" class="border-2 border-gray-300 p-4 rounded-lg hover:border-primary text-gray-500 dark:text-secondary dark:hover:text-primary hover:text-primary">
    <div class="flex justify-between">
      <div class="flex justify-center items-center">
        <div class="relative mr-4">
          <IconStar />
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center font-bold text-sm">
            {{ props.nomor }}
          </div>
        </div>
        <div>
          <h2 class="text-lg font-semibold">{{ props.nama_surah }}</h2>
          <p class="overflow-ellipsis text-sm">{{ props.arti }}</p>
        </div>
      </div>
      <div class="text-center w-20">
        <div class="font-arab text-lg font-semibold">{{ props.nama_arab }}</div>
        <p class="text-sm">{{ props.ayat }} Ayat</p>
      </div>
    </div>
  </router-link>
</template>
<script setup>
import IconStar from './IconStar.vue'

const props = defineProps({
  nomor: Number,
  nama_surah: String,
  arti: String,
  nama_arab: String,
  ayat: Number
})
</script>
