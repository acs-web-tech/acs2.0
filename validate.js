
function validate(data={}){
       let regname = new RegExp(/[\^\d\s\W_]/igm)
       let regdate = new RegExp(/\d{4}-\d{2}-\d{2}/gim)
       let regdate2 = new RegExp(/[\$\(\)\/\\\+\*\?\<\>\&\^%#@!A-Za-z]/img)
       
       if(data.name.match(regname)!=null){
           console.log("err1")
        return false
       }
       
       else if(data.dateofEnd.match(regdate)==null||data.dateofEnd.match(regdate2)!=null){
        console.log("err2")
        return false
       }
       else if(data.dataofstart.match(regdate)==null||data.dataofstart.match(regdate2)!=null){
        console.log("err3")
         return false
        }
        else if(data.teampin.match(/[A-Za-z]/igm)!=null){
           
            return false
        }
        else if(data.reason.match(/[\$\(\)\/\\\+\*\?\<\>\&\^%#@!_~\{\}]/igm)!=null){
            console.log("err5")
            return false
        }
        else{
            return true
        }
}
module.exports.validate= validate