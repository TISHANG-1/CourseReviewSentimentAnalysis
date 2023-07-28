const mongo = require("mongoose") ; 
const validator = require("validator") ;
const bcrypt  =  require("bcryptjs")  ;  
const jwt = require("jsonwebtoken") ;    
const crypto = require("crypto"); 
const instructorSchema = new mongo.Schema({
    name: {type: String , 
           required:[true ,"Please Enter your name"], 
           maxLength: [30 , "Maximum Limit Exceeded"],   

         }, 
    email: {
        type: String, 
        required:[
          true, "Please Enter Your name"
        ] , 
        validate:[
            validator.isEmail , "Please Enter a Valid Email"
        ] 
    }, 
    password: {
        type:String , 
        required: [true , "Please Enter the Password"], 
        select:false , 
        
    } , 
    avatar: [
        {
            publicID: {
                 type: String , 
                 required : false
            } , 
            url: { 
                 type:String , 
                 required: false ,
            }
        }
    ] , 
    role:{
        type: String , 
        default: "User"
    } , 
    createdAt: { 
         type: Date , 
         default: Date.now ,
    } , 
    resetPasswordToken: String ,
    resetPasswordExpire: Date, 

}) ;   


instructorSchema.pre("save" , async function(){ 
    if(!this.isModified("password")){ 
       return ; 
    }
    this.password =  await bcrypt.hash(this.password , 10) ; 
})  


//JWT TOKEN 

instructorSchema.methods.getJWTToken =  function(){ 
  return jwt.sign({id:this._id} , process.env.JWT_SECRET , {expiresIn: process.env.JWT_EXPIRE ,  }) ;
}  
// comparing the password
instructorSchema.methods.comparePassword  = async function(enteredPassword){  
    return await bcrypt.compare(enteredPassword ,this.password) ; 
}   


// Generating Password Reset Token 
instructorSchema.methods.getResetPasswordToken  =  function(){      
 //Generating Token 
 const resetToken = crypto.randomBytes(20).toString("hex");   
 console.log(resetToken) ; 
 this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex") ; 
 console.log(this.resetPasswordToken) ; 
 //   
 this.resetPasswordExpire
 = Date.now() + 15*60*1000
    
}   

module.exports = mongo.model("instructor" , instructorSchema) ;    
