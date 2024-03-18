import { navLinks } from "@/constants";
import Container from "./Container";
import Logo from "./Logo";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#180735] mt-10 py-10 text-zinc-300">
      <Container className="flex items-center justify-between">
        <Logo className="text-white" spanClassName="bg-white text-black" />
        <ul className="flex gap-6 items-center justify-center">
          {navLinks.map((link) => (
            <Link
              href={link?.href}
              key={link?._id}
              className="hover:text-white cursor-pointer duration-200"
            >
              <li>{link?.title}</li>
            </Link>
          ))}
        </ul>
        <p className="text-right">Join me with @reactbd.com</p>
      </Container>
    </footer>
  );
};

export default Footer;
