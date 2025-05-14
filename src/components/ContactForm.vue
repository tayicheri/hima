<template>
  <section id="contact" class="flex justify-center">
    <div class="w-2xl p-6 bg-white rounded-2xl shadow-md">
      <h2 class="text-2xl font-semibold mb-4 text-center text-gray-800">Contactez-Nous</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Nom complet</label>
          <input
            v-model="form.name"
            type="text"
            id="name"
            required
            class="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Adresse e-mail</label>
          <input
            v-model="form.email"
            type="email"
            id="email"
            required
            class="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
          />
        </div>
        <div>
          <label for="subject" class="block text-sm font-medium text-gray-700">Sujet</label>
          <input
            v-model="form.subject"
            type="text"
            id="subject"
            required
            class="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
          />
        </div>
        <div>
          <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            v-model="form.message"
            id="message"
            rows="4"
            required
            class="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
          ></textarea>
        </div>
        <div class="text-center">
          <button type="submit" class="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 focus:outline-none">Envoyer</button>
        </div>
        <div v-if="submitted" class="mt-4 text-green-600 text-center">Merci pour votre message. Nous vous contacterons bientôt.</div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from "vue";

const form = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const submitted = ref(false);

const handleSubmit = () => {
  // Simulation d’envoi (remplace par un appel API réel)
  console.log("Données envoyées :", { ...form });

  submitted.value = true;

  // Réinitialisation du formulaire
  form.name = "";
  form.email = "";
  form.subject = "";
  form.message = "";
};
</script>
