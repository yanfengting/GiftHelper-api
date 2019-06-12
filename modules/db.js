// 访问数据模块
// 操作mongodb数据所使用的模块包，mongoose中封装大量操作数据库的api，先引入再使用。
var mongoose = require('mongoose');
// 先连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/giftDB', {
  useNewUrlParser: true
});
// 定义一个Schema  集合结构（架构）
var userSchma = new mongoose.Schema({
  "userId": String, // _id
  "username": String, // 用户名
  "password": String, // 密码
  "phone": String, // 手机号
  "sex": String, // 性别
  "birthday": String, // 生日
  "img_url": String, // 头像
  "orderList": [{ // 用户订单列表
    "orderId": String, //订单id
    "goodId": String, // 商品id
    "Addressid": String, // 地址id
    "totalMoney": String, // 总价
    "orderStatus": String, // 订单状态
    "productNum": String, // 商品数量
    "createDate": String,
    "goodsList": [{
      "orderId": String,
      "productNum": String,
      "id": String,
      "name": String,
      "short_description": String,
      "price": String,
      "cover_image_url": String
    }]
  }],
  "remindList": [{ // 用户提醒列表
    "sendPerson": String, // 送礼对象
    "sendReason": String, // 送礼场合
    "sendTime": String, // 送礼时间
    "text": String // 备注
  }],
  "cartList": [{ // 用户购物车列表
    // "userId": String,
    "id": String,
    "name": String, // 商品名
    "price": String, // 商品价格
    "cover_image_url": String, // 图片链接
    "short_description": String, // 简单描述
    "checked": String, // 是否选中
    "productNum": String // 商品数量
  }],
  "addressList": [ // 用户地址列表
    {
      //  "Username": String,
      "Addressid": String, // Addressid
      "Name": String, // 收货人
      "Phonenum": Number, // 电话
      "Address": String, // 收货地址
      "AddressDetail": String, // 详细地址
      "PostalCode": Number, // 邮政编码
      "Isdefault": String // 是否默认
    }
  ]
})
var goodSchma = new mongoose.Schema({
  "cover_image_url": String, //图片
  "description": String, // 详细描述
  "favorites_count": String, // 点击量
  "id": String, // 商品id
  "image_urls": Array, // 详情图片
  "is_favorite": Boolean, // 是否喜欢
  "name": String, // 商品名
  "price": String, // 商品价格
  "short_description": String, //简单描述
  "url": String,
  "webp_urls": Array,
  // 添加的属性 
  "checked": String,
  "productNum": Number
})
// var bangdanSchma = new mongoose.Schema({})
var swiperSchma = new mongoose.Schema({
  // "image_url": String // 图片
})
var jingxuanSchma = new mongoose.Schema({
  "cover_image_url": String, // 图片
  "content_url": String, // 内容
  "title": String, // 标题
  "introduction": String // 描述
})
var colleagueSchma = new mongoose.Schema({})
var gaySchma = new mongoose.Schema({})
var nvyouSchma = new mongoose.Schema({})
var zhangbeiSchma = new mongoose.Schema({})
var babySchma = new mongoose.Schema({})


var giftSchma = new mongoose.Schema({})
var cyshSchma = new mongoose.Schema({})
var qpggSchma = new mongoose.Schema({})
var kjfSchma = new mongoose.Schema({})
var mmdSchma = new mongoose.Schema({})
var sjgSchma = new mongoose.Schema({})
var wyfSchma = new mongoose.Schema({})

// 集合模型
// 定义一个User商品模型，可以根据这个商品模型调用其API方法。
// 这个模型定义的是数据库giftDB的users集合数据，所以这个model取名User是对应这个集合，连接数据库之后，这个模型会根据名字的复数形式"goods"来查找数据集合。
var User = mongoose.model('User', userSchma, 'users');
var swiperModel = mongoose.model('swiper', swiperSchma);
var jingxuanModel = mongoose.model('jingxuan', jingxuanSchma, 'jingxuans'); // 后面注明链接的是数据库的jingxuan集合

// var bangdanModel = mongoose.model('bangdan', bangdanSchma, 'bangdans');
var Goods = mongoose.model('Goods', goodSchma, 'goods')

var colleagueModel = mongoose.model('colleague', colleagueSchma, 'colleagues');
var gayModel = mongoose.model('gay', gaySchma, 'gays');
var nvyouModel = mongoose.model('nvyou', nvyouSchma);
var zhangbeiModel = mongoose.model('zhangbei', zhangbeiSchma, 'bamas');
var babyModel = mongoose.model('baby', babySchma, 'babies');
var giftModel = mongoose.model('gift', giftSchma);
var cyshModel = mongoose.model('cysh', cyshSchma, 'cyshs');
var qpggModel = mongoose.model('qpgg', qpggSchma);
var kjfModel = mongoose.model('kjf', kjfSchma);
var mmdModel = mongoose.model('mmd', mmdSchma);
var sjgModel = mongoose.model('sjg', sjgSchma);
var wyfModel = mongoose.model('wyf', wyfSchma);

module.exports = {
  User,
  swiperModel,
  jingxuanModel,
  colleagueModel,
  nvyouModel,
  zhangbeiModel,
  babyModel,
  gayModel,
  giftModel,
  cyshModel,
  qpggModel,
  kjfModel,
  mmdModel,
  sjgModel,
  wyfModel,
  // bangdanModel,
  Goods
}