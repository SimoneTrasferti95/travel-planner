// Questo file è il punto di ingresso del server. Avvia l'app Express sulla porta specificata.

import app from "./app";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server attivo su http://localhost:${PORT}`);
});