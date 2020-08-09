const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
  var nano = require('nano')('http://mp:Leroro123@localhost:5984/')
  // nano.db.create('books')
  console.log('hi')
})

app.get('/get-roadmap-:rdmpId', function(req, res) {
  res.send(req.params)
})

app.post('/save-roadmap-:rdmpId', function(req, res) {
  res.send(req.params)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})