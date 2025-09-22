<template>
  <div class="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow">
    <h2 class="text-2xl font-bold mb-6">Modifier l'article</h2>
    <Spinner v-if="loading" />
    <form @submit.prevent="updateArticle" v-else class="space-y-4">
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

      <!-- Catégorie -->
      <div>
        <label class="block text-sm font-medium mb-1">Catégorie</label>
        <input
          v-model="categorie"
          type="text"
          required
          class="w-full p-2 border rounded-md"
          placeholder="Catégorie de l'article"
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

      <!-- Image principale -->
      <div>
        <label class="block text-sm font-medium mb-1">Image principale</label>
        <input
          type="file"
          accept="image/*"
          @change="handleFileChange"
          class="w-full p-2 border rounded-md"
        />
        <!-- Aperçu -->
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
        Mettre à jour l'article
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
import { ref, onMounted } from "vue";
import supabase from "@/lib/supabaseClient";
import { useRoute } from "vue-router";
import Spinner from "./Spinner.vue";

const route = useRoute();
const articleId = ref<number | null>(null);

const title = ref("");
const content = ref("");
const author = ref("");
const categorie = ref("");
const imageFile = ref<File | null>(null);
const message = ref("");
const errorMessage = ref("");
const loading = ref(true);
const imagePreview = ref<string | null>(null);

// Récupérer l'article au chargement de la page
onMounted(async () => {
  const idParam = route.params.id;
  if (!idParam) return;

  articleId.value = Number(idParam);

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", articleId.value)
    .single();

  if (error) {
    errorMessage.value = "❌ " + error.message;
    return;
  }

  // Pré-remplir le formulaire
  title.value = data.title;
  content.value = data.content;
  author.value = data.author;
  categorie.value = data.categorie;
  imagePreview.value = data.image_url;
  loading.value = false;
});

// Gérer la sélection du fichier
function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    imageFile.value = target.files[0];
    imagePreview.value = URL.createObjectURL(imageFile.value);
  }
}

// Mettre à jour l'article
async function updateArticle() {
  if (!articleId.value) {
    errorMessage.value = "❌ Aucun article sélectionné pour la mise à jour.";
    return;
  }

  message.value = "";
  errorMessage.value = "";

  let imageUrl = "";

  if (imageFile.value) {
    const fileName = `article/${Date.now()}_${imageFile.value.name}`;
    const { error: uploadError } = await supabase.storage
      .from("hima_medias")
      .upload(fileName, imageFile.value);

    if (uploadError) {
      errorMessage.value =
        "❌ Erreur lors de l'upload de l'image : " + uploadError.message;
      return;
    }

    const { data: publicData } = supabase.storage
      .from("hima_medias")
      .getPublicUrl(fileName);
    imageUrl = publicData.publicUrl;
  }

  const updateData: any = {
    title: title.value,
    content: content.value,
    author: author.value,
    categorie: categorie.value,
  };
  if (imageUrl) updateData.image_url = imageUrl;

  const { error } = await supabase
    .from("articles")
    .update(updateData)
    .eq("id", articleId.value);

  if (error) errorMessage.value = "❌ " + error.message;
  else message.value = "✅ Article mis à jour avec succès !";
}
</script>
