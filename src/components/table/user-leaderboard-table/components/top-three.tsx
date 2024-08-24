import React from "react";

type User = {
  id: string;
  image_url: string;
  name: string;
  wallet_address: string;
  score: number;
  easy: number;
  normal: number;
  hard: number;
  extreme: number;
  rank: number;
};

interface UserProps {
  user: User;
}

export const FirstPlace: React.FC<UserProps> = ({ user }) => {
  let profile_img;
  if (user.image_url) {
    profile_img = user.image_url;
  } else {
    profile_img = "/logo1.png";
  }
  let name;
  if (user.name) {
    name = user.name;
  } else {
    name = "NoName";
  }
  const wallet_address = user.wallet_address.slice(0, 12);
  return (
    <div
      key={user.id}
      className={`flex w-[30%] flex-col items-center rounded-md border-2 border-red-500 bg-black/50 p-4 text-white`}
    >
      <p className="mb-4 text-lg font-bold text-white">🏆 1st Place</p>

      <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-red-500 bg-black p-1">
        <img className="w-full" src={profile_img} alt="default_img" />
      </div>

      <h2 className="text-xl">{name}</h2>
      <p className="text-sm">{wallet_address}...</p>
      <p className="mt-2 text-xl font-semibold text-[rgb(255,215,0)]">
        Score: {user.score}
      </p>
    </div>
  );
};

export const SecondPlace: React.FC<UserProps> = ({ user }) => {
  let profile_img;
  if (user.image_url) {
    profile_img = user.image_url;
  } else {
    profile_img = "/logo1.png";
  }
  let name;
  if (user.name) {
    name = user.name;
  } else {
    name = "NoName";
  }
  const wallet_address = user.wallet_address.slice(0, 12);
  return (
    <div
      key={user.id}
      className={`flex w-[30%] flex-col items-center rounded-md border-2 border-transparent p-4 text-white`}
    >
      <p className="mb-4 text-lg font-bold text-white">🥈 2nd Place</p>

      <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-red-500 bg-black p-1">
        <img className="w-full" src={profile_img} alt="default_img" />
      </div>

      <h2 className="text-xl">{name}</h2>
      <p className="text-sm">{wallet_address}...</p>
      <p className="mt-2 text-xl font-semibold text-white">
        Score: {user.score}
      </p>
    </div>
  );
};

export const ThirdPlace: React.FC<UserProps> = ({ user }) => {
  let profile_img;
  if (user.image_url) {
    profile_img = user.image_url;
  } else {
    profile_img = "/logo1.png";
  }
  let name;
  if (user.name) {
    name = user.name;
  } else {
    name = "NoName";
  }
  const wallet_address = user.wallet_address.slice(0, 12);
  return (
    <div
      key={user.id}
      className={`flex w-[30%] flex-col items-center rounded-md border-2 border-transparent p-4 text-white`}
    >
      <p className="mb-4 text-lg font-bold text-white">🥉 3rd Place</p>

      <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-red-500 bg-black p-1">
        <img className="w-full" src={profile_img} alt="default_img" />
      </div>

      <h2 className="text-xl">{name}</h2>
      <p className="text-sm">{wallet_address}...</p>
      <p className="mt-2 text-xl font-semibold text-white">
        Score: {user.score}
      </p>
    </div>
  );
};
