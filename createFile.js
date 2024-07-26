const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Configuration de readline pour demander des entrées utilisateur
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));

const createFile = async () => {
  const baseName = await askQuestion('Entrez le nom de base du fichier : ');
  const fileType = await askQuestion('Entrez le type de fichier (ex: js, txt) : ');

  const directory = './Components';

  // Crée le dossier s'il n'existe pas
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }

  const fileName = `${baseName}.${fileType}`;
  const filePath = path.join(directory, fileName);

  // Crée le fichier
  fs.writeFileSync(filePath, '', 'utf8');
  console.log(`Fichier créé : ${filePath}`);

  rl.close();
};

createFile();
