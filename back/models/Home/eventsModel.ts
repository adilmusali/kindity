import { Schema, model, Document } from 'mongoose';

interface IEvent extends Document {
  img: string,
  header: string,
  desc: string
  isDemo?: boolean;
  eventDate?: string;
}

function isCalendarDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
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
  },
  isDemo: { type: Boolean, required: false },
  eventDate: {
    type: String,
    required: false,
    validate: { validator: isCalendarDate, message: 'eventDate must be a valid YYYY-MM-DD calendar date' }
  }
}, { timestamps: true });

export const EventsModel = model<IEvent>('events', eventsSchema);
