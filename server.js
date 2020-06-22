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

  db.authors.find( {awards : {$exists:true}, $where:'this.awards.length>='+n}

  ,function(err,doc){
    console.log('dddddddddd')
     console.log(doc)
  });

}

 gotAwards(4);

 //////////////// 2nd TASK/////////////////////////// 
function gotAwardsYear(n){
 
  db.authors.find({ 'awards.year': { $gte: n } },function(err,doc){
      if(err){return err}
      console.log('2nd TASK 2nd TASK 2nd TASK 2nd TASK 2nd TASK 2nd TASK')
      console.log(doc);
      
  })
   


}
 gotAwardsYear(1973.0)


 //////////////// 3 rd Taskkk////////////////////////////////////// 

function getProfitsOnbooks(){
  
  db.books.aggregate(
    [
      { $project: { sold:1,totalProfit: { $multiply: [ "$price", "$sold" ] } } }
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

   
  db.authors.aggregate(
    [
      { $match: { 
        totalPrice: { $gte: price } ,
        birth: new Date(date)
    }},

    // { 
    //   "$lookup": { 
    //       "from": 'books', 
    //       "localField": 'name.authorId', 
    //       "foreignField": 'authorId', 
    //       "as": 'result' 
    //   } 
    // },
   
    //  {$unwind: '$result'}, 
    //{ $project:{'$result':{'$price':1}}}
   
    

  //  { $project: { totalProfit: { $multiply: [ "$result.$.price", "result.$.$sold" ] } } }
     ]
    ,function(err,doc){
      if(err){return err}
      console.log('4th task 4th task 4th task 4th task 4th task 4th task')
      console.log(doc);
     }
 )

}

getbirthDateTotalPrice("1924-12-03T05:00:00.000Z",3000)




const port=5555;
app.listen(port,function(){
    console.log("Server is Running on "+" "+port)
})



 

