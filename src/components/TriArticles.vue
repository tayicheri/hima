<template>
  <ArticleSearch @update-query="searchArticlesByTitle($event)" />

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
    <ListArticles
      :articles="articlesList"
      v-if="search"
      @go-back="search = false"
    />
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
import Pagination from "./Pagination.vue";

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
  pageSize: 4,
  total: 0,
});

const searchByCategorie = async (
  categorie: string,
  isPagination: boolean = false
) => {
  activeSearch.value = { type: "categorie", value: categorie };
  if (!isPagination) {
    pagination.value.page = 1; // reset page
  }

  let query = supabase
    .from("articles")
    .select("id, title, content, categorie, image_url", { count: "exact" })
    .eq("publie", true)
    .eq("type", "article");

  if (categorie !== "all") {
    query = query.eq("categorie", categorie);
  }

  // Pagination
  const from = (pagination.value.page - 1) * pagination.value.pageSize;
  const to = pagination.value.page * pagination.value.pageSize - 1;

  const { data, error, count } = await query.range(from, to);

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
  search.value = true;
};

const loadPage = async (page: number) => {
  pagination.value.page = page;
  if (activeSearch.value.type == "categorie") {
    await searchByCategorie(activeSearch.value.value, true);
  } else {
    await searchArticlesByTitle(activeSearch.value.value, true);
  }
};

const searchArticlesByTitle = async (
  query: string,
  isPagination: boolean = false
) => {
  activeSearch.value = { type: "title", value: query };

  if (!isPagination) pagination.value.page = 1; // reset page
  if (query.trim() === "") {
    search.value = false;
    articlesList.value = [];
    pagination.value.total = 0;
    return;
  }
  const { data, error, count } = await supabase
    .from("articles")
    .select("id, title, content,categorie, image_url", { count: "exact" })
    .ilike("title", `%${query}%`)
    .eq("publie", true)
    .eq("type", "article")
    .range(
      (pagination.value.page - 1) * pagination.value.pageSize,
      pagination.value.page * pagination.value.pageSize - 1
    );

  if (error) {
    console.log(error);
    return;
  }

  articlesList.value =
    data?.map((a) => ({
      ...a,
      link: `/articles/${slugify(a.categorie)}/${slugify(a.title)}-${a.id}`,
    })) || [];

  pagination.value.total = count ?? 0;
  search.value = true;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease; /* 0.5s = 500ms */
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
