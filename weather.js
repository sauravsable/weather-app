const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
 res.sendFile(__dirname +"/weather.html")
});
 
app.post("/",function(req,res){
 console.log(req.body.cityname);
 const query=req.body.cityname;
 const appkey="b99b141721da61d5cdcf863ecddd4ccb";
 const unit="metric";
 const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ appkey +"&units="+ unit ;

  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherdata=JSON.parse(data);
      const temp=weatherdata.main.temp;
      const desc=weatherdata.weather[0].description;
      const icon=weatherdata.weather[0].icon;
      const imageurl="https://openweathermap.org/img/wn/"+ icon + "@2x.png"
      res.write("<p> The Weather is currently " + desc + "</p>")
      res.write("<h1> The Temperature in "+ query +" is "+ temp + " degree celsius</h1> ")
      res.write("<img src=" + imageurl +">");
      res.send();
    });
  });
});


app.listen(3000,function(){
    console.log("Server is running at port 3000");
})