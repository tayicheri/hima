<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import supabase from "@/lib/supabaseClient";
import Spinner from "@/components/Spinner.vue";

const isLoading = ref(true);
const articles = ref([]);
const medias = ref({}); // dictionnaire { articleId: [liste médias] }

onMounted(async () => {
  console.log("Fetching articles...");
  fetchArticles();
});

async function fetchArticles() {
  isLoading.value = true;
  const { data: arts, error } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });
  if (!error) {
    articles.value = arts;
    isLoading.value = false;
    // Charger les médias pour chaque article
    for (let a of arts) {
      const { data: m } = await supabase
        .from("article_medias")
        .select("*")
        .eq("article_id", a.id);
      medias.value[a.id] = m || [];
    }
  }
}

async function deleteMedia(id) {
  if (!confirm("Supprimer ce média ?")) return;
  const { error } = await supabase.from("article_medias").delete().eq("id", id);
  if (error) alert(error.message);
  else fetchArticles();
}

// Upload d’un média
async function uploadMedia(articleId, event) {
  const file = event.target.files[0];
  if (!file) return;

  const ext = file.name.split(".").pop();
  const path = `articles/${articleId}/${Date.now()}.${ext}`;

  // Upload dans Storage (bucket "articles")
  const { error: uploadError } = await supabase.storage
    .from("hima_medias")
    .upload(path, file);
  if (uploadError) {
    alert(uploadError.message);
    return;
  }

  // Générer l’URL publique
  const { data } = supabase.storage.from("hima_medias").getPublicUrl(path);
  const publicUrl = data.publicUrl;

  // Déterminer le type
  const type = file.type.startsWith("image")
    ? "image"
    : file.type.startsWith("video")
    ? "video"
    : "pdf";

  // Insérer dans la table articles_media
  const { error: insertError } = await supabase.from("article_medias").insert([
    {
      article_id: articleId,
      url: publicUrl,
      type,
      alt_text: file.name,
    },
  ]);
  if (insertError) {
    alert(insertError.message);
  } else {
    fetchArticles();
  }
}

// Supprimer un article
async function deleteArticle(id) {
  if (!confirm("Supprimer cet article et ses médias ?")) return;
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) alert(error.message);
  else fetchArticles();
}

async function togglePublie(article) {
  const newStatus = !article.publie;

  const { error } = await supabase
    .from("articles") // nom de ta table
    .update({ publie: newStatus })
    .eq("id", article.id);

  if (error) {
    console.error("Erreur lors de la mise à jour :", error);
  } else {
    // Mise à jour locale pour refléter le changement
    article.publie = newStatus;
  }
}
</script>

<template>
  <spinner v-if="isLoading" />

  <div v-else>
    <div v-for="a in articles" :key="a.id" class="border p-4 mb-4 rounded">
      <h3 class="font-bold text-lg">{{ a.title }}</h3>
      <p class="mb-2 line-clamp-2">{{ a.content }}</p>

      <!-- Boutons article -->
      <div class="mb-3 flex flex-row space-x-4">
        <button
          @click="$router.push('/lekeza/update/' + a.id)"
          class="bg-yellow-500 text-white px-2 py-1 mr-2"
        >
          Modifier
        </button>
        <button
          @click="deleteArticle(a.id)"
          class="bg-red-500 text-white px-2 py-1"
        >
          Supprimer
        </button>
        <!-- Switch Publie stylisé -->
        <div class="flex items-center space-x-2">
          <span class="text-sm font-medium text-gray-700">Publié</span>
          <button
            @click="togglePublie(a)"
            :class="a.publie ? 'bg-green-500' : 'bg-gray-300'"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none"
          >
            <span
              :class="a.publie ? 'translate-x-6' : 'translate-x-1'"
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200"
            ></span>
          </button>
        </div>
      </div>

      <!-- Upload média -->
      <input type="file" @change="uploadMedia(a.id, $event)" />

      <!-- Liste médias -->
      <div class="mt-2 grid grid-cols-3 gap-2">
        <div v-for="m in medias[a.id]" :key="m.id" class="border p-2">
          <img
            v-if="m.type === 'image'"
            :src="m.url"
            class="w-full h-32 object-cover"
          />
          <video v-if="m.type === 'video'" controls class="w-full h-32">
            <source :src="m.url" type="video/mp4" />
          </video>
          <a
            v-if="m.type === 'pdf'"
            :href="m.url"
            target="_blank"
            class="text-blue-600 underline"
            >📄 {{ m.alt_text }}</a
          >
          <button
            @click="deleteMedia(m.id)"
            class="bg-red-500 text-white px-2 py-1 mt-1 w-full"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
