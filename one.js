import Express from 'express';
import mongodb from 'mongodb';
import path from 'path';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import mongoose from 'mongoose';
import alert from 'alert';
import dotenv from 'dotenv';

//importing the routing modules
import login from './routes/login.js';
import subscribe from './routes/subscribe.js';
import products from './routes/products.js';
import cart from './routes/cart.js';
import { nextTick } from 'process';
const app=Express();
dotenv.config();
app.locals.rmWhitespace = true;
app.locals.rmWhitespace = true;

var search_arr;
let searchq;

//Connecting the mongoose for posting the sign up data
mongoose.connect('mongodb+srv://Rohit:rohitsret022@shopme.phd4x.mongodb.net/Fashion?retryWrites=true&w=majority', {useNewUrlParser: true});
var account_info =mongoose.Collection;
var users =new mongoose.Schema({
	name: {
    type:String,
    required:true
  },
	email:  {
    type:String,
    required:true,
    unique:true
  },
	password:  {
    type:String,
    required:true
  },
	phone:  {
    type:Number,
    required:true
  },
  subscribe:  {
    type:Number,
  },
});

var account_model = mongoose.model('Accounts', users);


const __dirname = path.resolve();
app.set('views',path.join(__dirname +'/views'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));


var acct_arr;
var MongoClient = mongodb.MongoClient;





/*
let search;
//algorithm for searching
var search_fn= function(item){
  MongoClient.connect('mongodb://localhost:27017/Fashion', function (err, client) {
      if (err) throw err
    
      var db = client.db('Fashion')
    
    db.collection('Products').find({"pdt_category":item}).toArray(function (err, result) {
        if (err) throw err
        console.log(result);
        search=result;
        console.log(search);
      })
    })

}*/

/*app.post('/search',function(req,res,next){
  searchq=req.body.searching;
  MongoClient.connect('mongodb://localhost:27017/Fashion', function (err, client) {
      if (err) throw err
    
      var db = client.db('Fashion')
    
    db.collection('Products').find({"pdt_category":req.body.searching}).toArray(function (err, result) {
        if (err) throw err
        console.log(result);
        let i=0;
        while(i<result.length){
          if(result[i].pdt_category==req.body.searching)
          {
            search_arr=result;
            res.send("success")
            
          }
          i++
        }
          })
    })
},
)*/



console.log(__dirname);
app.use(Express.static(__dirname+"/views"));




app.use('/subscribe',subscribe );

//Products Page
app.use('/products',products );
//Cart Page
app.use('/cart',cart );

//home page
app.get('/',function(req,res){

  res.render('home');
})

//login page
app.use('/login',login);

//sign-up page
app.get('/sign-up',function(req,res){

  res.render('signup',{
    users:acct_arr
  });
})

//posting the sign-up from into database
app.post('/sign-up',function(req,res){
      //Connecting to the mongodb Accounts database
      MongoClient.connect('mongodb+srv://Rohit:rohitsret022@shopme.phd4x.mongodb.net/Fashion?retryWrites=true&w=majority', function (err, client) {
        if (err) throw err

        var db = client.db('Fashion')

        db.collection('accounts').find().toArray(function (err, result) {
          if (err) throw err
          const password=req.body.password;
          const cpassword=req.body.cpassword;
          let i=0;
          let val=true;
          while(i<result.length){
            if(result[i].email==req.body.email)
            {
              alert("Email id already exists, please use some other email id");
              val=false;
            }
    
            i++;
          }
          if(password == cpassword && val==true){
            let newUser = new account_model({
              name: req.body.name,
              email: req.body.email,
              password: req.body.password,
              phone: req.body.contact,
              subscribe:0,
            });
            newUser.save();
            alert("Congrats Successfully Signed Up!!");
            res.redirect('/login');
          }
          else if(password != cpassword && val==true){
            alert("Password does not match!!");
          }
        })
      }) 
})

// wildcard routing 
app.get('*',(req,res)=>{    

  res.render('error');

})


app.listen(process.env.PORT || 5000,function(req,res){
    console.log("IM RUNNING...")
})

