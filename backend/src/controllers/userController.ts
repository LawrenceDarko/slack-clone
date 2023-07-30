import { Request, Response } from 'express';
import User from "../models/User";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import { generateRandomJWTSecret } from '../helpers/generateToken';
import dotevn from 'dotenv'
dotevn.config()


// const jwtSecret = generateRandomJWTSecret(20)
const jwtSecret = process.env.ACCESS_TOKEN_SECRET;

const generateToken = (userId: any) => {
    if (!jwtSecret) {
        throw new Error('JWT_SECRET is not set in the environment variables.');
    }
    return jwt.sign({userId}, jwtSecret, {
        expiresIn: '30d'
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
        res.status(201).json({
            id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            token: generateToken(savedUser._id)
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
            return res.status(200).json({
                id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id)
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
    const allUsers = await User.find({})
    try {
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(400).json(error)
    }
}

export {registerUser, getAllUsers, loginUser}