var express=require("express");
var connection = require('./config');
//var data=0;
/* var pri =function(){
      console.log("hello");
} */


module.exports.bid=function(req,res){
    var amount={
        "amnt":req.body.a,
        "uname":req.session.lname
    }

    
    var result;
    var pri=function(){
      connection.query('select * from amount where amnt=(select max(amnt) from amount)', function (error, results, fields){
        if (!error){
                req.session.result=results;
                console.log(req.session.result);
                res.redirect('/bid2.ejs');
    //res.render('bid',{data:results})
    }
        else{
          res.json({
            message:'error'
    
          })
        }
    })
      
    }
    connection.query("update amount SET ? where uname=?",[amount,amount.uname], function (error, results, fields) {
        if (error) {
            console.log(error);
          
          res.json({
              status:false,
              message:'there are error with query'
          })
          
        }else{
          /* 
            res.json({
              status:true,
              data:results,
              message:'user registered sucessfully'
          })
 */           console.log(req.session.lname);
              //res.redirect('/bid1.ejs');
             setTimeout(pri,5000);
             /* function print()
              {
                console.log("hello");
              } */

   /*            connection.query('select * from amount where amnt=(select max(amnt) from amount)', function (error, results, fields){
              if (!error){
                      req.session.result=results;
                      console.log(req.session.result);
                      res.redirect('/bid2.ejs');
        //res.render('bid',{data:results})
      }
              else{
                res.json({
                  message:'error'

                })
              }
    }) */
        }

      });
   /*  connection.query('select amnt from amount where uname=?',[amount.uname], function (error, results, fields)
    {
      if (!error)
      {
        console.log(results);
        res.render('bid',{data:results})
      }
    }) */
      
}





