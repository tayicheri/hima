<template>
  <button @click="scrollToNextSection" class="transform bg-transparent text-white hover:text-blue transition-transform duration-500 cursor-pointer hover:scale-150">
    <i class="fas text-5xl fa-chevron-down text-white animate-pulse-fast hover:text-blue-500"></i>
  </button>
</template>

<script>
export default {
  methods: {
    scrollToNextSection() {
      // Défiler de 100vh
      window.scrollBy({
        top: window.innerHeight, // Défiler de 100vh
        behavior: "smooth", // Ajoute un défilement fluide
      });
    },
  },
};
</script>

<style scoped>
/* Animation de clignotement sur le chevron */
@keyframes pulseFast {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.animate-pulse-fast {
  animation: pulseFast 0.8s infinite;
}
</style>
