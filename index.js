const express = require('express')
const senarai = require("./src/senarai/senarai.json");

const app = express()
const port = 3000


app.get('/', (req, res) => {
  res.json({
    status: true,
    message: "Hello..."
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