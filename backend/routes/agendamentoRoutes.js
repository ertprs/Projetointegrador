var express = require('express');
var router = express.Router();
const eventoController = require("../controller/eventoController")

/* GET home page. */
router.get('/',eventoController.index);
router.post('/create',eventoController.create);

module.exports = router;
