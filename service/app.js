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
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS');
  next();
});

app.get('/', function (req, res) {
  res.send('Hello World!')
  var nano = require('nano')('http://mp:Leroro123@localhost:5984/')
  // nano.db.create('books')
  console.log('hi')
})


/*
TODO : Understand for each and async issue to make better code : https://stackoverflow.com/questions/38406920/best-way-to-wait-for-foreach-to-complete 
*/
app.get('/get-trending-roadmaps', function(req, res) {

  var nano = require('nano')('http://mp:Leroro123@localhost:5984/')
  let roadmap = nano.use('roadmaps')
  let q = {
    selector : {
      "roadmap" : {
        "author" : {
          "title" : req.params.rdmpId
        }
      }
    }
  }
  var roadmaps_res = []
  roadmap.list({limit : 10}, function(err, body) {
    // console.log('heelo');
    if (!err){
      // console.log(body);
      // res.send(body['rows'])

      let source = body['rows']
      function deeper(err, body) {
        console.info('deeper:');
        roadmaps_res.push(body)
        console.info(roadmaps_res);
        if (source.length == roadmaps_res.length){
          console.info('send:');
          console.info(roadmaps_res)
          res.send(roadmaps_res)
        }
      }
      
      function forfun(data, index, arr){
        roadmap.get(data.id, deeper)
        console.info('forfun:');
        console.info(roadmaps_res)
        if (index == arr.length -1) resolve();
      }

      var job = new Promise((resolve, reject) => {
        body['rows'].forEach(function (data, index, arr){
          roadmap.get(data.id, deeper)
          console.info('forfun:');
          console.info(roadmaps_res)
          if (index == 0){
            console.info('fun res')
            console.info(roadmaps_res)
            // console.info(index)
            resolve();
          } 
        });
      });
      // console.info(roadmaps_res);
      // body['rows'].forEach(forfun);

      job.then(() => {
        // console.info('send:');
        // console.info(roadmaps_res)
        // res.send(roadmaps_res)
      });
      
      // console.info(roadmaps_res);
    }

  });
})

app.get('/get-roadmap-:rdmpId', function(req, res) {
  const hash = crypto.createHash('sha256');
  hash.update(req.params.rdmpId)
  let hashString = hash.digest('hex')
  // res.send([req.params,hashString])

  //'b861691e2005f156ee35c2a8849a4e9c022e33732c95a192810b23970806ffbf'
  var nano = require('nano')('http://mp:Leroro123@localhost:5984/')
  let roadmap = nano.use('roadmaps')
  let q = {
    selector : {
      "roadmap" : {
        "author" : {
          "title" : req.params.rdmpId
        }
      }
    }
  }
  roadmap.find(q, function(err, body) {
    // console.log('heelo');
    if (!err){
      console.log(body);
      res.send(body['docs'][0])
    }

  });

  // roadmap.get(hashString, { revs_info: true }, function(err, body) {
  //   if (!err){
  //     // console.log(body);
  //     res.send(body)
  //   }

  // });


  // roadmaps/b861691e2005f156ee35c2a8849a4e9c022e33732c95a192810b23970806ffbf
  // res.send(hashString)

})

app.put('/update-roadmap', function(req, res) {
  console.log(req.body.roadmap);
  // res.send(req.body)

  if (!req.body||req.body=={}){
    return res.status(400).send("Bad Request")
  }

  // console.log(req);
  // const hash = crypto.createHash('sha256');
  // hash.update(req.body.roadmap.author.title.replace(' ', '_'))
  // let hashString = hash.digest('hex')
  // console.log(hashString);
  // res.send([req.params,hashString])

  //'b861691e2005f156ee35c2a8849a4e9c022e33732c95a192810b23970806ffbf'
  var nano = require('nano')('http://mp:Leroro123@localhost:5984/')
  let roadmap = nano.use('roadmaps')
  roadmap.get(req.body._id, function(err, old) {
    if (!err){
      // console.log("- Headers:");
      console.log("- Old:");
      console.log(old._rev);
      // // res.send(body)
      // console.log(req.body);
      // console.log("-----------");
      roadmap.insert({"_id": req.body._id, "_rev": old._rev, "roadmap" : req.body.roadmap}, function(err, _new) {
        console.log("update...");
        if (!err){
          console.log("- New:");
          console.log(_new);
          res.send(_new)
          console.log("-----------");
        }
      });
    }

  });
})

app.put('/register-user', function(req, res) {
  console.log(req.body);
  res.send(req.body)

  if (!req.body||req.body=={}){
    return res.status(400).send("Bad Request")
  }

  // console.log(req);
  let user = req.body

  let hash = crypto.createHash('sha256');
  hash.update(user.pwd)
  let hashPassword = hash.digest('hex')
  user.password = hashPassword

  hash = crypto.createHash('sha256');
  hash.update(user.email)
  let hashEmailToID = hash.digest('hex')
  console.log(hashPassword);
  console.log(hashEmailToID);
  // res.send([req.params,hashString])

  //'b861691e2005f156ee35c2a8849a4e9c022e33732c95a192810b23970806ffbf'
  var nano = require('nano')('http://mp:Leroro123@localhost:5984/')
  let roadmap = nano.use('users')

  roadmap.insert({ _id: hashEmailToID, user}, function(err, body) {
    if (!err)
      console.log(body)
  })

})

app.post('/login-user', function(req, res) {
  console.log(req.body);
  // res.send(req.body)

  if (!req.body||req.body=={}){
    return res.status(400).send("Bad Request")
  }

  const hash = crypto.createHash('sha256');
  hash.update(req.body.email)
  let hashString = hash.digest('hex')
  // // res.send([req.params,hashString])
  console.log(hashString);
  // res.send({'lol' : hashString})
  //'b861691e2005f156ee35c2a8849a4e9c022e33732c95a192810b23970806ffbf'
  var nano = require('nano')('http://mp:Leroro123@localhost:5984/')
  let roadmap = nano.use('users')
  roadmap.get(hashString, { revs_info: true }, function(err, body) {
    if (!err){
      console.log(body);
      const hash = crypto.createHash('sha256');
      hash.update(req.body.pwd)
      let passwordHashed = hash.digest('hex')
      // console.log(body.user.password == passwordHashed);
      if (body.user.password == passwordHashed){
        let user = body.user
        user['uid'] = body._id
        res.send(user)
      }
      return res.send(false)
    }
  });


  // roadmaps/b861691e2005f156ee35c2a8849a4e9c022e33732c95a192810b23970806ffbf
  // res.send(hashString)

})

app.post('/save-roadmap', function(req, res) {
  console.log(req.body);
  // res.send(req.body)

  if (!req.body||req.body=={}){
    return res.status(400).send("Bad Request")
  }

  let roadmap = req.body.roadmap
  let roadmap_id_hashable = roadmap.author.id + roadmap.author.title.replace(' ', '_') + Date.now()

  const hash = crypto.createHash('sha256');
  hash.update(roadmap_id_hashable)
  let hashString = hash.digest('hex')
  // // res.send([req.params,hashString])
  console.log(hashString);
  // res.send({'lol' : hashString})
  //'b861691e2005f156ee35c2a8849a4e9c022e33732c95a192810b23970806ffbf'
  var nano = require('nano')('http://mp:Leroro123@localhost:5984/')
  let roadmap_db = nano.use('roadmaps')
  roadmap_db.insert({ _id: hashString, roadmap}, function(err, body) {
    if (!err)
      console.log(body)
      res.send(body)
  })
})

app.post('/save-roadmap-:rdmpId', function(req, res) {
  console.log('post');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})