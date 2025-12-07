<!-- pages/ArticleDetail.vue -->
<template>
  <section class="py-16 bg-gray-100 min-h-screen">
    <div class="container mx-auto px-4">
      <div v-if="loading" class="text-center text-gray-500">Chargement...</div>
      <div v-else-if="article" class="bg-white p-8 rounded-lg shadow-lg">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">
          {{ article.title }}
        </h1>
        <p class="text-gray-600 italic mb-6">{{ article.categorie }}</p>
        <img
          v-if="article.image_url"
          :src="article.image_url"
          alt="Image article"
          class="w-full h-72 object-cover rounded-lg mb-6"
          loading="lazy"
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
import { useHead } from "@vueuse/head";
import { slugify } from "@/utils/string";

interface Article {
  id: number;
  title: string;
  content: string;
  categorie: string;
  image_url: string;
  author: string;
  created_at: string;
  link: string;
  meta_description: string;
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

  if (!data) {
    loading.value = false;
    router.push("/404"); // 👈 redirection vers ta page 404
    return;
  }

  const link = `/articles/${slugify(data.categorie)}/${slugify(data.title)}-${
    data.id
  }`;

  article.value = {
    ...data,
    link,
  };

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

useHead(() => {
  if (!article.value) return {}; // ne rien injecter tant que les données ne sont pas prêtes
  console.log(article.value);

  return {
    title: `${article.value.title} - HIMA`,
    meta: [
      {
        name: "description",
        content:
          article.value.meta_description || "Découvrez notre article sur HIMA.",
      },
    ],
    script: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article", // ou "NewsArticle" si actualité
          headline: article.value.title,
          image: article.value.image_url, // URL de l'image principale
          datePublished: article.value.created_at,
          author: {
            "@type": "Person",
            name: article.value.author || "HIMA Association",
          },
          publisher: {
            "@type": "Organization",
            name: "HIMA",
            logo: {
              "@type": "ImageObject",
              url: "https://hima-narihimepvoidzima.fr/hima_dark_no_bg.png",
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://hima-narihimepvoidzima.fr${article.value.link}`,
          },
        }),
      },
    ],
  };
});
</script>

<style scoped>
/* Exemple de style supplémentaire */
.prose img {
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}
</style>
