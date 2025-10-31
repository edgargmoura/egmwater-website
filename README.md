# 🌊 EGM Water TechSol - Website

[![Live Site](https://img.shields.io/badge/Live-egmwater.com-blue?style=for-the-badge)](https://egmwater.com)
[![AWS](https://img.shields.io/badge/AWS-Deployed-orange?style=for-the-badge&logo=amazon-aws)](https://aws.amazon.com)
[![Astro](https://img.shields.io/badge/Astro-5.8.0-ff5d01?style=for-the-badge&logo=astro)](https://astro.build)

Site institucional da **EGM Water TechSol** - Engenharia Sanitária e Ambiental com foco em inovação sustentável.

🌐 **Acesse:** [egmwater.com](https://egmwater.com)

---

## 🚀 Tecnologias

- **[Astro 5.8.0](https://astro.build)** - Framework para sites estáticos de alta performance
- **[Tailwind CSS 3.4](https://tailwindcss.com)** - Framework CSS utility-first
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática JavaScript
- **[Supabase](https://supabase.com)** - Backend as a Service (PostgreSQL)

### Infraestrutura AWS

- **S3** - Hospedagem de arquivos estáticos
- **CloudFront** - CDN global com cache inteligente
- **Route 53** - Gerenciamento DNS
- **ACM** - Certificado SSL gratuito

---

## 📋 Funcionalidades

✅ Site institucional responsivo (mobile-first)  
✅ Formulário de contato com persistência no banco  
✅ SSL/HTTPS automático  
✅ CDN global (baixa latência mundial)  
✅ SEO otimizado  
✅ Performance: 95+ no PageSpeed Insights  

---

## 🏗️ Arquitetura

```
Cliente → CloudFront (CDN) → S3 (Arquivos) + Supabase (Banco)
          ↑
      Route 53 (DNS)
```

**Fluxo de requisição:**
1. Usuário acessa `egmwater.com`
2. Route 53 resolve para CloudFront
3. CloudFront serve arquivos do S3 (com cache)
4. Formulários enviam dados para Supabase via API

---

## 🛠️ Desenvolvimento Local

### Pré-requisitos

- Node.js 18+ ([Download](https://nodejs.org))
- npm ou yarn
- Git

### Instalação

```bash
# Clonar repositório
git clone https://github.com/edgargmoura/egm_watersolutions.git
cd egm_watersolutions

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas credenciais do Supabase
```

### Variáveis de Ambiente

Criar arquivo `.env` na raiz:

```env
PUBLIC_SUPABASE_URL=sua_url_aqui
PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui
```

> 🔐 **Nunca commitar o arquivo `.env`!** Está no `.gitignore`

### Comandos Disponíveis

```bash
# Desenvolvimento (hot reload)
npm run dev
# Acesse: http://localhost:4321

# Build de produção
npm run build

# Preview do build
npm run preview

# Linting
npm run lint

# Type checking
npm run check
```

---

## 📦 Deploy

### Build e Deploy para AWS

```bash
# 1. Build
npm run build

# 2. Upload para S3
cd dist/
aws s3 sync . s3://egmwater-site/ --delete
cd ..

# 3. Invalidar cache do CloudFront
aws cloudfront create-invalidation \
  --distribution-id E1ABCDEFGHIJK \
  --paths "/*"
```

> 📝 Consulte `DOCUMENTACAO.md` para instruções detalhadas de deploy

---

## 📁 Estrutura do Projeto

```
egm_watersolutions/
├── src/
│   ├── components/       # Componentes reutilizáveis
│   │   └── ContactForm.astro
│   ├── layouts/          # Layouts principais
│   │   └── Layout.astro
│   ├── pages/            # Páginas (rotas)
│   │   ├── index.astro
│   │   ├── about.astro
│   │   └── contact.astro
│   └── lib/              # Utilitários e configs
│       └── supabase.ts
├── public/               # Assets estáticos
├── dist/                 # Build gerado (não commitar)
├── astro.config.mjs      # Configuração Astro
├── tailwind.config.mjs   # Configuração Tailwind
└── package.json
```

---

## 🧪 Testes

### Testar Localmente

```bash
# Build de produção
npm run build

# Servir build localmente
npm run preview

# Abrir http://localhost:4321
# Testar todos os links e formulário
```

### Checklist de Deploy

- [ ] Código testado localmente
- [ ] Build sem erros
- [ ] Formulário funcionando
- [ ] Imagens otimizadas
- [ ] SSL válido (https://)
- [ ] Mobile responsivo

---

## 🐛 Problemas Comuns

### Site sem CSS após deploy

```bash
# Limpar cache e refazer build
rm -rf dist/ .astro/
npm install
npm run build
```

### CloudFront serve versão antiga

```bash
# Invalidar cache
aws cloudfront create-invalidation \
  --distribution-id SEU_ID \
  --paths "/*"
```

### Formulário não envia

Verificar variáveis de ambiente no `.env` e políticas RLS no Supabase.

> 🔍 Mais soluções em `DOCUMENTACAO.md` → Troubleshooting

---

## 📊 Performance

- **PageSpeed Insights:** 95+ (Mobile e Desktop)
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.5s
- **Lighthouse Score:** 95+

### Otimizações Implementadas

- ✅ Static Site Generation (SSG)
- ✅ Image optimization
- ✅ CDN global (CloudFront)
- ✅ Minificação CSS/JS
- ✅ Lazy loading de imagens
- ✅ Preload de recursos críticos

---

## 💰 Custos

**Estimativa mensal:** ~$2-3/mês

- Route 53: $0.50
- S3: $0.03
- CloudFront: $0.85
- Supabase: Grátis (plano Free)

> 💡 Free tier AWS cobre a maior parte nos primeiros 12 meses

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças: `git commit -m 'feat: Adiciona nova funcionalidade'`
4. Push para a branch: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

### Convenção de Commits

Seguimos o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: Nova funcionalidade
fix: Correção de bug
docs: Alteração em documentação
style: Formatação, ponto e vírgula faltando, etc
refactor: Refatoração de código
test: Adição de testes
chore: Atualização de tasks, configs, etc
```

---

## 📄 Licença

Este projeto é privado e proprietário da **EGM Water TechSol**.

---

## 👤 Autor

**Edgar Moura**  
Químico e Pós-graduado em Engenharia Sanitária e Ambiental

- Website: [egmwater.com](https://egmwater.com)
- GitHub: [@edgargmoura](https://github.com/edgargmoura)
- LinkedIn: [Edgar Moura](https://linkedin.com/in/edgar-moura)

---

## 📚 Documentação Completa

Para instruções detalhadas de configuração, deploy e troubleshooting, consulte:

📖 **[DOCUMENTACAO.md](./DOCUMENTACAO.md)**

---

## 🎯 Roadmap

### Em Desenvolvimento
- [ ] Dashboard administrativo
- [ ] Sistema de autenticação
- [ ] Email notifications
- [ ] Analytics integrado

### Futuro
- [ ] Blog/CMS
- [ ] Multilíngua (i18n)
- [ ] PWA (Progressive Web App)
- [ ] CI/CD com GitHub Actions

---

## ⭐ Apoie o Projeto

Se este projeto foi útil para você:

- ⭐ Dê uma estrela no GitHub
- 🐛 Reporte bugs abrindo issues
- 💡 Sugira melhorias
- 📢 Compartilhe com outros desenvolvedores

---

<div align="center">

**Desenvolvido com 💙 por [Edgar Moura](https://github.com/edgargmoura)**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin)](https://linkedin.com/in/edgar-moura)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=flat&logo=github)](https://github.com/edgargmoura)

</div>
