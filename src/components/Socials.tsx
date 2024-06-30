import Link from "next/link";
import { RiYoutubeLine, RiInstagramLine, RiTwitterXLine, RiDiscordLine } from "react-icons/ri";
const Socials = () => {
  return (
    <div className="flex items-center gap-x-5 ">
      <Link href="#" className=" transition-all duration-300">
        <RiYoutubeLine className="w-8 h-8" />
      </Link>
      <Link href="https://x.com/redflightAI" className="text-accent1 transition-all duration-300">
        <RiTwitterXLine className="w-8 h-8" />
      </Link>
      <Link href="https://discord.gg/HyuhgvGBu9" target="_blank" className="text-accent1 transition-all duration-300">
        <RiDiscordLine className="w-8 h-8" />
      </Link>
      <Link href="#" className=" transition-all duration-300">
        <RiInstagramLine className="w-8 h-8" />
      </Link>
    </div>
  );
};

export default Socials;
