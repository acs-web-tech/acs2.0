const { resolveSrv } = require("dns/promises");
let express = require("express");
let app = express()
let fs = require("fs");
const { reset } = require("nodemon");
let path = require("path");
const { isBuffer } = require("util");
let dat = require("./pefgen")
let validate = require("./validate")
let mailFUNC = require("./mailer")
let chunk
app.use(express.static("html"))

app.use(express.json())
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/html/index.html")
    res.end()
})
app.post("/server",async function(req,res){
 
  
         if(validate.validate(req.body)){
  let  stream = res.writeHead(200,{"Content-Type":"application/pdf"})
   
  let data =await dat.print(req.body, (chunk) =>{
    chunk=chunk
    stream.write(chunk)
  
  },
  () =>{ 
    mailFUNC.mail(req.body,chunk)
    stream.end()})
   

}
else{
   
    res.sendStatus(400,"Request denied by the server")
 
   
}


})
app.listen( 4080,"ip-172-31-91-120.ec2.internal",()=>{
    console.log("working in 400")
    console.log(new Date().toLocaleString("en-US",{timeZone:"Australia/Adelaide"}))
})
module.exports.route = app