import { Schema, Document, model, Types } from 'mongoose';
import { User } from './user';
import { Event } from './events';

export interface Participant extends Document {
   details: string,
   user: Types.ObjectId | User
   event: Types.ObjectId | Event
}

const schema = new Schema({
   details: String,
   user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
   event: { type: Schema.Types.ObjectId, ref: 'event', required: true }
});

const Participants = model<Participant>('participant', schema);

export default Participants;