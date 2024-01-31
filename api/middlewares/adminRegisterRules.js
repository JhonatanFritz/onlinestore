// registerRules.js
import { body } from 'express-validator';

const adminRegisterRules = [
  body('name')
    .notEmpty().withMessage('El campo de nombre es obligatorio')
    .matches(/^[A-Za-z ]+$/).withMessage('El apellido solo puede contener letras y espacios')
    .isLength({ min: 1, max: 60 }).withMessage('El nombre debe tener entre 1 y 50 caracteres'),

  body('lastname')
    .notEmpty().withMessage('El campo de apellido es obligatorio')
    .matches(/^[A-Za-z ]+$/).withMessage('El apellido solo puede contener letras y espacios')
    .isLength({ min: 1, max: 60 }).withMessage('El apellido debe tener entre 1 y 50 caracteres'),

  body('email')
    .isEmail().withMessage('Introduce un correo electrónico válido')
    .isLength({ max: 100 }).withMessage('El correo electrónico no debe tener más de 255 caracteres'),

  body('phone')
    .notEmpty().withMessage('El campo de teléfono es obligatorio')
    .isNumeric().withMessage('El teléfono solo puede contener números')
    .isLength({ min: 1, max: 15 }).withMessage('El teléfono debe tener entre 1 y 15 caracteres'),

  body('user')
    .notEmpty().withMessage('El campo de usuario es obligatorio')
    .isLength({ min: 1, max: 20 }).withMessage('El usuario debe tener entre 1 y 20 caracteres'),

  body('password')
    .notEmpty().withMessage('El campo de contraseña es obligatorio')
    .isLength({ min: 8, max: 16 }).withMessage('La contraseña debe tener entre 8 y 16 caracteres'),
];

export { adminRegisterRules };
