const express = require('express');
const path = require('path');

const app = express();

// Nastav adresár, odkiaľ budeme čítať statické súbory (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Port, na ktorom pobeží server (napr. 3000)
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server beží na http://localhost:${PORT}`);
});
