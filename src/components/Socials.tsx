import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  RiDiscordLine,
  RiInstagramLine,
  RiTwitterXLine,
  RiYoutubeLine,
} from 'react-icons/ri';

const Socials = () => {
  const [fullTimeRemaining, setFullTimeRemaining] = useState<string>('');

  useEffect(() => {
    const calculateTimeRemaining = () => {
      // Create target date: April 1st at 9 PM Korean time (UTC+9)
      const currentYear = new Date().getFullYear();

      // Create date in Korean time (UTC+9)
      // Month is 0-based, so April is 3
      const targetDate = new Date(
        Date.UTC(
          currentYear +
            (new Date() > new Date(Date.UTC(currentYear, 3, 1, 12, 0, 0))
              ? 1
              : 0), // Next year if date has passed
          3, // April (0-indexed)
          1, // 1st day
          12, // 12 UTC = 9 PM in Korea (UTC+9)
          0,
          0
        )
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
          className="rounded-full bg-black p-2 transition-all duration-300 hover:text-red-600"
        >
          <RiYoutubeLine className="h-8 w-8" />
        </Link>
        <Link
          href="https://x.com/AIM408191939218"
          className="rounded-full bg-black p-2 transition-all duration-300 hover:text-red-600"
        >
          <RiTwitterXLine className="h-8 w-8" />
        </Link>
        <Link
          href="https://discord.gg/MvJcFmtEMj"
          target="_blank"
          className="rounded-full bg-black p-2 transition-all duration-300 hover:text-red-600"
        >
          <RiDiscordLine className="h-8 w-8" />
        </Link>
        <Link
          href="https://www.instagram.com/aim_intelligence/"
          target="_blank"
          className="rounded-full bg-black p-2 transition-all duration-300 hover:text-red-600"
        >
          <RiInstagramLine className="h-8 w-8" />
        </Link>
        <div className="min-w-[200px] rounded bg-black px-2 py-1 text-center text-xl font-bold text-red-600">
          {fullTimeRemaining ? `${fullTimeRemaining}` : 'Loading...'}
        </div>
      </div>
    </div>
  );
};

export default Socials;
