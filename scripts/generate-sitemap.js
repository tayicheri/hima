import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";

import "dotenv/config";

// Initialise Supabase
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

// Fonction pour récupérer les slugs des articles
async function getArticleSlugs() {
  const { data, error } = await supabase
    .from("articles") // nom de ta table
    .select("categorie,id,title")
    .eq("type", "article"); // champ contenant le slug
  if (error) {
    console.error("Erreur Supabase:", error);
    return [];
  }
  return data.map(
    (article) => `${article.categorie}/${article.title}-${article.id}`
  );
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
    // autres routes...
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

generateSitemap().catch(console.error);
