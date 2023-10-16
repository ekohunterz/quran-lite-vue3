<script setup>
import { ref, watchEffect, onMounted, computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useApiStore } from '../stores/store'
import api from '../api'
import IconStar from '@/components/Icons/IconStar.vue'
import AudioPlayer from '@/components/AudioPlayer.vue'
import { IconPlayerPlayFilled, IconPlayerPauseFilled } from '@tabler/icons-vue'
import ModalView from '@/components/ModalView.vue'
import { IconAlertCircle } from '@tabler/icons-vue'
import Popper from 'vue3-popper'
import { IconMapPinFilled } from '@tabler/icons-vue'

const apiStore = useApiStore()

const route = useRoute()

const surahs = ref([])
const ayats = ref([])
const isModalOpen = ref(false)
const audioRef = ref(null)
const isPlaying = ref(false)
const activeAudio = ref(null)

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

const playPause = (audioSrc) => {
  if (audioRef.value && audioSrc !== activeAudio.value) {
    // Hentikan pemutaran audio sebelumnya jika ada
    if (activeAudio.value) {
      audioRef.value.pause()
    }
    // Mulai memutar audio baru
    audioRef.value.src = audioSrc
    audioRef.value.play()
    isPlaying.value = true
    activeAudio.value = audioSrc
  } else if (audioRef.value && audioSrc === activeAudio.value) {
    // Jeda atau lanjutkan pemutaran audio yang sedang diputar
    if (isPlaying.value) {
      audioRef.value.pause()
    } else {
      audioRef.value.play()
    }
    isPlaying.value = !isPlaying.value
  }
}

const fetchDataSurah = async () => {
  //fetch data
  await api
    .get(`/api/v2/surat/${route.params.nomor}`)

    .then((response) => {
      apiStore.setResponseData(response.data.data)
      surahs.value = response.data.data
      ayats.value = response.data.data.ayat
      siteHead.title = response.data.data.namaLatin + ` - Qur'an Lite Web`
    })
}

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

onMounted(() => {
  fetchDataSurah()
  audioRef.value = new Audio()
  audioRef.value.addEventListener('ended', () => {
    isPlaying.value = false
  })
})

watchEffect(() => {
  fetchDataSurah()
  if (audioRef.value) {
    audioRef.value.addEventListener('ended', () => {
      isPlaying.value = false
    })
  }
})
</script>

<template>
  <div class="bg-[#f7f7f7] dark:bg-slate-950">
    <div class="container py-28">
      <div class="flex justify-between text-primary dark:text-secondary">
        <div class="flex">
          <IconMapPinFilled />
          <span class="text-base ml-2 font-semibold">{{ surahs.tempatTurun }}</span>
        </div>

        <Popper hover openDelay="200" closeDelay="100" content="Detail Surah" class="text-primary dark:text-secondary">
          <button @click="openModal" class="text-primary dark:text-secondary hover:text-alternative font-bold">
            <IconAlertCircle />
          </button>
        </Popper>
      </div>

      <div class="text-center">
        <h1 class="text-3xl font-bold font-arab text-alternative dark:text-secondary">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</h1>
      </div>
      <div v-for="(ayat, index) in ayats" :key="index" class="mt-10 shadow-sm bg-white dark:bg-primary_dark rounded-lg">
        <div :id="'#ayat-' + ayat.nomorAyat" class="w-full flex flex-nowrap p-6 mb-6">
          <div class="mr-4">
            <div class="flex relative">
              <IconStar class="text-primary dark:text-secondary" />
              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center font-bold text-sm">
                {{ ayat.nomorAyat }}
              </div>
            </div>
            <div class="flex text-primary dark:text-secondary mt-2 gap-2 h-full">
              <button @click="playPause(ayat.audio['01'])">
                <span v-if="isPlaying && activeAudio === ayat.audio['01']"><IconPlayerPauseFilled /></span>
                <span v-else><IconPlayerPlayFilled /></span>
              </button>
            </div>
          </div>

          <div class="w-full ml-2">
            <div class="text-right text-2xl font-arab font-semibold leading-relaxed text-alternative dark:text-secondary dark:hover:text-primary hover:text-primary">
              {{ ayat.teksArab }}
            </div>
            <p class="text-lg mt-5 text-right">{{ ayat.teksLatin }}</p>

            <p class="text-base mt-5">{{ ayat.teksIndonesia }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <AudioPlayer />

  <ModalView :isOpen="isModalOpen" @close="closeModal" :nama="surahs.namaLatin" :deskripsi="surahs.deskripsi" />
</template>
