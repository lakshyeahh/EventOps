import mongoose from 'mongoose';


const eventSchema = new mongoose.Schema({
    clubName: { type: String, required: true },
    eventName: { type: String, required: true },
    briefDescription: { type: String, required: true },
    eventMode: { type: String, enum: ['Online', 'Offline'], required: true },
    roomNumber: { type: String }, // Assuming it's applicable only for offline events
    dateTime: { type: Date, required: true},
    expectedParticipation: { type: Number, required: true },
    index: { type: Number, default: 1 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Assuming 'User' is the name of your user model
  }, { timestamps: true });


const Event =  mongoose.model('Event', eventSchema);

export { Event };