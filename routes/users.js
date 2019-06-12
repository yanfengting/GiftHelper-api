var express = require('express');
var router = express.Router();
var db = require('../modules/db'); //获取模型
require('./../util/util'); // 引入格式化函数

//定义返回变量格式
var resData;
router.use(function (req, res, next) {
  resData = {
    code: 0,
    message: ''
  };
  next();
})

/*获取个人资料*/
router.get('/', function (req, res, next) {
  var _id = req.cookies._id;
  db.User.findOne({
    _id: _id
  }, function (err, doc) {
    // console.log(doc)
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        res.json({
          status: '0',
          msg: '',
          result: doc
        })
      }
    }
  })
});
// 提交个人资料
router.post('/', function (req, res, next) {
  var _id = req.cookies._id;
  // console.log(req.body)
  var sex = req.body.sex;
  var phone = req.body.phone;
  var birthday = req.body.birthday;
  var img_url = req.body.img_url;
  db.User.updateOne({ // 查询条件
    "_id": _id,
  }, { // 修改的数据
    "sex": sex,
    "phone": phone,
    "birthday": birthday,
    "img_url": img_url
  }, function (err, doc) {
    // console.log(doc)
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'suc'
      });
    }
  });
});
// 登录接口
router.post('/login', function (req, res, next) {
  // console.log(req.body.username)
  var username = req.body.username;
  var password = req.body.password;
  if (username == '' || password == '') {
    resData.code = 1;
    resData.message = '用户名或密码不能为空';
    res.json(resData);
    return;
  }
  //查询数据库验证用户名和密码
  db.User.findOne({
    username: username,
    password: password
  }).then(function (userInfo) {
    if (!userInfo) {
      resData.code = 2;
      resData.message = '用户名或密码错误';
      res.json(resData);
      return;
    }
    //写cookie 验证通过则登录
    // 1cookie名称 2cookie值 3设定他的一些参数
    res.cookie("_id", userInfo._id, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 6
      // 存一个小时是1000 * 60 * 60
    });
    // //其次可以存到session，想怎么用怎莫用
    // req.session.user = userInfo
    //验证通过则登录
    resData.message = '登录成功';
    resData.userInfo = {
      _id: userInfo._id,
      username: userInfo.username
    };
    res.json(resData);
    return;

  })

})
// 登出接口
router.post("/logout", function (req, res, next) {
  //清空cookie
  res.cookie('_id', "", {
    path: "/",
    maxAge: -1
  })
  //还有一种方式是通过clear方式清除cookie
  res.json({
    status: '0',
    msg: '',
    result: ''
  })
})
// 注册接口
router.post('/register', function (req, res, next) {
  // 拿到前台传过来的值
  var username = req.body.username;
  var password = req.body.password;
  var repassword = req.body.repassword;
  // console.log(username)
  // console.log(password)
  //用户名不能空
  if (username == '') {
    resData.code = 1;
    resData.message = '用户名不能为空';
    res.json(resData); //使用res.json的方法返回前端数据
    return;
  }
  //密码不能为空
  if (password == '') {
    resData.code = 2;
    resData.message = '密码不能为空';
    res.json(resData);
    return;
  }
  //两次密码不能不一样
  if (password != repassword) {
    resData.code = 3;
    resData.message = '两次输入的密码不一致';
    res.json(resData);
    return;
  }

  // 查找数据库有没有相同的用户名 ，没有的话保存到数据库
  db.User.findOne({
    username: username
  }).then(function (userInfo) {
    // console.log("数据库查询是否有此数据：" + userInfo); //若控制台返回空表示没有查到数据
    if (userInfo) {
      //若数据库有该记录
      resData.code = 4;
      resData.message = '用户名已被注册';
      res.json(resData);
      return;
    }
    var user = new db.User({
      username: username,
      password: password,
      // _id: getNextSequenceValue("productid")
    }); //通过操作对象操作数据库
    return user.save();
  }).then(function (newUserInfo) {
    // console.log(newUserInfo)
    resData.message = '注册成功';
    res.json(resData);
  });
})
// 校验用户信息
router.get("/checkLogin", function (req, res, next) {
  if (req.cookies._id) {
    res.json({
      status: '0',
      msg: '',
      result: req.cookies.userName || '' // 获取cookeie req.cookies.属性
    });
  } else { // 取不到就说明当前没有登录
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    });
  }
})
// 加入购物车
router.post('/goods/addCart', function (req, res, next) {
  try {
    // 因为我们要把商品添加到当前用户名下，所以需要一个用户Id
    // 往用户 的名下去插购物车信息，判断，如果用户名下已经有了，只需要更新一下数量
    // get取参数: req.params  post取参req.body.productId
    // var _id = '1';
    var _id = req.cookies._id;
    // ProductId = req.body.productId;
    // 拿到用户信息，返回了userDoc
    var productId = req.body.productId;
  } catch (err) {
    res.json({
      status: '1',
      msg: err.message
    });
    console.log(err);
  }


  // console.log(req.body.productId)

  // 通过_id查询用户表，返回userDoc用户表的数据
  db.User.findOne({
    _id: _id
  }, function (err, userDoc) {
    if (err) {
      res.json({
        status: "1",
        msg: 'User表访问数据出错' + err.message
      });
    } else {
      // console.log("User表的查询结果" + userDoc)
      if (userDoc) {
        // 根据productId去匹配商品信息  // goods表的id：传过来的前台id
        let goodsItem = '';
        // 遍历用户购物车，判断加入购物车的商品是否已经存在 item是一个索引，可要可不要
        userDoc.cartList.forEach(function (item) {
          if (item.id == productId) {
            goodsItem = item;
            item.productNum++; //商品添加到购物车里面，不要让他添加新商品，而是 购物车这件商品数量+1
          }
          // item来源于userDoc
          // console.log("商品数量:" + item.productNum)
        })
        if (goodsItem) { // 若购物车商品已存在
          userDoc.save(function (err2, doc2) {
            if (err2) {
              res.json({
                status: "1",
                msg: err2.message
              })
            } else {
              res.json({
                status: '200',
                msg: '',
                result: doc2
              })
            }
          })
          // 若购物车不存在就添加进去
        } else {
          db.Goods.findOne({
            id: productId
          }, function (err1, doc) {
            // console.log("Goods表的查询结果" + doc)
            if (err1) {
              res.json({
                status: "1",
                msg: '查找Good表数据出错' + err1.message
              });
            } else {
              // 匹配到以后，
              if (doc) {
                // 加一个数量
                doc.productNum = 1;
                doc.checked = 0;
                // 需要把这个商品信息doc添加到User表的cartList里面，最后save到数据库
                // 因为要在查出来的用户信息里面push数据，所以是userDoc
                userDoc.cartList.push(doc);
                userDoc.save(function (err2, doc2) {
                  // console.log("保存结果" + doc2)
                  if (err2) {
                    res.json({
                      status: "1",
                      msg: err2.message
                    })
                  } else {
                    res.json({
                      status: '200',
                      result: doc2
                    })
                  }
                })
              }
            }
          })
        }
      }
    }
  })
})
//从用户列表查询购物车的信息
router.get('/cartList', function (req, res, next) {
  var _id = req.cookies._id;
  db.User.findOne({
    _id: _id
  }, function (err, doc) {
    // console.log(doc)
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        res.json({
          status: '0',
          msg: '',
          result: doc.cartList
        })
      }
    }
  })
})
//购物车删除
router.post('/cartDel', function (req, res, next) {
  var _id = req.cookies._id,
    id = req.body.id;
  // console.log(id)
  // console.log(_id)
  db.User.updateOne({
    _id: _id
  }, {
    $pull: {
      'cartList': {
        'id': id
      }
    }
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'suc'
      });
    }
  })
});
//修改商品数量接口
router.post("/cartEdit", function (req, res, next) {
  var _id = req.cookies._id,
    id = req.body.productId,
    productNum = req.body.productNum;
  // checked = req.body.checked;
  // console.log(productNum)
  console.log(req.body)
  db.User.update({ // 查询条件
    "_id": _id,
    "cartList.id": id
  }, { // 修改的数据
    "cartList.$.productNum": productNum
    // "cartList.$.checked": checked
  }, function (err, doc) {
    // console.log(doc)
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      res.json({
        status: '0',
        msg: '修改成功',
        result: 'suc'
      });
    }
  });
})
// 查询用户地址接口
router.get("/addressList", function (req, res, next) {
  var _id = req.cookies._id;
  db.User.findOne({
    _id: _id
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: doc.addressList
      });
    }
  })
});
//提交用户的地址列表
router.post("/addressList", function (req, res, next) {
  var _id = req.cookies._id,
    Name = req.body.Name,
    Phonenum = req.body.Phonenum,
    Address = req.body.Address,
    AddressDetail = req.body.AddressDetail,
    PostalCode = req.body.PostalCode,
    Isdefault = req.body.Isdefault;
  console.log(req.body)
  db.User.findOne({ // 查询条件
    "_id": _id
  }, function (err, doc) {
    // console.log(doc)
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      var user = {
        // sendPerson: sendPerson,
        Name: Name,
        Phonenum: Phonenum,
        Address: Address,
        AddressDetail: AddressDetail,
        PostalCode: PostalCode,
        Isdefault: Isdefault
      }; //通过操作对象操作数据库
      doc.addressList.push(user);
      doc.save(function (err2, doc2) {
        if (err2) {
          res.json({
            status: "1",
            msg: err2.message
          })
        } else {
          res.json({
            status: '200',
            msg: '',
            result: doc2
          })
        }
      })

    }
  });
})

