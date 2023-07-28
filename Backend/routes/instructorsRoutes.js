const express = require('express'); 
const instructor = require('../controllers/instructorControllers');
const { isAuthenticatedUser } = require('../middleware/auth'); 
const { authorizedRoles } = require('../middleware/auth');
const router  = express.Router() ;   
module.exports = router ;