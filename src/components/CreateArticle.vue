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
      <!-- Categorie -->
      <div>
        <label class="block text-sm font-medium mb-1">Catégorie</label>
        <input
          v-model="categorie"
          type="text"
          required
          class="w-full p-2 border rounded-md"
          placeholder="Categorie de l'article"
        />
      </div>

      <!-- Contenu avec CKEditor -->
      <div>
        <label class="block text-sm font-medium mb-1">Contenu</label>
        <Editor v-model="content" />
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

      <!-- Image principale -->
      <div>
        <label class="block text-sm font-medium mb-1">Image principale</label>
        <input
          type="file"
          accept="image/*"
          @change="handleFileChange"
          class="w-full p-2 border rounded-md"
        />
        <div v-if="imagePreview" class="mt-2">
          <img
            :src="imagePreview"
            class="w-48 h-48 object-cover rounded-md border"
          />
        </div>
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
import Editor from "@/Editor.vue";

const title = ref("");
const content = ref("");
const author = ref("");
const imageFile = ref<File | null>(null);
const message = ref("");
const categorie = ref("");
const errorMessage = ref("");
const imagePreview = ref<string | null>(null);

// Gérer la sélection du fichier
function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    imageFile.value = target.files[0];
    imagePreview.value = URL.createObjectURL(imageFile.value);
  }
}

async function createArticle() {
  message.value = "";
  errorMessage.value = "";

  let imageUrl = "";

  // Upload image si sélectionnée
  if (imageFile.value) {
    const fileName = `articles/${Date.now()}`;
    const { error: uploadError } = await supabase.storage
      .from("hima_medias")
      .upload(fileName, imageFile.value);

    if (uploadError) {
      errorMessage.value =
        "❌ Erreur lors de l'upload de l'image : " + uploadError.message;
      return;
    }

    // Obtenir l'URL publique
    const { data: publicData } = supabase.storage
      .from("hima_medias")
      .getPublicUrl(fileName);
    imageUrl = publicData.publicUrl;
  }

  const { error } = await supabase.from("articles").insert([
    {
      title: title.value,
      content: content.value,
      author: author.value,
      categorie: categorie.value,
      image_url: imageUrl, // Assure-toi que la colonne existe dans ta table
    },
  ]);

  if (error) {
    errorMessage.value = "❌ " + error.message;
  } else {
    message.value = "✅ Article créé avec succès !";
    title.value = "";
    content.value = "";
    author.value = "";
    imageFile.value = null;
  }
}
</script>
