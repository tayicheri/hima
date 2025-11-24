<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-teal-200 via-pink-100 to-pink-200 text-gray-800 px-6 relative"
  >
    <div
      class="bg-white bg-opacity-80 rounded-3xl shadow-2xl p-10 max-w-xl text-center"
    >
      <h1 class="text-8xl font-extrabold text-rose-500">404</h1>
      <h2 class="text-2xl md:text-3xl font-semibold text-teal-700 mt-4">
        Oups ! Page introuvable
      </h2>
      <p class="mt-6 text-lg md:text-xl leading-relaxed">
        Vous cherchiez une page pour soutenir notre action aux Comores ?<br />
        Ne vous inquiétez pas, vous pouvez revenir à notre page d’accueil et
        continuer à explorer !
      </p>

      <!-- Illustrations avec emojis -->
      <div class="mt-8 text-4xl space-x-4">🌴 🚤 🇰🇲</div>

      <router-link
        to="/"
        class="mt-8 inline-block bg-teal-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-teal-800 transition-colors"
      >
        Retour à l'accueil
      </router-link>

      <div class="mt-6 text-sm text-gray-500">
        Association HIMA - Aide aux Comores
      </div>

      <!-- Texte discret caché -->
      <div
        class="absolute bottom-2 right-2 text-[0.6rem] text-gray-400 select-none pointer-events-none"
      >
        Membre fondateur Hima, Nabishop et Tonton Tay
      </div>
    </div>
  </div>
</template>

<script setup>
// Aucun script nécessaire
</script>
