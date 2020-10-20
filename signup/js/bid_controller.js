var express=require("express");
var connection = require('./config');


module.exports.bid=function(req,res){
    var amount={
        "amnt":req.body.a,
        "uname":req.session.lname
    }

    
    var result;
    /* var red=function()
    {
      console.log("hello");
      res.redirect('/bid.ejs'); 
    } */

    //function start
    var pri=function(){
      connection.query('select * from amount where amnt=(select max(amnt) from amount)', function (error, results, fields){
        if (!error){
                req.session.result=results;
                console.log(req.session.result);
                res.redirect('/bid2.ejs');
                //setTimeout(red,5000);
    //res.render('bid',{data:results})
    }
        else{
          res.json({
            message:'error'
    
          })
        }
    })
    
      
    }
    //function end
    //"update amount SET ? where uname=?",[amount.amnt,amount.uname]
    //update amount set amnt = case when amnt>1000 then amnt else 1000 end where uname ='shubham';
    connection.query("update amount set amnt = case when ?>1000 then ? else 1000 end where uname =?",[amount.amnt,amount.amnt,amount.uname], function (error, results, fields) {
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
              /* var time=function()
              {
                setTimeout(pri,2000);
              }
              setInterval(time,5000); */
             setTimeout(pri,6000);
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





