import Joi from 'joi';
import { User } from '../../models/users.js';
import { RefreshToken } from '../../models/refreshToken.js';
import bcrypt from 'bcrypt';
import JwtService from '../../services/JwtService.js';
const REFRESH_SECRET = "changemeR";

// CHECKLIST
// [ ] validate the request
// [ ] authorise the request
// [ ] check if user is in the database already
// [ ] prepare model
// [ ] store in database
// [ ] generate jwt token
// [ ] send response

const registerController = {
    async register(req, res, next) {


        // Validation
        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            repeat_password: Joi.ref('password')
        });

        const { error } = registerSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        // check if user is in the database already
        try {
            const exist = await User.exists({ email: req.body.email });
            if (exist) {
                return next('This email is already taken.');
            }
        } catch (err) {
            return next(err);
        }
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        let access_token;
        let refresh_token;
        try {
            const result = await user.save();
            console.log(result);

            // Token
            access_token = JwtService.sign({ _id: result._id, role: result.role });
            refresh_token = JwtService.sign({ _id: result._id, role: result.role }, '1y', REFRESH_SECRET);
            // database whitelist
            await RefreshToken.create({ token: refresh_token });
        } catch (err) {
            return next(err);
        }

        res.json({ access_token, refresh_token, user});

        
    }
}

export default registerController;