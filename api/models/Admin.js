// src/models/Admin.js
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // Puedes agregar validaciones adicionales para el formato del correo electrónico
    },
    phone: {
      type: String,
      // Puedes agregar validaciones adicionales para el formato del número de teléfono
    },
    image: {
      secureUrl: String,
      publicId: String,
    },
    user: {
      type: String,
      required: true,
      unique: true,
      // Puedes agregar validaciones adicionales para el formato del nombre de usuario
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
