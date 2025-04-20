<template>
  <footer class="bg-gray-800 text-white py-8">
    <div class="max-w-screen-xl mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <!-- Section gauche -->
        <div class="text-center md:text-left mb-6 md:mb-0">
          <img src="/hima_dark_no_bg.png" class="w-40 h-40 mb-4 sm:mb-0" alt="Logo de l'association" />
        </div>

        <!-- Liens -->
        <div class="flex flex-col items-center">
          <div class="flex flex-col md:flex-row mb-6 md:mb-0">
            <a href="#about" class="text-sm text-gray-400 hover:text-white mx-2">À propos</a>
            <a href="#projects" class="text-sm text-gray-400 hover:text-white mx-2">Nos Projets</a>
            <a href="#contact" class="text-sm text-gray-400 hover:text-white mx-2">Contact</a>
          </div>
          <div class="mt-8 text-center text-gray-400 text-xs">
            <p>&copy; 2025 Association Comorienne Hima. Tous droits réservés.</p>
            <p>Site réalisé par MOHAMED Taissir</p>
          </div>
        </div>
        <!-- Réseaux sociaux -->
        <div class="flex justify-center md:justify-end space-x-4">
          <a href="https://facebook.com" target="_blank" class="text-gray-400 hover:text-white">
            <i class="fab fa-facebook-square text-2xl"></i>
          </a>
          <a href="https://twitter.com" target="_blank" class="text-gray-400 hover:text-white">
            <i class="fab fa-twitter text-2xl"></i>
          </a>
          <a href="https://www.instagram.com/hima_association?igsh=czhmMnUwN3RyMnVo" target="_blank" class="text-gray-400 hover:text-white">
            <i class="fab fa-instagram text-2xl"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>

<style scoped>
/* Importation des icônes FontAwesome pour les réseaux sociaux */
</style>
