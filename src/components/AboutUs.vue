<!-- components/AboutUs.vue -->
<template>
  <section class="bg-gray-50 py-16">
    <div
      class="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12"
    >
      <!-- Texte -->
      <div class="flex-1">
        <h2 class="text-4xl text-center font-bold text-gray-800 mb-6">
          Qui sommes-nous ?
        </h2>
        <p class="text-gray-600 text-center mb-6 leading-relaxed">
          HIMA est une association à but non lucratif basée aux Comores, dédiée
          à l’aide sociale et au soutien des personnes dans le besoin. Depuis sa
          création, nous nous engageons à améliorer les conditions de vie de
          notre communauté à travers des actions concrètes et durables.
        </p>

        <ul class="space-y-4 flex justify-center flex-wrap">
          <li class="flex items-start">
            <span class="text-green-500 mr-3 text-xl">✔</span>
            Distribution de nourriture et de vêtements aux familles démunies.
          </li>
          <li class="flex items-start">
            <span class="text-green-500 mr-3 text-xl">✔</span>
            Organisation d’ateliers éducatifs et culturels pour les jeunes.
          </li>
          <li class="flex items-start">
            <span class="text-green-500 mr-3 text-xl">✔</span>
            Sensibilisation aux problématiques sociales et environnementales.
          </li>
        </ul>
      </div>
    </div>
    <div class="w-full flex px-4 justify-center">
      <div class="flex space-x-4 overflow-x-auto py-2 scrollbar-hide">
        <div
          v-for="(photo, index) in photos"
          :key="index"
          class="flex-none w-56 h-56 rounded-xl overflow-hidden shadow-lg hover:scale-105 transform transition duration-300"
        >
          <FullScreenPhoto
            :src="photo.url"
            :alt="photo.alt_text || `Photo ${index + 1}`"
          />
          <!-- <img
            :src="photo.url"
            :alt="photo.alt_text || `Photo ${index + 1}`"
            class="w-full h-full object-cover"
          /> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FullScreenPhoto from "./FullScreenPhoto.vue";

const photos = ref([
  {
    url: new URL("@/assets/about-us/about1.png", import.meta.url).href,
    alt_text: "Photo 1",
  },
  {
    url: new URL("@/assets/about-us/about2.png", import.meta.url).href,
    alt_text: "Photo 2",
  },
  {
    url: new URL("@/assets/about-us/about3.png", import.meta.url).href,
    alt_text: "Photo 3",
  },
]);
// Aucun script particulier nécessaire ici, le contenu est statique
</script>

<style scoped>
/* Optionnel : ajouter un style spécifique si besoin */
</style>
