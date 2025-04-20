<template>
  <section class="bg-gray-100 py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-semibold text-center text-gray-800 mb-12">Nos Projets</h2>

      <div class="relative">
        <!-- Chevron gauche -->
        <button
          v-if="canScrollLeft"
          @click="scrollLeft"
          class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-20 hover:bg-gray-700 focus:outline-none"
        >
          <i class="fas fa-chevron-left"></i>
        </button>

        <!-- Chevron droit -->
        <button
          v-if="canScrollRight"
          @click="scrollRight"
          class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-20 hover:bg-gray-700 focus:outline-none"
        >
          <i class="fas fa-chevron-right"></i>
        </button>

        <!-- Dégradé gauche -->
        <div
          v-if="canScrollLeft"
          class="absolute inset-y-0 left-0 bg-gradient-to-l from-transparent via-transparent to-gray-100 z-10 pointer-events-none"
          style="width: 30px"
        ></div>

        <!-- Dégradé droit -->
        <div
          v-if="canScrollRight"
          class="absolute inset-y-0 right-0 bg-gradient-to-r from-transparent via-transparent to-gray-100 z-10 pointer-events-none"
          style="width: 30px"
        ></div>

        <!-- Conteneur scrollable -->

        <div ref="scrollContainer" class="flex overflow-x-auto space-x-8 pb-4 scrollbar-hide" @scroll="handleScroll">
          <Card v-for="(project, index) in projects" :key="index" :title="project.title" :description="project.description" :imageSrc="project.imageSrc" :link="project.link" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import Card from "./Card.vue";

const scrollContainer = ref<HTMLElement | null>(null);
const scrollGap = ref(0);
const gap = 32; // Tailwind CSS space-x-8 corresponds to 2rem (32px)
const canScrollLeft = ref(false);
const canScrollRight = ref(true);

const handleScroll = () => {
  if (scrollContainer.value) {
    const container = scrollContainer.value;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    canScrollLeft.value = scrollLeft > 0;
    canScrollRight.value = scrollLeft + clientWidth < scrollWidth;
    if (scrollContainer.value && scrollContainer.value.firstElementChild) {
      const cardWidth = scrollContainer.value.firstElementChild.getBoundingClientRect().width;
      scrollGap.value = cardWidth + gap;
    }
  }
};

const scrollLeft = () => {
  const container = scrollContainer.value;
  if (container && container.firstElementChild) {
    container.scrollBy({
      left: -scrollGap.value,
      behavior: "smooth",
    });
  }
};

const scrollRight = () => {
  const container = scrollContainer.value;
  if (container && container.firstElementChild) {
    // Scroll by the card width + gap
    container.scrollBy({
      left: scrollGap.value,
      behavior: "smooth",
    });
  }
};

onMounted(() => {
  nextTick(() => {
    handleScroll();
  });
});
const projects = ref([
  {
    title: "Projet 1",
    description: "Description du projet, ses objectifs, son impact.",
    imageSrc: "https://via.placeholder.com/400x300",
    link: "#",
  },
  {
    title: "Projet 2",
    description: "Un autre projet de l'association avec une brève description.",
    imageSrc: "https://via.placeholder.com/400x300",
    link: "#",
  },
  {
    title: "Projet 3",
    description: "Description d'un autre projet phare de l'association.",
    imageSrc: "https://via.placeholder.com/400x300",
    link: "#",
  },
  {
    title: "Projet 4",
    description: "Ajoutez ici un autre projet que vous souhaitez mettre en avant.",
    imageSrc: "https://via.placeholder.com/400x300",
    link: "#",
  },
  {
    title: "Projet 4",
    description: "Ajoutez ici un autre projet que vous souhaitez mettre en avant.",
    imageSrc: "https://via.placeholder.com/400x300",
    link: "#",
  },
  {
    title: "Projet 4",
    description: "Ajoutez ici un autre projet que vous souhaitez mettre en avant.",
    imageSrc: "https://via.placeholder.com/400x300",
    link: "#",
  },
  {
    title: "Projet 4",
    description: "Ajoutez ici un autre projet que vous souhaitez mettre en avant.",
    imageSrc: "https://via.placeholder.com/400x300",
    link: "#",
  },
  {
    title: "Projet 4",
    description: "Ajoutez ici un autre projet que vous souhaitez mettre en avant.",
    imageSrc: "https://via.placeholder.com/400x300",
    link: "#",
  },
]);
</script>

<style scoped>
/* Ajout d'un style pour masquer la barre de défilement */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
