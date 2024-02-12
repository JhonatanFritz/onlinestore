// src/controllers/adminController.js
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import { uploadImage } from "../config/cloudinary.js";



const registerAdmin = async (req, res) => {
  // Aplicar reglas de validación al registro
  
  try {
    const { name, lastname, email, phone, user, password } = req.body;

    // Verificar si ya existe un admin registrado
    const admin = await Admin.findOne({ user });
    if (admin) {
      return res.status(400).json({ error: "The admin is already registered" });
    }

    const imagePath = req.file.path;
    const result = await uploadImage(imagePath);
    // Eliminar el archivo de uploads después de cargarlo en Cloudinary
    fs.unlinkSync(req.file.path);

    // Resto del código para registrar el admin en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      lastname,
      email,
      phone,
      user,
      password: hashedPassword,
      image: {
        secureUrl: result.secureUrl,
        publicId: result.publicId,
      },
    });

    const savedAdmin = await newAdmin.save();

    // Generar token JWT
    const token = jwt.sign({ userId: savedAdmin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Tiempo de expiración del token (1 hora en este caso)
    });
    console.log("Token al Registrarse " + token);
    res.json({ message: "Admin registered successfully", admin: savedAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error registering admin" });
  }
};

// ...

const loginAdmin = async (req, res) => {
  try {
    const { user, password } = req.body;
    console.log("Credenciales recibidas:", { user, password });

    const admin = await Admin.findOne({ user });

    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Comparar contraseñas
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Incluir más datos del admin en el token
    const token = jwt.sign(
      { userId: admin._id, email: admin.email, name: admin.name, lastname: admin.lastname, image: admin.image, user: admin.user },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // Tiempo de expiración del token (1 hora en este caso)
      }
    );

    console.log("Token al Login " + token);

    // Imprimir el contenido del token por consola
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Contenido del Token Decodificado:", decodedToken);

    res.json({ message: "Login successful", admin, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error logging in" });
  }
};

// ...



export { registerAdmin, loginAdmin };
