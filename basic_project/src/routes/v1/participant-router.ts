import { Router } from 'express';
import * as participantsController from '../../controllers/v1/participants-controller';
import { checkAuth, checkIp } from '../../middlewares/auth-middleware';
import { handleRequestErrors } from '../../middlewares/validator-middleware';
import { validateObjectId } from '../../validators/v1/general-validator';
import { validatePaticipant, validateNewPaticipant } from '../../validators/v1/participants-validator';

const router = Router();

router.post(
  '',
  checkIp,
  checkAuth,
  validateNewPaticipant,
  handleRequestErrors,
  participantsController.subscribeParticipant
);
router.get(
  '/event/:id',
  checkAuth,
  validateObjectId,
  handleRequestErrors,
  participantsController.getParticipantsByEventId
);
router.get(
  '/user/:id',
  checkAuth,
  validateObjectId,
  handleRequestErrors,
  participantsController.getParticipantsByUserId
);
router.delete(
  '/:id',
  checkIp,
  checkAuth,
  validateObjectId,
  handleRequestErrors,
  participantsController.deleteParticipant
);
router.patch(
  '',
  checkAuth,
  validatePaticipant,
  handleRequestErrors,
  participantsController.updateParticipant
);

export default router;
