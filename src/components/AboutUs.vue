<!-- components/AboutUs.vue -->
<template>
  <section id="about" class="py-16 bg-gray-50">
    <h1 class="text-4xl font-bold text-center mt-3 mb-3">Association HIMA</h1>
    <div class="max-w-6xl mx-auto px-6">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-800">Qui sommes-nous ?</h2>
      </div>

      <div class="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h3 class="text-xl font-semibold text-gray-700 mb-4">
            Notre engagement pour les Comores
          </h3>
          <p class="text-gray-600 mb-4">
            HIMA est une association à but non lucratif basée aux Comores,
            dédiée à l'aide sociale et au soutien des personnes dans le besoin.
            Depuis sa création, nous nous engageons à améliorer les conditions
            de vie de notre communauté à travers des actions concrètes et
            durables.
          </p>
          <p class="text-gray-600 mb-6">
            Notre mission s'articule autour de trois axes principaux : l'aide
            d'urgence aux familles démunies, l'éducation et la formation des
            jeunes, et la préservation de la culture comorienne.
          </p>

          <div v-if="loading" class="flex justify-center gap-6">
            <spinner color="border-green-500" />
          </div>
          <div v-else class="flex gap-6">
            <div class="text-center">
              <div class="text-3xl font-bold text-[#00610B]">
                {{ stats.family }}+
              </div>
              <div class="text-sm text-gray-600">Familles aidées</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-[#00610B]">
                {{ stats.action }}+
              </div>
              <div class="text-sm text-gray-600">Ateliers organisés</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-[#00610B]">
                {{ stats.island }}
              </div>
              <div class="text-sm text-gray-600">Îles d'intervention</div>
            </div>
          </div>
        </div>

        <div>
          <img
            class="rounded-xl shadow-lg w-full object-cover"
            src="@/assets/about-us/mainreunicomos.png"
            alt="Action de l'association HIMA"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import supabase from "@/lib/supabaseClient";

import Spinner from "./Spinner.vue";

interface Stats {
  action: number;
  island: number;
  benevole: number;
  family: number;
  repas: number;
}

// Valeurs initiales (par défaut)
const stats = ref<Stats>({
  action: 0,
  island: 0,
  benevole: 0,
  family: 0,
  repas: 0,
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
    };
    loading.value = false;
  } catch (err) {
    console.error("Erreur récupération des data About Us:", err);
  }
});
</script>

<style scoped></style>
