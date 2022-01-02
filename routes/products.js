import Express from 'express';
import mongodb from 'mongodb';


var router =Express.Router(); 
var result_arr;
var col_arr;
var shirt_arr;
var jeans_arr;
var shoes_arr;
var shorts_arr;
var watches_arr;
var explore=["https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/25/a88b9390-5adb-493b-a1b3-702c59ccf53a1598348260502-Nike.jpg",
            "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/25/c9f66558-feab-4d76-aa3c-adc68d81dce21598348260415-Levis.jpg",
            "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/5/178c1e5d-69f2-402f-a2a5-ef44700a0f691596640983793-Roadster---.jpg",
            "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/25/085719b1-c71e-4f47-950c-9a6b7f291fac1598348260370-Jack-_-Jones.jpg",
            "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/5/774f42c4-f459-4514-9b90-cf8a60a5f68c1596644478087-hrx30.jpg",
            "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/25/f6e40444-b1a4-4c91-bb3c-fe213356e7de1598348260541-Only.jpg",
            "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/5/a6de806a-b58b-460b-97fd-d78d80eab39b1596641021693-Women-s-Ethnic-Wear_Anouk.jpg",
            "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/25/8d13b55d-a6a0-40ae-b39f-16f43e7911681598348260460-MAC.jpg",
            "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/25/046ab589-87d5-4afa-8ab3-10e06fdbe6a61598348260596-W.jpg",
            "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/25/f2fdda02-423c-4f11-8f1b-618ba807e5841598348260323-H_M.jpg",
            "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/retaillabs/2020/9/4/e6c7a718-acc0-4aa6-b04c-470ab139d66c1599230080722-F21--4-.jpg",
            "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/31/581e2bf6-6d47-4a4b-a11f-43200dc9c6791598892519362-Puma.jpg"];







var MongoClient = mongodb.MongoClient;




MongoClient.connect('mongodb+srv://Rohit:rohitsret022@shopme.phd4x.mongodb.net/Fashion?retryWrites=true&w=majority', function (err, client) {
  if (err) throw err

  var db = client.db('Fashion')

  db.collection('Products').find().toArray(function (err, result) {
    if (err) throw err
    console.log(result)
    console.log(typeof(result));
    result_arr=Object.values(result);
    console.log(result_arr);
  })

  db.collection('Collections').find().toArray(function (err, result) {
    if (err) throw err
    console.log(result)
    col_arr=Object.values(result);
    console.log(col_arr);
  })
  db.collection('Shirts').find().toArray(function (err, result) {
    if (err) throw err
    console.log(result)
    shirt_arr=Object.values(result);
  })
  db.collection('Jeans').find().toArray(function (err, result) {
    if (err) throw err
    console.log(result)
    jeans_arr=Object.values(result);
  })
  db.collection('Shoes').find().toArray(function (err, result) {
    if (err) throw err
    console.log(result)
    shoes_arr=Object.values(result);
  })
  db.collection('Shorts').find().toArray(function (err, result) {
    if (err) throw err
    console.log(result)
    shorts_arr=Object.values(result);
  })
  db.collection('Watches').find().toArray(function (err, result) {
    if (err) throw err
    console.log(result)
    watches_arr=Object.values(result);
  })

})



router.get('/',function(req,res){

    res.render('sample',{
        products:col_arr,
        exp:explore
    });
})
router.get('/shirts',function(req,res){

  res.render('product',{
      products:shirt_arr,
  });
})


router.get('/jeans',function(req,res){

  res.render('product',{
      products:jeans_arr
  });
})
router.get('/shoes',function(req,res){

  res.render('product',{
      products:shoes_arr
  });
})

router.get('/shorts',function(req,res){

  res.render('product',{
      products:shorts_arr
  });
})

router.get('/watches',function(req,res){

  res.render('product',{
      products:watches_arr
  });
})

export default router;