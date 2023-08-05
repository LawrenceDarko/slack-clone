import { Request, Response } from 'express';
import Workspace from '../models/WorkSpace';
import UserWorkspace from '../models/UserWorkspace';

const createWorkspace = async(req: Request, res: Response) => {
    const newWorkspace = new Workspace(req.body)
    try {
        const savedWorkspace = await newWorkspace.save()
        res.status(200).json(savedWorkspace)
    } catch (error) {
        res.status(400).json(error)
    }
}

const createUserWorkspace = async(req: Request, res: Response) => {
    const { user, workspace } = req.body
    const existingUser = await UserWorkspace.findOne({user, workspace})

    if(existingUser){
        return res.status(403).json("User already exist")
    }

    const newUserWorkspace = await UserWorkspace.create({user, workspace})
    try {
        const savedUserWorkspace = await newUserWorkspace.save()
        res.status(200).json(savedUserWorkspace)
    } catch (error) {
        res.status(400).json(error)
    }
}

const fetchAllWorkspaceForAUser = async(req: Request, res: Response) => {
    const {userId} = req.params;
    const allUserWorkspace = await UserWorkspace.find({user: userId}).populate('workspace').exec()
    try {
        res.status(200).json(allUserWorkspace)
    } catch (error) {
        res.status(400).json(error)
    }
}

const fetchAllUsersForAWorkspace = async(req: Request, res: Response) => {
    const {workspaceId} = req.params;
    
    const allWorkspaceUsers = await UserWorkspace.find({workspace: workspaceId}).populate('user').exec()
    try {
        res.status(200).json(allWorkspaceUsers)
    } catch (error) {
        res.status(400).json(error)
    }
}

export {createWorkspace, createUserWorkspace, fetchAllWorkspaceForAUser, fetchAllUsersForAWorkspace}