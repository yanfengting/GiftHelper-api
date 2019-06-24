import cookie from "cookie";
import crypto from "crypto";
export default class BaseComponent {
  constructor() {
    this.id = "aweqwqeqweq";
    this.isId = this.isId.bind(this);
    this.JSONCookies = this.JSONCookies.bind(this);
    this.JSONCookie = this.JSONCookie.bind(this);
    this.setCookie = this.setCookie.bind(this);
    this.createID = this.createID.bind(this);
    this.Md5 = this.Md5.bind(this);
    this.encryption = this.encryption.bind(this);
  }

  isId(req) {
    console.log("req.cookie");
  }

  //./lib/parse.js
  //
  setCookie(req) {
    let cookies = req.headers.cookie; //保存对象地址，提高运行效率
    if (cookies !== undefined) {
      req.cookies = Object.create(null); //创建一个对象，解析后的且未使用签名的cookie保存在req.cookies中
      req.cookies = cookie.parse(cookies); //与express中调用cookie.serialize()对应，解析cookie
      req.cookies = this.JSONCookies(req.cookies);
      if (!req.cookies.JSESSIONID) {
        req.cookies.JSESSIONID = false;
      }
    }
  }

  //接续cookie中的JSON字符序列
  JSONCookies(obj) {
    var cookies = Object.keys(obj); //获取obj对象的property
    var key;
    var val;

    //循环判断并解析
    for (var i = 0; i < cookies.length; i++) {
      key = cookies[i];
      val = this.JSONCookie(obj[key]);

      //如果是JSON字符序列则保存
      if (val) {
        obj[key] = val;
      }
    }

    return obj;
  }

  //解析JSON字符序列
  JSONCookie(str) {
    if (!str || str.substr(0, 2) !== "j:") return; //判断是否为JSON字符序列，如果不是返回undefined

    try {
      return JSON.parse(str.slice(2)); //解析JSON字符序列
    } catch (err) {
      // no op
    }
  }

  encryption(password) {
    const newpassword = this.Md5(
      this.Md5(password).substr(2, 7) + this.Md5(password)
    );
    return newpassword;
  }

  Md5(password) {
    const md5 = new crypto.createHash("md5");
    return md5.update(password).digest("base64");
  }

  createID(id) {
    const hash = crypto.createHash("md5");
    return hash.update(`${id}`).digest("hex");
  }
}
