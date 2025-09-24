<template>
  <section id="contact" class="flex justify-center">
    <div class="w-2xl p-6 bg-white rounded-2xl shadow-md">
      <h2 class="text-2xl font-semibold mb-4 text-center text-gray-800">
        Contactez-Nous
      </h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Nom complet</label
          >
          <input
            v-model="form.name"
            type="text"
            id="name"
            required
            class="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Adresse e-mail</label
          >
          <input
            v-model="form.email"
            type="email"
            id="email"
            required
            class="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
          />
        </div>
        <div>
          <label for="subject" class="block text-sm font-medium text-gray-700"
            >Sujet</label
          >
          <input
            v-model="form.subject"
            type="text"
            id="subject"
            required
            class="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
          />
        </div>
        <div>
          <label for="message" class="block text-sm font-medium text-gray-700"
            >Message</label
          >
          <textarea
            v-model="form.message"
            id="message"
            rows="4"
            required
            class="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
          ></textarea>
        </div>
        <div class="text-center">
          <button
            type="submit"
            class="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 focus:outline-none"
          >
            Envoyer
          </button>
        </div>
        <div v-if="submitted" class="mt-4 text-green-600 text-center">
          Merci pour votre message. Nous vous contacterons bientôt.
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from "vue";
import emailjs from "@emailjs/browser";

// Tes identifiants EmailJS
const SERVICE_ID = "service_apr2vxc";
const TEMPLATE_ID = "template_x3vx2k9";
const USER_ID = "BoOLVM_nqlK9_UzFB";

const form = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const submitted = ref(false);

const handleSubmit = async () => {
  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, { ...form }, USER_ID);

    submitted.value = true;

    // Réinitialiser le formulaire
    form.name = "";
    form.email = "";
    form.subject = "";
    form.message = "";
  } catch (err) {
    console.error("Erreur lors de l'envoi :", err);
    alert("Erreur lors de l'envoi du message. Veuillez réessayer.");
  }
};
</script>
