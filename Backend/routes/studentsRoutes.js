const express = require('express'); 
const instructor = require('../controllers/instructorControllers');
const { isAuthenticatedUser } = require('../middleware/auth'); 
const { authorizedRoles } = require('../middleware/auth'); 
const { loginStudent, registerStudent } = require('../controllers/studentsController');
const router  = express.Router() ;   

router.route("/login").post(loginStudent) ; 
router.route("/register").post(registerStudent) ;
module.exports = router ;  