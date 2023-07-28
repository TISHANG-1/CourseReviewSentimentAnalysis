const courses =  require('../controllers/coursesController') ; 
const express =  require("express") ;  
const router =  express.Router() ;   
router.route('/course/new').post(courses.createCourse) ;   
module.exports = router ;   

router.route('/course').get(courses.searchCourse) ;  
