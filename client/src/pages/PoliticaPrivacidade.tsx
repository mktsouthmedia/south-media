import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { WA_FOOTER } from "@/lib/whatsapp";
export default function PoliticaPrivacidade() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <Helmet>
        <title>Política de Privacidade | South Media</title>
        <meta name="description" content="Como a South Media coleta, utiliza e protege dados pessoais dos visitantes do site, em conformidade com a LGPD (Lei n.º 13.709/2018)." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://southmedia.com.br/politica-privacidade" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="South Media" />
        <meta property="og:title" content="Política de Privacidade | South Media" />
        <meta property="og:description" content="Como a South Media coleta, utiliza e protege dados pessoais dos visitantes do site, em conformidade com a LGPD." />
        <meta property="og:url" content="https://southmedia.com.br/politica-privacidade" />
        <meta property="og:image" content="https://southmedia.com.br/og-southmedia.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Política de Privacidade | South Media" />
        <meta name="twitter:description" content="Como a South Media coleta, utiliza e protege dados pessoais dos visitantes do site, em conformidade com a LGPD." />
        <meta name="twitter:image" content="https://southmedia.com.br/og-southmedia.png" />
      </Helmet>

      <Navbar />

      <main>
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="container relative z-10">
          <p className="text-[#F45504] font-['Inter'] font-semibold text-sm tracking-widest uppercase mb-4">
            Transparência e Conformidade
          </p>
          <h1 className="font-['Inter'] font-bold text-4xl md:text-5xl text-white leading-tight mb-4">
            Política de Privacidade
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei n.º 13.709/2018 — LGPD).
          </p>
          <p className="text-white/50 text-sm mt-4">
            Última atualização: 31 de março de 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24">
        <div className="container max-w-4xl">
          <div className="space-y-12">

            {/* 1. Introdução */}
            <PolicySection number="01" title="Introdução">
              <p>
                A <strong>South Media</strong> ("nós", "nosso" ou "Empresa"), inscrita sob o CNPJ correspondente, com sede em Curitiba, Paraná, Brasil, é uma empresa de tecnologia especializada em mídia programática e publicidade digital.
              </p>
              <p>
                Esta Política de Privacidade descreve como coletamos, utilizamos, armazenamos, compartilhamos e protegemos os dados pessoais dos visitantes do nosso site <strong>southmedia.com.br</strong> ("Site"), em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei n.º 13.709/2018 — LGPD) e demais legislações aplicáveis.
              </p>
              <p>
                Ao acessar e utilizar nosso Site, você declara estar ciente e de acordo com as práticas descritas nesta Política. Caso não concorde com algum dos termos, recomendamos que não utilize nossos serviços.
              </p>
            </PolicySection>

            {/* 2. Dados que coletamos */}
            <PolicySection number="02" title="Dados Pessoais que Coletamos">
              <p>
                Coletamos dados pessoais de diferentes formas, sempre com base legal adequada conforme a LGPD:
              </p>

              <h4 className="text-[#F45504] font-semibold mt-6 mb-2">2.1 Dados fornecidos diretamente por você</h4>
              <ul>
                <li><strong>Formulário de contato:</strong> nome, e-mail, telefone, empresa e mensagem.</li>
                <li><strong>Download de materiais (ebooks):</strong> e-mail e consentimento para recebimento de comunicações.</li>
                <li><strong>Newsletter:</strong> e-mail para envio de conteúdos e novidades.</li>
              </ul>

              <h4 className="text-[#F45504] font-semibold mt-6 mb-2">2.2 Dados coletados automaticamente</h4>
              <ul>
                <li><strong>Dados de navegação:</strong> endereço IP, tipo de navegador, sistema operacional, páginas visitadas, tempo de permanência e origem do acesso.</li>
                <li><strong>Cookies e tecnologias similares:</strong> utilizamos cookies para melhorar a experiência de navegação, personalizar conteúdo e analisar o tráfego do site (detalhes na seção de Cookies).</li>
              </ul>
            </PolicySection>

            {/* 3. Finalidades */}
            <PolicySection number="03" title="Finalidades do Tratamento de Dados">
              <p>
                Utilizamos seus dados pessoais para as seguintes finalidades:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <PurposeCard
                  title="Atendimento e Comunicação"
                  description="Responder solicitações, dúvidas e propostas comerciais enviadas através dos formulários do site."
                />
                <PurposeCard
                  title="Envio de Conteúdos"
                  description="Enviar newsletters, ebooks, materiais educativos e informações sobre nossos serviços, mediante consentimento prévio."
                />
                <PurposeCard
                  title="Análise e Melhoria"
                  description="Analisar o uso do site para melhorar a experiência do usuário, otimizar conteúdos e aprimorar nossos serviços."
                />
                <PurposeCard
                  title="Publicidade e Remarketing"
                  description="Exibir anúncios relevantes em outras plataformas, com base em sua interação com nosso site, mediante consentimento."
                />
                <PurposeCard
                  title="Cumprimento Legal"
                  description="Cumprir obrigações legais e regulatórias aplicáveis à nossa atividade empresarial."
                />
                <PurposeCard
                  title="Segurança"
                  description="Prevenir fraudes, garantir a segurança do site e proteger os direitos da South Media e de seus usuários."
                />
              </div>
            </PolicySection>

            {/* 4. Bases Legais */}
            <PolicySection number="04" title="Bases Legais para o Tratamento">
              <p>
                O tratamento de dados pessoais realizado pela South Media está fundamentado nas seguintes bases legais previstas na LGPD (Art. 7.º):
              </p>
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-[#2A2A2A]">
                      <th className="text-left py-3 px-4 text-[#F45504] font-semibold">Base Legal</th>
                      <th className="text-left py-3 px-4 text-[#F45504] font-semibold">Aplicação</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-[#2A2A2A]">
                      <td className="py-3 px-4 font-semibold text-white">Consentimento</td>
                      <td className="py-3 px-4">Newsletter, download de materiais, cookies de marketing e análise.</td>
                    </tr>
                    <tr className="border-b border-[#2A2A2A]">
                      <td className="py-3 px-4 font-semibold text-white">Legítimo Interesse</td>
                      <td className="py-3 px-4">Análise de uso do site, melhoria de serviços, segurança da informação.</td>
                    </tr>
                    <tr className="border-b border-[#2A2A2A]">
                      <td className="py-3 px-4 font-semibold text-white">Execução de Contrato</td>
                      <td className="py-3 px-4">Atendimento a solicitações comerciais e prestação de serviços.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-white">Obrigação Legal</td>
                      <td className="py-3 px-4">Cumprimento de obrigações fiscais, contábeis e regulatórias.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </PolicySection>

            {/* 5. Cookies */}
            <PolicySection number="05" title="Cookies e Tecnologias de Rastreamento">
              <p>
                Nosso site utiliza cookies e tecnologias similares para diferentes finalidades. Ao acessar o site pela primeira vez, você será informado sobre o uso de cookies através do nosso banner de consentimento, podendo aceitar, rejeitar ou personalizar suas preferências.
              </p>

              <h4 className="text-[#F45504] font-semibold mt-6 mb-2">5.1 Tipos de Cookies Utilizados</h4>

              <div className="space-y-4 mt-4">
                <CookieCard
                  type="Necessários"
                  required
                  description="Essenciais para o funcionamento básico do site. Não podem ser desativados, pois garantem funcionalidades como navegação entre páginas e acesso a áreas seguras."
                />
                <CookieCard
                  type="Análise"
                  description="Utilizados para entender como os visitantes interagem com o site. Incluem o Google Analytics (GA4), que coleta dados de forma anônima e agregada para análise de tráfego e comportamento."
                />
                <CookieCard
                  type="Marketing"
                  description="Utilizados para rastrear visitantes em diferentes sites e exibir anúncios relevantes. Incluem o Google Tag Manager (GTM), o Pixel do Facebook e o LinkedIn Insight Tag."
                />
              </div>

              <h4 className="text-[#F45504] font-semibold mt-6 mb-2">5.2 Ferramentas de Terceiros</h4>
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-[#2A2A2A]">
                      <th className="text-left py-3 px-4 text-[#F45504] font-semibold">Ferramenta</th>
                      <th className="text-left py-3 px-4 text-[#F45504] font-semibold">Finalidade</th>
                      <th className="text-left py-3 px-4 text-[#F45504] font-semibold">Política</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-[#2A2A2A]">
                      <td className="py-3 px-4 font-semibold text-white">Google Analytics 4</td>
                      <td className="py-3 px-4">Análise de tráfego e comportamento</td>
                      <td className="py-3 px-4">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#F45504] hover:text-[#F45504] underline">Ver política</a>
                      </td>
                    </tr>
                    <tr className="border-b border-[#2A2A2A]">
                      <td className="py-3 px-4 font-semibold text-white">Google Tag Manager</td>
                      <td className="py-3 px-4">Gerenciamento de tags e scripts</td>
                      <td className="py-3 px-4">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#F45504] hover:text-[#F45504] underline">Ver política</a>
                      </td>
                    </tr>
                    <tr className="border-b border-[#2A2A2A]">
                      <td className="py-3 px-4 font-semibold text-white">Pixel do Facebook</td>
                      <td className="py-3 px-4">Remarketing e conversões</td>
                      <td className="py-3 px-4">
                        <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-[#F45504] hover:text-[#F45504] underline">Ver política</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-white">LinkedIn Insight Tag</td>
                      <td className="py-3 px-4">Remarketing e análise de conversões</td>
                      <td className="py-3 px-4">
                        <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#F45504] hover:text-[#F45504] underline">Ver política</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-4">
                Você pode gerenciar suas preferências de cookies a qualquer momento através do banner de consentimento ou das configurações do seu navegador.
              </p>
            </PolicySection>

            {/* 6. Compartilhamento */}
            <PolicySection number="06" title="Compartilhamento de Dados">
              <p>
                A South Media não vende, aluga ou comercializa seus dados pessoais. Podemos compartilhar dados nas seguintes situações:
              </p>
              <ul>
                <li><strong>Prestadores de serviços:</strong> empresas que nos auxiliam na operação do site, hospedagem, envio de e-mails e análise de dados, sempre sob obrigações contratuais de confidencialidade e segurança.</li>
                <li><strong>Plataformas de publicidade:</strong> Google, Facebook e LinkedIn, para fins de remarketing e análise de campanhas, conforme consentimento do usuário.</li>
                <li><strong>Obrigações legais:</strong> quando exigido por lei, regulamento, processo judicial ou solicitação de autoridade competente.</li>
                <li><strong>Proteção de direitos:</strong> para proteger os direitos, propriedade ou segurança da South Media, de seus clientes ou do público.</li>
              </ul>
            </PolicySection>

            {/* 7. Armazenamento e Segurança */}
            <PolicySection number="07" title="Armazenamento e Segurança dos Dados">
              <p>
                Seus dados pessoais são armazenados em servidores seguros, com medidas técnicas e organizacionais adequadas para proteger contra acesso não autorizado, alteração, divulgação ou destruição.
              </p>
              <p>
                Entre as medidas de segurança adotadas estão:
              </p>
              <ul>
                <li>Criptografia de dados em trânsito (HTTPS/TLS).</li>
                <li>Controle de acesso restrito aos dados pessoais.</li>
                <li>Monitoramento e auditoria de acessos.</li>
                <li>Backups regulares e planos de recuperação.</li>
              </ul>
              <p>
                Os dados são retidos pelo período necessário para cumprir as finalidades para as quais foram coletados, ou conforme exigido por lei. Após esse período, os dados são eliminados de forma segura.
              </p>
            </PolicySection>

            {/* 8. Transferência Internacional */}
            <PolicySection number="08" title="Transferência Internacional de Dados">
              <p>
                Alguns dos nossos prestadores de serviços e plataformas de publicidade podem estar localizados fora do Brasil. Nesses casos, a transferência internacional de dados é realizada em conformidade com o Art. 33 da LGPD, garantindo que os destinatários proporcionem grau de proteção de dados pessoais adequado ao previsto na legislação brasileira.
              </p>
            </PolicySection>

            {/* 9. Direitos do Titular */}
            <PolicySection number="09" title="Seus Direitos como Titular dos Dados">
              <p>
                Em conformidade com a LGPD (Art. 18), você possui os seguintes direitos em relação aos seus dados pessoais:
              </p>
              <div className="grid md:grid-cols-2 gap-3 mt-4">
                <RightCard title="Confirmação e Acesso" description="Confirmar a existência de tratamento e acessar seus dados pessoais." />
                <RightCard title="Correção" description="Solicitar a correção de dados incompletos, inexatos ou desatualizados." />
                <RightCard title="Anonimização ou Bloqueio" description="Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos." />
                <RightCard title="Portabilidade" description="Solicitar a portabilidade dos dados a outro fornecedor de serviço." />
                <RightCard title="Eliminação" description="Solicitar a eliminação dos dados tratados com base no consentimento." />
                <RightCard title="Revogação do Consentimento" description="Revogar o consentimento a qualquer momento, de forma gratuita e facilitada." />
                <RightCard title="Informação sobre Compartilhamento" description="Ser informado sobre entidades com as quais seus dados foram compartilhados." />
                <RightCard title="Oposição" description="Opor-se ao tratamento realizado em desconformidade com a LGPD." />
              </div>
              <p className="mt-4">
                Para exercer qualquer um desses direitos, entre em contato conosco através do e-mail: <a href="mailto:comercial@southmedia.com.br" className="text-[#F45504] hover:text-[#F45504] underline">comercial@southmedia.com.br</a>.
              </p>
              <p>
                Responderemos sua solicitação no prazo de até 15 (quinze) dias, conforme previsto na LGPD.
              </p>
            </PolicySection>

            {/* 10. Menores de Idade */}
            <PolicySection number="10" title="Dados de Menores de Idade">
              <p>
                Nosso site e serviços não são direcionados a menores de 18 anos. Não coletamos intencionalmente dados pessoais de crianças ou adolescentes. Caso identifiquemos que dados de menores foram coletados inadvertidamente, procederemos com a eliminação imediata.
              </p>
            </PolicySection>

            {/* 11. Alterações */}
            <PolicySection number="11" title="Alterações nesta Política">
              <p>
                A South Media reserva-se o direito de atualizar esta Política de Privacidade a qualquer momento, para refletir mudanças em nossas práticas ou em exigências legais. Recomendamos que você revise esta página periodicamente.
              </p>
              <p>
                Alterações significativas serão comunicadas de forma destacada no site ou por e-mail, quando aplicável. A data da última atualização será sempre indicada no topo desta página.
              </p>
            </PolicySection>

            {/* 12. Contato */}
            <PolicySection number="12" title="Contato e Encarregado de Dados (DPO)">
              <p>
                Se você tiver dúvidas, solicitações ou reclamações sobre esta Política de Privacidade ou sobre o tratamento de seus dados pessoais, entre em contato conosco:
              </p>
              <div className="mt-4 p-6 bg-[rgba(127,49,184,0.05)] border border-[#2A2A2A] rounded-xl">
                <p className="text-white font-semibold text-lg mb-3">South Media</p>
                <div className="space-y-2 text-white/80">
                  <p>
                    <span className="text-[#F45504] font-semibold">E-mail:</span>{" "}
                    <a href="mailto:comercial@southmedia.com.br" className="hover:text-white transition-colors">comercial@southmedia.com.br</a>
                  </p>
                  <p>
                    <span className="text-[#F45504] font-semibold">WhatsApp:</span>{" "}
                   <a href={WA_FOOTER} className="hover:text-white transition-colors">(41) 99691-7857</a>
                  </p>
                  <p>
                    <span className="text-[#F45504] font-semibold">Localização:</span>{" "}
                    Curitiba, Paraná — Brasil
                  </p>
                </div>
              </div>
              <p className="mt-4">
                Você também tem o direito de apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD) caso entenda que o tratamento de seus dados pessoais viola a LGPD. Mais informações em:{" "}
                <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer" className="text-[#F45504] hover:text-[#F45504] underline">www.gov.br/anpd</a>.
              </p>
            </PolicySection>

          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}

/* ---- Sub-components ---- */

function PolicySection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group">
      <div className="flex items-start gap-4 mb-4">
        <span className="text-[#F45504]/40 font-['Inter'] font-bold text-3xl leading-none select-none">
          {number}
        </span>
        <h2 className="font-['Inter'] font-bold text-2xl text-white leading-tight pt-1">
          {title}
        </h2>
      </div>
      <div className="pl-0 md:pl-14 space-y-3 text-white/80 text-[15px] leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mt-2 [&_strong]:text-white [&_a]:text-[#F45504] [&_a]:hover:text-[#F45504]">
        {children}
      </div>
    </div>
  );
}

function PurposeCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-4 bg-[rgba(255,255,255,0.03)] border border-[#2A2A2A] rounded-xl hover:border-[#2A2A2A] transition-colors">
      <h4 className="text-white font-semibold text-sm mb-1">{title}</h4>
      <p className="text-white/65 text-xs leading-relaxed">{description}</p>
    </div>
  );
}

function CookieCard({
  type,
  description,
  required,
}: {
  type: string;
  description: string;
  required?: boolean;
}) {
  return (
    <div className="p-4 bg-[rgba(255,255,255,0.03)] border border-[#2A2A2A] rounded-xl">
      <div className="flex items-center gap-2 mb-2">
        <h4 className="text-white font-semibold text-sm">{type}</h4>
        {required && (
          <span className="text-[10px] font-semibold bg-[#7F31B8] text-white px-2 py-0.5 rounded-full">
            Obrigatório
          </span>
        )}
      </div>
      <p className="text-white/65 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function RightCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-3 bg-[rgba(255,255,255,0.02)] border border-[#2A2A2A]/50 rounded-lg">
      <h4 className="text-white font-semibold text-sm mb-0.5">{title}</h4>
      <p className="text-white/60 text-xs leading-relaxed">{description}</p>
    </div>
  );
}
