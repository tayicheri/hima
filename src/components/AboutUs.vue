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
  </section>
</template>

<script setup lang="ts">
// Aucun script particulier nécessaire ici, le contenu est statique
</script>

<style scoped>
/* Optionnel : ajouter un style spécifique si besoin */
</style>
