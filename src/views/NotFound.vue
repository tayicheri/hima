<!-- NotFound.vue -->
<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-5xl font-bold mb-4">404</h1>
    <p class="text-xl mb-4">Page non trouvée</p>
    <router-link to="/" class="text-blue-600 underline"
      >Retour à l'accueil</router-link
    >
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>
