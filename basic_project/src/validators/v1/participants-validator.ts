import { checkSchema, ParamSchema, Schema } from 'express-validator';

const createParticipantSchema = (isStrict: boolean): Schema => {
  const eventSchema: ParamSchema = {
    in: ['params', 'body'],
    isMongoId: true,
    errorMessage: 'El identificador de evento no es válido o no existe.',
  };
  const detailsSchema: ParamSchema = {
    isString: true,
    errorMessage: 'La descripción debe ser un texto.',
  };
  if (!isStrict) {
    const optional = {
      options: {
        nullable: true,
      },
    };
    detailsSchema.optional = optional;
  }
  return {
    event: eventSchema,
    details: detailsSchema,
  };
};
export const validatePaticipant = checkSchema({
  user: {
    in: ['params', 'body'],
    isMongoId: true,
    errorMessage: 'El identificador de usuario no es válido o no existe.',
  },
  ...createParticipantSchema(false),
});

export const validateNewPaticipant = checkSchema(createParticipantSchema(false));
