import { Router } from 'express';

import * as eventsController from '../../controllers/v1/events-controllers';
import { checkAuth, checkIp, logIp } from '../../middlewares/auth-middleware';
import { handleRequestErrors } from '../../middlewares/validator-middleware';
import {
  validateNewEvent,
  validateUpdateEvent,
} from '../../validators/v1/events-validatos';
import { validateObjectId } from '../../validators/v1/general-validator';

const router = Router();

router.get('', eventsController.getEvents);
router.post(
  '',
  checkAuth,
  logIp,
  validateNewEvent,
  handleRequestErrors,
  eventsController.createEvent
);
router.get(
  '/:id',
  logIp,
  validateObjectId,
  handleRequestErrors,
  eventsController.getEventById
);
router.delete(
  '/:id',
  checkIp,
  checkAuth,
  logIp,
  validateObjectId,
  handleRequestErrors,
  eventsController.deleteEvent
);
router.put(
  '/:id',
  checkAuth,
  logIp,
  validateObjectId,
  validateNewEvent,
  handleRequestErrors,
  eventsController.updateEvent
);
router.patch(
  '/:id',
  checkAuth,
  logIp,
  validateObjectId,
  validateUpdateEvent,
  handleRequestErrors,
  eventsController.partialUpdateEvent
);

export default router;
