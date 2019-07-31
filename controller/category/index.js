import CategorytModel from "../../modules/category/category";
import BaseComponent from "../../prototype/baseComponent";
import formidable from "formidable";
import CategoryModel from "../../modules/category/category";

class Category extends BaseComponent {
  constructor() {
    super();
    this.getCategory = this.getCategory.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.setCategoryName = this.setCategoryName.bind(this);
    this.create = this.create.bind(this);
  }

  // 获取品类
  async getCategory(req, res, next) {
    const {categoryId} = req.query;
    console.log(categoryId);
    const categorys = await CategorytModel.find(
      {parentId: categoryId},
      {_id: 0, __v: 0},
    );
    res.send({
      status: 0,
      data: categorys,
    });
  }

  // 创建品类
  async addCategory(req, res, next) {
    const {parentId = 0, categoryName} = req.query;
    try {
      let total = await CategoryModel.find().estimatedDocumentCount();
      const index = 100000 + total + 1;
      const time = Date.parse(new Date());
      let category = {
        id: index,
        parentId: parentId,
        name: categoryName,
        status: true,
        sortOrder: null,
        createTime: time,
        updateTime: time,
      };
      const createStatus = await CategoryModel.create(category);
      res.json({
        status: 0,
        msg: "添加品类成功",
        // data: createStatus,
      });
    } catch (err) {
      console.log(err.message);
      res.send({
        status: 1,
        message: "添加品类失败",
      });
      return;
    }
  }

  // 修改品类名称
  async setCategoryName(req, res, next) {
    const {categoryId = 0, categoryName} = req.query;
    try {
      const category = await CategoryModel.findOne({id: categoryId});
      category.name = categoryName;
      category.save();
      res.send({
        status: 0,
        message: "更新品类名字成功",
      });
      return;
    } catch (err) {
      console.log(err);
      res.send({
        status: 1,
        message: "更新品类名字失败",
      });
      return;
    }
  }

  async getDeepCategory(req, res, next) {
    /*
      暂时不添加权限验证
     */
    const {categoryId = 0} = req.query;
    try {
      const category = await CategoryModel.find(
        {parentId: categoryId},
        {id: 1, _id: 0},
      ).sort({id: -1});
      let data = [];
      category.forEach(item => {
        data.push(item.id);
      });
      data.push(Number.parseInt(categoryId));
      res.send({
        status: 0,
        data: data,
      });
    } catch (err) {
      console.log(err);
      res.send({
        status: 1,
        msg: "无权限",
      });
    }
  }

  async create(req, res, next) {
    try {
      res.json({
        status: 0,
        msg: "添加品类成功",
        // data: createStatus,
      });
      let i = 0;
      let j = 100001;
      const interval = setInterval(async () => {
        let total = await CategoryModel.find().estimatedDocumentCount();
        const parentId = j;
        const index = 100000 + total + 1;
        if (j === 100100) {
          clearInterval(interval);
          return;
        }
        if (i === 20) {
          j++;
          i = 0;
        }
        i++;
        console.log("i:", i, " j:", j);
        const time = Date.parse(new Date());
        let category = {
          id: index,
          parentId: parentId,
          name: this.createName(2),
          status: true,
          sortOrder: null,
          createTime: time,
          updateTime: time,
        };
        const createStatus = await CategoryModel.create(category);
      }, 100);
    } catch (err) {
      res.send({
        status: 1,
        msg: "创建失败",
      });
      console.log(err);
    }
  }
}

export default new Category();
