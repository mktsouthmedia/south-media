# Seleção de artigos para o blog South Media — agosto/setembro 2026

**O que é este arquivo:** 6 artigos novos, blog-ready (otimizados nas 5 camadas GEO/SEO/SMO), com cada objeto `BlogPost` em TypeScript pronto para colar em `client/src/data/blog/<slug>.ts`. Cada artigo traz, logo abaixo do cabeçalho, o objeto `.ts` completo (o campo `content` já é o artigo em markdown) e o prompt de capa `.webp`.

**Importante (limitação desta execução):** esta rotina rodou na nuvem, **sem acesso ao repositório** — então **não consegui ler nem selecionar os artigos que já estão prontos no blog**. Você pediu 8 artigos com 2 slots preenchidos por artigos já existentes; eu preenchi 6 slots com material novo (3 Netflix + 2 ChatGPT + 1 sobre desperdício em programática) e deixei 2 slots marcados para você escolher dois posts já publicados, com categoria sugerida — assim evitamos repetir keyword/tema de algo que já está no ar.

---

## Cronograma das 8 datas (espaçamento ~4 dias)

De 24/ago a 22/set são 29 dias. Distribuí 8 publicações a cada ~4 dias, com os 3 Netflix e os 2 ChatGPT bem espalhados (nunca dois do mesmo tema em sequência). O post mais novo (22/set) recebe o maior `id`; mantenha a ordem crescente de `id` = ordem crescente de data no `index.ts`.

| # | Data (campo `date`) | Tema principal | Keyword-alvo | Slug / status |
|---|---|---|---|---|
| 1 | 24 Ago 2026 | Netflix — vale a pena anunciar em 2026 (conversão) | anunciar na Netflix | `anunciar-na-netflix-2026` |
| 2 | 28 Ago 2026 | **Slot livre — escolher 1 artigo já pronto** (sugestão: categoria Performance ou DOOH) | — | *(você seleciona)* |
| 3 | 1 Set 2026 | ChatGPT Ads — como anunciar (conversão) | como anunciar no ChatGPT | `como-anunciar-no-chatgpt` |
| 4 | 5 Set 2026 | Netflix — quanto custa / formatos / medição (conversão) | quanto custa anunciar na Netflix | `quanto-custa-anunciar-na-netflix` |
| 5 | 9 Set 2026 | **Slot livre — escolher 1 artigo já pronto** (sugestão: categoria Programática ou Áudio) | — | *(você seleciona)* |
| 6 | 13 Set 2026 | ChatGPT Ads — formatos, custos e o que esperar | ChatGPT Ads Brasil | `chatgpt-ads-brasil-formatos-custos` |
| 7 | 17 Set 2026 | Netflix — migração para streaming / performance | publicidade em streaming | `publicidade-em-streaming-netflix-performance` |
| 8 | 22 Set 2026 | Desperdício em mídia programática / sites MFA | desperdício em mídia programática | `desperdicio-midia-programatica-mfa` |

**Como publicar cada um:** crie `client/src/data/blog/<slug>.ts` com o objeto abaixo, ajuste o `id` (use o maior `id` atual do `index.ts` + 1, respeitando a ordem por data), adicione o `import` e a entrada no array do `index.ts`, e gere a capa `.webp` em `client/public/blog/<slug>.webp` com o prompt indicado. Confira as categorias contra as que já existem no seu array e ajuste se preferir padronizar.

---

# Artigo 1 — 24 Ago 2026 — Categoria: CTV
**Keyword-alvo:** anunciar na Netflix · **Foco:** conversão de novos anunciantes (SEO + GEO)

```ts
import type { BlogPost } from "./types";

export const post: BlogPost = {
  id: 0, // TODO: maior id do index.ts + 1 (respeitar ordem crescente por data)
  slug: "anunciar-na-netflix-2026",
  category: "CTV",
  title: "Anunciar na Netflix em 2026: o que muda para novos anunciantes",
  summary:
    "Anunciar na Netflix ficou mais acessível em 2026: alcance de 190 milhões de espectadores, mínimo menor e programática aberta. Veja o que muda para a sua marca.",
  date: "24 Ago 2026",
  readTime: "7 min",
  cover: "/blog/anunciar-na-netflix-2026.webp",
  author: "South Media",
  content: `## Anunciar na Netflix em 2026: o que muda para novos anunciantes

## Vale a pena anunciar na Netflix em 2026?

