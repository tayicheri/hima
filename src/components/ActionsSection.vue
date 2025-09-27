<template>
  <section v-if="articles.length" id="actions" class="bg-gray-100 py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-semibold text-center text-gray-800 mb-12">
        Decouvrez nos Actions
      </h2>

      <div class="relative">
        <!-- Dégradé gauche -->
        <div
          v-if="canScrollLeft"
          class="absolute inset-y-0 left-0 bg-gradient-to-l from-transparent via-transparent to-gray-100 z-10 pointer-events-none"
          style="width: 100px"
        ></div>
        <!-- Dégradé droit -->
        <div
          v-if="canScrollRight"
          class="absolute inset-y-0 right-0 bg-gradient-to-r from-transparent via-transparent to-gray-100 z-10 pointer-events-none"
          style="width: 100px"
        ></div>
        <!-- Conteneur scrollable -->
        <div
          ref="scrollContainer"
          class="flex overflow-x-auto space-x-8 pb-4"
          @scroll="handleScroll"
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
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import Card from "@/components/Card.vue";
import supabase from "@/lib/supabaseClient";

const scrollContainer = ref<HTMLElement | null>(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(true);

const handleScroll = () => {
  if (scrollContainer.value) {
    const container = scrollContainer.value;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    canScrollLeft.value = scrollLeft > 0;
    canScrollRight.value = scrollLeft + clientWidth < scrollWidth;
  }
};

onMounted(() => {
  nextTick(() => {
    handleScroll();
  });
});
const articles = ref<any[]>([]);
// 🔥 Récupération depuis Supabase
const fetchProjects = async () => {
  const { data, error } = await supabase
    .from("articles")
    .select("id, title,categorie, content, image_url")
    .eq("publie", true)
    .eq("type", "article")
    .order("id", { ascending: false });

  if (error) {
    console.error("Erreur fetch articles:", error.message);
    return;
  }
  articles.value =
    data?.map((a) => ({
      ...a,
      link: `/articles/${slugify(a.categorie)}/${slugify(a.title)}-${a.id}`,
    })) || [];
};
// 🔠 Fonction pour slugifier une chaîne
function slugify(str: string) {
  return str
    .toString()
    .normalize("NFD") // enlever les accents
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // remplacer tout ce qui n'est pas alphanum par "-"
    .replace(/^-+|-+$/g, ""); // enlever les "-" en début/fin
}

onMounted(async () => {
  await fetchProjects();
  nextTick(() => {
    handleScroll();
  });
});
</script>

<style scoped>
/* Ajout d'un style pour masquer la barre de défilement */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
