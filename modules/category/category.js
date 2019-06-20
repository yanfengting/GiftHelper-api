import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  id: Number,
  parentId: Number,
  name: String,
  status: Boolean,
  sortOrder: Number,
  createTime: Number,
  updateTime: Number,
});

categorySchema.index({id: 1});

const Category = mongoose.model("Category", categorySchema);


export default Category;
