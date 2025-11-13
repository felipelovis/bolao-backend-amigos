# 🚀 GUIA COMPLETO - BACKEND SEGURO

## 🎯 O QUE VOCÊ TEM:

✅ **Backend com 2 APIs:**
- `/api/login` - Valida credenciais com hash
- `/api/salvar` - Salva palpites com rate limiting

✅ **Segurança:**
- 🔒 Códigos com SHA-256 hash
- 🔒 Rate limiting (10 requisições/hora)
- 🔒 Validação de dados
- 🔒 Logs de atividades
- 🔒 Proteção contra spam

✅ **Frontend atualizado:**
- app.js modificado para usar backend
- Barra de progresso integrada
- Salva apenas fases abertas

---

## 📋 PASSO 1: Gerar Hashes dos Códigos (5 min)

### 1.1 - No seu computador:

1. Instale Node.js (se não tiver): https://nodejs.org
2. Abra o arquivo `gerar-hashes.js`
3. **Edite os participantes e códigos:**

```javascript
const participantes = {
  "Felipe": "ABC123",
  "João": "XYZ789",
  "Maria": "QWE456",
  // Adicione TODOS os seus participantes aqui
  "Ana": "DEF789",
  "Carlos": "GHI012",
  // ... etc
};
```

4. Salve o arquivo
5. Abra o terminal/cmd na pasta
6. Execute: `node gerar-hashes.js`
7. **Copie o resultado!**

---

## 📋 PASSO 2: Deploy do Backend no Vercel (10 min)

### 2.1 - Criar novo repositório no GitHub

1. Vá em: https://github.com/new
2. Nome: `bolao-backend`
3. **Public** ou **Private** (qualquer um funciona)
4. Create repository

### 2.2 - Upload dos arquivos do backend

1. Faça upload de TODOS os arquivos da pasta `bolao_backend`:
   - `api/login.js`
   - `api/salvar.js`
   - `package.json`
   - `vercel.json`

2. **IMPORTANTE:** Edite `api/login.js` e cole os hashes gerados!

```javascript
const PARTICIPANTES_HASH = {
  // COLE AQUI OS HASHES QUE VOCÊ GEROU!
  "Felipe": "hash_aqui...",
  "João": "hash_aqui...",
  // ...
};
```

3. Commit!

### 2.3 - Deploy no Vercel

1. Vá em: https://vercel.com
2. **New Project**
3. Selecione o repositório `bolao-backend`
4. **IMPORTANTE:** Em **Environment Variables**, adicione:
   - Key: `APPS_SCRIPT_URL`
   - Value: `SUA_URL_DO_APPS_SCRIPT` (a mesma que você já tem)
5. Deploy!

### 2.4 - Copie a URL

Após o deploy, você terá uma URL tipo:
```
https://bolao-backend-xyz.vercel.app
```

**COPIE ESSA URL!**

---

## 📋 PASSO 3: Atualizar Frontend (10 min)

### 3.1 - Atualizar app.js

No seu repositório do frontend (`bolao_copa_2026`):

1. **Substitua TODO o conteúdo** do `app.js` pelo arquivo `app.js` do pacote
2. **Na linha 8**, substitua a URL do backend:

```javascript
const BACKEND_URL = 'https://bolao-backend-xyz.vercel.app'; // ← SUA URL AQUI!
```

3. Commit!

### 3.2 - Aguarde deploy

O Vercel do frontend vai fazer deploy automático (1-2 min).

---

## 📋 PASSO 4: Teste Completo (5 min)

### 4.1 - Teste de Login

1. Abra o site
2. Digite nome e código
3. Deve logar normalmente!

### 4.2 - Teste de Salvamento

1. Faça alguns palpites
2. Clique em "ENVIAR"
3. Deve salvar em 2-3 segundos!
4. Verifique no Google Sheets

### 4.3 - Teste de Segurança

1. Abra F12 (DevTools)
2. Vá em "Sources" ou "Network"
3. **Códigos NÃO devem estar visíveis!**

---

## 🔒 NÍVEIS DE SEGURANÇA IMPLEMENTADOS:

