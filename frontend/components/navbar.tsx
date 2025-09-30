"use client"

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            setIsLoggedIn(true)
        } else { setIsLoggedIn(false) }
    }, [])

    const handleLogOut = () => {
        localStorage.clear()
        window.location.href = '/login'
    }

    return (
        <nav className="sticky top-0 z-50 bg-gray-800 shadow text-white">
            <div className="container mx-auto flex items-center justify-between px-4 my-4">
                <Link href="/">
                    <Image src="/vercel.svg" alt="logo" width={50} height={50} className="p-[50]" />
                </Link>
                <div className="flex gap-2 m-auto bg-gray-900 rounded-3xl">
                    <Link href="/" className="hover:bg-gray-800 px-5 py-2">HOME</Link>
                    <span className="py-2">|</span>
                    <Link href="/login" className="hover:bg-gray-800 px-5 py-2">LOGIN</Link>
                    <span className="py-2">|</span>
                    <Link href="/signup" className="hover:bg-gray-800 px-5 py-2">CADASTRO</Link>
                    <span className="py-2">|</span>
                    <Link href="/cart" className="hover:bg-gray-800 px-5 py-2">CARRINHO</Link>
                </div>
                <div className="flex items-center space-x-4">
                    {isLoggedIn &&
                        <button onClick={() => { handleLogOut() }}
                            className="bg-orange-700 px-5 py-2 rounded-2xl hover:cursor-pointer hover:bg-amber-900">
                            Sair
                        </button>
                    }
                </div>
            </div>
        </nav>
    )
}