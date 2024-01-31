'use client'

import React, { useState, useEffect} from "react";
import WorkspaceItem from './WorkspaceItem'
import { useAuthContext } from '@/app/context/AuthContext'
import useAxiosPrivate from "@/app/hooks/useAxiosPrivate";
import { useRouter } from "next/navigation";
import Link from "next/link";

const WorkspacesCard = () => {

    const [workpaces, setWorkpaces] = useState() as any
    const { user, auth } = useAuthContext()
    const router = useRouter()
    const axiosPrivate = useAxiosPrivate();

    const getData = async() => {

    if(!user){
        return console.log("You must be logged in")
    }

    const controller = new AbortController();

    try {
        const response = await axiosPrivate.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/workspace/all-user-workspaces/${user?.id}`, {
            // headers: {
            //     "Authorization": `Bearer ${auth?.user?.accessToken}`
            // }
            signal: controller.signal,
            withCredentials: true
        })
        const responseData = response.data
        setWorkpaces(responseData)
        console.log(responseData)

        responseData.map((item: any)=>(console.log(item.workspace.name)))
        // controller.abort()
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
                {workpaces?.map((item: any, i: any) => 
                    <div key={i} onClick={()=>handleOnclick(item.workspace._id)}>
                        <WorkspaceItem spaceName={item.workspace.name} />
                    </div>
                    // <Link href={`client/${item.workspace._id}`} key={i}>
                    //     <WorkspaceItem spaceName={item.workspace.name} />
                    // </Link>
                )}
            </div>
        </div>
    )
}

export default WorkspacesCard