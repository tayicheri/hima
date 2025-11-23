<!-- ArticleSection.vue -->
<template>
  <section class="bg-gray-50 py-12">
    <div class="max-w-6xl mx-auto px-4">
      <!-- Titre de la section -->
      <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
        Nos Articles
      </h2>

      <!-- Input de recherche -->
      <div class="mb-8 flex justify-center">
        <input
          type="text"
          v-model="query"
          @input="searchArticles"
          placeholder="Rechercher un article..."
          class="w-full sm:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <!-- États -->
      <div v-if="loading" class="text-gray-500 text-center mb-6">
        Chargement...
      </div>
      <div v-else-if="error" class="text-red-500 text-center mb-6">
        {{ error }}
      </div>

      <!-- Liste des articles -->
      <div v-else>
        <div
          v-if="articles.length === 0"
          class="text-gray-500 text-center mb-6"
        >
          Aucun article trouvé.
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="article in articles"
            :key="article.id"
            @click="goToArticle(article.id)"
            class="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300 flex flex-col"
          >
            <img
              :src="article.image_url"
              alt="Article"
              class="w-full h-40 object-cover"
            />
            <div class="p-4 flex flex-col flex-grow">
              <h3 class="text-lg font-bold text-gray-800 mb-2">
                {{ article.title }}
              </h3>
              <p class="text-gray-600 line-clamp-3 mb-4">
                {{ article.content }}
              </p>
              <span class="text-sm text-green-600 mt-auto"
                >Lire la suite &rarr;</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import supabase from "@/lib/supabaseClient";

const query = ref("");
const articles = ref([]);
const loading = ref(false);
const error = ref(null);

const searchArticles = async () => {
  loading.value = true;
  error.value = null;

  try {
    const { data, error: supaError } = await supabase
      .from("articles")
      .select("id, title, content, image_url")
      .ilike("title", `%${query.value}%`)
      .eq("publie", true)
      .eq("type", "article")
      .order("id", { ascending: false })
      .limit(20);

    if (supaError) throw supaError;

    articles.value = data;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const goToArticle = (id) => {
  window.location.href = `/article/${id}`;
};

// Charger les articles initiaux
searchArticles();
</script>
