<template>
  <section class="bg-gradient-to-r from-indigo-50 to-white py-12 px-4">
    <div class="max-w-3xl mx-auto text-center">
      <h2 class="text-3xl font-bold text-gray-800 mb-4">Soutenez notre association</h2>
      <p class="text-gray-600 mb-8">
        Votre don nous aide à continuer nos actions solidaires et à venir en aide aux personnes dans le besoin. Chaque contribution, même petite, fait une grande différence.
      </p>

      <a
        :href="paypalUrl"
        target="_blank"
        rel="noopener"
        class="inline-flex items-center text-blue-600 border-blue-600 hover:text-white hover:bg-blue-600 font-semibold text-lg px-6 py-3 rounded-xl shadow-lg transition duration-300"
      >
        <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" alt="PayPal" class="h-6 w-auto mr-3" />
        Faire un don via PayPal
      </a>
    </div>
  </section>
</template>

<script setup>
const paypalUrl = "https://www.paypal.com/donate/?hosted_button_id=TON_ID_BOUTON";
</script>
