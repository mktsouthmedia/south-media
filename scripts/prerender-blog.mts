/**
 * Prerender do <head> dos artigos do blog (SEO/GEO/SMO) + sitemap.xml.
 * Roda DEPOIS do `vite build`. Para cada post, grava dist/public/blog/<slug>/index.html
 * com <title> + description + canonical + Open Graph + Twitter + JSON-LD já no HTML.
 * Também gera dist/public/sitemap.xml com home + páginas institucionais + listagem + artigos.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { blogPosts } from "../client/src/data/blogPosts.ts";
import { extractFaq, buildFaqJsonLd } from "../client/src/lib/blogFaq.ts";

const SITE = "https://southmedia.com.br";
const SITE_NAME = "South Media";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.resolve(REPO_ROOT, "dist/public");
const BASE_HTML_PATH = path.join(OUT_DIR, "index.html");

function escHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function escAttr(s: string): string {
  return escHtml(s).replace(/"/g, "&quot;");
}
function jsonLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

const MONTHS: Record<string, string> = {
  jan: "01", fev: "02", mar: "03", abr: "04", mai: "05", jun: "06",
  jul: "07", ago: "08", set: "09", out: "10", nov: "11", dez: "12",
  feb: "02", apr: "04", may: "05", aug: "08", sep: "09", oct: "10", dec: "12",
};
function toISODate(display: string): string | null {
  const m = display.trim().match(/^(\d{1,2})\s+([A-Za-zÀ-ÿ]{3,})\.?\s+(\d{4})$/);
  if (!m) return null;
  const mon = MONTHS[m[2].slice(0, 3).toLowerCase()];
  if (!mon) return null;
  return `${m[3]}-${mon}-${m[1].padStart(2, "0")}`;
}
function absCover(cover: string): string {
  return `${SITE}${cover.startsWith("/") ? "" : "/"}${cover}`;
}

function buildHead(post: (typeof blogPosts)[number]): string {
  const url = `${SITE}/blog/${post.slug}`;
  const title = `${post.title} | ${SITE_NAME}`;
  const desc = post.summary;
  const image = absCover(post.cover);
  const iso = toISODate(post.date);

  const article: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: desc,
    image: [image],
    author: { "@type": "Organization", name: post.author, url: SITE },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE}/favicon-esfera.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(post.category ? { articleSection: post.category } : {}),
    ...(iso ? { datePublished: iso, dateModified: iso } : {}),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const faqLd = buildFaqJsonLd(extractFaq(post.content));

  return [
    `    <link rel="canonical" href="${escAttr(url)}" data-rh="true" />`,
    `    <meta property="og:type" content="article" data-rh="true" />`,
    `    <meta property="og:site_name" content="${escAttr(SITE_NAME)}" data-rh="true" />`,
    `    <meta property="og:title" content="${escAttr(title)}" data-rh="true" />`,
    `    <meta property="og:description" content="${escAttr(desc)}" data-rh="true" />`,
    `    <meta property="og:url" content="${escAttr(url)}" data-rh="true" />`,
    `    <meta property="og:image" content="${escAttr(image)}" data-rh="true" />`,
    `    <meta property="og:locale" content="pt_BR" data-rh="true" />`,
    `    <meta name="twitter:card" content="summary_large_image" data-rh="true" />`,
    `    <meta name="twitter:title" content="${escAttr(title)}" data-rh="true" />`,
    `    <meta name="twitter:description" content="${escAttr(desc)}" data-rh="true" />`,
    `    <meta name="twitter:image" content="${escAttr(image)}" data-rh="true" />`,
    `    <script type="application/ld+json" data-rh="true">${jsonLd(article)}</script>`,
    `    <script type="application/ld+json" data-rh="true">${jsonLd(breadcrumb)}</script>`,
    ...(faqLd ? [`    <script type="application/ld+json" data-rh="true">${jsonLd(faqLd)}</script>`] : []),
  ].join("\n");
}

function renderPage(baseHtml: string, post: (typeof blogPosts)[number]): string {
  const title = `${post.title} | ${SITE_NAME}`;
  let html = baseHtml;
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escHtml(title)}</title>`);
  const descTag = `<meta name="description" content="${escAttr(post.summary)}" data-rh="true" />`;
  if (/<meta\s+name=["']description["'][^>]*>/i.test(html)) {
    html = html.replace(/<meta\s+name=["']description["'][^>]*>/i, descTag);
  } else {
    html = html.replace(/<\/head>/i, `    ${descTag}\n  </head>`);
  }
  html = html.replace(/<link\s+rel=["']canonical["'][^>]*>\n?/i, "");
  html = html.replace(/<meta\s+(?:property=["']og:[^"']*["']|name=["']twitter:[^"']*["'])[^>]*>\n?/gi, "");
  html = html.replace(/<\/head>/i, `${buildHead(post)}\n  </head>`);
  return html;
}

type StaticPage = {
  route: string; // "" for home
  title: string;
  description: string;
  extraHead?: string;
};

// Título e descrição espelham exatamente o <Helmet> de cada página em client/src/pages,
// para que o HTML estático (visto por crawlers sem JS) e o head pós-hidratação coincidam.
const STATIC_PAGES: StaticPage[] = [
  {
    route: "ebook",
    title: "Ebook grátis: O Futuro da Inteligência de Mídia | South Media",
    description: "Ebook gratuito da South Media: os dados que explicam para onde a atenção está indo e como orquestrar a mídia em um ecossistema fragmentado. Fontes WARC, IAB Brasil e Kantar.",
  },
  {
    route: "solucoes",
    title: "Soluções — Display, CTV, DOOH, Áudio e Drive to Store | South Media",
    description: "One Stop Shop programático: display, CTV, publishers regionais, drive to store, DOOH, áudio e app marketing operados de ponta a ponta pela South Media.",
  },
  {
    route: "resultados",
    title: "Resultados e Cases Reais de Mídia Programática | South Media",
    description: "Cases reais de CTV, display, app marketing e áudio programático: +193% conversões, +600% CTR e 93,7% de taxa de conclusão. Veja os resultados da South Media.",
  },
  {
    route: "sobre",
    title: "Sobre a South Media — AdTech Brasileira e Independente",
    description: "Conheça a South Media: uma AdTech independente de Curitiba que opera mídia programática com tecnologia própria para mais de 30 marcas líderes no Brasil.",
  },
  {
    route: "contato",
    title: "Contato — Fale com a South Media",
    description: "Solicite um diagnóstico estratégico gratuito e fale com um especialista da South Media sobre sua operação de mídia programática.",
  },
  {
    route: "politica-privacidade",
    title: "Política de Privacidade | South Media",
    description: "Como a South Media coleta, utiliza e protege dados pessoais dos visitantes do site, em conformidade com a LGPD (Lei n.º 13.709/2018).",
  },
  {
    route: "blog",
    title: "Blog | South Media",
    description: "Análises data-driven sobre mídia programática, CTV, retail media e performance — o blog da South Media.",
  },
];

function buildStaticHead(page: StaticPage): string {
  const url = `${SITE}/${page.route}`;
  return [
    `    <link rel="canonical" href="${escAttr(url)}" data-rh="true" />`,
    `    <meta property="og:type" content="website" data-rh="true" />`,
    `    <meta property="og:site_name" content="${escAttr(SITE_NAME)}" data-rh="true" />`,
    `    <meta property="og:title" content="${escAttr(page.title)}" data-rh="true" />`,
    `    <meta property="og:description" content="${escAttr(page.description)}" data-rh="true" />`,
    `    <meta property="og:url" content="${escAttr(url)}" data-rh="true" />`,
    `    <meta property="og:image" content="${SITE}/og-southmedia.png" data-rh="true" />`,
    `    <meta property="og:image:width" content="1200" data-rh="true" />`,
    `    <meta property="og:image:height" content="630" data-rh="true" />`,
    `    <meta property="og:locale" content="pt_BR" data-rh="true" />`,
    `    <meta name="twitter:card" content="summary_large_image" data-rh="true" />`,
    `    <meta name="twitter:title" content="${escAttr(page.title)}" data-rh="true" />`,
    `    <meta name="twitter:description" content="${escAttr(page.description)}" data-rh="true" />`,
    `    <meta name="twitter:image" content="${SITE}/og-southmedia.png" data-rh="true" />`,
  ].join("\n");
}

function renderStaticPage(baseHtml: string, page: StaticPage): string {
  let html = baseHtml;
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escHtml(page.title)}</title>`);
  const descTag = `<meta name="description" content="${escAttr(page.description)}" data-rh="true" />`;
  html = html.replace(/<meta\s+name=["']description["'][^>]*>/i, descTag);
  html = html.replace(/<link\s+rel=["']canonical["'][^>]*>\n?/i, "");
  html = html.replace(/<meta\s+(?:property=["']og:[^"']*["']|name=["']twitter:[^"']*["'])[^>]*>\n?/gi, "");
  html = html.replace(/<\/head>/i, `${buildStaticHead(page)}\n  </head>`);
  return html;
}

function buildSitemap(): string {
  const today = new Date().toISOString().slice(0, 10);
  const urls: { loc: string; lastmod: string; priority: string }[] = [
    { loc: `${SITE}/`, lastmod: today, priority: "1.0" },
    { loc: `${SITE}/solucoes`, lastmod: today, priority: "0.9" },
    { loc: `${SITE}/resultados`, lastmod: today, priority: "0.9" },
    { loc: `${SITE}/sobre`, lastmod: today, priority: "0.8" },
    { loc: `${SITE}/contato`, lastmod: today, priority: "0.8" },
    { loc: `${SITE}/blog`, lastmod: today, priority: "0.8" },
    { loc: `${SITE}/ebook`, lastmod: today, priority: "0.7" },
    { loc: `${SITE}/politica-privacidade`, lastmod: today, priority: "0.3" },
  ];
  for (const post of blogPosts) {
    if (!post.slug) continue;
    urls.push({
      loc: `${SITE}/blog/${post.slug}`,
      lastmod: toISODate(post.date) ?? today,
      priority: "0.7",
    });
  }
  const body = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${escHtml(u.loc)}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <priority>${u.priority}</priority>\n  </url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

function main() {
  if (!fs.existsSync(BASE_HTML_PATH)) {
    console.error(`[prerender-blog] index.html não encontrado em ${BASE_HTML_PATH}. Rode "vite build" antes.`);
    process.exit(1);
  }
  const baseHtml = fs.readFileSync(BASE_HTML_PATH, "utf-8");
  let count = 0;
  for (const post of blogPosts) {
    if (!post.slug) continue;
    const dir = path.join(OUT_DIR, "blog", post.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), renderPage(baseHtml, post), "utf-8");
    count++;
  }
  for (const page of STATIC_PAGES) {
    const dir = path.join(OUT_DIR, page.route);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), renderStaticPage(baseHtml, page), "utf-8");
  }
  fs.writeFileSync(path.join(OUT_DIR, "sitemap.xml"), buildSitemap(), "utf-8");
  console.log(`[prerender-blog] ${count} artigos + ${STATIC_PAGES.length} páginas institucionais prerenderizados + sitemap.xml (${count + STATIC_PAGES.length + 1} URLs)`);
}

main();
