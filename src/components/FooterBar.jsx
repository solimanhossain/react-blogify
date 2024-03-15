import LwsLogo from "../assets/logos/logo.svg";
import {
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaPinterest,
    FaYoutube,
} from "react-icons/fa";

export function FooterIconList({ children }) {
    return (
        <li className="text-center">
            <a
                href="#"
                className="text-white/50 hover:text-white transition-all duration-200"
            >
                {children}
            </a>
        </li>
    );
}

export default function FooterBar() {
    return (
        <footer className="my-6 md:my-8 bg-[#030317]">
            <div className="container mx-auto flex items-center justify-between">
                <a href="/">
                    <img className="w-28" src={LwsLogo} alt="lws" />
                </a>
                <ul className="flex items-center space-x-5">
                    <FooterIconList>
                        <FaFacebook size={24} />
                    </FooterIconList>
                    <FooterIconList>
                        <FaInstagram size={24} />
                    </FooterIconList>
                    <FooterIconList>
                        <FaTwitter size={24} />
                    </FooterIconList>
                    <FooterIconList>
                        <FaPinterest size={24} />
                    </FooterIconList>
                    <FooterIconList>
                        <FaYoutube size={24} />
                    </FooterIconList>
                </ul>
            </div>
        </footer>
    );
}
