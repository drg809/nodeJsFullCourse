import { Schema, model, Document } from 'mongoose';

export interface User extends Document {
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  password: string;
}

const schema = new Schema({
  id: Number,
  email: {type: String, unique: true, required: true},
  first_name: String,
  last_name: String,
  avatar: String,
  password: {type: String, required: true},
});

const Users = model<User>('user', schema);

export default Users;
