import { Router } from 'express';
import * as usersController from '../../controllers/v1/users-controllers';
import { checkAuth, checkIp, logIp } from '../../middlewares/auth-middleware';
import { handleRequestErrors } from '../../middlewares/validator-middleware';
import { validateObjectId } from '../../validators/v1/general-validator';
import {
  validateProfile,
  validateUser,
} from '../../validators/v1/users-validators';

const router = Router();

router.get('', checkAuth, usersController.getUsers);
router.post(
  '',
  checkIp,
  checkAuth,
  logIp,
  validateUser,
  handleRequestErrors,
  usersController.createUser
);
router.get(
  '/:id',
  checkAuth,
  logIp,
  validateObjectId,
  handleRequestErrors,
  usersController.getUserById
);
router.delete(
  '/:id',
  checkIp,
  checkAuth,
  logIp,
  validateObjectId,
  handleRequestErrors,
  usersController.deleteUser
);
router.post('/login', logIp, validateUser, handleRequestErrors, usersController.login);
router.patch(
  '',
  checkAuth,
  logIp,
  validateProfile,
  handleRequestErrors,
  usersController.updateProfile
);

export default router;
