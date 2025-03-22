import React from 'react';
import Image from 'next/image';
import { MediaRenderer } from 'thirdweb/react';

import { client } from '@/lib/supabase/client';
import { Database } from '@/validation/types/supabase';

type User = Database['public']['Tables']['user']['Row'];

interface TopThreeProps {
  user: User;
  place: 1 | 2 | 3;
}

const placeEmoji = {
  1: '🏆',
  2: '🥈',
  3: '🥉',
};

const placeText = {
  1: '1st',
  2: '2nd',
  3: '3rd',
};

export const TopThreePlace = ({ user, place }: TopThreeProps) => {
  if (!user) {
    return null; // Don't render anything if no user
  }

  const name = user.name || 'Anonymity';
  const wallet_address = user.wallet_address.slice(0, 12);

  const isFirstPlace = place === 1;

  return (
    <div
      key={user.id}
      className={`flex w-[30%] flex-col items-center rounded-md border-2 p-4 text-white ${
        isFirstPlace ? 'border-red-500 bg-black/50' : 'border-transparent'
      }`}
    >
      <p className="mb-4 text-lg font-bold text-white">
        {placeEmoji[place]} {placeText[place]} Place
      </p>

      <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-red-500 bg-black">
        {user.image_url ? (
          <MediaRenderer
            client={client}
            src={user.image_url}
            className="rounded-full"
          />
        ) : (
          <Image
            width={130}
            height={130}
            src="/asset/1.png"
            alt="default profile"
          />
        )}
      </div>

      <h2 className="text-xl">{name}</h2>
      <p className="text-sm">{wallet_address}...</p>
      <p
        className={`mt-2 text-xl font-semibold ${isFirstPlace ? 'text-[rgb(255,215,0)]' : 'text-white'}`}
      >
        Score: {user.score || 0}
      </p>
    </div>
  );
};
