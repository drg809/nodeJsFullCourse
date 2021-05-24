import { Request, Response } from 'express';
import Participants from '../../db/schemas/participants';

import { sendError } from '../../utils/response';

export const getParticipantsByEventId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const itemPerPage = 10;
  const id: string = req.params.id;
  const page: number = parseInt(req.query.page as string);
  const total: number = await Participants.countDocuments({ event: id });
  const start: number = (page - 1) * itemPerPage;

  const events = await Participants.find({ event: id })
    .skip(start)
    .limit(itemPerPage)
    .select({ __v: 0, event: 0, details: 0 })
    .populate({ path: 'user', select: { password: 0, __v: 0 } });

  res.send({
    page: page,
    per_page: itemPerPage,
    total: total,
    total_pages: Math.ceil(total / itemPerPage),
    data: events,
  });
};

export const getParticipantsByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const itemPerPage = 10;
  const id: string = req.params.id;
  const page: number = parseInt(req.query.page as string);
  const total: number = await Participants.countDocuments({ user: id });
  const start: number = (page - 1) * itemPerPage;

  const events = await Participants.find({ user: id })
    .skip(start)
    .limit(itemPerPage)
    .select({ __v: 0, user: 0 })
    .populate({ path: 'event', select: { __v: 0 } });

  res.send({
    page: page,
    per_page: itemPerPage,
    total: total,
    total_pages: Math.ceil(total / itemPerPage),
    data: events,
  });
};

export const subscribeParticipant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.session;
    const { event, details } = req.body;
    console.log(event);
    const participant = await Participants.create({
      event: event,
      user: userId,
      details,
    });

    res.send({ data: participant });
  } catch (e) {
    sendError(res, e);
  }
};

export const updateParticipant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: string = req.params.id;
    const { details } = req.body;

    const participant = await Participants.findOne({
      _id: id,
      user: req.session.userId,
    }).select({ __v: 0 });

    if (participant) {
      participant.details = details || participant.details;

      await participant.save();
      res.send({ data: participant });
    } else {
      res.status(404).send({});
    }
  } catch (e) {
    sendError(res, e);
  }
};

export const deleteParticipant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: string = req.params.id;

    const participant = await Participants.deleteOne({
      _id: id,
      user: req.session.userId,
    });

    participant ? res.send({}) : res.status(404).send({});
  } catch (e) {
    sendError(res, e);
  }
};
