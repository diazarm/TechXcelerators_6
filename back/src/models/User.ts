import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Solo admin tiene password
  isActive: boolean;
  role?: "user" | "director"; //Los admin no requieren rol.
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  searchKeywords: string[]; // Palabras clave que el usuario ha buscado
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  isActive: { type: Boolean, default: true },
  role: {
    type: String,
    enum: ["user", "director"],
    required: function (this: IUser) {
      return !this.isAdmin; // Solo requerido si no es admin
    },
  },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
  searchKeywords: { type: [String], default: [] },
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
