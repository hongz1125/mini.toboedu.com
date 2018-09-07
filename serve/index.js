const express = require('express');
var app = express();
var path = require('path');
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
router.get('/api/all', function (req, res) {
  let sql = `select * from main;`;
  let sql2 = `select * from list;`;
  db.query(sql, [], function (result, fields) {
    db.query(sql2, [], function (result2, fields2) {
      let list_one;
      list_one = result.reduce((sam,item) => {
        let list_child = [];
        list_child = result2.reduce((sam2,item2) => {
          if(item2.p_id == item.id){
            sam2 = sam2.concat(item2)
          }
          return sam2;
        },[])
        
        if(list_child.length){
          item.children = list_child;
        }
        return sam.concat(item);
      },[])
      
      base_success(res,list_one);
    });
  });
});


app.use('/', router);

//静态目录
app.use('/static', express.static(path.resolve(`static`)))

app.listen(8001, () => {
  console.log(`服务端口 http://localhost:8001`)
});

