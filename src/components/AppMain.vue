<script setup lang="ts">
import ActionsSection from "@/components/ActionsSection.vue";
import ActionsSection2 from "@/components/ActionsSection2.vue";
import ContactForm from "@/components/ContactForm.vue";
import DonationSection from "@/components/DonationSection.vue";
import AboutUs from "./AboutUs.vue";
</script>
<template>
  <main class="flex-grow flex flex-col gap-7">
    <AboutUs />
    <ActionsSection2 />
    <ActionsSection />
    <ContactForm />
    <DonationSection />
  </main>
</template>
