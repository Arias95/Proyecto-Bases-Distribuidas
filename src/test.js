var express = require("express");
var router = express.Router();

router.get('/', function (req, res)
{
    res.send("420 BLAZE IT");
});

module.exports = router;
