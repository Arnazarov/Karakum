import jwt from 'jsonwebtoken';
import User from '../models-schemas/userModel.js';

export const protectKarakum = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decodedToken.id).select('-password');

            next();

        } catch(err) {
            res.status(401);
            console.error(err);
        }
    }

    if(!token) {
        res.status(401);
        next(new Error('Not authorized, token failed!'))
    }
}

export const isAdmin = async (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401);
        next(new Error('Not authorized as an admin'))
    }
}
