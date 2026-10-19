import { useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsCarousel from "@/components/NewsCarousel";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { blogPosts } from "@/data/blogPosts";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

export default function Blog() {
  const scrollRef = useScrollAnimation();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterConsent, setNewsletterConsent] = useState(false);

  const newsletterMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      toast.success("Inscrito com sucesso! Você receberá nosso conteúdo exclusivo.");
      setNewsletterEmail("");
    },
    onError: () => {
      toast.error("Erro ao se inscrever. Verifique o e-mail e tente novamente.");
    },
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterConsent) return;
    newsletterMutation.mutate({ email: newsletterEmail });
  };

  // Carrossel de destaque: as 5 publicações mais recentes
  const carouselPosts = blogPosts.slice(0, 5);

  // Grid posts: demais publicações (exclui as já exibidas no carrossel)
  const gridPosts = blogPosts.slice(carouselPosts.length);

  return (
    <div ref={scrollRef}>
      <Helmet>
        <title>Blog | South Media</title>
        <meta name="description" content="Análises data-driven sobre mídia programática, CTV, retail media e performance — o blog da South Media." />
        <link rel="canonical" href="https://southmedia.com.br/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="South Media" />
        <meta property="og:title" content="Blog | South Media" />
        <meta property="og:description" content="Análises data-driven sobre mídia programática, CTV, retail media e performance." />
        <meta property="og:url" content="https://southmedia.com.br/blog" />
        <meta property="og:image" content="https://southmedia.com.br/og-southmedia.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog | South Media" />
        <meta name="twitter:description" content="Análises data-driven sobre mídia programática, CTV, retail media e performance." />
        <meta name="twitter:image" content="https://southmedia.com.br/og-southmedia.png" />
      </Helmet>

      <Navbar />

      <main>
      {/* H1 apenas para SEO/acessibilidade (sem título visível na página) */}
      <h1 className="sr-only">Blog South Media — Inteligência de Mídia</h1>

      {/* Carrossel de destaque: primeira dobra da página */}
      {carouselPosts.length > 0 && (
        <section className="section-dark pt-28 pb-4">
          <div className="container relative z-10">
            <NewsCarousel posts={carouselPosts} />
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="section-light py-12 pb-20">
        <div className="container relative z-10">
          {gridPosts.length > 0 && (
            <>
              <h2 className="font-['Inter'] font-bold text-white text-2xl md:text-3xl mb-8 animate-on-scroll">
                Todas as publicações
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {gridPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <article className="glass-card overflow-hidden animate-on-scroll group cursor-pointer h-full">
                      <div className="relative min-h-[180px] overflow-hidden">
                        <img
                          src={post.cover}
                          alt={post.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent" />
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-[#2A2A2A]">
                          <img src="/esfera-southmedia.png" alt="" className="w-4 h-4 rounded-full" />
                          <span className="text-white text-[10px] font-bold font-['Inter'] uppercase tracking-wide">South Media</span>
                        </div>
                        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-[#2A2A2A] text-[#F45504] text-[10px] font-bold font-['Inter'] uppercase tracking-wide">
                          {post.category}
                        </span>
                      </div>
                      <div className="p-6">
                        <h3 className="font-['Inter'] font-bold text-white text-lg mb-3 group-hover:text-[#7F31B8] transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-white/80 text-sm leading-relaxed mb-4">{post.summary}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-white/60 text-xs">
                            <span>{post.date}</span>
                            <span>&bull;</span>
                            <span>{post.readTime} de leitura</span>
                          </div>
                          <span className="text-[#F45504] font-['Inter'] font-semibold text-sm group-hover:text-[#F45504] transition-colors">
                            Ler mais &rarr;
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-orange py-20">
        <div className="container relative z-10 text-center">
          <h2 className="font-['Inter'] font-bold text-white text-3xl md:text-4xl mb-4 animate-on-scroll text-balance">
            Receba inteligência de mídia no seu e-mail.
          </h2>
          <p className="text-white/80 text-base mb-8 animate-on-scroll">
            Conteúdo exclusivo sobre mídia programática, cases e tendências do mercado.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto animate-on-scroll">
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Seu melhor e-mail"
                className="flex-1 min-w-0 px-5 py-3 rounded-xl bg-white border border-white text-black placeholder:text-[#6B6B6B] focus:border-[#000000] focus:outline-none transition-colors font-['Inter']"
              />
              <button type="submit" disabled={!newsletterConsent || newsletterMutation.isPending} className="btn-cta !py-3 !px-6 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed">
                {newsletterMutation.isPending ? "..." : "Quero Receber"}
              </button>
            </div>
            <div className="flex items-start gap-3 text-left">
              <Checkbox
                id="newsletter-consent"
                checked={newsletterConsent}
                onCheckedChange={(checked) => setNewsletterConsent(checked === true)}
                className="mt-0.5 border-[#7F31B8] data-[state=checked]:bg-[#7F31B8] data-[state=checked]:border-[#7F31B8]"
              />
              <label htmlFor="newsletter-consent" className="text-white/70 text-xs leading-relaxed cursor-pointer">
                Autorizo a South Media a coletar meus dados e concordo em receber novidades, promoções e ofertas por e-mail. Posso cancelar a qualquer momento.
              </label>
            </div>
          </form>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}
