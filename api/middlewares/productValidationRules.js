// middlewares/productValidationRules.js
import { body } from 'express-validator';

const adminProductRules = [
  body('name')
    .notEmpty().withMessage('Product name is required')
    .isLength({ min: 1, max: 255 }).withMessage('Product name must be between 1 and 255 characters'),

  body('description')
    .notEmpty().withMessage('Product description is required'),

  body('price')
    .notEmpty().withMessage('Product price is required')
    .isNumeric().withMessage('Product price must be a number'),

  body('stock')
    .notEmpty().withMessage('Product stock is required')
    .isInt({ min: 0 }).withMessage('Product stock must be a non-negative integer'),

  body('isAvailableForDelivery')
    .isBoolean().withMessage('isAvailableForDelivery must be a boolean'),

  body('isOffer')
    .isBoolean().withMessage('isOffer must be a boolean'),

  body('offerPrice')
    .if(body('isOffer').equals(true))
    .notEmpty().withMessage('Offer price is required when the product is on offer')
    .isNumeric().withMessage('Offer price must be a number when the product is on offer'),

  body('images')
    .isArray({ max: 5 }).withMessage('Up to 5 images are allowed for a product'),
];

export { adminProductRules };
