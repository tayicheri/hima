// scripts/generate-sitemap.ts
const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");
const { resolve } = require("path");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

// Initialise Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL ?? "";
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "";
const supabase = createClient(supabaseUrl, supabaseKey);

// Fonction pour récupérer les slugs des articles
async function getArticleSlugs() {
  const { data, error } = await supabase
    .from("articles")
    .select("categorie,id,title")
    .eq("type", "article");

  if (error) {
    console.error("Erreur Supabase:", error);
    return [];
  }

  return data.map(
    (article) =>
      `${slugify(article.categorie)}/${slugify(article.title)}-${article.id}`
  );
}
function slugify(text) {
  return text
    .toString()
    .normalize("NFD") // décompose les lettres accentuées
    .replace(/[\u0300-\u036f]/g, "") // supprime les accents
    .replace(/[^a-zA-Z0-9\s-]/g, "") // supprime caractères spéciaux sauf espaces et tirets
    .trim() // supprime les espaces au début et à la fin
    .replace(/\s+/g, "-") // remplace les espaces par des tirets
    .replace(/-+/g, "-") // remplace plusieurs tirets consécutifs par un seul
    .toLowerCase(); // convertit en minuscules
}

async function generateSitemap() {
  const sitemap = new SitemapStream({
    hostname: "https://hima-narihimepvoidzima.fr",
  });

  const path = resolve("./dist/sitemap.xml");
  const writeStream = createWriteStream(path);
  sitemap.pipe(writeStream);

  const routes = [
    { path: "/" },
    { path: "/articles/:categorie/:title" },
    // autres routes si besoin
  ];

  const articleSlugs = await getArticleSlugs();

  routes.forEach((route) => {
    if (route.path === "/articles/:categorie/:title") {
      articleSlugs.forEach((slug) => {
        sitemap.write({
          url: `/articles/${slug}`,
          changefreq: "weekly",
          priority: 0.8,
        });
      });
    } else {
      sitemap.write({
        url: route.path,
        changefreq: "weekly",
        priority: 0.7,
      });
    }
  });

  sitemap.end();
  await streamToPromise(sitemap);

  console.log(
    "✅ Sitemap généré avec routes classiques et articles Supabase !"
  );
}

// Exécution
generateSitemap().catch(console.error);
