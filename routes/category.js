import express from "express";
import Category from "../controller/category/index";

const router = express.Router();
// console.log(Product.save());
router.get("/get_category", Category.getCategory);
router.get("/add_category", Category.addCategory);
router.get("/set_category_name", Category.setCategoryName);
router.get("/get_deep_category", Category.getDeepCategory);
router.get("/create", Category.create);

export default router;
