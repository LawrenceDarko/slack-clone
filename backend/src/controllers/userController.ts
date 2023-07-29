import { Request, Response } from 'express';
import User from "../models/User";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'

const registerUser = async(req: Request, res: Response) => { 
    const {username, email, password} = req.body
    const existingEmail = await User.findOne({email: email})

    if (existingEmail){
        return res.status(400).json("User already exist")
    }

    try {
        const newUser = await User.create({username, email, password})
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(400).json(error);
    }
    
}

const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
    return res.status(400).json("Enter all fields");
    }

    try {
    const user = await User.findOne({ username: username });

    if (!user) {
        return res.status(401).json("Invalid credentials");
    }

    // Here, you should verify the password using a secure hashing function like bcrypt
    // and compare it with the hashed password stored in the user object.

    // Assuming you have a function named `verifyPassword` to check the password
    //   const isPasswordValid = await verifyPassword(password, user.password);

    if (user) {
        return res.status(200).json(user);
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