# 📘 Documentação do Projeto - EGM Water TechSol

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Tecnologias Utilizadas](#tecnologias-utilizadas)
4. [Estrutura do Projeto](#estrutura-do-projeto)
5. [Configuração Inicial](#configuração-inicial)
6. [Deploy na AWS](#deploy-na-aws)
7. [Integração com Supabase](#integração-com-supabase)
8. [Manutenção e Atualização](#manutenção-e-atualização)
9. [Troubleshooting](#troubleshooting)
10. [Custos](#custos)

---

## 🎯 Visão Geral

**Projeto:** Site institucional da EGM Water TechSol  
**URL:** https://egmwater.com  
**Tipo:** Site estático (SSG) com formulário dinâmico  
**Hospedagem:** AWS (S3 + CloudFront + Route 53)  
**Banco de Dados:** Supabase (PostgreSQL)

### Funcionalidades

- ✅ Site institucional responsivo
- ✅ Formulário de contato com persistência no banco
- ✅ SSL/HTTPS automático
- ✅ CDN global (CloudFront)
- ✅ Domínio personalizado

---

## 🏗️ Arquitetura

```
┌─────────────────┐
│   Namecheap     │  Registrador do domínio
│ egmwater.com    │
└────────┬────────┘
         │ (Nameservers)
         ▼
┌─────────────────┐
│   Route 53      │  DNS da AWS
│  Hosted Zone    │
└────────┬────────┘
         │ (ALIAS A Record)
         ▼
┌─────────────────┐
│   CloudFront    │  CDN Global + SSL
│  Distribution   │
└────────┬────────┘
         │ (Origin)
         ▼
┌─────────────────┐
│   S3 Bucket     │  Arquivos estáticos
│ egmwater-site   │  (HTML/CSS/JS/Images)
└─────────────────┘

         │ (API calls via HTTPS)
         ▼
┌─────────────────┐
│   Supabase      │  Banco de dados
│ PostgreSQL      │  (contact_submissions)
└─────────────────┘
```

---

## 💻 Tecnologias Utilizadas

### Frontend
- **Astro 5.8.0** - Framework para sites estáticos
- **Tailwind CSS 3.4.18** - Framework CSS utility-first
- **TypeScript** - Tipagem estática

### Backend/Database
- **Supabase** - Backend as a Service (PostgreSQL)
- **@supabase/supabase-js** - Client JavaScript do Supabase

### Infraestrutura AWS
- **S3** - Armazenamento de arquivos estáticos
- **CloudFront** - CDN e distribuição de conteúdo
- **Route 53** - Gerenciamento de DNS
- **ACM** - Certificado SSL gratuito

### Ferramentas
- **AWS CLI** - Linha de comando para gerenciar AWS
- **npm** - Gerenciador de pacotes
- **Git** - Controle de versão

---

## 📁 Estrutura do Projeto

```
egm_watersolutions/
├── src/
│   ├── components/
│   │   └── ContactForm.astro       # Formulário de contato
│   ├── layouts/
│   │   └── Layout.astro            # Layout principal
│   ├── pages/
│   │   ├── index.astro             # Home
│   │   ├── about.astro             # Sobre nós
│   │   ├── contact.astro           # Contato
│   │   ├── contato.astro           # Contato (PT)
│   │   └── quem-somos.astro        # Quem somos (PT)
│   └── lib/
│       └── supabase.ts             # Configuração Supabase
├── public/
│   ├── logo_egmwatertechsol.png
│   ├── favicon.ico
│   └── [outras imagens]
├── dist/                            # Build gerado (não commitar)
├── .env                             # Variáveis de ambiente (não commitar)
├── .gitignore
├── astro.config.mjs                 # Configuração do Astro
├── tailwind.config.mjs              # Configuração do Tailwind
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Configuração Inicial

### 1. Pré-requisitos

- Node.js 18+ instalado
- npm instalado
- AWS CLI configurada
- Conta AWS
- Conta Supabase
- Domínio registrado (Namecheap ou outro)

### 2. Clonar/Configurar o Projeto

```bash
# Ir para a pasta do projeto
cd ~/Desktop/site_empresa_aws/egm_watersolutions

# Instalar dependências
npm install
```

### 3. Configurar Variáveis de Ambiente

Criar arquivo `.env` na raiz:

```env
PUBLIC_SUPABASE_URL=https://gohboaywezdvlbrwbhnx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**⚠️ NUNCA commitar o arquivo `.env`** - Certifique-se que está no `.gitignore`

### 4. Configuração do Astro

**Arquivo: `astro.config.mjs`**

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static',
  site: 'https://egmwater.com',
  base: '/',
  integrations: [tailwind()],
  build: {
    format: 'directory'
  }
});
```

**Pontos importantes:**
- `output: 'static'` - Gera site estático
- `site` - URL do domínio (importante para SEO e sitemap)
- `integrations: [tailwind()]` - Ativa Tailwind CSS

### 5. Testar Localmente

```bash
# Desenvolvimento (hot reload)
npm run dev
# Acesse: http://localhost:4321

# Build de produção (testar antes de fazer deploy)
npm run build

# Preview do build
npm run preview
# Acesse: http://localhost:4321
```

---

## 🚀 Deploy na AWS

### Passo 1: Comprar Domínio

**Registrador:** Namecheap (ou Route 53 se não for conta free tier)

1. Comprar domínio `.com` desejado
2. **NÃO configurar DNS ainda** (vamos apontar para AWS)

---

### Passo 2: Configurar Route 53

#### 2.1. Criar Hosted Zone

```bash
# Via AWS Console:
# Route 53 > Hosted zones > Create hosted zone

# Configurações:
Domain name: egmwater.com
Type: Public hosted zone
```

#### 2.2. Anotar os Nameservers

Após criar, você verá 4 nameservers como:
```
ns-1356.awsdns-41.org
ns-2029.awsdns-61.co.uk
ns-274.awsdns-34.com
ns-952.awsdns-55.net
```

#### 2.3. Configurar Nameservers na Namecheap

1. Login na Namecheap
2. Manage domain > Nameservers
3. Selecionar **Custom DNS**
4. Adicionar os 4 nameservers (SEM o ponto final)
5. Aguardar propagação (10-30 minutos)

**Verificar propagação:**
```bash
nslookup egmwater.com
```

---

### Passo 3: Criar Bucket S3

#### 3.1. Criar o Bucket

```bash
# Via AWS Console:
# S3 > Create bucket

# Configurações:
Bucket name: egmwater-site
Region: us-east-1 (importante para CloudFront)
Block Public Access: DESMARCAR "Block all public access"
✓ Confirmar que o bucket ficará público
```

#### 3.2. Habilitar Static Website Hosting

```bash
# No bucket > Properties > Static website hosting > Edit

Static website hosting: Enable
Hosting type: Host a static website
Index document: index.html
Error document: index.html
```

#### 3.3. Configurar Bucket Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::egmwater-site/*"
    }
  ]
}
```

#### 3.4. Fazer Upload dos Arquivos

```bash
# Build do projeto
npm run build

# Upload via AWS CLI
cd dist/
aws s3 sync . s3://egmwater-site/ --delete
cd ..
```

**⚠️ O flag `--delete` remove arquivos do S3 que não existem localmente**

---

### Passo 4: Solicitar Certificado SSL (ACM)

#### 4.1. ⚠️ TROCAR REGIÃO PARA US-EAST-1

**CloudFront SÓ funciona com certificados em us-east-1!**

#### 4.2. Solicitar Certificado

```bash
# Via AWS Console:
# Certificate Manager (us-east-1) > Request certificate

Request a public certificate
Domain names:
  - egmwater.com
  - *.egmwater.com

Validation method: DNS validation
Key algorithm: RSA 2048
```

#### 4.3. Validar via Route 53

1. Após solicitar, clicar em **Create records in Route 53**
2. Confirmar criação dos registros CNAME
3. Aguardar 5-10 minutos
4. Status deve mudar para **Issued** (verde)

---

### Passo 5: Criar Distribuição CloudFront

#### 5.1. Configurar Origin

```bash
# Via AWS Console:
# CloudFront > Create distribution

Origin domain: egmwater-site.s3-website-us-east-1.amazonaws.com
Protocol: HTTP only
```

**⚠️ IMPORTANTE:** Usar o endpoint do **website** (não o endpoint normal do bucket)

#### 5.2. Default Cache Behavior

```
Viewer protocol policy: Redirect HTTP to HTTPS
Allowed HTTP methods: GET, HEAD
Cache policy: CachingOptimized
Compress objects automatically: ✓ Yes
```

#### 5.3. Settings

```
Price class: Use all edge locations (ou North America and Europe)
Alternate domain names (CNAME):
  - egmwater.com
  - www.egmwater.com
Custom SSL certificate: [Selecionar certificado criado]
Default root object: index.html
```

#### 5.4. Configurar Error Pages

```
403 Forbidden:
  Response page path: /index.html
  HTTP response code: 200

404 Not Found:
  Response page path: /index.html
  HTTP response code: 200
```

**Por que fazer isso?** Para SPAs/roteamento do Astro funcionar corretamente.

#### 5.5. Aguardar Deploy

Status: Deploying → pode levar 15-30 minutos

Anotar: **Distribution domain name** (ex: `dchfj9mhz5e.cloudfront.net`)

---

### Passo 6: Conectar Domínio no Route 53

#### 6.1. Criar Registro A (domínio raiz)

```bash
# Route 53 > Hosted zones > egmwater.com > Create record

Record name: (vazio)
Record type: A
Alias: ✓ Yes
Route traffic to: Alias to CloudFront distribution
  Select: dchfj9mhz5e.cloudfront.net
```

#### 6.2. Criar Registro A (www)

```bash
# Create record

Record name: www
Record type: A
Alias: ✓ Yes
Route traffic to: Alias to CloudFront distribution
  Select: dchfj9mhz5e.cloudfront.net
```

---

### Passo 7: Testar

Aguardar propagação DNS (5-30 minutos) e testar:

```bash
# Testar DNS
nslookup egmwater.com

# Acessar no navegador
https://egmwater.com
https://www.egmwater.com
```

**Verificar:**
- ✅ Site abre corretamente
- ✅ SSL (cadeado verde)
- ✅ Layout e imagens carregando
- ✅ Redirecionamento HTTP → HTTPS

---

## 🗄️ Integração com Supabase

### Passo 1: Criar Projeto no Supabase

1. Acesse: https://supabase.com
2. New project
3. Configurações:
   - Name: `egmwater-contacts`
   - Database Password: (criar senha forte)
   - Region: South America (São Paulo)
   - Plan: Free

### Passo 2: Criar Tabela

```sql
-- SQL Editor no Supabase

CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service_interest TEXT,
  message TEXT
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Política para permitir INSERT público
CREATE POLICY "Allow public insert" ON contact_submissions
  FOR INSERT
  WITH CHECK (true);
```

### Passo 3: Pegar Credenciais

```bash
# Settings > API

Project URL: https://gohboaywezdvlbrwbhnx.supabase.co
anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Passo 4: Configurar no Projeto

Criar `.env` (já explicado em Configuração Inicial)

### Passo 5: Código de Integração

**Arquivo: `src/lib/supabase.ts`** (já está configurado)

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  }
})

export interface ContactSubmission {
  name: string
  email: string
  phone?: string
  company?: string
  service_interest?: string
  message?: string
}

export async function submitContactForm(data: ContactSubmission) {
  try {
    const { data: result, error } = await supabase
      .from('contact_submissions')
      .insert([{
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        service_interest: data.service_interest || null,
        message: data.message || null
      }])

    if (error) {
      console.error('Supabase error:', error)
      throw new Error(`Failed to submit form: ${error.message}`)
    }

    return result
  } catch (error) {
    console.error('Form submission error:', error)
    throw error
  }
}
```

### Passo 6: Testar

```bash
# Local
npm run dev
# Preencher formulário e verificar no Supabase Table Editor

# Produção (após deploy)
# Acessar https://egmwater.com/contact
# Preencher formulário e verificar no Supabase
```

---

## 🔄 Manutenção e Atualização

### Atualizar Conteúdo do Site

```bash
# 1. Fazer alterações no código
# Editar arquivos em src/

# 2. Testar localmente
npm run dev

# 3. Fazer build
npm run build

# 4. Upload para S3
cd dist/
aws s3 sync . s3://egmwater-site/ --delete
cd ..

# 5. Invalidar cache do CloudFront
aws cloudfront create-invalidation \
  --distribution-id E1ABCDEFGHIJK \
  --paths "/*"
```

**⚠️ Substituir `E1ABCDEFGHIJK` pelo ID real da distribuição**

### Descobrir Distribution ID

```bash
# Via CLI
aws cloudfront list-distributions \
  --query 'DistributionList.Items[*].[Id,DomainName]' \
  --output table

# Via Console
# CloudFront > Distributions > copiar o ID
```

### Atualizar Dependências

```bash
# Verificar versões desatualizadas
npm outdated

# Atualizar todas (cuidado com breaking changes)
npm update

# Atualizar uma específica
npm install astro@latest
npm install tailwindcss@latest
```

### Backup do Supabase

```bash
# Via Supabase Dashboard
# Settings > Database > Backups
# Daily backups automáticos no plano Free
```

---

## 🐛 Troubleshooting

### Problema: Site aparece quebrado (sem CSS)

**Causa:** Tailwind CSS não está sendo gerado no build

**Solução:**
```bash
# 1. Verificar astro.config.mjs
cat astro.config.mjs
# Deve ter: integrations: [tailwind()]

# 2. Verificar package.json
cat package.json | grep tailwind
# Deve ter: "@astrojs/tailwind": "^6.x.x" e "tailwindcss": "^3.x.x"

# 3. Limpar e refazer build
rm -rf dist/ .astro/ node_modules/.astro/
npm install
npm run build

# 4. Verificar se CSS foi gerado
ls -la dist/_astro/*.css
# Deve aparecer pelo menos 1 arquivo .css
```

### Problema: Conflito de versão Tailwind

**Erro:** `ERESOLVE could not resolve` com Tailwind v4 vs v3

**Solução:**
```bash
# Desinstalar Tailwind v4
npm uninstall tailwindcss @tailwindcss/vite @tailwindcss/node

# Instalar Tailwind v3
npm install -D tailwindcss@^3.4.1 @astrojs/tailwind@^6.0.0

# Reinstalar dependências
npm install
```

### Problema: CloudFront serve conteúdo antigo

**Causa:** Cache do CloudFront

**Solução:**
```bash
# Invalidar cache
aws cloudfront create-invalidation \
  --distribution-id SEU_DISTRIBUTION_ID \
  --paths "/*"

# Aguardar 2-5 minutos
```

### Problema: Domínio não resolve (DNS)

**Causa:** Nameservers não apontam para Route 53

**Verificar:**
```bash
# Ver nameservers atuais do domínio
nslookup -type=NS egmwater.com

# Deve retornar os nameservers da AWS:
# ns-1356.awsdns-41.org
# ns-2029.awsdns-61.co.uk
# etc.
```

**Solução:**
1. Namecheap > Domain > Nameservers
2. Verificar se estão os da AWS
3. Aguardar propagação (até 48h, normalmente 30min)

### Problema: Formulário não envia (Supabase)

**Causa 1:** Variáveis de ambiente não configuradas

```bash
# Verificar se .env existe
cat .env

# Deve ter:
# PUBLIC_SUPABASE_URL=...
# PUBLIC_SUPABASE_ANON_KEY=...
```

**Causa 2:** RLS (Row Level Security) bloqueando

```sql
-- No Supabase SQL Editor, verificar políticas:
SELECT * FROM pg_policies WHERE tablename = 'contact_submissions';

-- Deve ter política permitindo INSERT público
```

**Causa 3:** CORS (apenas se chamar de domínio diferente)

```bash
# No Supabase Dashboard:
# Settings > API > CORS
# Adicionar: https://egmwater.com
```

### Problema: Build falha

**Erro comum:** `tailwind is not defined`

**Solução:** Verificar import no `astro.config.mjs`
```javascript
// ❌ Errado
import tailwindcss from '@astrojs/tailwind';
integrations: [tailwind()]  // ← variável errada

// ✅ Correto
import tailwind from '@astrojs/tailwind';
integrations: [tailwind()]
```

### Problema: Imagens não carregam

**Causa:** Caminhos incorretos ou arquivos não enviados para S3

**Verificar:**
```bash
# Listar arquivos no S3
aws s3 ls s3://egmwater-site/ --recursive

# Ver se as imagens estão lá
# Exemplo: logo_egmwatertechsol.png deve aparecer
```

**Solução:**
```bash
# Reenviar tudo
cd dist/
aws s3 sync . s3://egmwater-site/ --delete
cd ..
```

---

## 💰 Custos

### Custos Mensais Estimados (tráfego médio: 10k visitas/mês)

| Serviço | Custo Mensal | Custo Anual | Notas |
|---------|--------------|-------------|-------|
| **Namecheap (domínio)** | - | $12 | .com registration |
| **Route 53 - Hosted Zone** | $0.50 | $6 | Fixo por zona |
| **Route 53 - Queries** | $0.40 | $5 | 10M queries |
| **S3 - Storage** | $0.023 | $0.28 | 1GB armazenado |
| **S3 - Requests** | $0.04 | $0.48 | 100k GET requests |
| **CloudFront - Data Transfer** | $0.85 | $10 | 10GB transfer |
| **CloudFront - Requests** | $0.10 | $1.20 | 100k requests |
| **ACM (SSL)** | FREE | FREE | Certificado gratuito |
| **Supabase** | $0 | $0 | Plano Free (500MB) |
| **TOTAL** | **~$2** | **~$35** | Muito econômico! |

### Free Tier AWS (12 meses)

Se sua conta AWS for nova, você tem:
- **S3:** 5GB storage + 20k GET + 2k PUT (grátis por 12 meses)
- **CloudFront:** 1TB data transfer + 10M requests (sempre grátis)
- **Route 53:** Primeira Hosted Zone (paga mesmo no free tier)

### Como Reduzir Custos

1. **CloudFront Cache:** Configurar cache longo para assets estáticos
2. **Imagens:** Comprimir e otimizar (reduz transfer)
3. **Price Class:** Usar só North America + Europe (mais barato)
4. **Supabase:** Manter no Free (500MB é suficiente para milhares de contatos)

### Quando Escalar (custos aumentam)

- **100k visitas/mês:** ~$10-15/mês
- **1M visitas/mês:** ~$50-100/mês
- **Supabase Pro:** $25/mês (se precisar de mais recursos)

---

## 📚 Referências Úteis

### Documentação Oficial

- **Astro:** https://docs.astro.build
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Supabase:** https://supabase.com/docs
- **AWS S3:** https://docs.aws.amazon.com/s3/
- **AWS CloudFront:** https://docs.aws.amazon.com/cloudfront/
- **AWS Route 53:** https://docs.aws.amazon.com/route53/

### Comandos AWS CLI Úteis

```bash
# Listar buckets
aws s3 ls

# Ver conteúdo de um bucket
aws s3 ls s3://egmwater-site/ --recursive

# Copiar arquivo específico
aws s3 cp dist/index.html s3://egmwater-site/index.html

# Sync com dry-run (ver o que seria feito sem executar)
aws s3 sync dist/ s3://egmwater-site/ --dryrun

# Listar distribuições CloudFront
aws cloudfront list-distributions

# Ver status de invalidação
aws cloudfront get-invalidation \
  --distribution-id E1ABCDEFGHIJK \
  --id INVALIDATION_ID
```

### Atalhos Úteis

```bash
# Build + Deploy em um comando
npm run build && cd dist/ && aws s3 sync . s3://egmwater-site/ --delete && cd ..

# Build + Deploy + Invalidate
npm run build && \
cd dist/ && \
aws s3 sync . s3://egmwater-site/ --delete && \
cd .. && \
aws cloudfront create-invalidation --distribution-id E1ABCDEFGHIJK --paths "/*"
```

---

## 📝 Checklist de Deploy

Use esta checklist antes de cada deploy:

```markdown
### Pre-Deploy
- [ ] Código testado localmente (`npm run dev`)
- [ ] Build sem erros (`npm run build`)
- [ ] Variáveis de ambiente configuradas
- [ ] Imagens otimizadas
- [ ] Links funcionando

### Deploy
- [ ] `npm run build` executado
- [ ] Upload para S3 concluído
- [ ] Cache do CloudFront invalidado
- [ ] DNS propagado (se mudou)

### Post-Deploy
- [ ] Site acessível via HTTPS
- [ ] SSL funcionando (cadeado verde)
- [ ] Layout correto (CSS carregando)
- [ ] Imagens carregando
- [ ] Formulário enviando dados
- [ ] Dados aparecendo no Supabase
- [ ] Testado em mobile/desktop
- [ ] Testado em diferentes navegadores
```

---

## 🎓 Lições Aprendidas

### Problemas Comuns e Soluções

1. **Tailwind v4 incompatível com @astrojs/tailwind**
   - Usar Tailwind v3.x.x
   
2. **CloudFront só aceita certificados de us-east-1**
   - Sempre criar certificados ACM em us-east-1

3. **Site quebrado após deploy**
   - Invalidar cache do CloudFront após cada update

4. **Formulário não funciona**
   - Verificar variáveis de ambiente (PUBLIC_SUPABASE_*)
   - Verificar RLS policies no Supabase

5. **DNS demora para propagar**
   - Paciência! Pode levar até 48h (normalmente 30min)

---

## 🚀 Próximos Passos (Melhorias Futuras)

### Funcionalidades
- [ ] Sistema de autenticação (Supabase Auth)
- [ ] Dashboard administrativo
- [ ] Email notifications (SendGrid/AWS SES)
- [ ] Analytics (Google Analytics/Plausible)
- [ ] Blog/CMS (Contentful/Sanity)
- [ ] Multilíngua (i18n)

### DevOps
- [ ] CI/CD com GitHub Actions
- [ ] Testes automatizados
- [ ] Monitoramento (CloudWatch)
- [ ] Backup automatizado
- [ ] Staging environment

### Performance
- [ ] Image optimization (Astro Image)
- [ ] Code splitting
- [ ] Preload critical resources
- [ ] Service Worker (PWA)

---

## 📞 Contato e Suporte

**Projeto mantido por:** Edgar Moura  
**GitHub:** https://github.com/edgargmoura/egm_watersolutions  
**Email:** [seu email]

---

**Última atualização:** Outubro 2025  
**Versão da documentação:** 1.0.0
