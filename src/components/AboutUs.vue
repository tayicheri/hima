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
import { onMounted, ref } from "vue";
import FullScreenPhoto from "./FullScreenPhoto.vue";
import supabase from "@/lib/supabaseClient";

interface Photo {
  url: string;
  alt_text?: string;
  article_id: number;
}
const photos = ref<Photo[]>([]);

onMounted(async () => {
  try {
    // 1️⃣ Récupérer les articles type "aboutus"
    const { data: articles, error: articleError } = await supabase
      .from("articles")
      .select("id")
      .eq("type", "aboutus");

    if (articleError) throw articleError;
    if (!articles || articles.length === 0) return;

    const articleIds = articles.map((a: any) => a.id);

    // 2️⃣ Récupérer les médias correspondants
    const { data: medias, error: mediaError } = await supabase
      .from("article_medias")
      .select("url, alt_text, article_id")
      .in("article_id", articleIds);

    if (mediaError) throw mediaError;

    // 3️⃣ Stocker dans photos
    photos.value =
      medias?.map((m: any) => ({
        url: m.url, // si le champ est une URL publique déjà stockée
        alt_text: m.alt_text,
        article_id: m.article_id,
      })) || [];
  } catch (err) {
    console.error("Erreur récupération des photos About Us:", err);
  }
});

// Aucun script particulier nécessaire ici, le contenu est statique
</script>

<style scoped>
/* Optionnel : ajouter un style spécifique si besoin */
</style>
