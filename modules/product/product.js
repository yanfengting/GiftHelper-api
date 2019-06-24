import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
  id: Number,
  categoryId: Number,
  parentCategoryId: Number,
  name: String,
  subtitle: String,
  imageHost: String,
  mainImage: String,
  subImages: Array,
  detail: String,
  price: Number,
  stock: Number,
  status: Number,
  createTime: String,
  updateTime: String
});

productSchema.index({ id: 1 });

const Product = mongoose.model("Product", productSchema);

export default Product;
