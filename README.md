## 安装软件
安装mongodb robo  nodejs vscode
## 访问地址
http://localhost:3000/
http://localhost:3000/users/addUser
打开robo管理 GiftDB 下有一个users表

## 主要功能：
   详细的礼物分类，解决送礼物难问题
## 主要模块：
首页：包含精选、送女友、送同事、送长辈等部分
榜单：人气高、销量多的礼物展示页面
礼物：包含推荐、纪念日、生日、结婚、商务等礼物信息展示
积分商城：积分兑换商品功能
我的：包含购物车、订单、积分数、送礼提醒等部分
登录注册：登录注册、个人信息的修改等
## 技术要求：
使用语言主要是：HTML、CSS、JavaScript、nodeJS；
数据库使用MongoDB；
其他技术根据需要使用。
## 其他要求：
1. 开题报告中参考文献数量不低于10个；
2. 毕业设计说明书中参考文献数量不低于15个；
3. 不低于3000字的外文翻译（1人1题目）；
3.25  登录注册
3.26
购物车、订单、
积分商城：积分数，积分兑换商品功能

## 礼物提醒功能：

输入送礼时间，后台获取送礼时间
获取当前时间

计算当前日期与送礼时间的时间差
（公历，农历转换）选择农历，在旁边显示出转换的公历，计算倒计时

## 启动mongo服务，导入数据库
（gift-api）npm start
（gift）npm run serve

docker run -p 27017:27017 -v $PWD/db:/data/db -v $PWD:/data -d mongo

## 问题：怎么才能拿到链接要得到里面的html内容


后端可以做一个公共模块
所有的前端请求先经过那个模块，判断无误之后再返回数据
或者前端封装一下axios来坐登陆跳转

就是设置跨域的那块地方,可以直接做拦截的,这里可以拿到任何请求的cookie中的_id

## api文档地址
[地址](https://gitee.com/imooccode/happymmallwiki)
* [后台_产品接口](happymmallwiki/后台_产品接口.markdown)
* [后台_品类接口](happymmallwiki/后台_品类接口.markdown)
* [后台_用户接口](happymmallwiki/后台_用户接口.markdown)
* [后台_统计接口](happymmallwiki/后台_统计接口.markdown)
* [后台_订单接口](happymmallwiki/后台_订单接口.markdown)
* [门户_产品接口](happymmallwiki/门户_产品接口.markdown)
* [门户_支付接口](happymmallwiki/门户_支付接口.markdown)
* [门户_收货地址接口](happymmallwiki/门户_收货地址接口.markdown)
* [门户_用户接口](happymmallwiki/门户_用户接口.markdown)
* [门户_订单接口](happymmallwiki/门户_订单接口.markdown)
* [门户_购物车接口](happymmallwiki/门户_购物车接口.markdown)

## 后续开发优化
* [✗]列表分页查询优化
* [✓]关闭用户注册 
 
