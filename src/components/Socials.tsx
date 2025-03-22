import Link from 'next/link';
import { RiInstagramLine, RiTwitterXLine, RiYoutubeLine } from 'react-icons/ri';

const Socials = () => {
  return (
    <div className="flex items-center gap-x-5">
      <Link
        href="https://www.youtube.com/@aim-intelligence"
        className="transition-all duration-300"
      >
        <RiYoutubeLine className="h-8 w-8" />
      </Link>
      <Link
        href="https://x.com/AIM408191939218"
        className="transition-all duration-300"
      >
        <RiTwitterXLine className="h-8 w-8" />
      </Link>
      {/* <Link
        href="https://discord.gg/HyuhgvGBu9"
        target="_blank"
        className="transition-all duration-300"
      >
        <RiDiscordLine className="h-8 w-8" />
      </Link> */}
      <Link
        href="https://www.instagram.com/aim_intelligence/"
        target="_blank"
        className="transition-all duration-300"
      >
        <RiInstagramLine className="h-8 w-8" />
      </Link>
    </div>
  );
};

export default Socials;
