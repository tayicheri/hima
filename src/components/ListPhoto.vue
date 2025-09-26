<template>
  <div class="w-full">
    <div v-if="loading" class="text-gray-500">Chargement des photos...</div>

    <div v-else class="flex space-x-4 overflow-x-auto py-2 scrollbar-hide">
      <div
        v-for="(photo, index) in photos"
        :key="index"
        class="flex-none w-56 h-56 rounded-xl overflow-hidden shadow-lg hover:scale-105 transform transition duration-300"
      >
        <!-- <img
          :src="photo.url"
          :alt="photo.alt_text || `Photo ${index + 1}`"
          class="w-full h-full object-cover"
        /> -->
        <FullScreenPhoto
          :src="photo.url"
          :alt="photo.alt_text || `Photo ${index + 1}`"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import supabase from "@/lib/supabaseClient";
import FullScreenPhoto from "./FullScreenPhoto.vue";

// Props
const { article_id } = defineProps({
  article_id: {
    type: Number,
    required: true,
  },
});

const photos = ref([]);
const loading = ref(true);

const fetchPhotos = async () => {
  try {
    // Récupérer les médias liés à l'article
    const { data, error } = await supabase
      .from("article_medias")
      .select("*")
      .eq("article_id", article_id);

    if (error) throw error;

    photos.value = data || [];
  } catch (err) {
    console.error("Erreur lors de la récupération des photos :", err.message);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchPhotos();
});
</script>

<style>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
