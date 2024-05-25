import mongoose from 'mongoose';

const UserMongoSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId, alias: '_id', auto: false },
    email: String,
    password: String,
    creation_date: Number,
    role: String,
  },
  {
    collection: 'users-collection',
    versionKey: false,
    _id: false,
    id: false,
    timestamps: false,
  }
);
const UserModel = mongoose.model('User', UserMongoSchema);

export default UserModel;
