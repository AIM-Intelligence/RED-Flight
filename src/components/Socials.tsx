import Link from "next/link";
import { RiYoutubeLine, RiInstagramLine, RiTwitterXLine, RiDiscordLine } from "react-icons/ri";
const Socials = () => {
  return (
    <div className="flex items-center gap-x-5 text-lg">
      <Link href="#" className="hover:text-accent1 transition-all duration-300">
        <RiYoutubeLine />
      </Link>
      <Link href="#" className="hover:text-accent1 transition-all duration-300">
        <RiTwitterXLine />
      </Link>
      <Link href="#" className="hover:text-accent1 transition-all duration-300">
        <RiDiscordLine />
      </Link>
      <Link href="#" className="hover:text-accent1 transition-all duration-300">
        <RiInstagramLine />
      </Link>
    </div>
  );
};

export default Socials;
