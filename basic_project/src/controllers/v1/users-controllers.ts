import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Types } from 'mongoose';

import Users from '../../db/schemas/user';
import { validateObjectId, sendError } from '../../utils/response';
import Events from '../../db/schemas/events';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await Users.find().select({ password: 0, __v: 0 });
  res.send(users);
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: string = req.params.id;
    validateObjectId(id);
    const user = await Users.findById(Types.ObjectId(id)).select({
      password: 0,
      __v: 0,
    });

    if (user) {
      res.send(user);
    } else {
      res.status(404).send({});
    }
  } catch (e) {
    sendError(res, e);
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, first_name, last_name, avatar, password } = req.body;
    const hash: string = await bcrypt.hash(password, 15);
    const newUser = await Users.create({
      email,
      first_name,
      last_name,
      avatar,
      password: hash,
    });

    res.send(newUser);
  } catch (e) {
    sendError(res, e);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: string = req.params.id;
    validateObjectId(id);

    const user = await Users.findByIdAndDelete(id);

    if (user) {
      await Events.deleteMany({creator: user._id});
      res.send('Usuario eliminado');
    } else {
      res.status(404).send({});
    }
  } catch (e) {
    sendError(res, e);
  }
};
