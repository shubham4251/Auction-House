var express=require('express');//taking from package json
var bodyParser=require('body-parser');
var session = require('express-session');
var connection = require('./js/config');//takin from our directory
var app = express();
app.set('view engine','ejs');
//var io      =     require("socket.io");
//app.use(express.static('public'));
var authenticateController=require('./js/authenticate-controller');//signup page include kar raha h
var registerController=require('./js/register-controller');//login page maintain kar raha h
var bidcontroller=require('./js/bid_controller');//bid controlle kar raha h
process.stdout.write(__dirname+ "/" + "fp.html");//yaha se start hota h project
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended:false}));//need to know 
app.use(bodyParser.json());//need to know
//app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {  
   res.sendFile( "C:/Users/shubham bajaj/Desktop/ahh1/signup/fp.html" ); 
})


 
app.get('/signup.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "signup.html" ); 
   
})
app.get('/fp.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "fp.html" ); 
   
})
app.get('/desc.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "desc.html" ); 
})
app.get('/new.ejs', function (req, res) {  
   //res.sendFile( __dirname + "/" + "product.html" );
   if (req.session.loggedin) {
     //res.sendFile( __dirname + "/" + "product.html" );
      res.render('new',{userName:req.session.lname})
      //res.send('Welcome back, ' + req.session.lname + '!');
     
 }
})
//logout
app.get('/l', function (req, res) {  
   console.log('destroy');
   //
   if(req.session.loggedin){
      var y=req.session.lname;
      console.log(y);
      connection.query("delete from amount where uname=?",[y], function (error, results, fields){
         if (!error){
                  console.log("no error")
     }
         else{
           res.json({
             message:'error'
     
           })
           console.log(error);
         }
     })
     

   }
   
   //
   req.session.destroy();
   //res.render('/signup/fp');
   res.sendFile( __dirname + "/" + "fp.html" );  
})
app.get('/bid.ejs', function (req, res) {
   if(req.session.loggedin){
      //var y=req.session.lname;
      //console.log(y);
      //console.log("product ki id",req.session.product);
      connection.query("select count(*) as c from amount", function (error, results, fields){
         if (!error){
                  console.log("no error");
                  console.log(results);
                  console.log(results[0].c);
                  if(results[0].c==1)
                  {  
                     res.render('bid1',{print:req.session.lname});//congratulation page
                     //console.log(req.session.lname);
                  }
                  else{
                     res.render('bid');
                  }


     }
         else{
           res.json({
             message:'error'
     
           })
           console.log(error);
         }
     })
     

   }  
   
   
   //res.sendFile( __dirname + "/" + "bid.html" );  
})
app.get('/desc1.ejs', function (req, res) {
   //console.log("desc1");
   res.render('desc1');
   //console.log(req.body.p1);
   //res.render('bid',{show:req.body.a})
   //res.sendFile( __dirname + "/" + "bid.html" );  
})
app.get('/desc2.ejs', function (req, res) {
   res.render('desc2');
})
app.get('/desc3.ejs', function (req, res) {
   res.render('desc3');
})
app.get('/desc4.ejs', function (req, res) {
   res.render('desc4');
})

app.get('/bid1.ejs', function (req, res) {
   console.log("bid1");
   res.render('bid1',{data:req.session.result})
   //res.render('bid',{show:req.body.a})
   //res.sendFile( __dirname + "/" + "bid.html" );  
})
app.get('/bid2.ejs', function (req, res) { 
   res.render('bid2',{print:req.session.result})
     
})
app.get('/js/bid_controller.js', function (req, res) {  
   res.sendFile( __dirname + "/js/" + "bid_controller.js" );  
})

app.get('/images/home/1.jpg', function (req, res) {  
   res.sendFile( __dirname + "/images/home/" + "1.jpg" );  
})  
app.get('/images/home/2.jpg', function (req, res) {  
   res.sendFile( __dirname + "/images/home/" + "2.jpg" );  
})
app.get('/images/home/3.jpg', function (req, res) {  
   res.sendFile( __dirname + "/images/home/" + "3.jpg" );  
})  
app.get('/images/signup/1_Xlfc-6Ol9ok172W5u3eMTQ.jpeg', function (req, res) {  
   res.sendFile( __dirname + "/images/signup/" + "1_Xlfc-6Ol9ok172W5u3eMTQ.jpeg" );  
})
app.get('/images/product/p1.jpeg', function (req, res) {  
   res.sendFile( __dirname + "/images/product/" + "p1.jpeg" );  
}) 
app.get('/images/product/p2.jpeg', function (req, res) {  
   res.sendFile( __dirname + "/images/product/" + "p2.jpeg" );  
}) 
app.get('/images/product/p3.jpeg', function (req, res) {  
   res.sendFile( __dirname + "/images/product/" + "p3.jpeg" );  
}) 
app.get('/images/product/p4.jpeg', function (req, res) {  
   res.sendFile( __dirname + "/images/product/" + "p4.jpeg" );  
}) 
 
 



app.get('/cs/fp.css', function (req, res) {  
   res.sendFile( __dirname + "/cs/" + "fp.css" );  
})  
app.get('/cs/signup.css', function (req, res) {  
   res.sendFile( __dirname + "/cs/" + "signup.css" );
})



app.get('/js/fp.js', function (req, res) {  
   res.sendFile( __dirname + "/js/" + "fp.js" );  
})  



/* route to handle login and registration */
app.post('/api/register',registerController.register);
app.post('/api/authenticate',authenticateController.authenticate);
app.post('/api/bid',bidcontroller.bid);
 console.log(authenticateController);
app.post('/js/register-controller', registerController.register);
app.post('/js/authenticate-controller', authenticateController.authenticate);
 app.post('/js/bid_controller',bidcontroller.bid)

app.listen(8081);
