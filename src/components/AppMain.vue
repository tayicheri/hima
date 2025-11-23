<script setup lang="ts">
import ActionsSection from "@/components/ActionsSection.vue";
import ContactForm from "@/components/ContactForm.vue";
import DonationSection from "@/components/DonationSection.vue";
import AboutUs from "./AboutUs.vue";
import ArticlesSection from "./ArticlesSection.vue";
import ImpactSection from "./ImpactSection.vue";
</script>
<template>
  <main class="flex-grow flex flex-col gap-7">
    <AboutUs />

    <ActionsSection />
    <ImpactSection />
    <ArticlesSection />

    <ContactForm />
    <DonationSection />
  </main>
</template>
