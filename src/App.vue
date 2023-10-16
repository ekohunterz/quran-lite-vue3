<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <main class="dark:bg-slate-800 dark:text-secondary">
    <NavBar />
    <RouterView />
  </main>
</template>
