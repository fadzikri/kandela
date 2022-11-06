const express = require('express')
const favicon = require('serve-favicon')
const senarai = require("./src/senarai/senarai.json");

const app = express()
const port = 3000

app.use(favicon(`${__dirname}/favicon.ico`))

app.get('/', (req, res) => {
  res.json({
    status: true,
    message: "Hello...",
    senarai: "https://kandela.cyclic.app/senarai",
    detail: "Nanti"
  })
})

app.get('/senarai', (req, res) => {
  res.json({
    status: true,
    result: senarai
  })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})