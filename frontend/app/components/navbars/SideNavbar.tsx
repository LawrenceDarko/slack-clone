
'use client'
import React, {useState, useEffect, useCallback} from 'react'
import { FiEdit } from "react-icons/fi";
import { PiFilesLight } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import { BiSolidBuildings } from "react-icons/bi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { PiRocketLaunchLight } from "react-icons/pi";
import { BiSolidUserRectangle } from "react-icons/bi";
import { RiArrowDownSFill, RiArrowRightSFill } from "react-icons/ri";
import { GoStack } from "react-icons/go";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";
import axios from 'axios';
import { useAuthContext } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import useAxiosPrivate from '@/app/hooks/useAxiosPrivate';
import MenuItem from './MenuItem';
import { useGeneralContext } from '@/app/context/GeneralContext';

interface LinkProp {
    href: string;
    text: string;
    IconComponent: React.ElementType;
}

const slackSideLinks: LinkProp[] = [
    { href: "/canvases", text: "Canvases", IconComponent: PiFilesLight },
    { href: "/slack_connect", text: "Slack Connect", IconComponent: BiSolidBuildings },
    { href: "/files", text: "Files", IconComponent: GoStack },
    { href: "/browse_slack", text: "Browse Slack", IconComponent: BiDotsVerticalRounded },
];

const slackChannels: LinkProp[] = [
    { href: "/canvases", text: "general", IconComponent: PiFilesLight },
    { href: "/slack_connect", text: "development", IconComponent: BiSolidBuildings },
    { href: "/files", text: "announcements", IconComponent: GoStack },
    { href: "/browse_slack", text: "discussions", IconComponent: BiDotsVerticalRounded },
];

