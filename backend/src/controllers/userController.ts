import { Request, Response } from 'express';
import User from "../models/User";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import { generateRandomJWTSecret } from '../helpers/generateToken';
import dotevn from 'dotenv'
dotevn.config()


// const jwtSecret = generateRandomJWTSecret(20)
const jwtSecret = process.env.ACCESS_TOKEN_SECRET as string;
const jwtRefreshToken = process.env.REFRESH_TOKEN_SECRET as string

export const generateAccessToken = (userId: any) => {
    return jwt.sign({userId}, jwtSecret, {
        expiresIn: '24h'
    })
}

export const generateRefreshToken = (userId: any) => {
    return jwt.sign({userId}, jwtRefreshToken, {
        expiresIn: '3m'
    })
}

const registerUser = async(req: Request, res: Response) => { 
    const {username, email, password} = req.body

    if(!username || !email || !password){
        return res.status(403).json('Enter all Fields')
    }
    
    const existingEmail = await User.findOne({email: email})

    if (existingEmail){
        return res.status(403).json("User already exist")
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    try {
        const newUser = await User.create({username, email, password: hashedPassword})
        const savedUser = await newUser.save();
        const access_token = generateAccessToken(savedUser._id)
        const refresh_token = generateRefreshToken(savedUser._id)
        res.status(201).json({
            id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            accessToken: access_token,
            refreshToken: refresh_token
        });
    } catch (error) {
        res.status(400).json(error);
    }
    
}

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Check if all the fields are not empty
    if (!email || !password) {
    return res.status(403).json("Enter all fields");
    }

    try {
        // Find one user witht the unique email 
        const user = await User.findOne({ email: email });

        // Return Invalid credential if user doesn't exist
        if (!user) {
            return res.status(401).json("Invalid credentials");
        }

        // If user exists decrypt their password and if the entered password is equal to the decrypted one
        if (user && user.password && (await bcrypt.compare(password, user.password))) {
            const access_token = generateAccessToken(user._id)
            const refresh_token = generateRefreshToken(user._id)

            // console.log(refresh_token)

            let cookieInfo = {
                refreshToken: refresh_token,
                userData: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                    // Add more user data fields if needed
                }
            }


            res.cookie("token", refresh_token, {
                httpOnly: true,
                maxAge: 3 * 60 * 1000
            })

            return res.status(200).json({
                status: 'success',
                data: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    accessToken: access_token,
                    // refreshToken: refresh_token
                }
            });
        } else {
            return res.status(401).json("Invalid credentials");
        }
    } catch (error) {
        console.error("Error in loginUser:", error);
        return res.status(500).json("Internal Server Error");
    }
};



const getAllUsers = async(req: Request, res: Response) => { 
    // const id = req.user.userId
    const allUsers = await User.find({})
    try {
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(400).json(error)
    }
}

export {registerUser, getAllUsers, loginUser}