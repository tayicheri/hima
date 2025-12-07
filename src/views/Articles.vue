<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import DonationSection from "@/components/DonationSection.vue";
import ContactForm from "@/components/ContactForm.vue";
import TriArticles from "@/components/TriArticles.vue";
import { useHead } from "@vueuse/head";

useHead({
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        url: "https://hima-narihimepvoidzima.fr",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://hima-narihimepvoidzima.fr/articles?search={query}",
          },
          "query-input": "required name=query",
        },
      }),
    },
  ],
});
</script>

<template>
  <AppHeader />
  <TriArticles />
  <ContactForm />
  <DonationSection />
  <AppFooter />
</template>
