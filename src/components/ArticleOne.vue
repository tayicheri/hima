<!-- pages/ArticleDetail.vue -->
<template>
  <section class="py-16 bg-gray-100 min-h-screen">
    <div class="container mx-auto px-4">
      <div v-if="loading" class="text-center text-gray-500">Chargement...</div>
      <div v-else-if="article" class="bg-white p-8 rounded-lg shadow-lg">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">
          {{ article.title }}
        </h1>
        <p class="text-gray-600 mb-6">{{ article.categorie }}</p>
        <img
          v-if="article.image_url"
          :src="article.image_url"
          alt="Image article"
          class="w-full h-72 object-cover rounded-lg mb-6"
        />
        <div class="prose max-w-none" v-html="article.content"></div>
        <ListPhoto :article_id="article.id" class="mt-8" />
      </div>
      <div v-else class="text-center text-red-500">Article introuvable</div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import ListPhoto from "@/components/ListPhoto.vue";
import supabase from "@/lib/supabaseClient";

interface Article {
  id: number;
  title: string;
  content: string;
  categorie: string;
  image_url: string;
}

const route = useRoute();
const router = useRouter();
const article = ref<Article | null>(null);
const loading = ref(true);

// Fonction pour extraire l'id de l'URL "titre-id"
function extractIdFromSlug(slug: string): number | null {
  const parts = slug.split("-");
  const idStr = parts[parts.length - 1];
  const id = parseInt(idStr, 10);
  return isNaN(id) ? null : id;
}

// Récupérer l'article depuis Supabase
async function fetchArticle() {
  const slug = route.params.titre as string;

  const id = extractIdFromSlug(slug);
  if (!id) {
    loading.value = false;
    router.push("/404");
    return;
  }

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .eq("publie", true)
    .single();

  if (error) {
    console.error("Erreur Supabase:", error.message);
    loading.value = false;
    router.push("/404"); // 👈 redirection vers ta page 404
    return;
  }
  console.log(data);

  if (!data) {
    loading.value = false;
    router.push("/404"); // 👈 redirection vers ta page 404
    return;
  }

  article.value = data;
  loading.value = false;
  scrollToNextSection();
}
const scrollToNextSection = () => {
  // Défiler de 100vh
  window.scrollBy({
    top: window.innerHeight, // Défiler de 100vh
    behavior: "smooth", // Ajoute un défilement fluide
  });
};
onMounted(() => {
  fetchArticle();
});
</script>

<style scoped>
/* Exemple de style supplémentaire */
.prose img {
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}
</style>
