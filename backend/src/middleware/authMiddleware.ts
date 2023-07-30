import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User'; // Import the IUser interface from the User model
import dotenv from 'dotenv';
dotenv.config();

const jwtSecret = process.env.ACCESS_TOKEN_SECRET;
if (!jwtSecret) {
    throw new Error('JWT_SECRET is not set in the environment variables.');
}

interface JwtPayload {
    userId: string;
}

// // Define a new type that extends the existing Request type and includes the 'user' property
interface AuthenticatedRequest extends Request {
    user?: IUser | any; // Use the IUser interface here
}

// const protect = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//     const authHeader = req.headers.authorization;
//     if (authHeader && authHeader.startsWith('Bearer')) {
//         try {
//             // Get token from header
//             const token = authHeader.split(' ')[1];

//             if (!token) return res.status(401).json('not authorized');

//             // verify token
//             const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

//             req.user = await User.findById(decoded.userId).select('-password');
            
//             next();
//         } catch (error) {
//             console.log(error);
//             res.status(401).json('not authorized');
//         }
//     }
// };

// export { protect };

const protect = async(req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    let token
    if(authHeader && authHeader.startsWith('Bearer')){
        try {
            // Get token from header
            token = authHeader.split(' ')[1];

            // verify token
            const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

            req.user = await User.findById(decoded.userId).select('-password');

            next()
        } catch (error) {
            console.log(error);
            res.status(403).json('Not authorized, token invalid');
        }
    }

    if(!token){
        res.status(401).json('Not authorized, no token')
    }
}

export default protect

