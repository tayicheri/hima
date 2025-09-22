<script setup lang="ts">
import ActionsSection from "@/components/ActionsSection.vue";
import ContactForm from "@/components/ContactForm.vue";
import DonationSection from "@/components/DonationSection.vue";
</script>
<template>
  <main class="flex-grow flex flex-col gap-7">
    <ActionsSection />
    <ContactForm />
    <DonationSection />
  </main>
</template>
