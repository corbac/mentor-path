const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser')

// create application/json parser
// var jsonParser = bodyParser.json()


 
// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })


const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
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
      // console.log(body);
      res.send(body)
    }

  });


  // roadmaps/b861691e2005f156ee35c2a8849a4e9c022e33732c95a192810b23970806ffbf
  // res.send(hashString)

})

app.put('/update-roadmap', function(req, res) {
  console.log(req.body.roadmap.author.title);
  res.send(req.body)

  if (!req.body||req.body=={}){
    return res.status(400).send("Bad Request")
  }

  // console.log(req);
  const hash = crypto.createHash('sha256');
  hash.update(req.body.roadmap.author.title.replace(' ', '_'))
  let hashString = hash.digest('hex')
  console.log(hashString);
  // res.send([req.params,hashString])

  //'b861691e2005f156ee35c2a8849a4e9c022e33732c95a192810b23970806ffbf'
  var nano = require('nano')('http://mp:Leroro123@localhost:5984/')
  let roadmap = nano.use('roadmaps')
  roadmap.get(hashString, function(err, old) {
    if (!err){
      // console.log("- Headers:");
      console.log("- Old:");
      console.log(old._rev);
      // // res.send(body)
      // console.log(req.body);
      // console.log("-----------");
      roadmap.insert({"_id": hashString, "_rev": old._rev, "roadmap" : req.body.roadmap}, function(err, _new) {
        console.log("update...");
        if (!err){
          console.log("- New:");
          console.log(_new);
          // res.send(body)
          console.log("-----------");
        }
      });
    }

  });
})


app.post('/save-roadmap-:rdmpId', function(req, res) {
  console.log('post');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})