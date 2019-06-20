import BaseComponent from "../../prototype/baseComponent";
import UserModel from "../../modules/user/user";

class Statistic extends BaseComponent {
  constructor() {
    super();
    this.baseCount = this.baseCount.bind(this);
  }

  async baseCount(req, res, next) {
    const userCount = await UserModel.find().estimatedDocumentCount();
    res.send({
      status: 0,
      data: {
        orderCount: 5835,
        productCount: 3737,
        userCount: userCount,
      },
    });
  }

}

export default new Statistic();