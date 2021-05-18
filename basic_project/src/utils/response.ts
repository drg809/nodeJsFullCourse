import { Response } from 'express';
import { mongo, Types } from 'mongoose';

export const validateObjectId = (id: string): void => {
  if (!Types.ObjectId.isValid(id)) {
    throw { code: 400, message: `Id no válido ${id}` };
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendError = (res: Response, e: any): void => {
  const statusCode: number = e.code || 500;
  e instanceof mongo.MongoError
    ? res.status(400).send({
        code: 400,
        message: e.code === 11000 ? 'Valor duplicado' : 'Error',
      })
    : res.status(statusCode).send(e.message);
};