//获取用户的礼物提醒列表
router.get("/remindList", function (req, res, next) {
  var _id = req.cookies._id;
  db.User.findOne({
    _id: _id
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: doc.remindList
      });
    }
  })
});
//提交用户的礼物提醒列表
router.post("/remindList", function (req, res, next) {
  var _id = req.cookies._id,
    sendPerson = req.body.sendPerson,
    sendReason = req.body.sendReason,
    sendTime = req.body.sendTime,
    text = req.body.text;
  // console.log(req.body)
  db.User.findOne({ // 查询条件
    "_id": _id
  }, function (err, doc) {
    // console.log(doc)
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      var user = {
        sendPerson: sendPerson,
        sendReason: sendReason,
        sendTime: sendTime,
        text: text
        // _id: getNextSequenceValue("productid")
      }; //通过操作对象操作数据库
      doc.remindList.push(user);
      doc.save(function (err2, doc2) {
        if (err2) {
          res.json({
            status: "1",
            msg: err2.message
          })
        } else {
          res.json({
            status: '200',
            msg: '',
            result: doc2
          })
        }
      })

    }
  });
})
//获取用户的订单列表
router.get("/orderList", function (req, res, next) {
  var _id = req.cookies._id;
  db.User.findOne({
    _id: _id
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ' '
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: doc.orderList
      });
    }
  })
});
//提交订单
router.post('/commitOrder', function (req, res, next) {
  var _id = req.cookies._id,
    goodId = req.body.goodId,
    productNum = req.body.countStr,
    Addressid = req.body.Addressid,
    totalMoney = req.body.totalMoney;
  console.log(req.body)
  db.User.findOne({ // 查询条件
    "_id": _id
  }, function (err, doc) {
    // console.log(doc)
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      // var address = '',
      //   goodsList = [];
      // 获取当前用户的地址信息
      doc.addressList.forEach((item) => {
        if (Addressid == item.Addressid) {
          address = item;
        }
      })
      // 获取当前用户的购物车的购买商品
      db.Goods.findOne({
        id: goodId
      }, function (err1, doc1) {
        // console.log(doc1)
        if (doc1) {
          // let a = doc.orderList
          // console.log(a)
          // console.log(a.goodsList)
          // doc.orderList.goodsList.push(doc1);
          // doc.save(function (err2, doc2) {
          //   // console.log("保存结果" + doc2)
          //   if (err2) {
          //     res.json({
          //       status: "1",
          //       msg: err2.message
          //     })
          //   } else {
          //     res.json({
          //       status: '200',
          //       result: doc2
          //     })
          //   }
          // })
          // }
          // })
          //创建订单Id
          var platform = '622'; // 平台系统架构码
          var r1 = Math.floor(Math.random() * 10);
          var r2 = Math.floor(Math.random() * 10);

          var sysDate = new Date().Format('yyyyMMddhhmmss'); // 系统时间：年月日时分秒
          var orderId = platform + r1 + sysDate + r2; // 21位

          // 订单创建时间
          var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
          // doc.cartList.filter((item)=>{
          //   if(item.checked == '1'){
          //       goodsList.push(item);
          //   }
          // })

          var order = {
            orderId: orderId,
            goodId: goodId,
            Addressid: Addressid,
            totalMoney: totalMoney,
            orderStatus: 1,
            createDate: createDate // 订单创建时间
          }; //通过操作对象操作数据库
          // 订单信息存储到数据库
          doc.orderList.push(order);
          doc.save(function (err2, doc2) {
            if (err2) {
              res.json({
                status: "1",
                msg: err2.message
              })
            } else {
              res.json({
                status: '200',
                msg: '',
                result: doc2
              })
            }
          })

        }
      });
    }
  })
})
// 商品全选不选
router.post("/editCheckAll", function (req, res, next) {
  var _id = req.cookies._id,
    checkAll = req.body.checkAll ? '1' : '0';
  User.findOne({
    _id: _id
  }, function (err, user) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      if (user) {
        user.cartList.forEach((item) => {
          item.checked = checkAll;
        })
        user.save(function (err1, doc) {
          if (err1) {
            res.json({
              status: '1',
              msg: err1,
              message,
              result: ''
            });
          } else {
            res.json({
              status: '0',
              msg: '',
              result: 'suc'
            });
          }
        })
      }
    }
  });
});
// 设置默认地址
router.post("/setDefault", function (req, res, next) {
  var _id = req.cookies._id,
    addressId = req.body.addressId;
  console.log(req.body)
  if (!addressId) {
    res.json({
      status: '1003',
      msg: 'addressId is null',
      result: ''
    });
  } else {
    db.User.findOne({
      _id: _id
    }, function (err, doc) {
      if (err) {
        res.json({
          status: '1',
          msg: err.message,
          result: ''
        });
      } else {
        var addressList = doc.addressList;
        addressList.forEach((item) => {
          if (item.addressId == addressId) {
            item.isDefault = true;
          } else {
            item.isDefault = false;
          }
        });
        doc.save(function (err1, doc1) {
          if (err) {
            res.json({
              status: '1',
              msg: err.message,
              result: ''
            });
          } else {
            res.json({
              status: '0',
              msg: '',
              result: ''
            });
          }
        })
      }
    });
  }
});
// 删除地址接口
router.post("/delAddress", function (req, res, next) {
  var _id = req.cookies._id,
    addressId = req.body.addressId;
  User.update({
    _id: _id
  }, {
    $pull: { // 删除子文档元素
      'addressList': {
        'addressId': addressId
      }
    }
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: ''
      });
    }
  });
});

module.exports = router;