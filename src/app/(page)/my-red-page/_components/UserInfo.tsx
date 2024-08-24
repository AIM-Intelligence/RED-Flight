import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { useModal } from "@/store/use-modal-store";
import { Database } from "@/validation/types/supabase";

type User = Database["public"]["Tables"]["user"]["Row"];

interface UserInfoProps {
  user: User | null;
  isLoading: boolean;
}

const UserInfo: React.FC<UserInfoProps> = ({ user, isLoading }) => {
  const { onOpen } = useModal();

  const getTierName = (score: number) => {
    if (score > 0 && score <= 3000) {
      return "bronze";
    } else if (score > 3000 && score <= 10000) {
      return "silver";
    } else if (score > 10000) {
      return "gold";
    }
    return "bronze";
  };

  return (
    <div className="border-red-600 p-8">
      {isLoading ? (
        <div className="animate-pulse">
          <div className="mb-4 h-32 w-32 rounded-full bg-gray-700"></div>
          <div className="mb-2 h-4 w-3/4 rounded bg-gray-700"></div>
          <div className="h-4 w-1/2 rounded bg-gray-700"></div>
        </div>
      ) : user ? (
        <>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col">
              <div className="flex w-full justify-between">
                <h2 className="mb-6 text-3xl font-extrabold text-red-600">
                  User Profile
                </h2>

                <Button
                  onClick={() =>
                    onOpen("showUserInfoEdit", { user_info: user })
                  }
                >
                  Edit
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  alt="profile"
                  src="/asset/1.png"
                  height={150}
                  width={150}
                  className="max-h-[140px] max-w-[140px] rounded-full border-2 border-red-500"
                />
                <div>
                  <p className="text-xl font-semibold text-white">
                    {user.name ? user.name : "no name"}
                  </p>
                  <p>{user.email ? user.email : "no email"}</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-bold text-lg text-white">
                  TOP5 Achievements NFT
                </p>
              </div>
            </div>
            <div className="space-y-4 rounded-lg border border-red-500 bg-gray-800/50 p-6">
              <div>
                <p className="text-sm font-medium text-gray-400">
                  Wallet Address
                </p>
                <p className="mt-1 text-lg font-semibold text-white">
                  {user.wallet_address}
                </p>

                <p className="text-sm font-medium text-gray-400">Description</p>
                <p className="mt-1 text-lg font-semibold text-white">
                  {user.description ? user.description : "empty"}
                </p>
              </div>
              <div className="my-6 h-[2px] w-full bg-gradient-to-r from-transparent via-red-500 to-transparent" />

              <div className="relative">
                <div className="grid grid-cols-3 gap-10">
                  <div className="col-span-2">
                    <div className="grid w-full grid-cols-2 gap-4">
                      <div className="rounded-lg border border-red-500 bg-black p-3">
                        <span className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-400">
                            Easy
                          </p>
                          <p>+10</p>
                        </span>
                        <p className="mt-1 text-lg font-semibold text-white">
                          {user.easy}
                        </p>
                      </div>
                      <div className="rounded-lg border border-red-500 bg-black p-3">
                        <span className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-400">
                            Normal
                          </p>
                          <p>+50</p>
                        </span>
                        <p className="mt-1 text-lg font-semibold text-white">
                          {user.normal}
                        </p>
                      </div>
                      <div className="rounded-lg border border-red-500 bg-black p-3">
                        <span className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-400">
                            Hard
                          </p>
                          <p>+200</p>
                        </span>
                        <p className="mt-1 text-lg font-semibold text-white">
                          {user.hard}
                        </p>
                      </div>
                      <div className="rounded-lg border border-red-500 bg-black p-3">
                        <span className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-400">
                            Extreme
                          </p>
                          <p>+600</p>
                        </span>
                        <p className="mt-1 text-lg font-semibold text-white">
                          {user.extreme}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-1">
                    <div>
                      <p className="text-sm font-medium text-gray-400">
                        Total Score
                      </p>
                      <p className="mt-1 text-lg font-semibold text-white">
                        {user.score}
                      </p>
                    </div>

                    {user.score > 0 ? (
                      <Image
                        src={`/rank/${getTierName(user.score)}.png`}
                        width={150}
                        height={150}
                        alt="rank"
                      />
                    ) : (
                      "start game first!"
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-3xl">
          We can&apos;t verify your user information, Login first.
        </p>
      )}
    </div>
  );
};

export default UserInfo;
