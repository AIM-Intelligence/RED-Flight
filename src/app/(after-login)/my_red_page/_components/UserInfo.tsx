import Image from 'next/image';

import { Button } from '@/components/ui/Button';
import { useModal } from '@/store/use-modal-store';
import { Database } from '@/validation/types/supabase';

type User = Database['public']['Tables']['user']['Row'];

const UserInfo = ({ user }: { user: User }) => {
  const { onOpen } = useModal();

  // Remove the unnecessary useQuery call and just use the prop directly

  const getTierName = (score: number) => {
    if (score > 0 && score <= 3000) {
      return 'bronze';
    } else if (score > 3000 && score <= 10000) {
      return 'silver';
    } else if (score > 10000) {
      return 'gold';
    }
    return 'bronze';
  };

  return (
    <div className="border-red-600 p-8">
      <>
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col">
            <div className="flex w-full justify-between">
              <h2 className="mb-6 text-3xl font-extrabold text-red-600">
                User Profile
              </h2>

              <Button
                className="transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/70"
                onClick={() => onOpen('showUserInfoEdit', { user_info: user })}
              >
                Edit
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Image
                alt="profile"
                src={user.image_url ? user.image_url : '/asset/1.png'}
                height={150}
                width={150}
                className="max-h-[140px] max-w-[140px] rounded-full border-2 border-red-500"
              />
              <div>
                <p className="text-xl font-semibold text-white">
                  {user.name ? user.name : 'Unknown'}
                </p>
                <p>{user.email ? user.email : 'no email'}</p>
                <p>
                  {user.wallet_address
                    ? user.wallet_address
                    : 'no wallet address'}
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4 rounded-lg border border-red-500 bg-gray-800/50 p-6">
            <div>
              <p className="text-sm font-medium text-gray-400">Description</p>
              <p className="mt-1 text-lg font-semibold text-white">
                {user.description ? user.description : '-'}
              </p>
            </div>
            <div className="my-6 h-[2px] w-full bg-gradient-to-r from-transparent via-red-500 to-transparent" />

            <div className="relative">
              <div className="grid grid-cols-3 gap-10">
                <div className="col-span-2">
                  <div>
                    <p className="text-sm font-medium text-gray-400">
                      Total Score
                    </p>
                    <p className="mt-1 text-4xl font-semibold text-white">
                      {user.score}
                    </p>
                  </div>
                </div>
                <div className="col-span-1">
                  <Image
                    src={`/rank/${getTierName(user.score)}.png`}
                    width={130}
                    height={100}
                    alt="rank"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default UserInfo;