const SideNavbar = () => {

    const router = useRouter()
    const params = useParams()
    const workspaceId = params.workspaceId
    const axiosPrivate = useAxiosPrivate();
    // console.log(params.roomId)

    const { user } = useAuthContext()
    const { setShowModal,
            getWorkspaceChannels, 
            channelList,
            getWorkspaceUsers,
            worksapceUsers 
        } = useGeneralContext()
    const [channelDropdownState, setChannelDropdownState] = useState(true)
    const [directMessagesState, setDirectMessagesState] = useState(true)
    const [conversationObj, setConversationObj] = useState(null) as any
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, [],)

    // console.log(user.accessToken)

    const handleDropdowToggle = () => { 
        setChannelDropdownState(!channelDropdownState)
    }

    const handleMessageDropdownToggle = () => { 
        setDirectMessagesState(!directMessagesState)
    }


    const getConversationObj = async(id: any) => {
        console.log(id)
        if(!user ){
            return
        }
        const friendId = id
        const personalId = user.id
        const workspaceId = params.workspaceId
        
        try {
            const response = await axiosPrivate.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/direct-chat/${personalId}/${friendId}`, {
                withCredentials: true,
                // signal: controller.signal
            })
            
            const responseData = response?.data
            console.log('Direct msg',responseData)
            await setConversationObj(responseData)
            
            if(responseData?.length < 1 || responseData === null || !responseData){
                const newDirectChatData = {
                    members: [friendId, personalId],
                    worskpace_id: workspaceId
                }
                const res = await axiosPrivate.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/direct-chat/create`, newDirectChatData, {
                    withCredentials: true,
                    // signal: controller.signal
                })
                const chatResponseData = res?.data
                console.log(chatResponseData)
                await setConversationObj(chatResponseData)
            }
            // redirect user to chats page
            router.push(`/client/${workspaceId}/${responseData._id}`)
        } catch (error) {
            console.log("GETTING CONVERSATION ERROR",error)
        }
    }


    useEffect(() => {
        getWorkspaceUsers()
        getWorkspaceChannels()
    }, [user])
    
    
    
    return (
        <div className='hidden top-[44px] left-0 bottom-0 border-t-[1px] border-[#522653] min-[212px]:block md:fixed w-[20vw] bg-[#3F0E40] h-[93.8vh] overflow-auto'>
            <div className='flex flex-col w-full h-full'>
                <section className='flex flex-col gap-4 px-5 pt-2'>
                    <div className='flex items-center justify-between'>
                        <div className='relative w-[500px]'>
                        <div onClick={toggleOpen} className='flex items-center gap-2 cursor-pointer'>
                            <h1 className='font-bold text-white'>Computing Physics</h1>
                            <IoIosArrowDown className='text-white'/>
                        </div>
                        {isOpen && (
                            <div className='absolute z-50 overflow-hidden text-sm bg-white rounded-md shadow-md w-60 left-5 top-7'>
                                <div className="flex flex-col cursor-pointer">
                                    <>
                                        <MenuItem onClick={()=>{
                                            toggleOpen()
                                        }} 
                                        label='New Workspace
                                        '/>
                                        <hr/>
                                        <MenuItem onClick={()=>{
                                            setShowModal(true)
                                            toggleOpen()
                                        }} 
                                        label='Create Channel'/>
                                    </>
                                </div>
                            </div>
                        )}
                        </div>
                        <div className='flex items-center justify-center p-3 bg-white rounded-full'>
                            <FiEdit className='text-[#3F0E40] text-xl'/>
                        </div>
                    </div>
                    <div className='flex items-center justify-center w-full gap-2 p-1 border rounded-md'>
                        <PiRocketLaunchLight className='text-white'/>
                        <p className='text-[12px] font-thin text-white'>Upgrade Plan</p>
                    </div>
                </section>
                <hr className="my-3 text-[1px] border-[#522653] md:min-w-full"/>
                <section className='flex flex-col px-2'>
                    <ul className="flex flex-col items-stretch">
                        {slackSideLinks.map((item, index) => (
                        <li key={index} className="relative block cursor-pointer hover:bg-[#4D2A51] rounded-md px-3 py-1">
                            <div className={`flex gap-3 items-center text-[#B5A6B7] capitalize ${pathname === item.href ? "text-lightBlue-500 hover:text-lightBlue-600" : "text-blueGray-700 hover:text-blueGray-500"}`}>
                                <item.IconComponent className='text-[1vw]'/>
                                <p className='text-[min(1vw)]'>{item.text}</p>
                            </div>
                        </li>
                        ))}
                    </ul>
                </section>
                <hr className="my-3 text-[1px] border-[#522653] md:min-w-full"/>
                <section className='px-1'>
                        <div className='flex px-3 text-[#B5A6B7] items-center'>
                            <div className='p-1 rounded-md hover:bg-[#4D2A51] cursor-pointer'>
                                <div onClick={()=>handleDropdowToggle()}>
                                    {channelDropdownState? <RiArrowDownSFill className='text-white'/> : <RiArrowRightSFill className='text-white'/>}
                                </div>
                            </div>
                            <div className='flex items-center gap-1 hover:bg-[#4D2A51] pt-full px-1 rounded-md cursor-pointer'>
                                <p>Channels</p>
                                <IoIosArrowDown className='text-transparent hover:text-white'/>
                            </div>
                        </div>
                        <div className={`px-1 ${channelDropdownState? 'block' : 'hidden'}`}>
                            <ul className="flex flex-col items-stretch">
                                {channelList?.map((item: any, index: number) => (
                                <li key={index} className={`relative block cursor-pointer ${pathname === item.href ? 'bg-[#1164A3]' : ''} hover:bg-[#4D2A51] rounded-md px-4 py-1`}>
                                    <div className={`flex gap-3 items-center text-[#B5A6B7] capitalize ${pathname === item.href ? "text-white hover:text-lightBlue-600" : "text-blueGray-700 hover:text-blueGray-500"}`}>
                                        <p>#</p>
                                        <p className='text-[min(1vw)]'>{item.name}</p>
                                    </div>
                                </li>
                                ))}
                                <li onClick={()=>setShowModal(true)} className={`relative block cursor-pointer rounded-md px-4 py-1`}>
                                    <Link href={""} className={`flex gap-3 items-center text-[#B5A6B7] capitalize `}>
                                        <p>+</p>
                                        <p className='text-[min(1vw)]'>Add Channel</p>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                </section>
                <section className='px-1'>
                        <div className='flex px-3 text-[#B5A6B7] items-center'>
                            <div className='p-1 rounded-md hover:bg-[#4D2A51] cursor-pointer'>
                                <div onClick={()=>handleMessageDropdownToggle()}>
                                    {directMessagesState? <RiArrowDownSFill className='text-white'/> : <RiArrowRightSFill className='text-white'/>}
                                </div>
                            </div>
                            <div className='flex items-center gap-1 hover:bg-[#4D2A51] pt-full px-1 rounded-md cursor-pointer'>
                                <p>Direct Messages</p>
                                <IoIosArrowDown className='text-transparent hover:text-white'/>
                            </div>
                        </div>
                        <div className={`px-1 ${directMessagesState? 'block' : 'hidden'}`}>
                            <ul className="flex flex-col items-stretch">
                                {worksapceUsers?.map((item: any, index: number) => (
                                <li key={index} onClick={()=>getConversationObj(item?.user?._id)} className={`relative block cursor-pointer hover:bg-[#4D2A51] rounded-md px-3 py-1`}>
                                    <div className={`flex gap-2 items-center text-[#B5A6B7] capitalize`}>
                                        <BiSolidUserRectangle className="w-5 h-5 text-white"/>
                                        <p className='text-[min(1vw)]'>{item?.user?.username}</p>
                                    </div>
                                </li>
                                ))}
                                <li className={`relative block cursor-pointer rounded-md px-4 py-1`}>
                                    <Link href={""} className={`flex gap-3 items-center text-[#B5A6B7] capitalize `}>
                                        <p className='rounded-md'>+</p>
                                        <p className='text-[min(1vw)]'>Add Coworkers</p>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                </section>
            </div>
            
        </div>
    )
}

export default SideNavbar