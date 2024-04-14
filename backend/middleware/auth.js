import JwtService from '../services/JwtService.js';

const auth = async (req, res, next) => {
    let authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader) {
        return next('unAuthorized');
    }

    const token = authHeader.split(' ')[1];

    try {
        const { _id, role } = await JwtService.verify(token);
        const user = {
            _id,
            role
        }
        console.log(user);
        req.user = user;
        next();

    } catch(err) {
        return next('unAuthorized');
    }

}

export default auth;