// API de Login - Valida credenciais
// Endpoint: /api/login

const crypto = require('crypto');

// Hash SHA-256
function hashString(str) {
  return crypto.createHash('sha256').update(str).digest('hex');
}

// PARTICIPANTES COM CÓDIGOS HASHEADOS
// IMPORTANTE: Nunca exponha os códigos originais!
const PARTICIPANTES_HASH = {
  "Felipe": "6ca13d52ca70c883e0f0bb101e425a89e8624de51db2d2392593af6a84118090",  // ABC123
  "João": "3cf48d9dfb6af91ee1e91b2ec0ba924b1a8b85d2d2b8e3b4c8c5e3b0f6e3a2d1",    // XYZ789
  "Maria": "7b52009b64fd0a2a49e6d8a939753077792b0554",                          // QWE456
  "Pedro": "8843d7f92416211de9ebb963ff4ce28125932878",                          // ASD321
  "henrique.lovison": "c03e537aa5f6132cf542af3689225ef9a6331753a2a19e70689d9715cb7d964a", // soutricolor
  // Adicione mais participantes aqui
};

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { nome, codigo } = req.body;

    if (!nome || !codigo) {
      return res.status(400).json({ error: 'Nome e código são obrigatórios' });
    }

    // Verificar se o participante existe
    if (!PARTICIPANTES_HASH[nome]) {
      return res.status(401).json({ error: 'Nome ou código inválido' });
    }

    // Hash do código fornecido
    const codigoHash = hashString(codigo);

    // Comparar com o hash armazenado
    if (PARTICIPANTES_HASH[nome] === codigoHash) {
      // Gerar token simples (em produção, use JWT)
      const token = crypto.randomBytes(32).toString('hex');
      
      return res.status(200).json({
        success: true,
        nome: nome,
        token: token,
        message: 'Login realizado com sucesso'
      });
    } else {
      return res.status(401).json({ error: 'Nome ou código inválido' });
    }

  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
