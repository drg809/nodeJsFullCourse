import { checkSchema, ParamSchema, Schema } from 'express-validator';

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

const updateProfileSchema = (isStrict: boolean): Schema => {
  const first_nameSchema: ParamSchema = {
    isString: true,
    isLength: {
      options: { min: 2 },
    },
    errorMessage: 'El nombre debe ser un texto.',
  };
  const last_nameSchema: ParamSchema = {
    isString: true,
    isInt: {
      negated: true,
    },
    errorMessage: 'El apellido debe ser un texto.',
  };
  const avatarSchema: ParamSchema = {
    isString: true,
    errorMessage: 'El avatar debe ser un texto.',
  };
  if (!isStrict) {
    const optional = {
      options: {
        nullable: true,
      },
    };
    first_nameSchema.optional = optional;
    last_nameSchema.optional = optional;
    avatarSchema.optional = optional;
  }
  return {
    first_name: first_nameSchema,
    last_name: last_nameSchema,
    avatar: avatarSchema,
  };
};

export const validateProfile = checkSchema(updateProfileSchema(false));