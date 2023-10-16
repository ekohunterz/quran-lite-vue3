<script setup>
import { onMounted, onBeforeMount, ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { IconSunHigh, IconMoon } from '@tabler/icons-vue'

const isDark = useDark()
const isScrolled = ref('')
const isMenuOpen = ref(false)
const toggleDark = useToggle(isDark)

const handleScroll = () => {
  if (window.scrollY > 50) {
    isScrolled.value = true
  } else {
    isScrolled.value = false
  }
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeMount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div
    :class="{
      'bg-opacity-80 dark:bg-primary_dark  bg-primary backdrop-blur-sm border-b-gray-400 shadow-sm': isScrolled,
      'bg-primary dark:bg-primary_dark': !isScrolled
    }"
    class="pt-4 pb-3 z-10 fixed top-0 right-0 left-0 transition-all duration-300"
  >
    <div class="container flex justify-between items-center">
      <router-link to="/" class="text-white font-bold text-xl hover:cursor-pointer"> Qur'an Lite </router-link>
      <!-- <div class="lg:hidden">
        <button @click="toggleMenu" class="text-white focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            width="28px"
            height="28px"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
          </svg>
        </button>
      </div> -->
      <div class="md:flex space-x-4">
        <!-- <router-link to="/about" class="text-white text-lg font-semibold hover:text-gray-300"
          >About</router-link
        > -->

        <button v-if="!isDark" @click="toggleDark()" class="text-white hover:bg-teal-600 ease-in-out transition duration-300 rounded-full p-2">
          <IconMoon />
        </button>
        <button v-else @click="toggleDark()" class="text-white hover:bg-alternative ease-in-out transition duration-300 rounded-full p-2">
          <IconSunHigh />
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile menu (hidden by default) -->
  <div v-if="isMenuOpen" class="fixed top-0 right-0 left-0 z-[1] md:hidden pt-24 bg-primary container pb-3">
    <button v-if="!isDark" @click="toggleDark()" class="text-white">
      <IconMoon />
    </button>
    <button v-else @click="toggleDark()" class="text-white">
      <IconSunHigh />
    </button>
    <router-link to="/about" class="block text-white text-lg font-semibold py-2 hover:text-secondary">About</router-link>
  </div>
</template>
