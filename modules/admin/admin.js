import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  username: String,
  password: String,
  email: String,
  id: String,
  phone: Number,
  role: Number,
  createTime: String,
  updateTime: String,
});

adminSchema.index({ id: 1 });

const Admin = mongoose.model('Admin', adminSchema);


export default Admin;
