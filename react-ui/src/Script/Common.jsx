const emailValidation=(email,error)=>{
    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email.length===0){
        error('!Email Error')
        return false
    }
    if(!emailRegex.test(email)){
        error('!enter email proper')
        return false
    }
    else return true
}


const passwordValidation =(password,error)=>{
    const passwordRegex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=.*[a-zA-Z]).{8,}$/;
    if(password.length===0){
        error('!enter password')
        return false
    }
    else{
        if(password.length<8){
            error('!please enter 8 characters')
            return false 
        } else{
            if(!passwordRegex.test(password)){
                error('!enter proper password')
                return false 
            }
            else return true
        }
    }

}


const nameValidation =(name,error)=>{
    const nameRegex= /^[a-zA-Z]+(?:[\s.]+[a-zA-Z]+)*$/;
    if(name.length===0){
         error('!enter name')
         return false
    }else{
        if(!nameRegex.test(name)){
            error('!enter proper name')
            return false
        }else{
            return true
        }

    }
}

const usernameValidation=(username,error)=>{
    const usernameRegex=/^[a-z]{3,16}$/;
    if(username.length===0){
        error('!enter username')
        return false
    }

    if(!usernameRegex.test(username)){
        error('!enter proper username')
        return false
    }

    return true
}



export {nameValidation,emailValidation,usernameValidation,passwordValidation}