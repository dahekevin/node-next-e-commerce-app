import Link from "next/link";
import Image from "next/image";

export const Navbar = () => {
    return <nav className="sticky top-0 z-50 bg-gray-800 shadow text-white">
            <div className="container mx-auto flex items-center justify-between px-4 py-4">
                <Link href="/" className="hover:text-blue-600">
                    <Image alt="logo" className="p-[50]" src="/vercel.svg" width={50} height={50} />
                </Link>
                <div className="flex gap-10">
                    <Link href="/">Home</Link>
                    <Link href="/login" className="hover:text-blue-600">Login</Link>
                    <Link href="/cadastro" className="hover:text-blue-600">Cadastro</Link>
                </div>
                <div className="flex items-center space-x-4">
                    Cart
                </div>
            </div>
        </nav>
}