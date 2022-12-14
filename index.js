const express = require('express');
const cors = require('cors');
const favicon = require('serve-favicon');
const senarai = require("./src/senarai/senarai.json");
const detail = require("./src/detail/detail.json");

const app = express();
const port = 3000

app.use(favicon(`${__dirname}/favicon.ico`));
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    status: true,
    message: "Hello...",
    senarai: "https://kandela.vercel.app/senarai",
    detail: "https://kandela.vercel.app/detail"
  });
});

app.get('/senarai', (req, res) => {
  res.json({
    status: true,
    result: senarai
  });
});

app.get('/detail', (req, res) => {
  res.json({
    status: true,
    result: detail
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})

module.exports = app
