'use client'

import React, { useState, useEffect} from "react";
import WorkspaceItem from './WorkspaceItem'
import { useAuthContext } from '@/app/context/AuthContext'
import axios from "axios";
import { useRouter } from "next/navigation";

const WorkspacesCard = () => {

    const [workpaces, setWorkpaces] = useState() as any
    const { user } = useAuthContext()
    const router = useRouter()

    const getData = async() => {

    if(!user){
        return console.log("You must be logged in")
    }

    try {
        const response = await axios.get(`http://localhost:8000/api/workspace/all-user-workspaces/${user?.id}`, {
            headers: {
                "Authorization": `Bearer ${user?.accessToken}`
            }
        })
        const responseData = response.data
        setWorkpaces(responseData)
        console.log(responseData)

        responseData.map((item: any)=>(console.log(item.workspace.name)))

        } catch (error) {
            console.log(error)
        }
    }

    const handleOnclick = (workspaceId: any) => {
        router.push(`/client/${workspaceId}`)
    }

    
    useEffect(() => {
        getData()
    }, [user])

    return (
        <div className='border flex flex-col h-full rounded-sm shadow-md w-full md:w-[40%]'>
            <div className='p-3 border-b'>
                <p>Workspaces for darkolawrence@gmail.com</p>
            </div>
            <div className='flex flex-col w-full h-full'>
                {workpaces?.map((item: any) => 
                    <div onClick={()=>handleOnclick(item.workspace._id)}>
                        <WorkspaceItem spaceName={item.workspace.name} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default WorkspacesCard