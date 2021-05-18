import { Schema, Document, model, ObjectId } from 'mongoose';
import { User } from './user';

interface Event extends Document {
   name: string,
   date: string,
   description: string,
   type?: boolean,
   creator: ObjectId | User
}

const schema = new Schema({
   name: { type: String, required: true },
   date: { type: String, required: true },
   description: { type: String, required: true },
   type: { type: Boolean, default: true },
   creator: { type: Schema.Types.ObjectId, ref: 'user', required: true }
});

const Events = model<Event>('event', schema);

export default Events;