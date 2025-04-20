<!-- components/Card.vue -->
<template>
  <div class="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0">
    <img :src="imageSrc" alt="Projet" class="w-full h-40 object-cover rounded-t-lg mb-4" />
    <h3 class="text-xl font-bold text-gray-800">{{ title }}</h3>
    <p class="text-gray-600 mb-4">{{ description }}</p>
    <a :href="link" class="text-blue-500 hover:text-blue-700">En savoir plus &rarr;</a>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
/* Tu peux ajouter des styles supplémentaires pour ce composant si nécessaire */
</style>
