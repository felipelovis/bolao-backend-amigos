// GERADOR DE HASHES PARA CÓDIGOS
// Execute este arquivo com Node.js para gerar os hashes

const crypto = require('crypto');

function hashString(str) {
  return crypto.createHash('sha256').update(str).digest('hex');
}

// SEUS PARTICIPANTES E CÓDIGOS ORIGINAIS
const participantes = {
  "Felipe": "ABC123",
  "João": "XYZ789",
  "Maria": "QWE456",
  "Pedro": "ASD321",
  "henrique.lovison": "soutricolor",
  // Adicione mais aqui no formato:
  // "Nome": "CÓDIGO",
};

console.log('\n=== HASHES GERADOS ===\n');
console.log('Cole isso no arquivo api/login.js:\n');
console.log('const PARTICIPANTES_HASH = {');

for (const [nome, codigo] of Object.entries(participantes)) {
  const hash = hashString(codigo);
  console.log(`  "${nome}": "${hash}",  // ${codigo}`);
}

console.log('};\n');

console.log('\n=== CÓDIGOS ORIGINAIS (Guarde em local seguro!) ===\n');
for (const [nome, codigo] of Object.entries(participantes)) {
  console.log(`${nome}: ${codigo}`);
}
console.log('\n');
