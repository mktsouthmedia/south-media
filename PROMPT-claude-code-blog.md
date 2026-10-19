Você vai publicar 6 artigos novos no blog do site South Media (repo south-media, estrutura um-arquivo-por-artigo em client/src/data/blog/). NÃO commite nada sem antes passar pelo passo de VERIFICAÇÃO no final. Se algo estiver ambíguo, pare e me pergunte em vez de adivinhar.

## Fonte do conteúdo
Salvei na RAIZ do projeto o arquivo `blog-south-media-selecao-8-artigos.md`. Dentro dele há 6 blocos ```ts```, cada um com um objeto `export const post: BlogPost`. Leia esse arquivo e use EXATAMENTE o conteúdo de cada bloco (title, summary, date, readTime, cover, author e content). Não reescreva o texto dos artigos.

Os 6 slugs, na ordem de data:
1. `anunciar-na-netflix-2026` — date "24 Ago 2026" — category "CTV"
2. `como-anunciar-no-chatgpt` — date "1 Set 2026" — category "IA & Mídia"
3. `quanto-custa-anunciar-na-netflix` — date "5 Set 2026" — category "CTV"
4. `chatgpt-ads-brasil-formatos-custos` — date "13 Set 2026" — category "IA & Mídia"
5. `publicidade-em-streaming-netflix-performance` — date "17 Set 2026" — category "CTV"
6. `desperdicio-midia-programatica-mfa` — date "22 Set 2026" — category "Programática"

## Passo 1 — Criar os arquivos
Para cada bloco, crie `client/src/data/blog/<slug>.ts` com o objeto correspondente, mantendo `import type { BlogPost } from "./types";` no topo (confira o caminho real do type no projeto e ajuste se necessário).

## Passo 2 — Resolver os `id` (estão como placeholder `id: 0`)
1. Abra `client/src/data/blog/index.ts` e descubra o MAIOR `id` atual (chame de N).
2. Atribua os novos ids em ordem CRESCENTE de data: `anunciar-na-netflix-2026` = N+1, `como-anunciar-no-chatgpt` = N+2, `quanto-custa-anunciar-na-netflix` = N+3, `chatgpt-ads-brasil-formatos-custos` = N+4, `publicidade-em-streaming-netflix-performance` = N+5, `desperdicio-midia-programatica-mfa` = N+6.
3. VERIFIQUE a consistência: o index ordena por id (maior = mais novo). Confirme que TODOS os posts já existentes têm data anterior a "24 Ago 2026". Se algum post existente tiver data mais recente que qualquer um dos novos, PARE e me avise — a ordenação por id ficaria fora de ordem por data e precisamos decidir juntos.

## Passo 3 — Registrar no index.ts
Adicione os 6 `import` e as 6 entradas no array agregador do `index.ts`, seguindo o mesmo padrão dos imports já existentes.

## Passo 4 — Categorias
As categorias usadas são "CTV", "IA & Mídia" e "Programática". Compare com as categorias já existentes no blog. Se "CTV" ou "IA & Mídia" ainda NÃO existirem (e houver algum lugar que lista/filtra categorias fixas — ex.: página Blog.tsx, um enum, um array de filtros), me mostre onde e PERGUNTE se quero criar a categoria nova ou remapear para uma existente. Não crie categoria nova silenciosamente.

## Passo 5 — Capas (.webp)
Cada objeto aponta para `cover: "/blog/<slug>.webp"`. Esses arquivos ainda NÃO existem. Você NÃO deve gerar imagem. Apenas:
- confirme que o valor de `cover` bate com o slug;
- ao final, liste os 6 caminhos `client/public/blog/<slug>.webp` que eu preciso adicionar manualmente (os prompts de geração estão no `.md` de origem).

## Passo 6 — VERIFICAÇÃO (obrigatória, antes de qualquer commit)
1. Rode o type-check / build do projeto (o que o projeto usar, ex.: `pnpm build` ou `pnpm tsc --noEmit`) e garanta ZERO erro novo. O build já roda o prerender e regenera o sitemap — confirme que os 6 novos slugs aparecem em `dist/public/sitemap.xml` e que foi gerado `dist/public/blog/<slug>/index.html` para cada um.
2. Para 1 artigo de exemplo, abra o HTML prerenderizado e confirme que `<title>`, `meta description` (= summary) e o JSON-LD Article saíram corretos.
3. Rode `git status` e `git diff --stat` e me MOSTRE o resumo das mudanças.
4. NÃO faça `git commit` nem `git push`. Pare aqui e espere meu OK.

## Fora de escopo
As datas 28/ago e 9/set ficam para dois artigos JÁ publicados que eu vou reposicionar depois — não mexa neles agora.
