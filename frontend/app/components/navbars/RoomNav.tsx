import { BiSolidUserRectangle } from "react-icons/bi";
import { VscNewFile } from "react-icons/vsc";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";

const RoomNav = ({user}:{user: string}) => {
    return (
        <div className='absolute top-[44px] z-10 w-full bg-white'>
            <section className='flex items-center justify-between w-full p-3 border-b'>
                <div className="flex items-center gap-1 cursor-pointer hover:bg-[#F6F6F6] rounded-md">
                    <BiSolidUserRectangle className='text-4xl text-[#007A5A]'/>
                    <h1 className="font-semibold">{user}</h1>
                    <IoIosArrowDown />
                </div>
                <div>
                    <VscNewFile />
                </div>
            </section>
            <section className="px-4 py-2 border-b bg-white text-[#949394] flex gap-3 text-sm">
                <AiOutlinePlus />
                <p>Add bookmark</p>
            </section>
        </div>
    )
}

export default RoomNav