const error = require("../middleware/error"); 
const Courses = require("../model/courses"); 
const ErrorHandler = require("../utils/errorhandler") ; 
const catchAsyncErrors = require("../middleware/catchAsyncErrors") ; 
const ApiFeatures = require("../utils/apifeatures")
exports.createCourse  =   catchAsyncErrors(async(req , res , next)=>{ 
    //  req.body.user = req.user.id ; 
     const course = await Courses.create(req.body) ;     
     console.log("created Course " , course) ;   

     res.status(201).send({message: "Courses Created Successfully"}) ; 

})  

exports.searchCourse = catchAsyncErrors(async(req , res , next) =>{   
    const apiFeature  = new ApiFeatures(Courses.find() , req.query).search() 
    const course = await apiFeature.query ; 
    res.status(200).send({
         success: true, 
         course
    }) ; 
    
})