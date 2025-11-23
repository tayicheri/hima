<template>
  <div>
    <h2 class="text-2xl text-center font-bold mb-6 text-gray-800">Articles</h2>
    <Card
      v-if="articles.length !== 0"
      v-for="article in articles"
      :key="article.id"
      :title="article.title"
      :content="article.content"
      :image_url="article.image_url"
      :link="article.link"
    />
    <p v-else class="text-gray-500 text-center mb-6">Aucun article trouvé.</p>
  </div>
</template>
<script setup lang="ts">
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
</script>
