<template>
  <ArticleSearch />

  <Transition name="fade">
    <ArticlesCategories
      v-if="!search"
      @select-category="searchByCategorie($event)"
    />
  </Transition>
  <Transition name="fade">
    <ArticlesSection v-if="!search" />
  </Transition>
  <Transition name="fade">
    <ListArticles :articles="articlesList" v-if="search" />
  </Transition>
  <Transition name="fade">
    <Pagination
      v-if="search"
      :pagination="pagination"
      @update-page="loadPage($event)"
    />
  </Transition>
</template>
<script setup lang="ts">
import ArticleSearch from "@/components/ArticleSearch.vue";
import ArticlesSection from "@/components/ArticlesSection.vue";
import ArticlesCategories from "@/components/ArticlesCategories.vue";
import ListArticles from "@/components/ListArticles.vue";
import supabase from "@/lib/supabaseClient";

import { ref } from "vue";
import { slugify } from "@/utils/string";

const search = ref(false);
const activeSearch = ref({ type: "", value: "" });
const articlesList = ref<
  Array<{
    id: number;
    title: string;
    content: string;
    image_url: string;
    link: string;
  }>
>([]);
const pagination = ref<{
  page: number;
  pageSize: number;
  total: number;
}>({
  page: 1,
  pageSize: 10,
  total: 0,
});

const searchByCategorie = async (categorie: string) => {
  search.value = true;
  activeSearch.value = { type: "categorie", value: categorie };
  pagination.value.page = 1; // reset page

  // 1️⃣ récupérer les articles filtrés
  const { data, error, count } = await supabase
    .from("articles")
    .select("id, title, content,categorie, image_url", { count: "exact" })
    .eq("publie", true)
    .eq("type", "article")
    .eq("categorie", categorie)
    .range(
      (pagination.value.page - 1) * pagination.value.pageSize,
      pagination.value.page * pagination.value.pageSize - 1
    );

  if (error) {
    console.log(error);
    return;
  }

  // 2️⃣ mettre à jour la liste
  articlesList.value =
    data?.map((a) => ({
      ...a,
      link: `/articles/${slugify(a.categorie)}/${slugify(a.title)}-${a.id}`,
    })) || [];

  // 3️⃣ mettre à jour la pagination
  pagination.value.total = count ?? 0;
};

const loadPage = async (page: number) => {
  pagination.value.page = page;
  if (activeSearch.value.type == "categorie") {
    await searchByCategorie(activeSearch.value.value);
  } else {
  }
};
</script>