Anunciar na Netflix ficou mais acessível para novos anunciantes em 2026. O plano com anúncios da plataforma alcança mais de 190 milhões de espectadores mensais no mundo, segundo a própria Netflix (dado de novembro de 2025), e a receita publicitária saltou de US$ 1,5 bilhão em 2025 para uma meta de US$ 3 bilhões em 2026, conforme guidance da companhia. Para a marca, o ponto de virada não é o acesso — é a queda do investimento mínimo, que abriu a porta para quem antes ficava de fora.

A migração de verba da TV linear para o streaming deixou de ser tendência e virou linha de orçamento. No Brasil, o vídeo já concentra 49% do investimento em publicidade digital, segundo o Digital AdSpend 2026 do IAB Brasil com o Kantar Ibope — parte puxada justamente pela TV conectada.

## O que muda para quem quer anunciar na Netflix

O acesso à Netflix não é novidade: a plataforma abriu para anúncios em 2022, e há operações que negociam mídia nela diretamente desde então. O que mudou em 2026 é o tamanho do bilhete de entrada. Com a redução do investimento mínimo, marcas médias passam a caber no inventário que antes era reservado a grandes anunciantes.

Do lado técnico, a Netflix consolidou sua própria pilha de anúncios, o Netflix Ads Suite, ativa em todos os 12 países com plano com publicidade. A compra programática também se abriu: a companhia lista parcerias com Amazon, Google Display & Video 360, The Trade Desk e Yahoo DSP. No Brasil, a inserção dinâmica de anúncios (DAI) já está disponível para eventos ao vivo.

## Alcance não é resultado: o papel do critério humano

Um alcance de nove dígitos chega pronto na compra — mas alcance não é resultado. A Netflix afirma ter parcerias com mais de 50 fornecedores globais de mensuração, incluindo a Amplified Intelligence no Brasil e no México, o que dá à marca a chance de medir atenção e não só entrega. A diferença entre gastar e converter está em quem opera: curadoria de contexto, leitura de mensuração e o modelo de Complete Views, em que a marca paga por quem assistiu até o fim.

**Na Netflix, o alcance vem pronto; o resultado depende de quem opera a campanha impressão por impressão.**

A South Media negocia a Netflix diretamente desde a abertura para anúncios e trata o inventário como ele é: um canal premium que precisa de critério de operação, verificação de terceiros operada com rigor e leitura honesta de métricas — não uma caixa que se liga no automático.

## Perguntas Frequentes

### Quanto custa anunciar na Netflix?
A Netflix não divulga tabela pública de preços; o valor é negociado por CPM e varia com formato, segmentação e período. A mudança relevante de 2026 foi a redução do investimento mínimo, que baixou a barreira de entrada para novos anunciantes.

### Quem pode anunciar na Netflix no Brasil?
O plano com anúncios está ativo no Brasil, com inserção dinâmica para eventos ao vivo. Segundo a Netflix, a base já passa de milhares de anunciantes no mundo, e a queda do mínimo tornou o canal viável para marcas médias, não só para grandes contas.

### Dá para comprar Netflix na programática?
Sim. Além da negociação direta, a Netflix abriu compra programática por parceiros como Google Display & Video 360, The Trade Desk, Yahoo DSP e Amazon, mantendo controle sobre o inventário e a experiência do anúncio.

### Anunciar na Netflix serve para performance?
Serve, desde que operado com método. Com inserção dinâmica, segmentação e mensuração de mais de 50 fornecedores, o canal permite ler atenção e resultado — mas exige curadoria e medição, não apenas volume de impressões.

