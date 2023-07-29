import { BiSolidUserRectangle } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";
import RoomNav from "@/app/components/navbars/RoomNav";
import TextEditor from "@/app/components/TextEditor";
import ScrollToView from "@/app/components/ScrollToView";
import axios from 'axios';


const page = () => {
    

    return (
        <div className='relative w-full h-full'>
            <RoomNav />

            <section className="flex flex-col justify-between w-full h-full border-2 ">
                <section className="flex flex-col w-full h-full gap-3 pt-72">
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
                <section className="absolute flex flex-col rounded-md active:border-black bottom-2 left-3 right-3 h-36  min-h-[144px]">
                    <TextEditor />
                </section>
            </section>
        </div>
    )
}

export default page