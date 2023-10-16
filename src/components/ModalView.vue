<script setup>
import { IconX } from '@tabler/icons-vue'
import { defineEmits } from 'vue'

const emit = defineEmits(['close'])

const props = defineProps({
  isOpen: Boolean,
  nama: String,
  deskripsi: String
})
</script>

<template>
  <!-- Modal -->
  <Transition>
    <div
      v-if="props.isOpen"
      class="fixed inset-0 flex items-center backdrop-blur-sm justify-center z-50"
    >
      <!-- Latar belakang gelap saat modal terbuka -->
      <div
        @click="emit('close')"
        class="modal-overlay fixed inset-0 bg-gray-100 dark:bg-teal-950 opacity-80"
      ></div>

      <!-- Konten Modal -->
      <div
        class="modal-container bg-white dark:bg-primary_dark lg:w-1/2 lg:h-auto custom-scrollbar overflow-auto max-h-[60%] w-2/3 mx-auto p-6 rounded shadow-lg z-50"
      >
        <div class="p-6">
          <div class="mb-6 flex items-center justify-between">
            <h4 class="text-xl font-semibold dark:text-white">Detail Surah</h4>
            <button @click="emit('close')"><IconX /></button>
          </div>
          <p
            v-html="deskripsi"
            class="whitespace-pre-wrap text-sm !leading-8 text-black dark:text-secondary md:text-base"
          ></p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Gaya untuk overlay modal */
.modal-overlay {
  z-index: 49;
}

/* Gaya untuk modal */
.modal-container {
  z-index: 50;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
