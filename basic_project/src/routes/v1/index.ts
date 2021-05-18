import { Application } from 'express';

import * as usersController from '../../controllers/v1/users-controllers';
import * as eventsController from '../../controllers/v1/events-controllers';

const createRoutesV1 = (app: Application): void => {
  app.get('/api/v1/users', usersController.getUsers);
  app.post('/api/v1/users', usersController.createUser);
  app.get('/api/v1/users/:id', usersController.getUserById);
  app.get('/api/v1/events', eventsController.getEvents);
  app.get('/api/v1/events/:id', eventsController.getEventById);
  app.post('/api/v1/events', eventsController.createEvent);
  app.put('/api/v1/events/:id', eventsController.updateEvent);
  app.patch('/api/v1/events/:id', eventsController.partialUpdateEvent);
  app.delete('/api/v1/events/:id', eventsController.deleteEvent);
  app.delete('/api/v1/users/:id', usersController.deleteUser);
};

export default createRoutesV1;
