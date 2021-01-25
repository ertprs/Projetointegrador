var express = require('express');
var router = express.Router();
const userController = require("../controller/userController")

/* GET home page. */
router.get('/',userController.index);
router.post('/api/user/login',userController.login);
router.get('/api/user/uniqueUrl',userController.isUnique);
router.post('/api/user/profile/:id',userController.createvento );
router.get('/api/user/:id', userController.getUser);
//router.post('/api/user/meetings/:id', usersController.updateMeetings);
router.get('/api/user/:url/:eventDuration', userController.getUserByUrl);
module.exports = router;

