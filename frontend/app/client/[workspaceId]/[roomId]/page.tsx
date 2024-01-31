'use client'

import React, { useState, useEffect, useRef } from 'react'
import { BiSolidUserRectangle } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";
import RoomNav from "@/app/components/navbars/RoomNav";
import { useRouter } from "next/navigation";
import { useParams } from 'next/navigation';
import { useAuthContext } from "@/app/context/AuthContext";
import { axiosPrivate } from '@/app/hooks/axios';

const page = () => {

    const { user } = useAuthContext()
    const [messages, setMessages] = useState([]) as any
    const [newMessage, setNewMessage] = useState("")
    const [friendInfo, setFriendInfo] = useState() as any

    const params = useParams()
    const controller = new AbortController();
    const lastMessageRef = useRef<HTMLDivElement | null>(null);
    const directChatId = params.roomId



    const getFriendInfo = async() => { 
        try {
            const response = await axiosPrivate.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/direct-chat/room/${directChatId}`)
            const roomData = response?.data
            console.log("ROOM DATA:", roomData)
            if(roomData?.status === 'success' && user){
                let friendId
                if(roomData?.data?.members[0] === user?._id){
                    friendId = roomData?.data?.members[1]
                }
                else{
                    friendId = roomData?.data?.members[0]
                }

                console.log("FRIEND ID:", friendId)
                // Make api call to fetch friend information
                const response = await axiosPrivate.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${friendId}`)
                const responseData = response?.data
                console.log('FRIEND DATA:', responseData)
                if(responseData?.status === 'success'){
                    setFriendInfo(responseData?.data)
                }
            }
        } catch (error) {
            console.log("ERROR GETTING FRIEND DATA", error)
        }
    }

    const getAllMessagesBelongingToAChat = async() => {

        try {
            const response = await axiosPrivate.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/direct-chat/${directChatId}`, {
            withCredentials: true,
            signal: controller.signal
        })
        const messagesData = response?.data
        console.log(messagesData)
        setMessages(messagesData)
        } catch (error) {
            console.log(error)
        }
        
        // controller.abort()
    }


    const sendMessagge = async(e: any) => {
        e.preventDefault()
        const data = {
            sender_id: user.id,
            direct_chat_id: directChatId,
            message_body: newMessage,
            username: user.username
        }

        console.log(data)

        try {
            const response = await axiosPrivate.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/direct-chat/message`, data, {
            withCredentials: true,
            // signal: controller.signal
        })
        const messagesData = response?.data
        await setMessages((prev: any)=>[...prev, messagesData])
        setNewMessage('')
        console.log(messagesData)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);


    useEffect(() => {
        getAllMessagesBelongingToAChat()
        getFriendInfo()
    }, [user])
    
    

    return (
        <div className='relative w-full h-screen'>
            <RoomNav user={friendInfo?.username}/>
            <section className="flex flex-col flex-1 w-full h-full overflow-x-hidden overflow-y-auto">
                <section className="w-full h-full gap-3 pb-10 overflow-y-auto pt-72">
                    <div className="flex items-center">
                        <BiSolidUserRectangle className='text-[#007A5A] text-9xl'/>
                        <h1 className="font-semibold">{messages?.username}</h1>
                    </div>
                    <div className="px-3">
                        <p>{`This conversation is just between @${friendInfo?.username}. and you. Check out their profile to learn more about them.`}</p>
                    </div>
                    <div className="flex px-3">
                        <div className="flex px-3 py-2 text-sm hover:bg-[#F8F8F8] border border-gray-400 rounded-[5px]">
                            <p>View Profile</p>
                        </div>
                    </div>
                    {/* {messages && <section>
                        {messages?.map((message: any, i: any)=> (
                            <p key={i}>{message?.message_body}</p>
                        ))}
                    </section>} */}
                    {messages && <section className='flex flex-col w-full h-full gap-3 p-3 cursor-pointer'>
                        {messages?.map((message: any, i: any)=> (
                        <div ref={i === messages.length - 1 ? lastMessageRef : null} key={i} className='flex items-start justify-start gap-2'>
                            <div className='w-12 h-12 rounded-md'>
                                <BiSolidUserRectangle className="w-full h-full text-gray-200"/>
                            </div>
                            <div>
                                <p className='font-bold'>{message?.username}</p>
                                <p className='text-normal'>{message?.message_body}</p>
                            </div>
                        </div>))}
                    </section>}
                </section>
                <section className="m-5 flex border-1 flex-col rounded-md active:border-black bottom-2 left-3 right-3 h-20  min-h-[50px] bg-white z-19">
                    {/* <TextEditor /> */}
                    <form action="" className='flex w-full h-full p-2 border'>
                        <input className='w-full h-full outline-none' value={newMessage} onChange={(e: any)=>setNewMessage(e.target.value)}/>
                        <button type='submit' onClick={sendMessagge}>
                            <IoMdSend className="text-2xl text-green-800"/>
                        </button>
                    </form>
                </section>
            </section>
        </div>
    )
}

export default page