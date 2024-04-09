import SECRET from './secret.js';
import jwt from 'jsonwebtoken';

//this is our authentication middleware that will verify the jwt token for all the endpoints
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, SECRET, (err, result) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.id = result.id;
            req.userType = result.userType;
    
            next();
        });
    } else {
        res.sendStatus(401);
    }
};