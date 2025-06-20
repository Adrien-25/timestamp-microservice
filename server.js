// server.js  (ou myApp.js si tu réutilises leur boilerplate)
require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());            // FCC autorise ainsi toutes les origines
app.use(express.static('public'));   // si tu gardes un index.html

// ───────────────────────────────────────────────────────────
// Route racine facultative (page d’accueil statique ou texte)
app.get('/', (_req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// ───────────────────────────────────────────────────────────
//  ✓ /api/:date?   ← le « ? » rend le paramètre facultatif
// ───────────────────────────────────────────────────────────
app.get('/api/:date?', (req, res) => {
  const { date } = req.params;

  let dateObj;

  // Cas 1 : paramètre absent → date courante
  if (!date) {
    dateObj = new Date();
  }
  // Cas 2 : paramètre composé uniquement de chiffres → timestamp (ms)
  else if (/^\d+$/.test(date)) {
    dateObj = new Date(parseInt(date, 10));
  }
  // Cas 3 : paramètre type 'YYYY‑MM‑DD' ou autre chaîne parseable
  else {
    dateObj = new Date(date);
  }

  // Gestion d’erreur
  if (dateObj.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // Réponse conforme aux specs
  res.json({
    unix: dateObj.getTime(),        // timestamp en millisecondes
    utc : dateObj.toUTCString()     // chaîne « Thu, 01 Jan 1970 00:00:00 GMT »
  });
});

// ───────────────────────────────────────────────────────────
app.listen(PORT, () => console.log(`Timestamp API listening on port ${PORT}`));
