import { checkSchema } from 'express-validator';

export const validateObjectId = checkSchema({
   id: {
      in: 'params',
      isMongoId: true,
      errorMessage: 'El identificador no es válido o no existe.',
   }
});