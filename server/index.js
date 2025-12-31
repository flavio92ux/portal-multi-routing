import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/api/content', (req, res) => {
  const { path: contentPath } = req.query;

  if (!contentPath) {
    return res.status(400).json({
      error: 'Parâmetro path é obrigatório',
      example: '/api/content?path=esportes/futebol'
    });
  }

  // Sanitizar o path para evitar path traversal attacks
  const sanitizedPath = String(contentPath).replace(/\.\./g, '').replace(/[\/]/g, '_');
  
  // Construir o caminho do arquivo JSON
  const filePath = path.join(__dirname, 'json', `${sanitizedPath}.json`);

  // Verificar se o arquivo existe
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      error: `Arquivo não encontrado: ${sanitizedPath}.json`,
      availableFiles: fs.readdirSync(path.join(__dirname, 'json'))
        .filter(file => file.endsWith('.json'))
        .map(file => file.replace('.json', ''))
    });
  }

  try {
    // Ler e retornar o arquivo JSON
    const data = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(data);
    
    res.json({
      success: true,
      data: jsonData
    });
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao processar o arquivo',
      details: error.message
    });
  }
});

// Rota para listar arquivos disponíveis
app.get('/api/available-content', (req, res) => {
  const jsonDir = path.join(__dirname, 'json');
  
  const files = fs.readdirSync(jsonDir)
    .filter(file => file.endsWith('.json'))
    .map(file => file.replace('.json', ''));

  res.json({
    message: 'Arquivos disponíveis',
    files
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
  console.log(`📝 GET /api/content?path=esportes/futebol`);
  console.log(`📝 GET /api/available-content`);
});