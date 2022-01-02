import Express from 'express';
import mongodb from 'mongodb';
import alert from 'alert';


var acct_arr,subs_arr;
var router =Express.Router();

var MongoClient = mongodb.MongoClient;




//checking for email linked with existing account
router.post('/',function verify_acc(req, res, next){

    let i=0;
    let val=false;

    //Connecting to the Mongodb Fashion database
    MongoClient.connect('mongodb+srv://Rohit:rohitsret022@shopme.phd4x.mongodb.net/Fashion?retryWrites=true&w=majority', function (err, client) {
    if (err) throw err

    var db = client.db('Fashion')

    db.collection('accounts').find().toArray(function (err, result) {
        if (err) throw err
        while(i<result.length){
            if(result[i].email==req.body.email )
            {
                val=true;
                if(result[i].subscribe==0){
                 //Updating the subscribe value
                db.collection('accounts').updateOne({"email":req.body.email},{ $set: { subscribe: 1}}),(function (err, results) {
                    if (err) throw err
                    console.log("Successfully Subscribed !!");
                    subs_arr=results;
                })
                alert("Successfully Subscribed !!");
                }
                else if(result[i].subscribe==1){
                    alert("Already Subscribed !!");
                }
            }
            i++;
        }
            if(val==false){
                alert("Sorry Cant find your email id linked with any accounts. Please sign up first and then try again");
                res.redirect('/sign-up');
            }
    })

    })

  },
  )

export default router;