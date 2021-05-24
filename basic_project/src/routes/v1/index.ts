import { Application } from 'express';
import userRouter from './user-router';
import eventRouter from './event-router';
import participantRouter from './participant-router';

const createRoutesV1 = (app: Application): void => {
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/events', eventRouter);
  app.use('/api/v1/participants', participantRouter);
};

export default createRoutesV1;
