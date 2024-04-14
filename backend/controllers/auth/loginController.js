import Joi from 'joi';
import { User } from '../../models/users.js'
import { RefreshToken } from '../../models/refreshToken.js'
import bcrypt from 'bcrypt';
import JwtService from '../../services/JwtService.js';
const REFRESH_SECRET = "changemeR";


const loginController = {
    async login(req, res, next) {

        // Validation
        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        });
        const { error } = loginSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        //authenticate
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return next('Username or password is wrong!');
            }

            // compare the password
            const match = await bcrypt.compare(req.body.password, user.password);
            if (!match) {
                return next('Username or password is wrong!');
            }

            // Toekn
            const access_token = JwtService.sign({ _id: user._id, role: user.role });
            const refresh_token = JwtService.sign({ _id: user._id, role: user.role }, '1y', REFRESH_SECRET);
            // database whitelist
            await RefreshToken.create({ token: refresh_token });
            res.json({ access_token, refresh_token, user});

        } catch (err) {
            return next(err);
        }
    },

    async logout(req, res, next) {

        // validation
        const refreshSchema = Joi.object({
            refresh_token: Joi.string().required(),
        });

        const { error } = refreshSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        try {
            await RefreshToken.deleteOne({ token: req.body.refresh_token });
        } catch(err) {
            return next(new Error('Something went wrong in the database'));
        }
        res.json({ status: 1 });

    }
}


export default loginController;