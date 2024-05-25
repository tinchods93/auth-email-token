import mongoose from 'mongoose';

const AuthCodeSchema = new mongoose.Schema(
  {
    email: String,
    auth_code: String,
    used: Boolean,
  },
  {
    collection: 'auth-codes-collection',
    versionKey: false,
    timestamps: false,
    expireAfterSeconds: 300,
  }
);
const AuthCodeModel = mongoose.model('AuthCode', AuthCodeSchema);

export default AuthCodeModel;
