
'use client'
import React, {useState, useEffect} from 'react'
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
    // console.log(params.roomId)

    const { user } = useAuthContext()
    const [channelDropdownState, setChannelDropdownState] = useState(true)
    const [directMessagesState, setDirectMessagesState] = useState(true)
    const [worksapceUsers, setWorksapceUsers] = useState([])
    const pathname = usePathname();

    // console.log(user.accessToken)

    const handleDropdowToggle = () => { 
        setChannelDropdownState(!channelDropdownState)
    }

    const handleMessageDropdownToggle = () => { 
        setDirectMessagesState(!directMessagesState)
    }

    const getWorkspaceUsers = async() => {
        if(!workspaceId){
            return
        }
        
        try {
            const response = await axios.get(`http://localhost:8000/api/workspace/all-workspace-users/${workspaceId}`, {
                headers: {
                    "Authorization": `Bearer ${user?.accessToken}`
                }
            })
            const responseData = response?.data
            console.log(responseData)
            setWorksapceUsers(responseData.filter((directChatInfo: any) => directChatInfo.user._id !== user?.id))
        } catch (error) {
            console.log(error)
        }
    }

    const handleDirectChatClick = (userId: any) => {
        if(!userId) return
        console.log('user id',userId)
        router.push(`/client/${workspaceId}/${userId}`)
    }

    useEffect(() => {
        getWorkspaceUsers()
    }, [user])
    
    
    return (
        <div className='hidden top-[44px] left-0 bottom-0 border-t-[1px] border-[#522653] min-[212px]:block md:fixed w-[20vw] bg-[#3F0E40] h-[93.8vh] overflow-auto'>
            <div className='flex flex-col w-full h-full'>
                <section className='flex flex-col gap-4 px-5 pt-2'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2 '>
                            <h1 className='font-bold text-white'>Computing Physics</h1>
                            <IoIosArrowDown className='text-white'/>
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
                            <Link href={item.href} className={`flex gap-3 items-center text-[#B5A6B7] capitalize ${pathname === item.href ? "text-lightBlue-500 hover:text-lightBlue-600" : "text-blueGray-700 hover:text-blueGray-500"}`}>
                                <item.IconComponent className='text-[1vw]'/>
                                <p className='text-[min(1vw)]'>{item.text}</p>
                            </Link>
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
                                {slackChannels.map((item, index) => (
                                <li key={index} className={`relative block cursor-pointer ${pathname === item.href ? 'bg-[#1164A3]' : ''} hover:bg-[#4D2A51] rounded-md px-4 py-1`}>
                                    <Link href={item.href} className={`flex gap-3 items-center text-[#B5A6B7] capitalize ${pathname === item.href ? "text-white hover:text-lightBlue-600" : "text-blueGray-700 hover:text-blueGray-500"}`}>
                                        <p>#</p>
                                        <p className='text-[min(1vw)]'>{item.text}</p>
                                    </Link>
                                </li>
                                ))}
                                <li className={`relative block cursor-pointer rounded-md px-4 py-1`}>
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
                                {worksapceUsers?.map((item: any, index) => (
                                <li key={index} onClick={()=>handleDirectChatClick(item?.user?._id)} className={`relative block cursor-pointer hover:bg-[#4D2A51] rounded-md px-3 py-1`}>
                                    <Link href="" className={`flex gap-2 items-center text-[#B5A6B7] capitalize`}>
                                        <BiSolidUserRectangle className="w-5 h-5 text-white"/>
                                        <p className='text-[min(1vw)]'>{item?.user?.username}</p>
                                    </Link>
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