import User from "./user";
import Product from "./product";
import Category from "./category";
import Statistic from "./statistic";
import express from "express";
import path from "path";

export default app => {
  /* app.use("/", (req, res, next) => {
     res.send("<h1 style='text-align: center;padding: 10%;font-size: 6vw;'>Welcome to MMALL!</h1>");
     next();
   });*/
  app.use("/manage/user", User);
  app.use("/manage/product", Product);
  app.use("/manage/category", Category);
  app.use("/manage/statistic", Statistic);
  app.use("/public", express.static(path.join(__dirname, "../public/upload/images")));
}
