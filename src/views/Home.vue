<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import AppMain from "@/components/AppMain.vue";
import { useHead } from "@vueuse/head";

useHead({
  title: "Association HIMA | Aide Humanitaire & Développement Communautaire",
  link: [
    {
      rel: "canonical",
      href: `https://hima-narihimepvoidzima.fr`,
    },
  ],
  meta: [
    {
      name: "description",
      content:
        "Découvrez l'Association HIMA, notre mission d'aide humanitaire et nos projets de développement communautaire durable. Engagez-vous pour la solidarité internationale.",
    },
  ],

  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "HIMA",
        url: "https://hima-narihimepvoidzima.fr",
        description:
          "HIMA est une association à but non lucratif basée aux Comores, dédiée à l'aide sociale et au soutien des personnes dans le besoin. Depuis sa création, nous nous engageons à améliorer les conditions de vie de notre communauté à travers des actions concrètes et durables. Notre mission s'articule autour de trois axes principaux : l'aide d'urgence aux familles démunies, l'éducation et la formation des jeunes, et la préservation de la culture comorienne.",
        logo: "https://hima-narihimepvoidzima.fr/hima_dark_no_bg.png",
        foundingDate: "2025",
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "Formulaire en ligne",
            url: "https://hima-narihimepvoidzima.fr/#contact",
            availableLanguage: ["fr"],
            areaServed: ["KM", "MG", "FR"],
          },
        ],
        sameAs: [
          "https://www.facebook.com/share/1N3ViBEFC1",
          "https://www.tiktok.com/@himapvoidzima",
          "https://www.instagram.com/hima_association",
        ],
      }),
    },
  ],
});
</script>

<template>
  <AppHeader />
  <AppMain />
  <AppFooter />
</template>

<style scoped></style>
