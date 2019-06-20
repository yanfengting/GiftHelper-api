import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  id: String,
  index: Number,
  phone: Number,
  role: Number,
  createTime: String,
  updateTime: String,
});

userSchema.index({id: 1});

const User = mongoose.model("User", userSchema);


export default User;
