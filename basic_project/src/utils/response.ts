/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Response } from 'express';
import { mongo } from 'mongoose';

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