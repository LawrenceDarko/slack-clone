'use client'

import React, { useState, useEffect } from 'react'
import { BiSolidUserRectangle } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";
import RoomNav from "@/app/components/navbars/RoomNav";
import TextEditor from "@/app/components/TextEditor";
import ScrollToView from "@/app/components/ScrollToView";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useParams } from 'next/navigation';
import { useAuthContext } from "@/app/context/AuthContext";

const page = () => {

    const { user } = useAuthContext()
    const [conversationObj, setConversationObj] = useState([])

    const params = useParams()

    const getConversationObj = async() => {
        if(!user){
            return
        }
        const friendId = params.roomId
        const personalId = user.id
        const workspaceId = params.workspaceId
        
        try {
            const response = await axios.get(`http://localhost:8000/api/direct-chat/${personalId}/${friendId}`, {
                headers: {
                    "Authorization": `Bearer ${user?.accessToken}`
                }
            })
            const responseData = response?.data
            console.log(responseData)

            if(responseData?.length < 1 || responseData === null || !responseData){
                const newDirectChatData = {
                    members: [friendId, personalId],
                    worskpace_id: workspaceId
                }
                const res = await axios.post(`http://localhost:8000/api/direct-chat/create`, newDirectChatData, {
                    headers: {
                        "Authorization": `Bearer ${user?.accessToken}`
                    } 
                })
                const chatResData = res.data
                console.log(chatResData)
            }
            
            setConversationObj(responseData)
        } catch (error) {
            console.log(error)
        }
    }

    const getAllMessagesBelongingToAChat = () => {
        
    }

    useEffect(() => {
        getConversationObj()
    }, [user])
    

    return (
        <div className='relative w-full h-screen'>
            <RoomNav />
            <section className="relative flex flex-col w-full h-full overflow-x-hidden overflow-y-auto">
                <section className="w-full h-full gap-3 pt-72">
                    <div className="flex items-center">
                        <BiSolidUserRectangle className='text-[#007A5A] text-9xl'/>
                        <h1 className="font-semibold">Clarence</h1>
                    </div>
                    <div className="px-3">
                        <p>This conversation is just between @Francis Onuman Jr. and you. Check out their profile to learn more about them.</p>
                    </div>
                    <div className="flex px-3">
                        <div className="flex px-3 py-2 text-sm hover:bg-[#F8F8F8] border border-gray-400 rounded-[5px]">
                            <p>View Profile</p>
                        </div>
                    </div>
                </section>
                <section className="absolute flex flex-col rounded-md active:border-black bottom-2 left-3 right-3 h-36  min-h-[144px] bg-white z-19">
                    <TextEditor />
                </section>
            </section>
        </div>
    )
}

export default page