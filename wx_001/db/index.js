const express = require('express');
var app = express();
var router = express.Router();
let db = require('./mysql');


router.get('/', function (req, res) {

  let sql = `select * from main_type`;
  db.query(sql, [], function (result, fields) {
    res.send(result);
  });

});


app.use('/', router);
app.listen(8001, () => {
  console.log(`服务端口 http://localhost:8001`)
});

