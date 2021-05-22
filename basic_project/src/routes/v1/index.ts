import { Application } from 'express';
import userRouter from './user-router';
import eventRouter from './event-router';

const createRoutesV1 = (app: Application): void => {
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/events', eventRouter);
};

export default createRoutesV1;
