// loginRules.js
import { body } from 'express-validator';

const loginRules = [
  body('user')
    .notEmpty().withMessage('El campo de usuario es obligatorio')
    .isLength({ min: 1, max: 20 }).withMessage('El usuario debe tener entre 1 y 20 caracteres'),

  body('password')
    .notEmpty().withMessage('El campo de contraseña es obligatorio')
    .isLength({ min: 8, max: 16 }).withMessage('La contraseña debe tener entre 8 y 16 caracteres'),
];

export { loginRules };