Fontes:
- [Netflix — Third Season of Ads and a Look Ahead (about.netflix.com)](https://about.netflix.com/en/news/netflix-third-season-of-ads-and-a-look-ahead-at-whats-next)
- [Netflix Ad Revenue Set to Hit $3 Billion in 2026 (ALM Corp)](https://almcorp.com/blog/netflix-ad-revenue-3-billion-2026-advertising-strategy/)
- [IAB Brasil — Digital AdSpend 2026 (via Conversion)](https://www.conversion.com.br/blog/iab-brasil-publicidade-digital-42-bilhoes-2025)`,
};
```

**Prompt de capa (`anunciar-na-netflix-2026.webp`):**
> Cinematic realistic photo, person seen from behind sitting on a modern sofa in a dark premium living room at night, watching a large smart TV showing a real-looking film trailer scene with a small "Ad" label in the corner; big window with blurred night city skyline; bicolor lighting, neon purple/violet mixed with warm orange/amber glow; film grain, shallow depth of field, tiny out-of-focus text on screen; the TV content must look like a genuine streaming trailer, not abstract graphics. 16:9.

---

# Artigo 2 — 5 Set 2026 — Categoria: CTV
**Keyword-alvo:** quanto custa anunciar na Netflix · **Foco:** conversão (SEO + GEO)

```ts
import type { BlogPost } from "./types";

export const post: BlogPost = {
  id: 0, // TODO: maior id do index.ts + 1 (respeitar ordem crescente por data)
  slug: "quanto-custa-anunciar-na-netflix",
  category: "CTV",
  title: "Quanto custa anunciar na Netflix no Brasil? Formatos e medição",
  summary:
    "Quanto custa anunciar na Netflix no Brasil? Entenda o modelo de CPM, os formatos, a inserção ao vivo e como a medição define o retorno da sua campanha.",
  date: "5 Set 2026",
  readTime: "7 min",
  cover: "/blog/quanto-custa-anunciar-na-netflix.webp",
  author: "South Media",
  content: `## Quanto custa anunciar na Netflix no Brasil? Formatos, alcance e medição

## Quanto custa anunciar na Netflix no Brasil?

A Netflix não publica uma tabela fixa: anunciar na Netflix é negociado por CPM, e o custo varia com formato, segmentação e período — mas ficou mais acessível em 2026, com a redução do investimento mínimo. Para dimensionar, a plataforma alcança mais de 190 milhões de espectadores mensais no mundo (Netflix, novembro de 2025) e já soma mais de US$ 1,5 bilhão em receita publicitária em 2025, com meta de US$ 3 bilhões em 2026.

Ou seja: o custo entrou numa faixa que cabe em mais planos de mídia, mas o valor que a marca extrai depende menos do preço da impressão e mais do que se faz com ela.

## Os formatos disponíveis para anunciar na Netflix

O inventário deixou de ser só o anúncio de vídeo padrão. A Netflix testa anúncios de vídeo interativos nos EUA e Canadá, com lançamento global previsto para o segundo trimestre de 2026, e já roda inserção dinâmica de anúncios (DAI) no Brasil, EUA, Canadá, Alemanha, México e Reino Unido para eventos ao vivo. Tudo sobre o Netflix Ads Suite, a pilha própria de anúncios da empresa, ativa nos 12 países com plano com publicidade.

Para o anunciante brasileiro, a leitura prática é dupla: há formato para awareness de alto impacto e há inserção contextual em transmissões ao vivo, um terreno que aproxima o streaming da lógica de audiência da TV — com a segmentação da mídia digital.

## Preço baixo não garante retorno: a conta é da medição

O CPM da Netflix não conta a história sozinho. A companhia afirma trabalhar com mais de 50 fornecedores globais de mensuração, incluindo a Amplified Intelligence no Brasil e no México, o que permite medir atenção, não só impressão entregue. É aí que o custo vira ou não retorno.

**Anunciar barato na Netflix não é o objetivo — o objetivo é pagar por atenção que se converte em resultado.**

Operar esse canal com critério significa combinar o modelo de Complete Views (pagar por quem assistiu até o fim) com verificação de terceiros e leitura de mensuração — o trabalho humano que separa uma campanha cara de uma campanha eficiente.

## Perguntas Frequentes

### Existe valor mínimo para anunciar na Netflix?
Sim, mas ele caiu em 2026. A Netflix reduziu o investimento mínimo do plano com anúncios, tornando o canal acessível a marcas médias. O valor exato é negociado por operação e formato.

### Quais formatos de anúncio a Netflix oferece?
Vídeo padrão, anúncios de vídeo interativos (em expansão global no 2º trimestre de 2026) e inserção dinâmica para eventos ao vivo, já disponível no Brasil. Todos rodam sobre o Netflix Ads Suite.

### Como saber se o anúncio na Netflix deu resultado?
Pela mensuração. A Netflix declara parcerias com mais de 50 fornecedores de medição, incluindo a Amplified Intelligence no Brasil, o que permite avaliar atenção e alcance qualificado além do número bruto de impressões.

### Vale mais comprar Netflix direto ou pela programática?
Depende do objetivo. A negociação direta dá controle e curadoria; a compra programática (via Google DV360, The Trade Desk, Yahoo DSP e Amazon) traz escala e integração com outras praças. O ideal costuma ser combinar as duas com operação dedicada.

Fontes:
- [Netflix — Third Season of Ads and a Look Ahead (about.netflix.com)](https://about.netflix.com/en/news/netflix-third-season-of-ads-and-a-look-ahead-at-whats-next)
- [Netflix Ad Revenue Set to Hit $3 Billion in 2026 (ALM Corp)](https://almcorp.com/blog/netflix-ad-revenue-3-billion-2026-advertising-strategy/)`,
};
```

**Prompt de capa (`quanto-custa-anunciar-na-netflix.webp`):**
> Cinematic realistic photo, person in silhouette standing near a floor-to-ceiling window of a dark premium apartment at dusk, holding a remote pointed at a large smart TV that shows a realistic live-event broadcast frame with a subtle sponsor overlay; blurred city skyline through the window; bicolor neon purple/violet and warm orange/amber lighting; film grain, shallow depth of field; on-screen content looks like a real live broadcast, not abstract graphics. 16:9.

---

# Artigo 3 — 17 Set 2026 — Categoria: CTV
**Keyword-alvo:** publicidade em streaming · **Foco:** conversão / performance (SEO + GEO)

```ts
import type { BlogPost } from "./types";

export const post: BlogPost = {
  id: 0, // TODO: maior id do index.ts + 1 (respeitar ordem crescente por data)
  slug: "publicidade-em-streaming-netflix-performance",
  category: "CTV",
  title: "Publicidade em streaming: por que marcas de performance migram para a Netflix",
  summary:
    "A publicidade em streaming virou linha de orçamento: vídeo já é 49% do digital no Brasil. Veja por que marcas de performance estão indo para a Netflix e a CTV.",
  date: "17 Set 2026",
  readTime: "8 min",
  cover: "/blog/publicidade-em-streaming-netflix-performance.webp",
  author: "South Media",
  content: `## Publicidade em streaming: por que marcas de performance estão indo para a Netflix

## Por que as marcas estão migrando para publicidade em streaming?

A publicidade em streaming cresce porque o dinheiro está seguindo a atenção do público, que saiu da TV linear. No Brasil, o vídeo já responde por 49% do investimento em publicidade digital, segundo o Digital AdSpend 2026 do IAB Brasil com o Kantar Ibope, em boa parte pela migração de verba para vídeo sob demanda e TV conectada. Globalmente, a WARC projeta que a Netflix responderá por 9,2% do investimento em anúncios de CTV até 2027, ante 3,7% no fim de 2025.

Não é mais o anunciante de branding testando o canal. É o gestor de performance percebendo que o inventário de streaming ganhou segmentação, mensuração e inserção contextual.

## O que a publicidade em streaming oferece para performance

A promessa de performance no streaming se apoia em três pilares que amadureceram em 2026. Primeiro, a inserção dinâmica de anúncios (DAI), já ativa no Brasil, que permite entregar o anúncio certo no contexto certo, inclusive em eventos ao vivo. Segundo, a mensuração: a Netflix declara parcerias com mais de 50 fornecedores globais de medição, incluindo a Amplified Intelligence no Brasil. Terceiro, a compra programática aberta, via Google DV360, The Trade Desk, Yahoo DSP e Amazon.

O tamanho do mercado sustenta o movimento. A Netflix passou de US$ 1,5 bilhão em receita de anúncios em 2025 para uma meta de US$ 3 bilhões em 2026, e a consultoria Omdia projeta US$ 8 bilhões até 2030.

## Streaming e loja física: o funil que se fecha

Para performance, a tela grande não vive isolada. Uma campanha de CTV pode abrir a jornada e o drive-to-store fechá-la, levando quem viu o anúncio até o ponto de venda — com medição de visitas para provar o efeito. É a lógica de funil que separa "aparecer no streaming" de "vender pelo streaming".

**Streaming deixou de ser vitrine de marca: virou topo de um funil que pode terminar na porta da loja.**

O que decide o resultado, de novo, é a operação. Automação distribui a impressão; o critério humano define contexto, mensuração e a conexão entre canais — de CTV a drive-to-store — para que a verba migrada da TV vire retorno, e não só alcance.

## Perguntas Frequentes

### O que é publicidade em streaming?
É a veiculação de anúncios dentro de plataformas de vídeo sob demanda e TV conectada, como o plano com anúncios da Netflix. Combina o alcance da TV com a segmentação, a inserção contextual e a mensuração da mídia digital.

### Publicidade em streaming funciona para performance?
Sim. Com inserção dinâmica, segmentação e mensuração de atenção, o streaming passou a servir a objetivos de performance — especialmente quando integrado a canais de conversão como o drive-to-store.

### Quanto o streaming já representa do investimento em publicidade?
No Brasil, o vídeo (que inclui streaming e CTV) já é 49% do digital, segundo o IAB Brasil. A WARC projeta a Netflix com 9,2% do investimento global em CTV até 2027.

### Como medir resultado em publicidade de streaming?
Por mensuração de atenção e alcance qualificado (a Netflix cita mais de 50 fornecedores), pelo modelo de Complete Views e, quando há objetivo de loja física, por medição de visitas gerada pelo drive-to-store.

Fontes:
- [Netflix — Third Season of Ads and a Look Ahead (about.netflix.com)](https://about.netflix.com/en/news/netflix-third-season-of-ads-and-a-look-ahead-at-whats-next)
- [Netflix Ad Revenue Set to Hit $3 Billion in 2026 — WARC e Omdia (ALM Corp)](https://almcorp.com/blog/netflix-ad-revenue-3-billion-2026-advertising-strategy/)
- [IAB Brasil — Digital AdSpend 2026 (via Conversion)](https://www.conversion.com.br/blog/iab-brasil-publicidade-digital-42-bilhoes-2025)`,
};
```

**Prompt de capa (`publicidade-em-streaming-netflix-performance.webp`):**
> Cinematic realistic photo, person seen from behind on a couch at night facing a large smart TV that shows a realistic streaming series scene, while a smartphone on the armrest displays a map with a store pin (drive-to-store), suggesting the funnel from screen to store; dark premium interior, window with blurred night skyline; bicolor neon purple/violet and warm orange/amber lighting; film grain, shallow depth of field; screen content looks like real media, not abstract graphics. 16:9.

---

# Artigo 4 — 1 Set 2026 — Categoria: IA & Mídia
**Keyword-alvo:** como anunciar no ChatGPT · **Foco:** conversão / pioneirismo (SEO + GEO)

```ts
import type { BlogPost } from "./types";

export const post: BlogPost = {
  id: 0, // TODO: maior id do index.ts + 1 (respeitar ordem crescente por data)
  slug: "como-anunciar-no-chatgpt",
  category: "IA & Mídia",
  title: "Como anunciar no ChatGPT: o novo inventário de publicidade em IA",
  summary:
    "Como anunciar no ChatGPT? A OpenAI abriu sua plataforma de anúncios em 2026. Veja como funciona, objetivos de campanha, segmentação e por que sair na frente.",
  date: "1 Set 2026",
  readTime: "7 min",
  cover: "/blog/como-anunciar-no-chatgpt.webp",
  author: "South Media",
  content: `## Como anunciar no ChatGPT: o novo inventário de publicidade em IA

## O que são os anúncios no ChatGPT?

Saber como anunciar no ChatGPT passou a valer a pena em 2026, quando a OpenAI lançou uma plataforma de anúncios self-service. Em 5 de maio de 2026, a empresa começou a liberar uma versão beta do seu Ads Manager, que permite ao anunciante criar e gerenciar campanhas em tempo real, com cobrança por impressão (CPM) ou por clique (CPC), segundo o Axios. A própria OpenAI afirma que os anúncios "não influenciam o modelo orgânico" das respostas.

O sinal de que o inventário é real veio do dinheiro: segundo a Reuters, a OpenAI gerou mais de US$ 100 milhões em receita no piloto de anúncios nos EUA em apenas seis semanas.

## Como anunciar no ChatGPT na prática

A lógica de campanha é familiar para quem já roda mídia digital. A plataforma trabalha com três objetivos: Alcançar, Cliques e Conversões — este último exigindo uma fonte de dados configurada. A barreira de entrada também caiu: o antigo mínimo de US$ 50 mil foi removido, abrindo o canal para anunciantes menores.

A segmentação evoluiu rápido. O que começou como recorte por país passou a permitir segmentação por estado e região — um detalhe decisivo para marcas locais no Brasil, que agora conseguem falar com o público da sua praça dentro da conversa com a IA.

## Por que sair na frente em publicidade de IA

Anunciar em um ambiente conversacional é diferente de anunciar em feed. O anúncio aparece no fluxo de uma pergunta, quando a intenção do usuário está no auge — e a relevância pesa no leilão. Chegar cedo significa acumular aprendizado de operação enquanto o inventário ainda é barato e pouco disputado.

**Quem aprende a operar publicidade em IA agora vai comprar atenção mais barata do que quem esperar a fila encher.**

A South Media já passou pela fase de teste da plataforma de anúncios do ChatGPT e opera nela em fase de crescimento — o que permite tratar o canal como ele é: um inventário novo, que recompensa critério de operação e leitura de dados, não a promessa de que "a IA faz tudo sozinha".

## Perguntas Frequentes

### É possível anunciar no ChatGPT no Brasil?
A OpenAI iniciou o rollout do Ads Manager em beta em 2026, começando pelos EUA, e a operação de veiculação já é possível por operadores especializados. A segmentação evoluiu de país para estado/região, o que favorece marcas brasileiras locais.

### Quanto custa anunciar no ChatGPT?
O modelo é por CPM ou CPC, e o antigo mínimo de US$ 50 mil foi removido, segundo o Axios. Na operação da South Media na plataforma, os mínimos praticados são de R$ 40 de orçamento diário e R$ 570 no total da campanha.

### Os anúncios atrapalham as respostas do ChatGPT?
Segundo a OpenAI, não: a empresa afirma que a publicidade "não influencia o modelo orgânico" das respostas e diz manter um alto padrão de privacidade do usuário.

### Quais objetivos de campanha o ChatGPT Ads oferece?
Três: Alcançar, Cliques e Conversões. O objetivo de Conversões exige uma fonte de dados configurada para medir os resultados.

Fontes:
- [OpenAI launches self-serve ad platform (Axios)](https://www.axios.com/2026/05/05/openai-self-serve-ad-platform)`,
};
```

**Prompt de capa (`como-anunciar-no-chatgpt.webp`):**
> Cinematic realistic photo, person seen from behind at a desk in a dark premium office at night, laptop open showing a realistic clean chat interface with a small, clearly labeled "Sponsored" card inside the conversation; big window with blurred city skyline; bicolor neon purple/violet and warm orange/amber lighting; film grain, shallow depth of field, tiny out-of-focus UI text; the screen looks like a real AI chat app, not abstract sci-fi graphics. 16:9.

---

# Artigo 5 — 13 Set 2026 — Categoria: IA & Mídia
**Keyword-alvo:** ChatGPT Ads Brasil · **Foco:** formatos, custos, especialista (SEO + GEO)

```ts
import type { BlogPost } from "./types";

export const post: BlogPost = {
  id: 0, // TODO: maior id do index.ts + 1 (respeitar ordem crescente por data)
  slug: "chatgpt-ads-brasil-formatos-custos",
  category: "IA & Mídia",
  title: "ChatGPT Ads no Brasil: formatos, custos e o que esperar da mídia em IA",
  summary:
    "ChatGPT Ads no Brasil: entenda os formatos dentro do chat, os custos em real, a segmentação por estado e por que a relevância derruba o custo do clique.",
  date: "13 Set 2026",
  readTime: "7 min",
  cover: "/blog/chatgpt-ads-brasil-formatos-custos.webp",
  author: "South Media",
  content: `## ChatGPT Ads no Brasil: formatos, custos e o que esperar da publicidade em IA

## Quanto custa anunciar no ChatGPT?

No ChatGPT Ads, anunciar é cobrado por impressão (CPM) ou por clique (CPC), e a OpenAI removeu o antigo mínimo de US$ 50 mil ao abrir a plataforma, segundo o Axios — o que tornou o canal acessível a anunciantes menores. Na operação da South Media na plataforma, os mínimos praticados são de R$ 40 de orçamento diário e R$ 570 no total da campanha. Que o inventário funciona, o mercado já viu: a OpenAI faturou mais de US$ 100 milhões no piloto americano em seis semanas, de acordo com a Reuters.

## Os formatos de anúncio dentro do chat

A diferença do ChatGPT Ads está no ambiente: o anúncio aparece dentro da conversa, no momento em que o usuário expressa uma intenção. Isso muda a lógica criativa — o formato precisa ser útil à pergunta, não interromper a resposta. A OpenAI reforça que a publicidade não altera o modelo orgânico das respostas, mantendo separadas a resposta e o anúncio.

A segmentação acompanhou o amadurecimento. O recorte, que era só por país, passou a permitir estado e região — um ganho direto para marcas brasileiras que vendem em praças específicas e não querem pagar por audiência fora da área de atuação.

## Relevância é preço: por que qualidade derruba o CPC

Num leilão em que a relevância pondera o resultado, a qualidade do anúncio e da marca deixa de ser estética e vira economia. Anúncio mais relevante para a intenção da conversa tende a custar menos por clique. É o mesmo princípio que rege a busca — e recompensa quem opera com critério, não quem só sobe verba.

**Em publicidade de IA, relevância não é vaidade: é o que separa o clique caro do clique barato.**

Por isso a operação pesa mais que a ferramenta. Definir objetivo (Alcançar, Cliques ou Conversões), estruturar a segmentação por praça e ler os dados de campanha — impressões, cliques, CTR, CPC e conversões — é o trabalho humano que transforma um inventário novo em resultado previsível.

## Perguntas Frequentes

### Quais são os formatos do ChatGPT Ads?
Os anúncios aparecem dentro da conversa, associados à intenção da pergunta do usuário, sem alterar a resposta orgânica — como a própria OpenAI afirma. O foco é utilidade ao contexto, não interrupção.

### Dá para segmentar por região no ChatGPT Ads?
Sim. A segmentação evoluiu de país para estado e região, o que permite a marcas locais brasileiras concentrar o investimento na sua praça de atuação.

### O ChatGPT Ads é caro?
O modelo é por CPM ou CPC, sem o antigo mínimo de US$ 50 mil. Na operação da South Media, os mínimos são de R$ 40/dia e R$ 570 por campanha, o que coloca o canal ao alcance de pequenos e médios anunciantes.

### Vale a pena investir em ChatGPT Ads agora?
Para quem quer aprendizado de operação enquanto o inventário é barato e pouco disputado, sim. A relevância pondera o leilão, então marcas que operam com critério tendem a comprar atenção a um custo menor.

Fontes:
- [OpenAI launches self-serve ad platform (Axios)](https://www.axios.com/2026/05/05/openai-self-serve-ad-platform)`,
};
```

**Prompt de capa (`chatgpt-ads-brasil-formatos-custos.webp`):**
> Cinematic realistic photo, person in silhouette holding a smartphone in a dark premium interior at night, phone screen showing a realistic AI chat with a subtle labeled sponsored suggestion in the thread; blurred Brazilian city skyline through a large window; bicolor neon purple/violet and warm orange/amber lighting; film grain, shallow depth of field, tiny out-of-focus UI text; screen looks like a real chat app, not abstract graphics. 16:9.

---

# Artigo 6 — 22 Set 2026 — Categoria: Programática
**Keyword-alvo:** desperdício em mídia programática · **Foco:** evergreen + notícia (SEO + GEO). *Este é o artigo da rotina agendada de hoje.*

```ts
import type { BlogPost } from "./types";

export const post: BlogPost = {
  id: 0, // TODO: maior id do index.ts + 1 (respeitar ordem crescente por data)
  slug: "desperdicio-midia-programatica-mfa",
  category: "Programática",
  title: "Desperdício em mídia programática: US$ 26,8 bilhões somem mesmo com menos MFA",
  summary:
    "Desperdício em mídia programática ainda queima US$ 26,8 bilhões por ano, aponta a ANA. Veja por que só o critério humano, e não a automação, corta a perda.",
  date: "22 Set 2026",
  readTime: "8 min",
  cover: "/blog/desperdicio-midia-programatica-mfa.webp",
  author: "South Media",
  content: `## Desperdício em mídia programática: US$ 26,8 bilhões somem mesmo com menos MFA

## O que é desperdício em mídia programática?

Desperdício em mídia programática é a parcela do investimento que é comprada, mas não gera valor real: impressões em sites de baixa qualidade, tráfego inválido e caminhos de intermediação redundantes. Segundo o benchmark de transparência da ANA (Association of National Advertisers) referente ao 2º trimestre de 2025, US$ 26,8 bilhões em valor de mídia programática se perdem por ano no mundo — mesmo depois da forte queda no gasto com sites MFA, os "feitos para anúncio". O primeiro estudo da entidade, em 2023, já havia mostrado que 15% do investimento programático ia para esse tipo de site.

Ou seja: a indústria atacou o sintoma mais visível e ainda deixa dezenas de bilhões na mesa.

## A anatomia do desperdício em mídia programática

O estudo original da ANA, que analisou US$ 123 milhões em investimento e 35,5 bilhões de impressões, revelou o tamanho da dispersão: uma campanha típica rodava em 44 mil sites, quando "poucas centenas" bastariam para alcançar a maioria da audiência. Os sites MFA representavam 15% do gasto e 21% das impressões — e a ANA calculou que ao menos US$ 13 bilhões poderiam ser economizados só com práticas melhores.

A boa notícia é que o cerco funcionou. No benchmark de 2025, o gasto mediano com MFA caiu para 0,8%. A má notícia: o desperdício total não sumiu — apenas trocou de endereço, migrando para caminhos de fornecimento redundantes, lacunas de mensuração e inventário de baixa qualidade.

## Por que a automação sozinha não resolve

A raiz do problema é o incentivo que a automação persegue. Como resume a própria ANA, "o principal incentivo do comportamento de compra programática é o custo — obter o máximo de impressões por dólar". Otimizar para o CPM mais baixo, sem critério de qualidade, é exatamente o que engorda o inventário lixo. A automação é ótima em achar a impressão barata; ela não sabe, sozinha, se aquela impressão vale alguma coisa.

Tanto que o problema persiste onde falta mão humana. Segundo a eMarketer, 45% dos anunciantes ainda pagavam CPMs mais altos por domínios MFA do que por não-MFA — e alguns chegavam a destinar até 28,7% da verba a inventário MFA.

**Automação coloca o dinheiro nos canos em segundos; só o critério humano decide se ele chega a uma audiência real.**

## O que realmente cortou a perda: curadoria

A queda do desperdício veio de decisões, não de algoritmos. A curadoria e a otimização de caminho de fornecimento reduziram o número de domínios ativos por operação de 53.799 para 28.958 e enxugaram os intermediários. "Os ganhos em redução de MFA e curadoria são animadores, mas os bilhões em valor não realizado deixam claro que otimização e transparência precisam seguir como prioridade", resumiu Bob Liodice, CEO da ANA.

No Brasil, onde a publicidade digital movimentou R$ 42,7 bilhões em 2025, com alta de 12,7% (IAB Brasil e Kantar Ibope), e o vídeo já é 49% do bolo, o risco escala junto com o investimento. Quanto mais verba entra na programática, mais caro fica não ter critério.

É esse o trabalho que gera resultado: listas de inclusão, verificação antifraude, transparência sobre o caminho da impressão e a leitura de mensuração — a operação humana que a automação não substitui.

## Perguntas Frequentes

### O que são sites MFA (made for advertising)?
São sites criados para lucrar com anúncios, não para servir a um público real: muito inventário, conteúdo raso e alta densidade de publicidade. A ANA identificou que eles chegaram a representar 15% do gasto programático e 21% das impressões.

### Quanto do orçamento programático vira desperdício?
Segundo o benchmark da ANA de 2025, cerca de US$ 26,8 bilhões em valor de mídia programática se perdem por ano no mundo, por caminhos redundantes, lacunas de mensuração e inventário de baixa qualidade — mesmo com o gasto com MFA já reduzido.

### A automação resolve o desperdício em mídia programática?
Não sozinha. A automação otimiza por custo por impressão e, sem critério de qualidade, alimenta o inventário lixo. A redução do desperdício veio de curadoria e otimização de caminho de fornecimento — decisões humanas.

### Como reduzir o desperdício em campanhas programáticas?
Com listas de inclusão de inventário, verificação antifraude, transparência sobre o caminho da impressão, mensuração de atenção e curadoria de fornecedores — reduzindo o número de domínios e intermediários por campanha.

Fontes:
- [ANA: 15% of programmatic ad spend is wasted on click-bait websites (Marketing Dive)](https://www.marketingdive.com/news/ana-programmatic-transparency-ad-spend-report/653362/)
- [$26.8 billion still wasted in programmatic despite MFA crackdown (Digiday)](https://digiday.com/media-buying/ad-tech-briefing-26-8-billion-still-wasted-in-programmatic-despite-mfa-crackdown/)
- [FAQ on ad fraud, MFA sites and wasted programmatic spend (eMarketer)](https://www.emarketer.com/content/faq-on-ad-fraud--mfa-sites--wasted-programmatic-spend--how-advertisers-fight-back)
- [IAB Brasil — Digital AdSpend 2026 (via Conversion)](https://www.conversion.com.br/blog/iab-brasil-publicidade-digital-42-bilhoes-2025)`,
};
```

**Prompt de capa (`desperdicio-midia-programatica-mfa.webp`):**
> Cinematic realistic photo, person seen from behind at a desk in a dark premium office at night, looking at a large monitor showing a clean, realistic BI dashboard with media-spend charts and a highlighted "wasted spend" figure; a second screen shows a shield/verification icon; big window with blurred night city skyline; bicolor neon purple/violet and warm orange/amber lighting; film grain, shallow depth of field, tiny out-of-focus text; the dashboard must look like real analytics software, not abstract glowing graphics. 16:9.
