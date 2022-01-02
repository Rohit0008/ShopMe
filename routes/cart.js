import Express from 'express';
import mongodb from 'mongodb';
import mongoose from 'mongoose';


var router =Express.Router();
var cart_arr;


mongoose.connect('mongodb+srv://Rohit:rohitsret022@shopme.phd4x.mongodb.net/Fashion?retryWrites=true&w=majority', {useNewUrlParser: true});
var cart_info =mongoose.Collection;
var cart =new mongoose.Schema({
	pdt_brand: {
    type:String,
    required:true
  },
	pdt_type:  {
    type:String,
    required:true,
  },
	pdt_category:  {
    type:String,
    required:true
  },
  pdt_amt:  {
    type:Number,
    required:true
  },
	pdt_img:  {
    type:String,
    required:true
  },
});

var cart_model = mongoose.model('Cart', cart);

var MongoClient = mongodb.MongoClient;

router.post('/',function(req,res){
  let newCart = new cart_model({
    pdt_brand: req.body.brand,
    pdt_type: req.body.type,
    pdt_category: req.body.category,
    pdt_amt: req.body.amount,
    pdt_img: req.body.image,
  });
  newCart.save();
}
)


router.get('/',function(req,res){
  //Connecting and updating the carts each time the url is called
  MongoClient.connect('mongodb+srv://Rohit:rohitsret022@shopme.phd4x.mongodb.net/Fashion?retryWrites=true&w=majority', function (err, client) {
    if (err) throw err
  
    var db = client.db('Fashion')
  
    db.collection('carts').find().toArray(function (err, result) {
      if (err) throw err
      console.log(result)
      console.log(typeof(result));
      cart_arr=Object.values(result);


      res.render('cart',{
        cart_info:result
    });

    
    })
   
  })

})



export default router;