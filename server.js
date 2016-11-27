const express=require('express');
const fs=require('fs');
const port=process.env.PORT || 3000;

var app=express();
var hbs=require('hbs');


hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');



app.use(function(req,res,next){
  res.render('tester.hbs');
});
app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{

  var now=new Date().toDateString();
  var log=`${now} ${req.method} ${req.url}`;

  fs.appendFile('server.log',log + '\n',(error)=>{
      if(error){
          console.log('Unable to append to server.log');
      }
  });
  console.log();
    next();

});



hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});
var person={
    name:'Michael',
age:20,
    likes:[
        'food','music','soccer'
    ],
    sex:'Male'
};
  app.get('/',function (req,res) {
   res.render('home.hbs',{
       pageTitle:'Welcome home',
       welcomeMessage:'Welcome to my website',
       
   }
   );
  });

  app.get('/about',function(req,res){
   res.render('about.hbs',{
       pageTitle:'About page',
       paragraph:'Ntiriniga',
       
   });
  });

  app.listen(port,()=>{
      console.log(`Server is up on port ${port}`);
  });