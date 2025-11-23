<template>
  <div
    v-if="totalPages > 1"
    class="flex items-center justify-center gap-2 py-6"
  >
    <!-- Prev -->
    <button
      class="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-100 transition disabled:opacity-40"
      :disabled="pagination.page === 1"
      @click="changePage(pagination.page - 1)"
    >
      ←
    </button>

    <!-- Page numbers -->
    <button
      v-for="p in pages"
      :key="p"
      class="px-3 py-1 rounded-lg border transition"
      :class="
        p === pagination.page
          ? 'bg-green-600 text-white border-green-600'
          : 'border-gray-300 hover:bg-gray-100'
      "
      @click="changePage(p)"
    >
      {{ p }}
    </button>

    <!-- Next -->
    <button
      class="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-100 transition disabled:opacity-40"
      :disabled="pagination.page === totalPages"
      @click="changePage(pagination.page + 1)"
    >
      →
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
}>();

const emit = defineEmits<{
  (e: "update-page", page: number): void;
}>();

const pagination = props.pagination;

const totalPages = computed(() =>
  Math.max(1, Math.ceil(pagination.total / pagination.pageSize))
);

// Pages affichées (1 2 3 4 5)
const pages = computed(() => {
  const pagesArray = [];

  for (let i = 1; i <= totalPages.value; i++) {
    pagesArray.push(i);
  }

  return pagesArray;
});

const changePage = (page: number) => {
  if (page < 1 || page > totalPages.value) return;
  emit("update-page", page);
};
</script>
