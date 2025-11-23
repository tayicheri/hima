<template>
  <section id="actions" class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Titre -->
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-800">Nos actions</h2>
      </div>

      <!-- Grille -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Carte 1 -->
        <div
          class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
        >
          <div class="h-56 overflow-hidden">
            <img
              src="@/assets/actions/don.png"
              alt="Distribution alimentaire"
              class="w-full h-full object-cover hover:scale-105 transition duration-300"
            />
          </div>
          <div class="p-6">
            <h3 class="text-2xl font-semibold mb-3">Aide alimentaire</h3>
            <p class="text-gray-600 mb-4">
              Distribution de nourriture et de vêtements aux familles démunies
              des différentes îles de l'archipel.
            </p>
            <a
              href="/articles/action/lassociation-hima-un-geste-de-solidarit-au-service-des-plus-dmunis-14"
              class="inline-block text-green-600 font-semibold hover:underline"
            >
              En savoir plus →
            </a>
          </div>
        </div>

        <!-- Carte 2 -->
        <div
          class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
        >
          <div class="h-56 overflow-hidden">
            <img
              src="@/assets/actions/cours.png"
              alt="Atelier éducatif"
              class="w-full h-full object-cover hover:scale-105 transition duration-300"
            />
          </div>
          <div class="p-6">
            <h3 class="text-2xl font-semibold mb-3">Éducation des jeunes</h3>
            <p class="text-gray-600 mb-4">
              Organisation d'ateliers éducatifs et culturels pour valoriser le
              potentiel de la jeunesse comorienne.
            </p>
            <a
              href="/articles/action/cours-de-soutien-avec-lassociation-hima-russir-ensemble--12"
              class="inline-block text-green-600 font-semibold hover:underline"
            >
              En savoir plus →
            </a>
          </div>
        </div>

        <!-- Carte 3 -->
        <div
          class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
        >
          <div class="h-56 overflow-hidden">
            <img
              src="@/assets/actions/plante.png"
              alt="Sensibilisation environnementale"
              class="w-full h-full object-cover hover:scale-105 transition duration-300"
            />
          </div>
          <div class="p-6">
            <h3 class="text-2xl font-semibold mb-3">
              Protection de l'environnement
            </h3>
            <p class="text-gray-600 mb-4">
              Sensibilisation aux problématiques sociales et environnementales
              pour un développement durable.
            </p>
            <a
              href="/articles/action/prserver-lenvironnement-aux-comores-un-enjeu-vital-pour-lavenir-15"
              class="inline-block text-green-600 font-semibold hover:underline"
            >
              En savoir plus →
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts"></script>
<style scoped></style>
