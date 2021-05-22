/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    export interface Request {
      session: {
        userId: string;
        email: string;
      };
    }
  }
}

export const checkAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { token } = req.headers;

    if (!token) {
      throw new Error('Token no enviado.');
    }

    const { userId, email } = jwt.verify(
      token as string,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      process.env.JWT_SECRET!
    ) as any;

    req.session = {
      userId: userId,
      email: email,
    };

    next();
  } catch (e) {
    res.status(401).send(e.message);
  }
};

export const checkIp = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.hostname === 'localhost') {
    next();
  } else {
    res.status(403).send('Acceso denegado');
  }
};
