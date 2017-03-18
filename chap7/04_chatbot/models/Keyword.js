import mongoose, { Schema } from 'mongoose';

const Keyword = mongoose.model('keyword', new Schema({
  key: { type: String, required: true },
  pattern: { type: String, required: true },
  msg: { type: String, required: true }
}));

export default Keyword;