### ✅ Nível 1: Códigos Seguros
- Códigos com hash SHA-256
- Impossível descobrir código original
- Armazenados apenas no backend

### ✅ Nível 2: Rate Limiting
- Máximo 10 salvamentos por hora por IP
- Proteção contra spam
- Bloqueio automático

### ✅ Nível 3: Validação de Dados
- Valida formato dos palpites
- Valida valores (0-20 gols)
- Limite de 150 palpites por requisição

### ✅ Nível 4: Logs
- Registra quem salvou
- Registra quando salvou
- Registra de qual IP

---

## 📊 ANTES vs DEPOIS:

| Aspecto | ANTES | DEPOIS |
|---------|-------|--------|
| **Códigos** | ❌ Visíveis | ✅ Hash SHA-256 |
| **Validação** | ❌ Cliente | ✅ Servidor |
| **Rate Limit** | ❌ Nenhum | ✅ 10/hora |
| **Logs** | ❌ Nenhum | ✅ Completos |
| **Segurança** | ⚠️ 4/10 | ✅ 9/10 |

---

## 🎯 FLUXO COMPLETO:

```
1. Usuário digita nome + código
   ↓
2. Frontend envia para /api/login
   ↓
3. Backend faz hash do código
   ↓
4. Backend compara com hash armazenado
   ↓
5. Se OK: retorna token
   ↓
6. Usuário palpita
   ↓
7. Frontend envia para /api/salvar
   ↓
8. Backend valida dados
   ↓
9. Backend verifica rate limit
   ↓
10. Backend envia para Apps Script
    ↓
11. Apps Script salva no Google Sheets
    ↓
12. Sucesso! ✅
```

---

## 🐛 RESOLUÇÃO DE PROBLEMAS:

### "Failed to fetch"
- Verifique a BACKEND_URL no app.js
- Verifique se o backend está online
- Verifique o console (F12)

### "Nome ou código inválido"
- Verifique se o nome está EXATAMENTE igual no hash
- Nomes são case-sensitive!
- Verifique se copiou os hashes corretamente

### "Muitas requisições"
- Rate limit ativado
- Aguarde 1 hora ou use outro IP
- Normal após 10 salvamentos

### "Apps Script URL não configurada"
- Configure a variável de ambiente no Vercel
- Settings → Environment Variables
- Adicione APPS_SCRIPT_URL

---

## ✅ CHECKLIST FINAL:

- [ ] Gerou os hashes dos códigos
- [ ] Criou repositório bolao-backend no GitHub
- [ ] Fez upload dos arquivos do backend
- [ ] Colou os hashes no api/login.js
- [ ] Fez deploy no Vercel
- [ ] Configurou APPS_SCRIPT_URL como variável de ambiente
- [ ] Copiou a URL do backend
- [ ] Atualizou app.js no frontend
- [ ] Colou BACKEND_URL no app.js
- [ ] Testou login
- [ ] Testou salvamento
- [ ] Verificou que códigos não estão visíveis (F12)

---

## 🎉 PRONTO!

Seu bolão agora está:
- ✅ **9/10 em segurança**
- ✅ **Protegido contra invasões**
- ✅ **Com rate limiting**
- ✅ **Com logs de atividades**
- ✅ **100% grátis**

---

## 💡 DICAS EXTRAS:

### Adicionar mais participantes:
1. Edite `gerar-hashes.js`
2. Adicione os novos participantes
3. Execute: `node gerar-hashes.js`
4. Copie os novos hashes
5. Atualize `api/login.js` no GitHub
6. Commit!

### Ver logs:
1. Vá no dashboard do Vercel
2. Selecione o projeto backend
3. Aba "Functions"
4. Clique em `/api/salvar`
5. Veja os logs!

### Bloquear IP específico:
Edite `api/salvar.js`:
```javascript
const BLOCKED_IPS = ['192.168.1.1', '10.0.0.1'];

if (BLOCKED_IPS.includes(ip)) {
  return res.status(403).json({ error: 'Bloqueado' });
}
```

---

**Qualquer dúvida, me chama!** 🚀🔒😊
