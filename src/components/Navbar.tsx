"use client";
import Link from "next/link";
import Logo from "./Logo";
import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";
import Image from "next/image";
import heart from "../../public/icons/heart.svg";
import shoppingBag from "../../public/icons/shoppingBag.svg";
import { signIn, useSession } from "next-auth/react";
const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  console.log(session);

  return (
    <nav className="w-full h-20 border-b-[1px] border-b-zinc-500 bg-white text-zinc-600 sticky top-0 z-50 bg-white/80 backdrop-blur-2xl">
      <div className="max-w-screen-xl h-full flex items-center mx-auto justify-between px-4 xl:px-0">
        {/* Logo */}
        <Logo />
        {/* Navigation */}
        <ul className="hidden md:flex items-center gap-5 text-sm uppercase font-semibold">
          {navLinks?.map((link) => (
            <Link key={link._id} href={link?.href}>
              <li
                className={`hover:text-black cursor-pointer  duration-200 relative overflow-hidden group ${
                  link.href === pathname && "text-designColor"
                }`}
              >
                {link?.title}
                <span
                  className={`absolute bg-blue-700 h-[1px] w-full left-0 bottom-0 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-500 ${
                    link.href === pathname && "bg-designColor"
                  }`}
                ></span>
              </li>
            </Link>
          ))}
        </ul>
        {/* icons */}
        <div className="flex items-center gap-x-5">
          <Link
            href={"/wishlist"}
            className="hover:text-black cursor-pointer duration-200 relative group"
          >
            <Image src={heart} width={28} height={28} alt="Heart Icon" />
            <span className="absolute top-0 -left-1 bg-zinc-800 text-zinc-200 w-4 h-4 rounded-full text-xs flex items-center justify-center group-hover:bg-black font-semibold group-hover:text-white">
              0
            </span>
          </Link>
          <Link
            href={"/cart"}
            className="hover:text-black cursor-pointer duration-200 relative group"
          >
            <Image src={shoppingBag} width={28} height={28} alt="Heart Icon" />
            <span className="absolute top-0 -left-1 bg-zinc-800 text-zinc-200 w-4 h-4 rounded-full text-xs flex items-center justify-center group-hover:bg-black font-semibold group-hover:text-white">
              0
            </span>
          </Link>
          {session ? (
            <Link
              href={"/profile"}
              className="hover:text-black cursor-pointer duration-200 relative overflow-hidden group text-sm uppercase font-semibold"
            >
              Profile
              <span className="absolute h-[1px] w-full bg-blue-700 left-0 bottom-0 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-500" />
            </Link>
          ) : (
            <button
              onClick={() => signIn()}
              className="hover:text-black cursor-pointer duration-200 relative overflow-hidden group text-sm uppercase font-semibold"
            >
              Login
              <span className="absolute h-[1px] w-full bg-blue-700 left-0 bottom-0 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-500" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
