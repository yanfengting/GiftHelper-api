import BaseComponent from "../../prototype/baseComponent";
import UserModel from "../../modules/user/user";
import ProductModel from "../../modules/product/product";

class Statistic extends BaseComponent {
  constructor() {
    super();
    this.baseCount = this.baseCount.bind(this);
  }

  async baseCount(req, res, next) {
    const userCount = await UserModel.find().estimatedDocumentCount();
    const ProductCount = await ProductModel.find().estimatedDocumentCount();
    res.send({
      status: 0,
      data: {
        orderCount: 5835,
        productCount: ProductCount,
        userCount: userCount,
      },
    });
  }

}

export default new Statistic();