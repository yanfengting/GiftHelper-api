var express = require('express');
var router = express.Router();
var db = require('../modules/db'); //获取模型


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render("index.ejs", {
    title: 'Express'
  });
});
// 添加一个user数据
// router.get('/addUser', function (req, res, next) {
//   var docs = [{
//     userid: "1",
//     username: "admin",
//     password: "123456",
//   }]
//   db.User.insertMany(docs, function (err, result) {
//     res.json({
//       code: 200,
//       message: '成功'
//     })
//   });
// })
// router.get('/getUser', function (req, res, next) {
//   //查找所有数据
//   db.User.find({}, function (err, result) {
//     if (err) {
//       res.json({
//         code: 201,
//         message: '访问数据出错'
//       });
//       return;
//     }
//     res.json({
//       code: 200,
//       message: '成功',
//       users: result
//     })
//   })
// })
// swipers数据库是直接在robo创建添加的数据
router.get('/api/getSwipers', function (req, res, next) {
  //查找所有数据
  db.swiperModel.find({}, function (err, result) {
    if (err) {
      res.json({
        code: 201,
        message: '访问数据出错'
      });
      return;
    }
    res.json({
      code: 200,
      message: '成功',
      swipers: result
    })
  })
})

router.get('/api/jingxuan', function (req, res, next) {
  //查找所有数据
  db.jingxuanModel.find({}, function (err, result) {
    if (err) {
      res.json({
        code: 201,
        message: '访问数据出错'
      });
      return;
    }
    res.json({
      code: 200,
      message: '成功',
      jingxuans: result
    })
  })
})
router.get('/api/colleagues', function (req, res, next) {
  //查找所有数据
  db.colleagueModel.find({}, function (err, result) {
    if (err) {
      res.json({
        code: 201,
        message: '访问数据出错'
      });
      return;
    }
    res.json({
      code: 200,
      message: '成功',
      colleagues: result
    })
  })
})
router.get('/api/gays', function (req, res, next) {
  //查找所有数据
  db.gayModel.find({}, function (err, result) {
    if (err) {
      res.json({
        code: 201,
        message: '访问数据出错'
      });
      return;
    }
    res.json({
      code: 200,
      message: '成功',
      gays: result
    })
  })
})
router.get('/api/nvyous', function (req, res, next) {
  //查找所有数据
  db.nvyouModel.find({}, function (err, result) {
    if (err) {
      res.json({
        code: 201,
        message: '访问数据出错'
      });
      return;
    }
    res.json({
      code: 200,
      message: '成功',
      nvyous: result
    })
  })
})
router.get('/api/zhangbeis', function (req, res, next) {
  //查找所有数据
  db.zhangbeiModel.find({}, function (err, result) {
    if (err) {
      res.json({
        code: 201,
        message: '访问数据出错'
      });
      return;
    }
    res.json({
      code: 200,
      message: '成功',
      zhangbeis: result
    })
  })
})
router.get('/api/baby', function (req, res, next) {
  //查找所有数据
  db.babyModel.find({}, function (err, result) {
    if (err) {
      res.json({
        code: 201,
        message: '访问数据出错'
      });
      return;
    }
    res.json({
      code: 200,
      message: '成功',
      baby: result
    })
  })
})
router.get('/api/cyshs', function (req, res, next) {
  //查找所有数据
  db.cyshModel.find({}, function (err, result) {
    if (err) {
      res.json({
        code: 201,
        message: '访问数据出错'
      });
      return;
    }
    res.json({
      code: 200,
      message: '成功',
      cyshs: result
    })
  })
})
router.get('/api/qpggs', function (req, res, next) {
  //查找所有数据
  db.qpggModel.find({}, function (err, result) {
    if (err) {
      res.json({
        code: 201,
        message: '访问数据出错'
      });
      return;
    }
    res.json({
      code: 200,
      message: '成功',
      qpggs: result
    })
  })
})
router.get('/api/kjfs', function (req, res, next) {
  //查找所有数据
  db.kjfModel.find({}, function (err, result) {
    if (err) {
      res.json({
        code: 201,
        message: '访问数据出错'
      });
      return;
    }
    res.json({
      code: 200,
      message: '成功',
      kjfs: result
    })
  })
})
router.get('/api/mmds', function (req, res, next) {
  //查找所有数据
  db.mmdModel.find({}, function (err, result) {
    if (err) {
      res.json({
        code: 201,
        message: '访问数据出错'
      });
      return;
    }
    res.json({
      code: 200,
      message: '成功',
      mmds: result
    })
  })
})
router.get('/api/sjgs', function (req, res, next) {
  //查找所有数据
  db.sjgModel.find({}, function (err, result) {
    if (err) {
      res.json({
        code: 201,
        message: '访问数据出错'
      });
      return;
    }
    res.json({
      code: 200,
      message: '成功',
      sjgs: result
    })
  })
})
router.get('/api/wyfs', function (req, res, next) {
  //查找所有数据
  db.wyfModel.find({}, function (err, result) {
    if (err) {
      res.json({
        code: 201,
        message: '访问数据出错'
      });
      return;
    }
    res.json({
      code: 200,
      message: '成功',
      wyfs: result
    })
  })
})
router.get('/api/gift', function (req, res, next) {
  //查找所有数据
  db.giftModel.find({}, function (err, result) {
    if (err) {
      res.json({
        code: 201,
        message: '访问数据出错'
      });
      return;
    }
    res.json({
      code: 200,
      message: '成功',
      gifts: result
    })
  })
})
router.get('/api/goods', function (req, res, next) {
  //查找所有数据
  db.Goods.find({}, function (err, result) {
    if (err) {
      res.json({
        code: 201,
        message: '访问数据出错'
      });
      return;
    }
    res.json({
      code: 200,
      message: '成功',
      goods: result
    })
  }).sort({"favorites_count":-1})
})

module.exports = router;