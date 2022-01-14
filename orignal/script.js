
var date = new Date();
let prevbtn =document.querySelectorAll(".prev__btn") 
let needdate=document.querySelector(".date__end__inp")
let pincode=document.querySelector(".team__pin__inp")
var curr = document.querySelector(".date__start__inp")
let reason = document.querySelector(".reason__leave__inp")
let submit = document.querySelector(".__submit")
let btn = document.querySelectorAll(".btn__name")
let nameinp=document.querySelector(".name__inp")
let state;
let globalCounter=0
let loader=document.querySelector(".pre-container")
let loadertxt=document.querySelector(".inner-loader>span")
let spinner = document.querySelector(".spin")

//nameinp.value="Balakumaran"

document.addEventListener("DOMContentLoaded",()=>{
    console.log(`${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDate()}`)
   if(date.getMonth()+1<=9&&date.getDate()<=9){
       let temp = ""+date.getFullYear()+"-0"+(date.getMonth()+1)+"-0"+date.getDate()
      
    curr.value =temp
   }
   else{
    let temp = ""+date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()

    curr.value =temp
   }

})




submit.addEventListener("click",checkInp)

function checkInp(event){
    console.log(needdate.value=="")
    let status = true
    let validate=()=>{
        nameinp.value==""||nameinp.value==null?status=false:""
        curr.value==""||curr.value==null?status=false:""
        needdate.value==""||needdate.value==null?status=false:""
        pincode.value==""||pincode.value==null?status=false:""
        reason.value==""||reason.value==null?status=false:""
}
validate()
if(status){
    loader.style.display="block"
    formSubmit()

}
else{
    alert("Fill All fields")
}
}

let counter =0
let methodsOrder = [()=>{InitAnimation("label__end","DateofEnd"," &#128543;",document.querySelector(".date__end"))},
()=>InitAnimation("label__start","Datebegins","",document.querySelector(".date__start")),()=>InitAnimation("label__team__pin","teampin","",document.querySelector(".team__pin")),()=>InitAnimation("label__reason__leave","end","",document.querySelector(".reason__leave"))]
btn.forEach((value,index)=>{
 
    value.addEventListener("click",(e)=>{
   
    if(state){
        state.style.display="none"
       
    }
   
    if(counter<4){
      
     methodsOrder[counter]()
     counter++
    }
    console.log(counter)
    
})
console.log(index)
 

})
prevbtn.forEach((value)=>{
    value.addEventListener("click",(e)=>{
    if(counter==0)return;  
    
      state.style.display="none"
     state.previousSibling.previousSibling.style.display="block"
     state = state.previousSibling.previousSibling

    counter--
    console.log(counter)
  })
})


function InitAnimation(target,type,reference="",container){
    let counter = 0
    container.style.display="block"
   container.previousSibling.previousSibling.style.display="none"
   state = container
  labels= {
    DateofEnd: `When will you come back Mr/Mrs.${nameinp.value.toUpperCase()}?`,
    Datebegins: "Did the Leave \n    Starts from the below date?.if not change it",
    teampin: "Enter your team pincode with student code eg:teampin-code",
    end: "Your Almost there enter your reason"
}
    let  source=document.querySelector("."+target)
    source.textContent=""
    let temp= setInterval(()=>{
       
           if(counter<labels[type].length){
               
                     source.textContent+=`${labels[type].charAt(counter)}`
                      counter++
                     }
                     else{
                        if(reference){
                                          
                            source.innerHTML+=reference
                          }   
                         clearInterval(temp)
                     }
           },50)
        }
      async function formSubmit(){
           let data = {name:nameinp.value,dateofEnd:needdate.value,dataofstart:curr.value,teampin:pincode.value,reason:reason.value}
         
           let state = false
          
           if(window.fetch){
            let resf =await fetch("/server",{
                   headers:{"Content-Type":"application/json"},
                   method:"POST",
                   body:`${JSON.stringify(data)}`
               }).then((e)=>{ 
                 if(e.status==200){         
                   return e.blob()
                 }else{
                     throw new Error("Request denied by server")
                 }
                  
               }).then((e)=>{
                   console.log(e)
                 
                  loadertxt.textContent="Submitted sucessfully "
                  spinner.style.display="none"
          window.open(URL.createObjectURL(e),"","width=500,height=500")
                   console.log(JSON.stringify(data))
              
                }).catch((e)=>{
                    loadertxt.textContent="An error occured! check the entered data/network or contact query@acsind.tech"
                    spinner.style.display="none"
                console.log(e)
            })
        }
           else{
              let xmlhttp = new XMLHttpRequest()
              xmlhttp.onreadystatechange=()=>{

                if(xmlhttp.readyState==4&&xmlhttp.status==200){
                    console.log(xmlhttp.responseText)
                }
              }
              xmlhttp.onerror=(e)=>{
                  console.log(e)
              }
            xmlhttp.open("POST","/server")
            xmlhttp.setRequestHeader("Content-Type","application/json")
            xmlhttp.send(`${JSON.stringify(data)}`)
            console.log(JSON.stringify(data))
        }
       }
