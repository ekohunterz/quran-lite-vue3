<script setup>
import { IconList, IconPlayerPlayFilled, IconPlayerPauseFilled, IconX } from '@tabler/icons-vue'
import { useApiStore } from '../stores/store'
import { onMounted, ref, watch } from 'vue'

import api from '../api'

const apiStore = useApiStore()

const isPlaying = ref(false)
const currentTrackIndex = ref(0)
const surahList = ref([])
const ayats = ref([])
const surahName = ref('')
const showSurahList = ref(false)
const audioRef = ref(null)
const selectedAyat = ref('1')

const playPause = () => {
  const audio = audioRef.value
  if (audio && audio.paused) {
    audio.play()
  } else if (audio) {
    audio.pause()
  }
  isPlaying.value = !isPlaying.value
}

const toggleSurahList = () => {
  showSurahList.value = !showSurahList.value
}

const closeSurahList = (event) => {
  // Tutup offcanvas jika mengklik di luar menu
  if (event.target.classList.contains('bg-opacity-10')) {
    showSurahList.value = false
  }
}

const goToAyat = () => {
  if (selectedAyat.value) {
    const targetAyat = document.getElementById(`#ayat-${selectedAyat.value}`)
    if (targetAyat) {
      targetAyat.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    console.log(targetAyat)
  }
}

watch(
  () => apiStore.responseData,
  (newData) => {
    if (newData) {
      surahName.value = newData.namaLatin || 'Surah'
      ayats.value = newData.ayat
      currentTrackIndex.value = newData.audioFull['01']
    }
  }
)

const fetchDataSurah = async () => {
  //fetch data
  await api
    .get('/api/v2/surat')

    .then((response) => {
      surahList.value = response.data.data
    })
}

//run hook "onMounted"
onMounted(() => {
  fetchDataSurah()
})
</script>
<template>
  <footer class="bg-primary dark:bg-primary_dark border-t-2 border-opacity-40 shadow-md text-white p-4 fixed bottom-0 w-full">
    <div class="container flex justify-between items-center">
      <div class="flex items-center space-x-2">
        <button @click="toggleSurahList" class="text-xl flex gap-2">
          <IconList /><span class="text-base">{{ surahName }}</span>
        </button>
        <audio ref="audioRef" :src="currentTrackIndex"></audio>
      </div>
      <div>
        <button @click="playPause" class="text-xl">
          <div class="flex bg-white p-2 rounded-full text-black hover:scale-110 hover:text-primary" v-if="isPlaying"><IconPlayerPauseFilled /></div>
          <div class="flex bg-white p-2 rounded-full text-black hover:scale-110 hover:text-primary" v-else><IconPlayerPlayFilled /></div>
        </button>
      </div>
      <div class="flex items-center space-x-2">
        <label for="ayatDropdown" class="text-secondary">Ayat:</label>
        <select @change="goToAyat" v-model="selectedAyat" id="ayatDropdown" class="bg-primary ring-2 ring-secondary text-secondary dark:bg-primary_dark rounded-md px-2 py-1">
          <option v-for="(ayat, index) in ayats" :key="index" :value="ayat.nomorAyat">{{ ayat.nomorAyat }}</option>
        </select>
      </div>
    </div>
  </footer>

  <Transition name="slide-fade">
    <div v-if="showSurahList" @click="closeSurahList" class="fixed inset-0 bg-black bg-opacity-10 z-50 flex justify-start">
      <div class="bg-white dark:bg-primary_dark p-4 w-64 custom-scrollbar h-screen overflow-y-auto">
        <!-- Isi Offcanvas Menu -->
        <div>
          <div class="flex justify-between mb-4">
            <h2 class="text-xl items-center font-semibold">Daftar Surah</h2>
            <button @click="toggleSurahList" class=""><IconX /></button>
          </div>

          <!-- Tambahkan daftar surah atau konten lainnya di sini -->
          <router-link exact-active-class="bg-primary text-secondary" v-for="(surah, index) in surahList" :key="index" :to="{ name: 'surah', params: { nomor: surah.nomor } }" class="block w-full p-2 mb-2 rounded-md hover:bg-primary hover:text-secondary transition duration-300">
            <div class="text-md font-semibold mb-1">{{ surah.namaLatin }}</div>
          </router-link>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-90px);
  opacity: 0;
}
</style>
