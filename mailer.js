let nodemailer = require("nodemailer")
let fs = require("fs")
async function Mail(data,chunk){
    console.log(chunk)
    let mail =await nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: "acsind2022@gmail.com",
          pass: "acs2004521",
        },
      })
   let send =await mail.sendMail({
        from:"acsind2022@gmail.com",
        to:"query@acsind.tech", 
        subject: "APPLICATION OF LEAVE", 
    html: `<h1> Leave Application from</h1>
         <b>Name of the Student : ${data.name}</b><br/>
         <b>Leave needed from :${data.dataofstart}</b><br/>
         <b>Leave ends on :${data.dateofEnd}</b><br/>
         <b>Team pincode :${data.teampin}</b><br/>
         <b>Reason :</b><br/>
         <p>
         ${data.reason}
         </p>
    `,  attachments: [
            {   // utf-8 string as an attachment
                filename: 'leave.pdf',
                path: __dirname+"/ala.pdf",
                contentType: 'application/pdf'
            }// html body
    ]},(error,info)=>{
      if(error){
          
          return
      }
      else{
          console.log("del")
          fs.unlink(__dirname+"/ala.pdf",(err)=>{
              if(err) console.log(err)
          })
        mail.close()
      }
    }
    )
  
}

module.exports.mail = Mail 