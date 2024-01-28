import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User'; // Import the IUser interface from the User model
import dotenv from 'dotenv';
dotenv.config();

const jwtSecret = process.env.ACCESS_TOKEN_SECRET as string;
const jwtRefreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string

interface JwtPayload {
    userId: string;
    exp: any
}

// Define a new type that extends the existing Request type and includes the 'user' property
interface AuthenticatedRequest extends Request {
    user?: IUser | any; // Use the IUser interface here
}



const protect = async(req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    // const refreshToken = req.cookies['refreshToken'];
    let token
    if(authHeader && authHeader.startsWith('Bearer')){
        try {
            // Get token from header
            token = authHeader.split(' ')[1];

            // verify token
            const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

            if(decoded.exp * 1000 < Date.now()){
                return res.status(401).json({message: 'Token expired'})
            }

            req.user = await User.findById(decoded.userId).select('-password');
            // This also works
            // req.body.user = await User.findById(decoded.userId).select('-password');
            next()
        } catch (error) {
            console.log(error);
            res.status(403).json('Not authorized, token invalid');
        }
    }

    // if(!token && !refreshToken){
    //     res.status(401).json('Not authorized, no token')
    // }
}

export default protect










// Or do this

// const protect = async(req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//     const authHeader = req.headers.authorization;
//     const refreshToken = req.cookies['refreshToken'];
//     let token
//     if(authHeader && authHeader.startsWith('Bearer')){
//         try {
//             // Get token from header
//             token = authHeader.split(' ')[1];

//             // verify token
//             const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

//             // req.user = await User.findById(decoded.userId).select('-password');

//             // This also works
//             req.body.user = await User.findById(decoded.userId).select('-password');

//             next()
//         } catch (error) {
//             console.log(error);
//             res.status(403).json('Not authorized, token invalid');
//             // if (!refreshToken) {
//             //     return res.status(401).send('Access Denied. No refresh token provided.');
//             // }
//             // return res.redirect('/refresh')
//         }
//     }

//     if(!token && !refreshToken){
//         res.status(401).json('Not authorized, no token')
//     }
// }

// export default protect
