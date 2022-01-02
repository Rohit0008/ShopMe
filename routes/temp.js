import Express from 'express';

var router =Express.Router();    // create router object 


router.get('/',(req,res)=>{         //  localhost:4000/user

    res.send("welcome to user module");
})

 
router.get('/list-of-users/:id',(req,res)=>{         //  localhost:4000/user/list-of-users/400

    res.send("user detail :" + req.params.id);
})


router.get('/list-of-users/:state/:city',(req,res)=>{         //  localhost:4000/user/list-of-users/400

    res.send("state :" + req.params.state + " city : "+ req.params.city);
})




export default router;