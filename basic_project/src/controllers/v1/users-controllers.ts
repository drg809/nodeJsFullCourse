/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';

import Users, { User } from '../../db/schemas/user';
import { sendError } from '../../utils/response';

import Events from '../../db/schemas/events';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await Users.find().select({ password: 0, __v: 0 });
  res.send({ data: users });
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: string = req.params.id;

    const user = await Users.findById(Types.ObjectId(id)).select({
      password: 0,
      __v: 0,
    });

    if (user) {
      res.send({ data: user });
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

    res.send({ data: newUser });
  } catch (e) {
    sendError(res, e);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { first_name, last_name, avatar } = req.body;
    const { userId } = req.session;

    const user = await Users.findOne({
      _id: userId,
    }).select({ password: 0, __v: 0 });

    if (user) {
      user.first_name = first_name || user.first_name;
      user.last_name = last_name || user.last_name;
      user.avatar = avatar || user.avatar;

      await user.save();
      res.send({ data: user });
    } else {
      res.status(404).send({});
    }
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

    const user = await Users.findByIdAndDelete(id);

    if (user) {
      await Events.deleteMany({ creator: user._id });
      res.send('Usuario eliminado');
    } else {
      res.status(404).send({});
    }
  } catch (e) {
    sendError(res, e);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body);
  try {
    const { email, password } = req.body;

    const user: User | null = await Users.findOne({ email });
    if (!user) {
      throw { code: 404, message: 'Usuario no encontrado.' };
    }

    const isOk: boolean = await bcrypt.compare(password, user.password);
    if (!isOk) {
      throw { code: 401, message: 'Contraseña incorrecta.' };
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: 72000 }
    );

    res.send({ token: token, expiresIn: 72000 });
  } catch (e) {
    sendError(res, e);
  }
};
