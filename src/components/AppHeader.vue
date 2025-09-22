<template>
  <header
    class="bg-gray-800 text-white w-full flex items-center justify-center"
  >
    <div class="text-center h-screen flex flex-col justify-between pb-2">
      <!-- Logo -->
      <div class="h-[70%]">
        <img
          src="/hima_dark_no_bg.png"
          alt="Logo de l'association"
          class="w-full h-full object-contain"
        />
      </div>

      <!-- Navigation -->
      <div class="">
        <nav class="mb-8 flex flex-wrap items-center justify-center gap-4">
          <a href="#accueil" class="text-lg mx-4 hover:text-blue-400"
            >Accueil</a
          >
          <a href="#actions" class="text-lg mx-4 hover:text-blue-400"
            >Projets</a
          >
          <a href="#contact" class="text-lg mx-4 hover:text-blue-400"
            >Contact</a
          >
          <a
            href="#donation"
            class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-400 transition"
            >Adhérer</a
          >
        </nav>
      </div>
      <ChevronScroll />
    </div>
  </header>
</template>
<script setup lang="ts">
import ChevronScroll from "@/components/ChevronScroll.vue";
</script>

<style scoped></style>
