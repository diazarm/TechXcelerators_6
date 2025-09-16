import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Solo admin tiene password
  isActive: boolean;
  role: 'user' | 'director';
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false }, // Solo admin tiene password
  isActive: { type: Boolean, default: true },
  role: { type: String, enum: ['user', 'director'], default: 'user' },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
