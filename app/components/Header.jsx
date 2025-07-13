"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export default function Header() {
    const [show, setShow] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    const closeMobileMenu = () => {
        setMobileMenuOpen(false)
    }

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${show ? "bg-orange-500 shadow-lg" : "-translate-y-full"}`}>
            <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <div className="text-white font-bold text-xl flex items-center">
                        <img
                            src="/assets/image/logo2.png"
                            alt="Logo"
                            className="w-40 sm:w-50 h-15 object-cover"
                        />

                    </div>
                </div>

                {/* Desktop Menu */}
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
                                className={`text-md font-medium tracking-wide transition-all duration-200 hover:text-orange-200 ${isActive
                                    ? "text-white border-b-2 border-white pb-1"
                                    : "text-white/90"
                                    }`}
                            >
                                {label}
                            </a>
                        );
                    })}
                </nav>

                {/* Tombol Menu Mobile Phone */}
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={toggleMobileMenu}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {mobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`md:hidden bg-orange-500 transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <nav className="px-6 py-4 space-y-3">
                    {menuItems.map(({ label, path }) => {
                        const isActive =
                            path === "/"
                                ? pathname === "/"
                                : pathname.startsWith(path);

                        return (
                            <a
                                key={label}
                                href={path}
                                onClick={closeMobileMenu}
                                className={`block text-sm font-medium tracking-wide transition-all duration-200 hover:text-orange-200 py-2 border-b border-orange-400/30 ${isActive
                                    ? "text-white border-b-2 border-white pb-1"
                                    : "text-white/90"
                                    }`}
                            >
                                {label}
                            </a>
                        );
                    })}
                </nav>
            </div>
        </header>
    )
}