'use client'
import { usePathname } from "next/navigation";

const getCurrentPath = () => {
    const pathname = usePathname();
    return pathname;
}

export default getCurrentPath