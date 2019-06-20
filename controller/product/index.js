import ProductModel from "../../modules/product/product";
import BaseComponent from "../../prototype/baseComponent";
import crypto from "crypto";
import cookie from "cookie";
import formidable from "formidable";

class Product extends BaseComponent {
  constructor() {
    super();
    this.save = this.save.bind(this);
  }

  async save(req, res, next) {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.send({
          status: 1,
          data: "更新产品失败",
        });
        return;
      }
      const {name} = fields;
      console.log(name);
      res.send("ok");
    });
  }

}

export default new Product();