var Cryptr = require('cryptr');
cryptr = new Cryptr('myTotalySecretKey');
var bodyParser=require('body-parser');
 
var connection = require('./config');
module.exports.authenticate=function(req,res){
    var uname=req.body.lname;
    var password=req.body.lpass;
   
   
    connection.query('SELECT * FROM users WHERE uname = ?',[uname], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
       
        if(results.length >0){
  decryptedString = cryptr.decrypt(results[0].password);
            if(password==decryptedString){
              console.log("user exists");
              req.session.loggedin = true;
              req.session.lname = uname;
              //connection.query('insert into amount set?')
              var x={
                "uname":req.session.lname,
                "amnt":1000

              };
              connection.query("insert into amount set ?",x, function (error, results, fields) {
                if (error) {
                    console.log(error);}})
                res.redirect('/new.ejs');
                  }

                else{
                    console.log("user does not exists");
                    //alert("Enter correct user name");
                    res.redirect('/signup.html');
                
            }
          
        }
        else{
         /*  res.json({
              status:false,    
            message:"Username does not exits"
          }); */
          res.redirect('/signup.html');
        }
      }
    });
}
