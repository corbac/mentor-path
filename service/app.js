const express = require('express');
const crypto = require('crypto');


const app = express()
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.send('Hello World!')
  var nano = require('nano')('http://mp:Leroro123@localhost:5984/')
  // nano.db.create('books')
  console.log('hi')
})

app.get('/get-roadmap-:rdmpId', function(req, res) {
  const hash = crypto.createHash('sha256');
  hash.update(req.params.rdmpId)
  let hashString = hash.digest('hex')
  // res.send([req.params,hashString])

  //'b861691e2005f156ee35c2a8849a4e9c022e33732c95a192810b23970806ffbf'
  var nano = require('nano')('http://mp:Leroro123@localhost:5984/')
  let roadmap = nano.use('roadmaps')
  roadmap.get(hashString, { revs_info: true }, function(err, body) {
    if (!err){
      console.log(body);
      res.send(body)
    }

  });



  // roadmaps/b861691e2005f156ee35c2a8849a4e9c022e33732c95a192810b23970806ffbf
  // res.send(hashString)

})

app.post('/save-roadmap-:rdmpId', function(req, res) {
  console.log('post');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})