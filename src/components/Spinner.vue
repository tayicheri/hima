<template>
  <div class="flex justify-center items-center h-64">
    <div
      :class="[
        'w-16 h-16 border-4 border-t-transparent rounded-full animate-spin',
        colorClass,
      ]"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";

const props = defineProps({
  color: {
    type: String,
    default: "border-blue-500",
  },
});

const colorClass = computed(() => props.color);
</script>

<style scoped>
/* Pas nécessaire si tu utilises Tailwind v3+ */
</style>
