import { checkSchema } from 'express-validator';

export const validateUser = checkSchema({
  email: {
    isEmail: {
      bail: true,
    },
    errorMessage: 'El email no es válido.',
  },
  password: {
    isLength: {
      options: { min: 8 },
    },
    errorMessage: 'La contraseña debe contener al menos 8 carácteres.',
  },
});
