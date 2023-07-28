const mongo = require("mongoose") ; 
const validator = require("validator") ;
const bcrypt  =  require("bcryptjs")  ;  
const jwt = require("jsonwebtoken") ;    
const crypto = require("crypto");    

const courseSchema  =  new mongo.Schema({ 

   name: { 
     type: String , 
     required:[true , "Please Enter Course Name"] , 
     trim : true, 
     
   }, 
   courseCode: {
    type: String , 
    required: [true , "Please Enter Course Code"]  ,
    unique: true,
   }, 
   courseInstructorName:{
    type: String , 
    required: [true , "Enter the name of Instructor"]
   }, 
   courseInstructorEmail: { 
    type: String , 
    required: [true , "Enter the name of Course Instructor"],
    validate: [validator.isEmail , "Please Enter valid Email" ]
   } , 
   reviews:[{
       student: { 
        type: mongo.Schema.ObjectId, 
        ref: "User" , 
        required: true , 
       }, 
       name: {
         type: String, 
         require: true, 
       },
       rating: {
          type: Number ,
          required: true , 
       }, 
       comment: { 
         type:String , 
         required: true ,
       } 
   }], 
   createdAt:{ 
    type: Date , 
    default: Date.now
   }


}) ; 

module.exports = mongo.model("courses" , courseSchema) ; 