<template>
  <section class="w-full max-w-5xl mx-auto py-10">
    <h2 class="text-2xl text-center font-bold mb-6 text-gray-800">
      Catégories
    </h2>

    <!-- Loading -->
    <div v-if="loading" class="text-center text-gray-500">Chargement...</div>

    <!-- Error -->
    <div v-if="error" class="text-center text-red-600">
      Erreur lors du chargement
    </div>

    <!-- Categories -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <button
        @click="select('all')"
        class="bg-white shadow-md rounded-xl p-4 flex items-center justify-center text-center hover:bg-green-100 hover:scale-105 transition transform cursor-pointer"
      >
        <span class="font-semibold text-gray-700"> tous </span>
      </button>
      <button
        v-for="cat in categories"
        :key="cat.id"
        @click="select(cat.categorie)"
        class="bg-white shadow-md rounded-xl p-4 flex items-center justify-center text-center hover:bg-green-100 hover:scale-105 transition transform cursor-pointer"
      >
        <span class="font-semibold text-gray-700">
          {{ cat.categorie }}
        </span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import supabase from "@/lib/supabaseClient";

const emit = defineEmits(["select-category"]);

const categories = ref<Array<{ id: number; categorie: string }>>([]);
const loading = ref(true);
const error = ref(false);

const select = (cat: string) => {
  emit("select-category", cat);
};

onMounted(async () => {
  const { data, error: err } = await supabase
    .from("articles")
    .select("id, categorie")
    .eq("publie", true)
    .eq("type", "article");

  if (err) {
    error.value = true;
    return;
  }

  // remove duplicates
  categories.value = Array.from(
    new Map(data.map((a) => [a.categorie, a])).values()
  );

  loading.value = false;
});
</script>
