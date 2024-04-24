import Joi from 'joi';
import { Event } from '../models/event.js';
// import { RefreshToken } from '../../models/refreshToken.js'
import { User } from "../models/users.js";
import JwtService from '../services/JwtService.js';

const REFRESH_SECRET = "changemeR";

const allAvailableRooms = ['L20', 'L21', 'L26', 'L27', 'Library'];

const cardController = {
    async upload(req, res, next) {
        const eventSchemaJoi = Joi.object({
            clubName: Joi.string().required(),
            eventName: Joi.string().required(),
            briefDescription: Joi.string().required(),
            eventMode: Joi.string().valid('Online', 'Offline').required(),
            roomNumber: Joi.string(), // Assuming it's applicable only for offline events
            dateTime: Joi.date(),
            expectedParticipation: Joi.number().required(),
            author: Joi.string()
        });

        const { error } = eventSchemaJoi.validate(req.body);
        if (error) {
            return next(error);
        }
        //try if room exists
        // try {
        //     // const exist = await Event.exists({ roomNumber: req.body.roomNumber });
        //     // if (exist) {
        //     //     return next('This room is already taken.');
        //     // }
        // } catch (err) {
        //     return next(err);
        // }
        const {
            clubName,
            eventName,
            briefDescription,
            eventMode,
            roomNumber,
            dateTime,
            expectedParticipation,
            author
        } = req.body;

        const event = new Event({
            clubName,
            eventName,
            briefDescription,
            eventMode,
            roomNumber,
            dateTime,
            expectedParticipation,
            author
        });

        let event_token;

        try {
            const result = await event.save();
            
            event_token = JwtService.sign({ _id: result._id, role: result.role });


        } catch (err) {
            return next(err);
        }

        console.log(event_token);
        res.json({ event_token, event });
    },


    async load(req, res, next) {


        try {
            // Assuming user's access level is stored in req.user.level
            const user = await User.findOne({ _id: req.user._id });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const userid = user._id;
            const roleUser = user.role;
            const cards = await Event.find({
                $or: [
                  { index: roleUser },
                  { author: userid }
                ]
              });

            if (cards.length === 0) {
                return res.status(404).json({ message: 'No events for you' });
            }

            
            const responseData = {
                user: user,
                cards: cards
            };
            res.json(responseData);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }


    },
    
    async loadOne(req, res, next) {


        try {
            
            const eventId = req.headers.authorization.split(' ')[1];

            const event = await Event.findOne({ _id: eventId });
            

            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }

            console.log(event);
            res.status(200).json(event);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }


    },
    async update(req, res, next) {
        try {
            console.log()
            const eventId = req.params.id; // Assuming 'eventId' is the parameter name in your route

            const event = await Event.findOneAndUpdate(
                { _id: eventId }, // Find the event by its ID
                { $inc: { index: 1 } }, // Increment the 'index' field by 1
                { new: true } // Return the updated document
            );

            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }

            // Emit 'approve' event to all connected clients
            

            // Fetch all events and send the updated list as the response

            console.log("Success")
            res.status(200).json({message: 'Success'});
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async getDates(req, res, next) {


        try {
            // Assuming the room number is provided in the request as req.query.roomNumber
            const roomNumber = req.body.roomNumber;
        
            // Find all events that include the specified room number
            const events = await Event.find({ roomNumber: roomNumber, dateTime: { $gte: new Date() } });
        
            if (events.length === 0) {
                return res.status(404).json({ message: 'No events found for the specified room number' });
            }
        
            // Extract and return the dates of the events
            const eventDates = events.map(event => event.dateTime.toDateString());
            const formattedDates = eventDates.map(dateString => {
                const date = new Date(dateString);
                const year = date.getFullYear();
                const month = date.getMonth() + 1; // Months are zero-based
                const day = date.getDate();
                return `${year},${month},${day}`;
              });
        
            res.json( formattedDates );
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        


    },
    async getRooms(req, res, next) {


        try {
            // Assuming the date and time are provided in the request body as req.body.dateTime
            const dateTime = new Date(req.body.dateTime);
        
            // Find all events that occur at the specified date and time
            const events = await Event.find({ dateTime: dateTime });
        
            if (events.length === 0) {
                return res.status(404).json({ message: 'No events found at the specified date and time' });
            }
        
            // Extract and return the room numbers of the events
            const roomNumbers = events.map(event => event.roomNumber);
        
            res.json({ dateTime: dateTime, roomNumbers: roomNumbers });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        


    }
}

export default cardController;