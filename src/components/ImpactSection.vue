<template>
  <section id="impact" class="py-16 bg-gray-100">
    <div class="container mx-auto px-6">
      <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">
        Notre impact
      </h2>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center"
      >
        <div
          class="flex flex-col items-center bg-white shadow-md p-6 rounded-xl"
        >
          <i class="fas fa-utensils text-4xl text-green-600 mb-3"></i>
          <div class="text-3xl font-bold text-gray-800">{{ stats.repas }}+</div>
          <div class="text-gray-600">Repas distribués</div>
        </div>

        <div
          class="flex flex-col items-center bg-white shadow-md p-6 rounded-xl"
        >
          <i class="fas fa-graduation-cap text-4xl text-blue-600 mb-3"></i>
          <div class="text-3xl font-bold text-gray-800">
            {{ stats.student }}+
          </div>
          <div class="text-gray-600">Jeunes formés</div>
        </div>

        <div
          class="flex flex-col items-center bg-white shadow-md p-6 rounded-xl"
        >
          <i class="fas fa-tree text-4xl text-green-700 mb-3"></i>
          <div class="text-3xl font-bold text-gray-800">{{ stats.plant }}+</div>
          <div class="text-gray-600">Arbres plantés</div>
        </div>

        <div
          class="flex flex-col items-center bg-white shadow-md p-6 rounded-xl"
        >
          <i class="fas fa-hand-holding-heart text-4xl text-red-600 mb-3"></i>
          <div class="text-3xl font-bold text-gray-800">
            {{ stats.benevole }}+
          </div>
          <div class="text-gray-600">Bénévoles actifs</div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import supabase from "@/lib/supabaseClient";

interface Stats {
  action: number;
  island: number;
  benevole: number;
  family: number;
  repas: number;
  plant: number;
  student: number;
}

// Valeurs initiales (par défaut)
const stats = ref<Stats>({
  action: 0,
  island: 0,
  benevole: 0,
  family: 0,
  repas: 0,
  plant: 0,
  student: 0,
});
const loading = ref(true);

onMounted(async () => {
  try {
    loading.value = true;
    const { data, error } = await supabase.from("stats").select("*");

    if (error) {
      console.error(error);
      return;
    }

    const dataM: Record<string, number> = {};
    data.forEach((item) => {
      dataM[item.name] = item.nombre;
    });

    stats.value = {
      action: dataM.action ?? 0,
      island: dataM.island ?? 0,
      benevole: dataM.benevole ?? 0,
      family: dataM.family ?? 0,
      repas: dataM.repas ?? 0,
      plant: dataM.plant ?? 0,
      student: dataM.student ?? 0,
    };
    loading.value = false;
  } catch (err) {
    console.error("Erreur récupération des data About Us:", err);
  }
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
