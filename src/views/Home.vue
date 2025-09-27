<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import AppMain from "@/components/AppMain.vue";
import { onMounted } from "vue";

const description =
  "HIMA est une association engagée pour le développement social, culturel et éducatif des Comores, soutenant la jeunesse, la culture et la cohésion communautaire.";

onMounted(() => {
  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute("content", description);
  } else {
    const newMeta = document.createElement("meta");
    newMeta.name = "description";
    newMeta.content = description;
    document.head.appendChild(newMeta);
  }
});
</script>

<template>
  <AppHeader />
  <AppMain />
  <AppFooter />
</template>

<style scoped></style>
