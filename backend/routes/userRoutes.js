var express = require('express');
var router = express.Router();
const userController = require("../controller/userController")

/* GET home page. */
router.get('/',userController.index);
router.post('/create',userController.create);

module.exports = router;
