var express = require('express');
const { Db } = require('mongodb');
var router = express.Router();
var db = require('../connection/connection')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;




//signup
router.get('/signup', (req, res) => {
  res.render('signup')
})


router.post('/signup', (req, res) => {
  const body = req.body
  return new Promise(async(resolve,reject)=>{
    const data = await db.get().collection('login').findOne({username:body.username})
    if (data)
    {
      res.send('username already exist! please try another')
    }
    else
    {
    await db.get().collection('login').insertOne(body)
    res.render('login')
  }
  })
})




//login
router.get('/login',(req,res)=>{
  res.render('login')
})

router.post('/login',(req,res)=>{
  const body = req.body
  return new Promise(async(resolve,reject)=>{
    const dbdata = await db.get().collection('login').findOne({username:body.username})
    if (dbdata)
    {
      if(body.password==dbdata.password)
      {
        const data = await db.get().collection('login').findOne({username:body.username})
        console.log(data);
        res.render('home',{name:data})
      }
      else
      {
        res.send('incorrect password')
      }
    }
    else
    {
      res.send('username incorrect')
    }
  })
})





//home
router.get('/home',(req,res)=>{
  
  res.render('home')
})





//addtask
router.get('/addtask',(req,res)=>{
  res.render('addtask')
})

router.post('/addtask',(req,res)=>{
  const data = req.body
  return new Promise(async(resolve,reject)=>{
    await db.get().collection('task').insertOne(data)
    res.send('data added')
  })
})