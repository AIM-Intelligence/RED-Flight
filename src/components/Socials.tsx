import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RiInstagramLine, RiTwitterXLine, RiYoutubeLine } from 'react-icons/ri';

const Socials = () => {
  const [fullTimeRemaining, setFullTimeRemaining] = useState<string>('');

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const targetDate = new Date(
        'March 30, ' +
          (new Date().getFullYear() +
            (new Date() > new Date(`March 30, ${new Date().getFullYear()}`)
              ? 1
              : 0))
      );
      const currentDate = new Date();
      const difference = targetDate.getTime() - currentDate.getTime();

      if (difference <= 0) {
        setFullTimeRemaining('Time has expired!');
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      const formattedHours = hours.toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');
      const formattedSeconds = seconds.toString().padStart(2, '0');

      setFullTimeRemaining(
        `${days} days, ${formattedHours}:${formattedMinutes}:${formattedSeconds}`
      );
    };

    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex translate-x-14 flex-col items-center gap-y-4">
      <div className="flex items-center gap-x-5 text-white">
        <Link
          href="https://www.youtube.com/@aim-intelligence"
          className="rounded-full bg-black p-2 transition-all duration-300"
        >
          <RiYoutubeLine className="h-8 w-8" />
        </Link>
        <Link
          href="https://x.com/AIM408191939218"
          className="rounded-full bg-black p-2 transition-all duration-300"
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
          className="rounded-full bg-black p-2 transition-all duration-300"
        >
          <RiInstagramLine className="h-8 w-8" />
        </Link>
        <div className="min-w-[200px] rounded bg-black px-2 py-1 text-center text-xl font-bold text-red-500">
          {fullTimeRemaining ? `${fullTimeRemaining}` : 'Loading...'}
        </div>
      </div>
    </div>
  );
};

export default Socials;
