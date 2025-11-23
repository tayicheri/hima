<!-- ArticleSection.vue -->
<template>
  <section class="bg-gray-50 py-12">
    <div class="max-w-6xl mx-auto px-4">
      <!-- Input de recherche -->
      <div class="mb-8 flex justify-center">
        <input
          type="text"
          v-model="query"
          @input="emitQuery"
          placeholder="Rechercher un article..."
          class="w-full sm:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const query = ref("");

const emit = defineEmits(["update-query"]);

const emitQuery = () => {
  emit("update-query", query.value);
};
</script>
