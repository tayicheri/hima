<template>
  <div class="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow">
    <h2 class="text-2xl font-bold mb-6">Créer un article</h2>

    <form @submit.prevent="createArticle" class="space-y-4">
      <!-- Titre -->
      <div>
        <label class="block text-sm font-medium mb-1">Titre</label>
        <input
          v-model="title"
          type="text"
          required
          class="w-full p-2 border rounded-md"
          placeholder="Titre de l'article"
        />
      </div>

      <!-- Contenu -->
      <div>
        <label class="block text-sm font-medium mb-1">Contenu</label>
        <textarea
          v-model="content"
          rows="5"
          required
          class="w-full p-2 border rounded-md"
          placeholder="Rédigez votre contenu ici..."
        ></textarea>
      </div>

      <!-- Auteur -->
      <div>
        <label class="block text-sm font-medium mb-1">Auteur</label>
        <input
          v-model="author"
          type="text"
          class="w-full p-2 border rounded-md"
          placeholder="Nom de l'auteur"
        />
      </div>

      <!-- Bouton -->
      <button
        type="submit"
        class="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
      >
        Publier l'article
      </button>
    </form>

    <!-- Message de confirmation ou erreur -->
    <p v-if="message" class="mt-4 text-center text-green-600 font-medium">
      {{ message }}
    </p>
    <p v-if="errorMessage" class="mt-4 text-center text-red-600 font-medium">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import supabase from "@/lib/supabaseClient";

const title = ref("");
const content = ref("");
const author = ref("");
const message = ref("");
const errorMessage = ref("");

async function createArticle() {
  message.value = "";
  errorMessage.value = "";

  const { data, error } = await supabase.from("articles").insert([
    {
      title: title.value,
      content: content.value,
      author: author.value,
    },
  ]);

  if (error) {
    errorMessage.value = "❌ " + error.message;
  } else {
    message.value = "✅ Article créé avec succès !";
    title.value = "";
    content.value = "";
    author.value = "";
  }
}
</script>
