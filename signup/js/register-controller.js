var Cryptr = require('cryptr');
var express=require("express");
var connection = require('./config');
cryptr = new Cryptr('myTotalySecretKey');
module.exports.register=function(req,res){
    //var today = new Date();
  var encryptedString = cryptr.encrypt(req.body.password);
    var users={
        "fname":req.body.name,
        "uname":req.body.username,
        "email":req.body.email,
        "password":encryptedString,
        "phone_number":req.body.phoneno,
        "address":req.body.add
    }
    //console.log("bhai kuch to ho raha h");
   /*  req.check('email','').isEmail();

    var errs=req.valida */
    connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
      if (error) {
          console.log(error);
        
       /*  res.json({
            status:false,
            message:'there are error with query'
        }) */
        //console.log("bhai errror hai")
        console.log("user alerady exits");
        res.redirect('/fp.html');
        
        
      }else{/* 
          res.json({
            status:true,
            data:results,
            message:'user registered sucessfully'
        }) */
        //console.log("error nahi h")
        console.log("registered sucessfully")
        res.redirect('/signup.html');
        //res.redirect('/fp.html');
         
      }
    });
}
