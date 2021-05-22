import { Request, Response } from 'express';
import Events from '../../db/schemas/events';

import { sendError } from '../../utils/response';

export const getEvents = async (req: Request, res: Response): Promise<void> => {
  const itemPerPage = 10;
  const page: number = parseInt(req.query.page as string);
  const total: number = await Events.estimatedDocumentCount();
  const start: number = (page - 1) * itemPerPage;

  const products = await Events.find().skip(start).limit(itemPerPage);

  res.send({
    page: page,
    per_page: itemPerPage,
    total: total,
    total_pages: Math.ceil(total / itemPerPage),
    data: products,
  });
};

export const getEventById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: string = req.params.id;

    const event = await Events.findById(id)
      .select({ __v: 0 })
      .populate({ path: 'creator', select: { password: 0, __v: 0 } });

    event ? res.send({ data: event }) : res.status(404).send({});
  } catch (e) {
    sendError(res, e);
  }
};

export const createEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.session;
    const { name, date, description, type } = req.body;
    const event = await Events.create({
      name,
      date,
      description,
      type,
      creator: userId,
    });

    res.send(event);
  } catch (e) {
    sendError(res, e);
  }
};

export const updateEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: string = req.params.id;
    const { name, date, description, type } = req.body;
    const { userId } = req.session;

    const event = await Events.findOneAndUpdate(
      { _id: id, creator: userId },
      {
        name,
        date,
        description,
        type,
        creator: userId,
      }
    ).select({ __v: 0 });

    event ? res.send({ data: event }) : res.status(404).send({});
  } catch (e) {
    sendError(res, e);
  }
};

export const partialUpdateEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: string = req.params.id;
    const { name, date, description, type } = req.body;

    const event = await Events.findOne({
      _id: id,
      creator: req.session.userId,
    }).select({ __v: 0 });

    if (event) {
      event.name = name || event.name;
      event.date = date || event.date;
      event.description = description || event.description;
      event.type = type || event.type;

      await event.save();
      res.send({ data: event });
    } else {
      res.status(404).send({});
    }
  } catch (e) {
    sendError(res, e);
  }
};

export const deleteEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: string = req.params.id;

    const event = await Events.deleteOne({
      _id: id,
      creator: req.session.userId,
    });

    event ? res.send({}) : res.status(404).send({});
  } catch (e) {
    sendError(res, e);
  }
};
