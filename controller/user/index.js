import UserModel from "../../modules/user/user";
import BaseComponent from "../../prototype/baseComponent";
// import crypto from "crypto";
// import cookie from "cookie";
import formidable from "formidable";

// import dtime from 'time-formater';

class User extends BaseComponent {
  constructor() {
    super();
    this.name = "name";
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.list = this.list.bind(this);
  }

  // 登陆
  async login(req, res, next) {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.send({
          status: 0,
          type: "FORM_DATA_ERROR",
          message: "表单信息错误"
        });
        return;
      }
      const { username, password } = fields;
      try {
        if (!username) {
          throw new Error("用户名参数错误");
        } else if (!password) {
          throw new Error("密码参数错误");
        }
      } catch (err) {
        console.log(err.message, err);
        res.send({
          status: 0,
          type: "GET_ERROR_PARAM",
          message: err.message
        });
        return;
      }
      const newpassword = this.encryption(password);
      try {
        let admin = await UserModel.findOne(
          { username: username },
          { _id: 0, __v: 0 }
        );
        if (!admin) {
          res.send({
            status: 1,
            msg: "该用户名不存在"
          });
        } else if (newpassword.toString() !== admin.password.toString()) {
          res.send({
            status: 1,
            msg: "密码错误"
          });
        } else {
          //写cookie 验证通过则登录
          // 1cookie名称 2cookie值 3设定他的一些参数
          res.cookie("JSESSIONID", this.encryption(`${admin.id}`), {
            path: "/"
            // 存一个小时是1000 * 60 * 60
          });
          admin.password = null;
          res.send({
            status: 0,
            msg: "登录成功",
            data: admin
          });
        }
      } catch (err) {
        console.log("登录管理员失败", err);
        res.json({
          status: 1,
          msg: "登录管理员失败"
        });
      }
    });
  }

  // 关闭注册
  async register(req, res, next) {
    let index = 1;
    /*
    // 创建单个管理员用户
    const time = Date.parse(new Date());
    const create = await UserModel.create({
      id: '',
      username: 'admin',
      password: this.encryption('admin'),
      email: 'honghaitzz11@gmail.com',
      phone: null,
      role: 0,
      createTime: time,
      updateTime: time,
    });
    // create.id = this.createID(create._id);
    create.id = index;
    index++;
    create.save();
    console.log(index);*/
    /*// 批量创建管理员账号
    setInterval(async () => {
      const time = Date.parse(new Date());
      const create = await UserModel.create({
        id: '',
        username: 'user',
        password: this.encryption('user'),
        email: 'honghaitzz11@gmail.com',
        phone: null,
        role: 0,
        createTime: time,
        updateTime: time
      });
      // create.id = this.createID(create._id);
      create.id = create._id;
      create.index = index;
      console.log(index);
      index++;
      create.save();
    }, 1);*/

    /*
    // 批量修改管理员账号
    setInterval(async () => {
      try {
        const count = await UserModel.find().estimatedDocumentCount();
        // console.log(count);
        const info = await UserModel.findOne({id: index});
        console.log(info);
        info.index = index;
        info.id = info._id;
        info.updateTime = Date.parse(new Date());
        info.save();
        console.log(index);
        index++;
      } catch (e) {
        console.log(e);
      }
    }, 10);*/
    res.send("create");
    // const form = new formidable.IncomingForm();
    // form.parse(req, async (err, fields, files) => {
    //   if (err) {
    //     res.send({
    //       status: 0,
    //       type: 'FORM_DATA_ERROR',
    //       message: '表单信息错误'
    //     });
    //     return;
    //   }
    //   const { username, password, email, status = 1 } = fields;
    //   try {
    //     if (!username) {
    //       throw new Error('用户名错误');
    //     } else if (!password) {
    //       throw new Error('密码错误');
    //     } else if (!email) {
    //       throw new Error('邮箱错误');
    //     }
    //   } catch (err) {
    //     console.log(err.message, err);
    //     res.send({
    //       status: 0,
    //       type: 'GET_ERROR_PARAM',
    //       message: err.message,
    //     });
    //     return;
    //   }
    //
    //   UserModel.create({
    //     username: 'user',
    //     password: this.encryption('user'),
    //     email: 'honghaitzz11@gmail.com',
    //     createTime: Date.parse(new Date()),
    //     updateTime: '',
    //   });
    // });
  }

  async list(req, res, next) {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.send({
          status: 1,
          msg: "表单信息错误"
        });
        return;
      }
      // 判断是否登陆
      try {
        if (fields.userID === undefined) {
          throw new Error("用户未登录,请登录");
        } else {
          const userInfo = await UserModel.findOne({ id: fields.userID });
          if (userInfo.role === 0) {
            throw new Error("没有权限");
          }
        }
      } catch (err) {
        res.send({
          status: err.message === "没有权限" ? 1 : 10,
          msg: err.message
        });
        return;
      }
      // 开始查询
      try {
        let pageSize =
          fields.pageSize > 0 ? Number.parseInt(fields.pageSize) : 1;
        let pageNum = fields.pageNum > 0 ? Number.parseInt(fields.pageNum) : 10;
        let total = await UserModel.find().estimatedDocumentCount();
        let lastID = await UserModel.findOne({ index: pageSize * pageNum + 1 });
        // 性能优化：获取最后一条数据
        let list = await UserModel.find(
          { index: { $lt: lastID.index } },
          {
            _id: 0,
            __v: 0
          }
        )
          .sort({ _id: -1 })
          .limit(pageNum);
        list = list.sort((a, b) => a.index - b.index);
        res.json({
          status: 0,
          data: {
            pageNum: pageNum,
            pageSize: pageSize,
            size: pageSize,
            startRow: pageNum,
            total: total,
            pages: Math.ceil(total / pageNum),
            list: list
          }
        });
      } catch (err) {
        console.log(err);
        res.send({
          status: 1,
          msg: "查询失败"
        });
      }
    });
  }

  /*encryption(password) {
    const newpassword = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password));
    return newpassword;
  }

  Md5(password) {
    const md5 = new crypto.createHash("md5");
    return md5.update(password).digest("base64");
  }

  createID(id) {
    const hash = crypto.createHash("md5");
    return hash.update(`${id}`).digest("hex");
  }*/
}

export default new User();
