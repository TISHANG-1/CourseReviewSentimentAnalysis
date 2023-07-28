const express = require('express') ; 
const cookieParser =  require('cookie-parser') ; 
const app = express() ;  
const bodyParser =  require("body-parser") ; 
 

app.use(cookieParser()) ; 
app.use(express.json());     
app.use(bodyParser.urlencoded({extended: true}))  ; 
app.use((req, res, next) => {
  // Set the allowed origins
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your frontend domain

  // Set the allowed methods
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  // Set the allowed headers
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Allow credentials (cookies, authorization headers) to be sent
  res.header('Access-Control-Allow-Credentials', true);

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    return res.status(200).json({});
  }

  next();
});

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });
const errorMiddleware = require("./middleware/error");
// app.use('/'  , require('routes/productRoute.js/router')) ;
// importing the routes in the app  , overall everything we import here is ultimately sent to the server side of the file (server.js) ;
const  courses = require("./routes/coursesRoutes")   ; 
const student = require("./routes/studentsRoutes") ;      
const instructor = require("./routes/instructorsRoutes") ; 
app.use("/api/v1" , courses) ;  
app.use("/api/v1" ,student); 
// app.use('/' , product) ;   
app.use("/api/v1" ,instructor); 
// middle ware for Errors 
app.use(errorMiddleware) ;  

module.exports = app



