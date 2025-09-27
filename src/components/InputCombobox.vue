<template>
  <div class="relative">
    <label class="block text-sm font-medium mb-1">Type</label>
    <input
      v-model="title"
      type="text"
      @focus="loadTypes"
      @input="filterTypes"
      placeholder="Titre de l'article"
      class="w-full p-2 border rounded-md"
    />

    <!-- Liste déroulante filtrée -->
    <ul
      v-if="showDropdown && filteredTypes.length"
      class="absolute z-10 w-full bg-white border rounded-md mt-1 max-h-40 overflow-auto shadow"
    >
      <li
        v-for="(type, index) in filteredTypes"
        :key="index"
        @click="selectType(type)"
        class="px-2 py-1 cursor-pointer hover:bg-gray-100"
      >
        {{ type }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import supabase from "@/lib/supabaseClient";

// types existants depuis la DB
const types = ref<string[]>([]);
const filteredTypes = ref<string[]>([]);
const showDropdown = ref(false);
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});
const title = ref(props.modelValue);
watch(title, (val) => {
  emit("update:modelValue", val);
});
watch(
  () => props.modelValue,
  (val) => {
    title.value = val;
  }
);

const emit = defineEmits(["update:modelValue"]);

// Charger les types depuis la DB au focus
async function loadTypes() {
  if (types.value.length > 0) return; // pas de rechargement si déjà récupéré

  const { data, error } = await supabase
    .from("type_article") // table contenant les types
    .select("type");

  if (error) {
    console.error("Erreur récupération types:", error);
    return;
  }

  types.value = data?.map((item: any) => item.type) || [];
  filteredTypes.value = types.value;
  showDropdown.value = true;
}

// Filtrer la liste quand on tape
function filterTypes() {
  if (!title.value) {
    filteredTypes.value = types.value;
  } else {
    filteredTypes.value = types.value.filter((t) =>
      t.toLowerCase().includes(title.value.toLowerCase())
    );
  }
  showDropdown.value = true;
}

// Sélection d’un type dans la liste
function selectType(type: string) {
  title.value = type;
  showDropdown.value = false;
  emit("update:modelValue", title.value);
}

// Fermer le dropdown si on clique en dehors
document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (!target.closest(".relative")) {
    showDropdown.value = false;
  }
});
</script>

<style scoped>
/* Ajustement optionnel du scroll */
ul::-webkit-scrollbar {
  width: 6px;
}
ul::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}
</style>
