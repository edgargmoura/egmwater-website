#!/bin/env bash

# --- INÍCIO DA ADIÇÃO ---

# Look for the .env file in the current directory and load it
if [ -f .env ]; then
  echo "📄 Carregando variáveis do arquivo .env..."
  set -a # # Export automatically all variables defined from here
  source .env
  set +a # Stop exporting automatically
else
  echo "⚠️ Aviso: Arquivo .env não encontrado."
fi

# Security check: ensure the essential variable exists
if [ -z "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
  echo "❌ Erro: A variável CLOUDFRONT_DISTRIBUTION_ID não está definida."
  echo "   Por favor, defina-a no arquivo .env ou exporte-a manualmente."
  exit 1 # Stop the script with error
fi

# --- End of Addition ---

echo "🔨 Building..."
npm run build

echo "📦 Uploading to S3..."
cd dist/
aws s3 sync . s3://egmwater-site/ --delete
cd ..

echo "🔄 Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" \
  --paths "/*"

echo "✅ Deploy completed!"
echo "🌐 Site: https://egmwater.com"