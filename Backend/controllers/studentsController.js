const error = require('../middleware/error.js');
const Student =  require('../model/students.js');  
const ErrorHandler = require('../utils/errorhandler.js');
const catchAsyncErrors  = require('../middleware/catchAsyncErrors')  
const ApiFeatures = require('../utils/apifeatures.js') ; 
const sendToken =  require("../utils/jwtToken.js") ; 
const crypto = require("crypto") ;
const sendEmail =  require("../utils/sendEmail.js") ;   
const cloudinary =  require("cloudinary") ;


exports.registerStudent = catchAsyncErrors(
    async(req , res , next)=>{    
        console.log("this is the register portal") ;
    //     const myCloud = await  cloudinary.v2.uploader.upload(req.body.avatar ,{folder:"avatar" , 
    // width: 150 , crop : "scale" } )  ;
        const {
            name, email, password
        }  = req.body ; 
        const student =  await Student.create({name, email , password , avatar:{
           publicID :"myCloud.public_id", 
           url:"myCloud.secure_url"
        }})   
        sendToken(student, 201 , res) ; 
    }
)  

exports.loginStudent= catchAsyncErrors(  
   
    async(req , res , next)=>{   
     console.log("tishang login") ;
       const {email , password} = req.body ;  
       // checking if Student has given password and email both  
       if(!email || !password){
      return next(new ErrorHandler("Please Enter  Email and Password" , 400)) ;   
     }
      console.log(email) ;   
      console.log(password) ; 
      const student =  await Student.findOne({email}).select("+password") ; 
      if(!Student){ 
           return next(new ErrorHandler("Invalid email or password" , 401)) ;
      }   
    
      const isPasswordMatched = await  Student.comparePassword(password); 
      console.log(isPasswordMatched)
      if(!isPasswordMatched){ 
           return next(new ErrorHandler("Invalid email or password"  , 401)) ;
      }  
       
      sendToken(student, 200 , res) ;
     }
 )  