<script setup>
import { ref, onMounted } from "vue";
import supabase from "@/lib/supabaseClient";
import Spinner from "@/components/Spinner.vue";

const user = ref(null);
const email = ref("");
const password = ref("");

const loading = ref(true);

// Vérifie si un utilisateur est déjà connecté
onMounted(async () => {
  const { data } = await supabase.auth.getUser();
  user.value = data.user;
  loading.value = false;
});

// Connexion
async function signIn() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (error) alert(error.message);
  else {
    user.value = data.user;
  }
}

// Déconnexion
async function signOut() {
  await supabase.auth.signOut();
  user.value = null;
  articles.value = [];
  medias.value = {};
}

// Récupérer les articles et leurs médias

// Supprimer un média
</script>

<template>
  <div class="p-6">
    <!-- ✅ Connexion -->
    <Spinner v-if="loading" />
    <!-- ✅ Connexion -->
    <div v-else-if="!user" class="max-w-sm mx-auto p-4 border rounded">
      <h2 class="text-xl mb-4">Connexion admin</h2>
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="border p-2 w-full mb-2"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Mot de passe"
        class="border p-2 w-full mb-2"
      />
      <button @click="signIn" class="bg-blue-600 text-white px-4 py-2 w-full">
        Se connecter
      </button>
    </div>

    <!-- ✅ Gestion articles -->
    <div v-else>
      <div class="flex justify-between items-center mb-4">
        <h2
          class="text-2xl font-bold cursor-pointer"
          @click="$router.push('/lekeza')"
        >
          Gestion des articles
        </h2>
        <div>
          <button
            @click="$router.push('/lekeza/create')"
            class="bg-green-600 text-white px-3 py-1 mr-2"
          >
            + Créer
          </button>
          <button @click="signOut" class="bg-red-600 text-white px-3 py-1">
            Déconnexion
          </button>
        </div>
      </div>
      <router-view />
    </div>
  </div>
</template>
