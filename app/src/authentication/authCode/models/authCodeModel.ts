import mongoose from 'mongoose';

const AuthCodeSchema = new mongoose.Schema(
  {
    email: String,
    auth_code: String,
    used: Boolean,
    createdAt: { type: Date, expires: 300, default: Date.now },
  },
  {
    collection: 'auth-codes-collection',
    versionKey: false,
    timestamps: false,
  }
);
const AuthCodeModel = mongoose.model('AuthCode', AuthCodeSchema);

export default AuthCodeModel;
