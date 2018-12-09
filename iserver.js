var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var path = "name.json";
var data = fs.readFileSync(path, 'utf8');
var nameList = JSON.parse(data);
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: true}));

//Standard index code, renderar in index och nameList
app.get('/', function(request, response){
   
      return response.render('index', {data : nameList});
});
//Läser in min första form file. "Lägga till information i .json filen"
app.get('/getform', function(request, response){
   return response.render('get_forms')
});
//Här är funktionerna för att lägga till information i .json filen.
app.get('/getformBack', function(request, response){
   var data = request.query
   var n = data.name
   var a = Number(data.age)
   nameList[n] = a
   var infoJson = JSON.stringify(nameList, null, 2);
   fs.writeFileSync(path, infoJson);
   
   console.log(data)
   response.redirect('/');
}); 

//Denna kodsnutt läser in .css filer och bilder m.m. 
// app.use(express.static("namn"));



//Här är funktionerna för att ta bort information ifrån .json filen.
app.get('/getSubmit', function(request, response){
   
   var searched = request.query.name;
   
   if(nameList[request.query.name]){
      
      delete nameList[searched];
      var key = {name: request.query.name};
      var ageData = JSON.stringify(nameList, null, 2);
       fs.writeFileSync(path, ageData);
       response.redirect('/');
   }
});

// läser in form-filen för att ändra i .json filen.
app.get('/postform', function(request, response){
   return response.render('post_forms');
});

// här är funktionerna för att ändra i .json filen.
app.get('/postsubmit', function(request, response){
   
   var data = request.query
   var a = Number(data.age)


   if(nameList[data.name]){
      nameList[data.name] = a
      var infoJson = JSON.stringify(nameList, null, 2);
      fs.writeFileSync(path, infoJson);
      return response.redirect('/');
   }
   
   return response.send("not found");
});

//Standard kod för att öppna localhost.
app.listen(3000, listening);
function listening(){
   console.log("listening . . .");
} 

