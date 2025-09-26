<template>
  <div class="inline-block">
    <!-- Image normale -->
    <img
      :src="src"
      :alt="alt"
      class="cursor-pointer hover:opacity-80 transition-opacity duration-200"
      @click="isOpen = true"
    />

    <!-- Overlay via teleport dans body -->
    <teleport to="body">
      <div
        v-show="isOpen"
        class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[9999] transition-opacity duration-300"
        @click.self="isOpen = false"
      >
        <img
          :src="src"
          :alt="alt"
          class="max-h-full max-w-full rounded shadow-lg"
        />
        <button
          class="absolute top-4 right-4 text-white text-3xl font-bold"
          @click.stop="isOpen = false"
        >
          &times;
        </button>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from "vue";

defineProps<{
  src: string;
  alt?: string;
}>();
const isOpen = ref(false);
</script>
