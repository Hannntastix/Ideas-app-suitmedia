"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export default function Header() {
    const [show, setShow] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY
            setShow(currentY < lastScrollY || currentY < 50)
            setLastScrollY(currentY)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [lastScrollY])

    const menuItems = [
        { label: "Work", path: "/work" },
        { label: "About", path: "/about" },
        { label: "Services", path: "/services" },
        { label: "Ideas", path: "/ideas" },
        { label: "Careers", path: "/career" },
        { label: "Contact", path: "/contact" },
    ]

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${show ? "bg-orange-500 shadow-lg" : "-translate-y-full"}`}>
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <div className="text-white font-bold text-xl tracking-wide flex items-center">
                        <span className="bg-white text-orange-500 px-2 py-1 rounded-sm mr-1 text-base font-black uppercase">suit</span>
                        <span className="text-white font-light text-base">media</span>
                    </div>
                </div>

                <nav className="hidden md:flex space-x-8">
                    {menuItems.map(({ label, path }) => {
                        const isActive =
                            path === "/"
                                ? pathname === "/"
                                : pathname.startsWith(path);

                        return (
                            <a
                                key={label}
                                href={path}
                                className={`text-sm font-medium tracking-wide transition-all duration-200 hover:text-orange-200 ${isActive
                                        ? "text-white border-b-2 border-white pb-1"
                                        : "text-white/90"
                                    }`}
                            >
                                {label}
                            </a>
                        );
                    })}
                </nav>

                <button className="md:hidden text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>
    )
}
