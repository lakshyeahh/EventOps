import { User } from "../../models/users.js";


const userController = {
    async me(req, res, next) {
        try {
            const user = await User.findOne({ _id: req.user._id }).select('-password -updatedAt -__v');
            if (!user) {
                return next(message = '404 Not Found');
            }
            res.json(user);
        } catch(err) {
           return next(err);
        }
    }
};

export default userController;