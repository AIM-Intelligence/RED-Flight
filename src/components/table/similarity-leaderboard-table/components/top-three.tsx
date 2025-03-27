import React from 'react';
import Image from 'next/image';

import { ImageRankWithUser } from '@/server/rank/select-imageRank';

interface TopThreeProps {
  image: ImageRankWithUser;
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

export const TopThreePlace = ({ image, place }: TopThreeProps) => {
  if (!image) {
    return null;
  }

  const userName = image.user?.name || 'Unknown';
  const explanation = JSON.parse(image.response).explanation;
  const similarity = image.pixel_similarity
    ? `${image.pixel_similarity.toFixed(4)}%`
    : 'N/A';

  const isFirstPlace = place === 1;

  return (
    <div
      key={image.id}
      className={`flex w-[30%] flex-col items-center rounded-md border-2 p-4 text-white ${
        isFirstPlace ? 'border-red-500 bg-black/50' : 'border-transparent'
      }`}
    >
      <p className="mb-4 text-2xl font-bold text-white">
        {placeEmoji[place]} {placeText[place]} Place - $
        {place === 1 ? '300' : place === 2 ? '200' : '100'}
      </p>

      {/* User Profile */}
      <div className="mb-2 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-red-500 bg-black">
        {image.user?.image_url ? (
          <Image
            width={64}
            height={64}
            src={image.user.image_url}
            alt="profile image"
            className="h-full w-full object-cover"
          />
        ) : (
          <Image
            width={64}
            height={64}
            src="/asset/1.png"
            alt="default profile"
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <h2 className="text-xl">{userName}</h2>
      <p className="text-sm">{explanation?.substring(0, 20)}...</p>

      <p
        className={`mt-2 text-xl font-semibold ${isFirstPlace ? 'text-[rgb(255,215,0)]' : 'text-white'}`}
      >
        Similarity: {similarity}
      </p>
    </div>
  );
};
