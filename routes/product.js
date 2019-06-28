import express from "express";
import Product from "../controller/product/index";

const router = express.Router();
// console.log(Product.save());
router.post("/save", Product.save);
router.post("/list", Product.list);
router.post("/upload", Product.upload);
router.post("/set_sale_status", Product.setSaleStatus);
router.get("/detail", Product.detail);

export default router;
