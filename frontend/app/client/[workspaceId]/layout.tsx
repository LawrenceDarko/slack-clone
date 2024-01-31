import Modal from "@/app/components/Modal"
import SideNavbar from "@/app/components/navbars/SideNavbar"
import TopNavbar from "@/app/components/navbars/TopNavbar"

export default function ClientLayout({children}: { children: React.ReactNode}) {
    return (
        <section>
            <Modal />
            <TopNavbar />
            <div className="">
                <SideNavbar />
                <div className="w-full md:pl-[20vw]">{children}</div>
            </div>
        </section>
    )
}