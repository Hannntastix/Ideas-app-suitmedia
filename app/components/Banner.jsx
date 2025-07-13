"use client"

import { useEffect, useState } from 'react';

export default function Banner({ imageUrl }) {
    const [offsetY, setOffsetY] = useState(0);

    const handleScroll = () => {
        setOffsetY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative h-[400px] overflow-hidden">
            <div
                className="absolute inset-0 w-full h-full"
                style={{ transform: `translateY(${offsetY * 0.4}px)` }}
            >
                <img
                    src={imageUrl}
                    alt="Banner"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading='lazy'
                />
            </div>

            <div
                className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60"
                style={{ transform: `translateY(${offsetY * 0.2}px)` }}
            />

            <div
                className="absolute inset-0 flex flex-col justify-center items-center text-white z-10"
                style={{ transform: `translateY(${offsetY * 0.1}px)` }}
            >
                <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-wide">Ideas</h1>
                <p className="text-lg md:text-xl font-light tracking-wider">Where all our great things begin</p>
            </div>

            <div className="absolute bottom-0 w-full">
                <div
                    className="relative w-full h-[120px] bg-white"
                    style={{
                        clipPath: 'polygon(0 50%, 100% 0%, 100% 100%, 0% 100%)'
                    }}
                />

                <div
                    className="absolute bottom-0 w-full h-[80px] bg-white origin-bottom-left"
                    style={{
                        transform: 'skewY(-3deg)',
                        transformOrigin: 'bottom left'
                    }}
                />
            </div>

            <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rounded-full animate-pulse" />
            <div className="absolute top-20 right-20 w-16 h-16 border-2 border-white/20 rounded-full animate-pulse delay-300" />
            <div className="absolute bottom-40 left-20 w-12 h-12 border-2 border-white/20 rounded-full animate-pulse delay-700" />
        </div>
    );
}