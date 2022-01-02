import Express from 'express';
import mongodb from 'mongodb';
import alert from 'alert';

var router =Express.Router();
var acct_arr;
var MongoClient = mongodb.MongoClient;



router.get('/',function(req,res){

    res.render('login',{
      users:acct_arr,
    });
  })
  
  
  router.post('/',function verify_acc(req, res, next){
    //Connecting to the mongodb Accounts database
    MongoClient.connect('mongodb+srv://Rohit:rohitsret022@shopme.phd4x.mongodb.net/Fashion?retryWrites=true&w=majority', function (err, client) {
        if (err) throw err
  
        var db = client.db('Fashion')
  
         db.collection('accounts').find().toArray(function (err, result) {
             if (err) throw err
            let i=0;
            let val=false;
          
                while(i<result.length){
                  if((result[i].email==req.body.emailorname || result[i].name==req.body.emailorname) && result[i].password==req.body.password )
                  {
                    val=true;
                    alert("Logged in successfully");
                    return next();
                  }
                  else if((result[i].email==req.body.emailorname || result[i].name==req.body.emailorname) && result[i].password!=req.body.password )
                  {
                    val=true;
                    alert("Incorrect Password. Please try again!");
                  }
                  i++;
                }
                if(val==false){
                  alert("Sorry Cant find your account. Please sign up first and then login again");
                  res.redirect('/sign-up');
                }
        })
    })
   
  
  },
  function product(req, res){
    res.redirect('/');
  }
  )


  router.get('/reset-password',function(req,res){

    res.render('forgot');
  })
  
  //checking for email linked with existing account
  router.post('/reset-password',function verify_acc(req, res, next){
    MongoClient.connect('mongodb+srv://Rohit:rohitsret022@shopme.phd4x.mongodb.net/Fashion?retryWrites=true&w=majority', function (err, client) {
  if (err) throw err

  var db = client.db('Fashion')

db.collection('accounts').find().toArray(function (err, result) {
    if (err) throw err

    let i=0;
    let val=false;
  
        while(i<result.length){
          if(result[i].email==req.body.email )
          {
            val=true;
            alert("Reset password link has been sent to your email id");
            return next();
          }
          i++;
        }
        if(val==false){
          alert("Sorry Cant find your email id linked with any accounts. Please sign up first and then login again");
          res.redirect('/sign-up');
        }
    })
})
  
  },
  function login(req, res){
    res.redirect('/login');
  }
  )
  


  export default router;