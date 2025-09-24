import { Schema, model, Document } from 'mongoose';

interface IEvent extends Document {
  img: string,
  header: string,
  desc: string
}

const eventsSchema: Schema = new Schema<IEvent>({
  img: {
    type: String,
    required: true
  },
  header: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const EventsModel = model<IEvent>('events', eventsSchema);