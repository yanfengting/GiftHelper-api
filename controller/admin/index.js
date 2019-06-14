import AdminModel from '../../modules/admin/admin';
import BaseComponent from '../../prototype/baseComponent';
import crypto from 'crypto';
import formidable from 'formidable';

// import dtime from 'time-formater';

class Admin extends BaseComponent {
  constructor() {
    super();
    this.name = 'name';
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }
  
  async login(req, res, next) {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.send({
          status: 0,
          type: 'FORM_DATA_ERROR',
          message: '表单信息错误'
        });
        return;
      }
      const { username, password } = fields;
      try {
        if (!username) {
          throw new Error('用户名参数错误');
        } else if (!password) {
          throw new Error('密码参数错误');
        }
      } catch (err) {
        console.log(err.message, err);
        res.send({
          status: 0,
          type: 'GET_ERROR_PARAM',
          message: err.message,
        });
        return;
      }
      const newpassword = this.encryption(password);
      try {
        const admin = await AdminModel.findOne({ username: username });
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
          // req.session.admin_id = admin.id;
          console.log(admin);
          delete admin._id;
          //写cookie 验证通过则登录
          // 1cookie名称 2cookie值 3设定他的一些参数
          res.cookie("JSESSIONID", admin._id, {
            path: '/',
            // 存一个小时是1000 * 60 * 60
          });
          res.send({
            status: 0,
            data: admin
            /* data: {
               id: admin.id,
               username: admin.username,
               email: admin.email,
               phone: admin.phone,
               role: admin.role,
               createTime: admin.createTime,
               updateTime: admin.updateTime
             }*/
          });
        }
      } catch (err) {
        console.log('登录管理员失败', err);
        res.json({
          status: 1,
          msg: "登录管理员失败"
        });
      }
    });
    /*   AdminModel.create({
         username: 'admin',
         password: 'admin',
         email: 'honghaitzz11@gmail.com',
         createTime: Date.parse(new Date()),
         updateTime: '',
       });
       console.log(this);
       this.isId(req);*/
    
  }
  
  async register(req, res, next) {
    const time = Date.parse(new Date());
    const create = await AdminModel.create({
      id: '',
      username: 'admin',
      password: this.encryption('admin'),
      email: 'honghaitzz11@gmail.com',
      phone: null,
      role: 0,
      createTime: time,
      updateTime: time,
    });
    create.id = this.HEX(create._id);
    create.save();
    res.send(create);
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
    //   AdminModel.create({
    //     username: 'admin',
    //     password: this.encryption('admin'),
    //     email: 'honghaitzz11@gmail.com',
    //     createTime: Date.parse(new Date()),
    //     updateTime: '',
    //   });
    // });
    
  }
  
  encryption(password) {
    const newpassword = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password));
    return newpassword;
  }
  
  Md5(password) {
    const md5 = new crypto.createHash('md5');
    return md5.update(password).digest('base64');
  }
  
  HEX(id) {
    const hash = crypto.createHash('md5');
    return hash.update(`${id}`).digest('hex');
  }
}

export default new Admin();
