import React from 'react'
import { IoTimeOutline } from "react-icons/io5";
import { GoQuestion } from "react-icons/go";
import { BiSolidUserRectangle } from "react-icons/bi";

const TopNavbar = () => {
    return (
        <div className='h-[44px] z-40 bg-[#350D36] w-full overflow-hidden fixed'>
            <div className='relative flex items-center justify-center w-full h-full'>
                <section className='flex items-center justify-center w-1/2 gap-3'>
                    <IoTimeOutline className='text-2xl text-white'/>
                    <div className='bg-[#5D3D5E] p-2 w-full h-[26px] flex items-center rounded-md cursor-pointer hover:bg-[#644565] text-[#F8F6F8] text-sm font-thin'>Search Computing</div>
                </section>
                <div className='absolute flex w-16 h-[60%] gap-4 right-3 items-center'>
                    <GoQuestion className='text-xl text-white'/>
                    <div className="relative h-full">
                        <div className='h-full rounded-sm w-7'><BiSolidUserRectangle className="w-full h-full text-white"/></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopNavbar