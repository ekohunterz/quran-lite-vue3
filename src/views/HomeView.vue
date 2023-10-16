<script setup>
import { ref, onMounted, computed, reactive } from 'vue'
import { IconBook, IconSearch } from '@tabler/icons-vue'
import { useHead } from '@unhead/vue'
import SurahCard from '../components/SurahCard.vue'

//import api
import api from '../api'

const surahs = ref([])
const search = ref('')

const siteHead = reactive({
  title: 'Beranda - Quran Lite Web',
  author: 'Eko Teguh Muhammadi',
  description: 'Website untuk membaca Al-Quran'
})

useHead({
  title: computed(() => siteHead.title),
  meta: [
    {
      name: 'author',
      content: computed(() => siteHead.author)
    },
    {
      name: 'description',
      content: computed(() => siteHead.description)
    }
  ]
})

const fetchDataSurah = async () => {
  //fetch data
  await api
    .get('/api/v2/surat')

    .then((response) => {
      surahs.value = response.data.data
    })
}

const filteredSurahs = computed(() => {
  const query = search.value.toLowerCase()
  return surahs.value.filter((surah) => {
    return surah.nama.toLowerCase().includes(query) || surah.namaLatin.toLowerCase().includes(query) || surah.arti.toLowerCase().includes(query)
  })
})

//run hook "onMounted"
onMounted(() => {
  fetchDataSurah()
})
</script>

<template>
  <div class="bg-primary dark:bg-primary_dark">
    <div class="container py-24 text-center">
      <div class="flex justify-center mb-6">
        <IconBook size="144" class="bg-secondary rounded-full p-6 text-primary dark:text-slate-800" />
      </div>
      <div class="relative w-full lg:w-1/2 mx-auto">
        <input v-model="search" type="text" class="text-lg w-full rounded-full text-black px-6 py-4 border-2 border-secondary focus:outline-none" placeholder="Cari Nama Surah" />
        <div class="absolute inset-y-0 right-0 flex items-center">
          <button
            @click="search = ''"
            class="z-[1] flex items-center hover:bg-primary hover:text-secondary dark:hover:text-secondary text-primary dark:text-slate-800 dark:bg-secondary dark:hover:bg-primary_dark justify-center overflow-hidden border-[3px] border-white hover:cursor-pointer w-20 h-16 rounded-r-full hover: duration-500 ease-in-out transition-all ring-0 focus:outline-none"
          >
            <IconSearch size="24" class="" />
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-secondary dark:bg-slate-950">
    <div class="container py-8">
      <div class="border-b-2 border-gray-300"><h1 class="text-lg">Surah</h1></div>
      <div class="grid gap-4 grid-cols-1 mt-3 md:grid-cols-2 lg:grid-cols-3">
        <SurahCard v-for="(surah, index) in filteredSurahs" :key="index" :nomor="surah.nomor" :nama_surah="surah.namaLatin" :arti="surah.arti" :nama_arab="surah.nama" :ayat="surah.jumlahAyat" />
      </div>
    </div>
  </div>
</template>
