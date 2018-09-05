const express = require('express');
var app = express();
var router = express.Router();
let db = require('./mysql');


//基础成功接口
let base_success = (res,data) => {
  return res.send({
    code:0,
    data:data
  });
}

//获取全部数据
router.get('/all', function (req, res) {
  let sql = `select * from main;`;
  let sql2 = `select * from list;`;
  db.query(sql, [], function (result, fields) {
    db.query(sql2, [], function (result2, fields2) {
      let data = {
        type:result,
        list:result2,
      };
      base_success(res,data);
    });
  });
});

app.use('/', router);

app.listen(8001, () => {
  console.log(`服务端口 http://localhost:8001`)
});

