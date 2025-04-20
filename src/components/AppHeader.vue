<template>
  <header class="bg-gray-800 text-white w-full flex items-center justify-center">
    <div class="text-center">
      <!-- Logo -->
      <div class="h-screen">
        <img src="/hima_dark_no_bg.png" alt="Logo de l'association" class="w-full h-full object-contain" />
      </div>

      <!-- Navigation -->
      <div class="flex flex-col absolute bottom-0 left-0 right-0 p-4">
        <nav class="mb-8">
          <a href="#accueil" class="text-lg mx-4 hover:text-blue-400">Accueil</a>
          <a href="#projets" class="text-lg mx-4 hover:text-blue-400">Projets</a>
          <a href="#contact" class="text-lg mx-4 hover:text-blue-400">Contact</a>
        </nav>

        <!-- Call to Action Button -->
        <div>
          <button @click="handleCTA" class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-400 transition">Adhérer</button>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
const handleCTA = () => {
  console.log("tay");
};
</script>

<style scoped></style>
