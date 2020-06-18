var express=require('express');
var app=express();
var mongojs=require('mongojs');


var db=mongojs('Practice',['testScript']);

var bodyParser=require('body-parser');
 
 


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



  //////////////// 1ST TASK/////////////////////////// 

function gotAwards(n){

    db.newUsers.find({ AwardWon: { $gte: n } },function(err,doc){
        if(err){return err}
        console.log('1ST TASK 1ST TASK 1ST TASK 1ST TASK 1ST TASK 1ST TASK')
        console.log(doc);
        
    })
     

 
}

gotAwards(15);

 //////////////// 2nd TASK/////////////////////////// 
function gotAwardsYear(n){
 
  db.newUsers.find({ Awardyear: { $gte: n } },function(err,doc){
      if(err){return err}
      console.log('2nd TASK 2nd TASK 2nd TASK 2nd TASK 2nd TASK 2nd TASK')
      console.log(doc);
      
  })
   


}
gotAwardsYear(2015)


 //////////////// 3 rd Taskkk////////////////////////////////////// 

function getProfitsOnbooks(){
  
  db.books.aggregate(
    [
      { $project: { bookSold:1,totalProfit: { $multiply: [ "$bookrate", "$bookSold" ] } } }
    ]
    ,function(err,doc){
      if(err){return err}
      console.log('3 rd Taskkk 3 rd Taskkk 3 rd Taskkk 3 rd Taskkk 3 rd Taskkk ')
      console.log(doc);
     }
 )
}

getProfitsOnbooks()


 //////////////// 4th      TASK/////////////////////////// 

function getbirthDateTotalPrice(date,price){

 
  db.datetotalPrice.aggregate(
    [
      { $match: { 
        totalPrice: { $gte: price } ,
        date: date
    }},
     ]
    ,function(err,doc){
      if(err){return err}
      console.log('4th task 4th task 4th task 4th task 4th task 4th task')
      console.log(doc);
     }
 )

}

getbirthDateTotalPrice("1906-12-09T05:00:00.000Z",2000)




const port=5555;
app.listen(port,function(){
    console.log("Server is Running on "+" "+port)
})



 

