import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div>
      <Helmet>
        <title>Página não encontrada | South Media</title>
        <meta name="description" content="A página que você procura não existe ou foi movida. Volte para a home da South Media." />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="South Media" />
        <meta property="og:title" content="Página não encontrada | South Media" />
        <meta property="og:description" content="A página que você procura não existe ou foi movida. Volte para a home da South Media." />
        <meta property="og:image" content="https://southmedia.com.br/og-southmedia.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Página não encontrada | South Media" />
        <meta name="twitter:description" content="A página que você procura não existe ou foi movida." />
        <meta name="twitter:image" content="https://southmedia.com.br/og-southmedia.png" />
      </Helmet>
      <Navbar />
      <main>
      <section className="min-h-[80vh] flex items-center justify-center pt-20">
        <div className="text-center">
          <span className="font-['Inter'] font-bold text-[120px] md:text-[180px] leading-none text-[#F45504]">
            404
          </span>
          <h1 className="font-['Inter'] font-bold text-white text-2xl md:text-3xl mb-4 -mt-4">
            Página não encontrada
          </h1>
          <p className="text-white/80 text-base mb-8 max-w-md mx-auto">
            A página que você está procurando não existe ou foi movida.
          </p>
          <Link href="/" className="btn-cta">
            Voltar para a Home
          </Link>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
