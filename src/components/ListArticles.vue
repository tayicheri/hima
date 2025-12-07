<template>
  <div class="relative">
    <h2 class="text-2xl text-center font-bold mb-6 text-gray-800">Articles</h2>
    <button
      @click="goBack"
      class="flex absolute top-3 right-5 items-center px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
    >
      ← Retour
    </button>
    <div
      v-if="articles.length !== 0"
      class="flex justify-center flex-wrap gap-6"
    >
      <Card
        v-for="article in articles"
        :key="article.id"
        :title="article.title"
        :content="article.content"
        :image_url="article.image_url"
        :link="article.link"
      />
    </div>
    <p v-else class="text-gray-500 text-center mb-6">Aucun article trouvé.</p>
  </div>
</template>
<script setup lang="ts">
import { useHead } from "@vueuse/head";
import Card from "./Card.vue";
const { articles } = defineProps<{
  articles: {
    id: number;
    title: string;
    content: string;
    image_url: string;
    link: string;
  }[];
}>();
const emit = defineEmits<{
  (e: "go-back"): void;
}>();
const goBack = () => emit("go-back");

useHead(() => ({
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Articles - HIMA",
        url: "https://hima-narihimepvoidzima.fr/articles",
        description:
          "Parcourez nos articles, actualités et actions humanitaires réalisées par l’association HIMA.",
        hasPart: {
          "@type": "ItemList",
          itemListElement: articles.value.map((article, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Article",
              headline: article.title,
              url: `https://hima-narihimepvoidzima.fr/articles/${article.slug}`,
              datePublished: article.publishedAt,
              image: article.cover,
            },
          })),
        },
      }),
    },
  ],
}));
</script>
