<script setup>
import { ref, onMounted } from "vue";
import supabase from "@/lib/supabaseClient";

const stats = ref(null);
const loading = ref(true);

// Charger les stats
const fetchStats = async () => {
  loading.value = true;
  const { data, error } = await supabase.from("stats").select("*"); // une seule ligne

  if (error) {
    console.error(error);
    return;
  }
  stats.value = data;

  loading.value = false;
};

// Fonction pour update un compteur
const updateCounter = async (id, newValue) => {
  if (newValue < 0) return; // éviter négatif

  const { data, error } = await supabase
    .from("stats")
    .update({ nombre: newValue })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    return;
  }

  // Met à jour localement le tableau stats
  const index = stats.value.findIndex((row) => row.id === id);
  if (index !== -1) stats.value[index] = data;
};

onMounted(fetchStats);
</script>

<template>
  <div class="mt-10 space-y-6">
    <h2 class="text-2xl font-bold text-center">📊 Stats de l'association</h2>

    <div v-if="loading" class="text-center">Chargement...</div>

    <div v-else class="flex flex-row justify-center flex-wrap gap-4">
      <div
        v-for="row in stats"
        :key="row.id"
        class="p-4 bg-white rounded-2xl shadow flex gap-1 justify-between items-center"
      >
        <span class="font-medium"> {{ row.name }} : {{ row.nombre }} </span>
        <div class="space-x-2">
          <button
            class="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
            @click="updateCounter(row.id, row.nombre - 1)"
          >
            –
          </button>
          <button
            class="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
            @click="updateCounter(row.id, row.nombre + 1)"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
