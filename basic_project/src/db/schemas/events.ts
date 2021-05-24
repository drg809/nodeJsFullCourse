import { Schema, Document, model, Types } from 'mongoose';
import { User } from './user';
import { Participant } from './participants';

export interface Event extends Document {
   name: string,
   date: string,
   description: string,
   photo: string,
   type?: boolean,
   creator: Types.ObjectId | User,
   participants?: Types.ObjectId | Participant
}

const schema = new Schema({
   name: { type: String, required: true },
   date: { type: String, required: true },
   description: { type: String, required: true },
   photo: { type: String, required: true },
   type: { type: Boolean, default: true },
   creator: { type: Schema.Types.ObjectId, ref: 'user', required: true },
   participants: { type: Schema.Types.ObjectId, ref: 'participant' }
});

const Events = model<Event>('event', schema);

export default Events;