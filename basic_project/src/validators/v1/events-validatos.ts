import { checkSchema, ParamSchema, Schema } from 'express-validator';

const createEventSchema = (isStrict: boolean): Schema => {
  const nameSchema: ParamSchema = {
    isString: true,
    toInt: true,
    isLength: {
      options: { min: 2 },
    },
    errorMessage: 'El nombre debe ser un texto.',
  };
  const dateSchema: ParamSchema = {
    isString: true,
    isInt: {
      negated: true,
    },
    errorMessage: 'La fecha debe ser un texto.',
  };
  const descriptionSchema: ParamSchema = {
    isString: true,
    errorMessage: 'El fecha debe ser un texto.',
  };
  if (!isStrict) {
    const optional = {
      options: {
        nullable: true,
      },
    };
    nameSchema.optional = optional;
    dateSchema.optional = optional;
    descriptionSchema.optional = optional;
  }
  return {
    name: nameSchema,
    date: dateSchema,
    description: descriptionSchema,
  };
};

export const validateNewEvent = checkSchema(createEventSchema(true));

export const validateUpdateEvent = checkSchema(createEventSchema(false));
