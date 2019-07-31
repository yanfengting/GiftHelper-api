import express from "express";
import Statistic from "../controller/statistic/index";

const router = express.Router();
// console.log(Product.save());
router.get("/base_count", Statistic.baseCount);

export default router;
