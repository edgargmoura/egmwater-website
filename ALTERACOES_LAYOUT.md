# EGM Water TechSol — Layout Lone Star (novembro de 2026)

## Mudanças aplicadas

- Adicionado o símbolo do Texas com Lone Star no canto direito do cabeçalho, a partir da referência visual aprovada.
- Mantidos o menu superior original e o menu responsivo para celulares.
- Adicionados os 5 cards de navegação sobrepostos ao final do hero de cada página: Home, About Us, Framework, Contact e Request Consultation.
- Todos os cards usam as mesmas imagens em todas as páginas, extraídas da referência visual aprovada.
- O link de Request Consultation continua em `/contact#consultation` (e a seção `id="consultation"` foi mantida).
- Preservados os vídeos de fundo, textos, seções, imagens e os componentes do formulário. Os heros internos receberam pequeno ajuste de espaçamento para acomodar os cards.
- Os cards se reordenam para 3 colunas em tablets e 2 colunas em celulares. O cabeçalho também se adapta a telas menores.

## Arquivos criados

- `src/components/HeroNavigationCards.astro` (componente compartilhado)
- `public/nav-{home,about,framework,contact,consultation}.webp`
- `public/texas-lone-star-header.webp`

## Arquivos alterados

- `src/components/Navbar.astro`
- `src/pages/index.astro`
- `src/pages/about.astro`
- `src/pages/framework.astro`
- `src/pages/contact.astro`

## Para usar o código-fonte

1. Instale dependências: `npm ci`
2. Restaure suas variáveis de ambiente originais no arquivo `.env` (o `.env` foi omitido intencionalmente deste pacote).
3. Teste localmente: `npm run dev`
4. Para gerar os arquivos estáticos: `npm run build`
5. Os arquivos prontos para hospedagem ficarão em `dist/`.

O pacote de publicação estática é entregue separadamente, pronto para ser enviado a um bucket S3. **Não substitua os arquivos do site em produção antes de testar todos os links e o formulário de contato.**

## Verificações realizadas

- Build de produção do Astro concluído sem erros.
- Rotas HTML geradas: `/`, `/about`, `/framework`, `/contact`.
- Os cinco cards e links de navegação foram verificados nos arquivos HTML compilados.
- Âncora `#consultation` e código do cliente Supabase presentes no build.
- Ainda é recomendável a inspeção visual final em navegador real e o teste de envio do formulário no ambiente do usuário; o envio não foi executado aqui.

## Revisão 2 — 8 de novembro de 2026

- Corrigidos os cinco cards de navegação: recorte do fundo/moldura duplicado presente nos arquivos visuais. Agora cada card tem apenas uma superfície, sem outro painel atrás.
- Removidos somente da Home os dois botões extras do destaque: “Request a Consultation” e “Explore Our Solutions”. Os cinco cards e o menu superior continuam funcionando.
- Removido o fundo branco opaco da arte do mapa do Texas, convertendo-a para WebP com transparência. Assim, o gráfico pode sobrepor ligeiramente o vídeo sem formar um retângulo branco.
- Preservado o formulário existente no endereço `/contact#consultation`.
