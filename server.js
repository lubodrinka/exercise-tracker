const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const cors = require('cors')

const mongoose = require('mongoose')
mongoose.connect(process.env.MLAB_URI || 'mongodb://localhost/exercise-track', { useNewUrlParser: true } )

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


// Not found middleware
/*app.use((req, res, next) => {
  return next({status: 404, message: 'not found'})
})*/

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
})
 var Schema = mongoose.Schema;
var childSchema  = new Schema({
    // Single nested subdocuments. Caveat: single nested subdocs only work
  // in mongoose >= 4.2.0
description:String,
   duration:Number,
   date:{ type: Date, default:  new Date() }  
});

  
var blogSchema = new Schema(
  { name:  {
    type: String,
    required: true},
   child: [childSchema]
    
         
});
 
 
var Person = mongoose.model('Person6', blogSchema);

app.post("/api/exercise/new-user", function (req, res ) {
   console.log(req.body.username)
   //res.json(req.body,{id:  docs});
var person = new Person({ name: req.body.username})
//var url = req.body.url
Person.findOne({name :req.body.username},                          
  function (err, docs) {
  if(docs) { res.send('username already taken')}
  else{  
  person.save(function(err, docs) {
 if (err) res.json({err:err});
  console.log(docs)
   res.json({name:req.body.username,id:docs._id});
 });    
  }
})
})


app.post("/api/exercise/add", function (req, res ) {
   console.log(req.body)
  

var personId = req.body.userId
Person.findById(personId,                          
  function (err, docs) {
  if(!docs) { res.send('First add new user')}
  else{  
     console.log(docs)
  var date=new Date(req.body.date)
     docs.child.push({description:req.body.description,duration:req.body.duration,date: date})
  docs.save(function(err, docs) {
 if (err) res.json({err:err});
  console.log(docs)
   res.json({description:req.body.description,duration:req.body.duration,date: date.toDateString()});
 });    
  }
})
})
//SyKsUMHNmhttps://fuschia-custard.glitch.me/api/exercise/log?userId=SyKsUMHNm&from=2014-01-08&to=2018-07-24&limit=5
 //  /api/exercise/log?userId=SyKsUMHNm&from=2018-01-01&to=2018-07-23&limit=100
//api/exercise/log?{SyKsUMHNm}[&2018-04-08][&2018-04-08][&5]
//qfind log api/exercise/log?{5b56e0c61f75d708d4cb0997}[&2018-04-08][&2018-04-08][&5]
//api/exercise/log?userId=5b58365863c3821040f73d51&from=2014-01-08&to=2018-07-24&limit=5
app.get("/api/exercise/log", function (req, res ) {
 var userId =req.query.userId|| "Nothing was sent";
  var dateFrom=new Date(req.query.from)|| null;
  var dateTo=new Date(req.query.to)|| null;
  var limit=req.query.limit|| null;
var query= Person.findById(userId)
  console.log(dateFrom)
if(dateFrom!="Invalid Date"){
    query.where('child.date').limit(limit).gt(dateFrom).lt(dateTo)
    query.exec(function (err, docs) {
       console.log(docs)
     query.countDocuments().exec(function (err, count) {
   res.json({id:userId,from:dateFrom.toDateString(),to:dateTo.toDateString(),limit:limit,count:count,log: docs});
    }); 
  });}else{
      
      
   query.where('child.date').limit(limit)
    query.exec(function (err, docs) {
       console.log(docs)
     query.countDocuments().exec(function (err, count) {
   res.json({id:userId,limit:limit,count:count,log: docs});
    }); 
  });
    
    }
 });










  const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})