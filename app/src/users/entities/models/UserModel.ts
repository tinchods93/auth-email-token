import mongoose from 'mongoose';

const UserMongoSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    creation_date: Number,
    role: String,
    email_verified: Boolean,
  },
  {
    collection: 'users-collection',
    versionKey: false,
    timestamps: false,
  }
);
const UserModel = mongoose.model('User', UserMongoSchema);

export default UserModel;
