import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Solucoes from "./pages/Solucoes";
import Resultados from "./pages/Resultados";
import Sobre from "./pages/Sobre";
import Blog from "./pages/Blog";
import Contato from "./pages/Contato";
import BlogPost from "./pages/BlogPost";
import CookieBanner from "./components/CookieBanner";
import WhatsAppFloat from "./components/WhatsAppFloat";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import Ebook from "./pages/Ebook";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/solucoes" component={Solucoes} />
      <Route path="/resultados" component={Resultados} />
      <Route path="/sobre" component={Sobre} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/contato" component={Contato} />
      <Route path="/politica-privacidade" component={PoliticaPrivacidade} />
      <Route path="/ebook" component={Ebook} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
          {/* A LP /ebook tem CTA fixo próprio no celular; o botão flutuante cobriria */}
          {location !== "/ebook" && <WhatsAppFloat />}
          <CookieBanner />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
