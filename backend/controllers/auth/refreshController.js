import Joi from 'joi';
const REFRESH_SECRET = "changemeR";
import { User } from '../../models/users.js';
import { RefreshToken } from '../../models/refreshToken.js';
import JwtService from '../../services/JwtService.js';

const refreshController = {
    async refresh(req, res, next) {
        // validation
        const refreshSchema = Joi.object({
            refresh_token: Joi.string().required(),
        });
        const { error } = refreshSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        // database
        let refreshtoken;
        try {
            refreshtoken = await RefreshToken.findOne({ token: req.body.refresh_token });
            if (!refreshtoken) {
                return next('Invalid refresh token');
            }

            let userId;
            try {
                const { _id } = await JwtService.verify(refreshtoken.token, REFRESH_SECRET);
                userId = _id;
            } catch(err) {
                return next('Invalid refresh token');
            }

            const user = await User.findOne({ _id: userId });
            if (!user) {
                return next('No user found!');
            }

            // tokens
            // Toekn
            const access_token = JwtService.sign({ _id: user._id, role: user.role });
            const refresh_token = JwtService.sign({ _id: user._id, role: user.role }, '1y', REFRESH_SECRET);
        // database whitelist
            await RefreshToken.create({ token: refresh_token });
            res.json({ access_token, refresh_token });

        } catch(err) {
            return next(new Error('Something went wrong ' + err.message));
        }

    }
};

export default refreshController;