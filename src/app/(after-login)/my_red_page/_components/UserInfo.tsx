import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';

import { Button } from '@/components/ui/Button';
import { useModal } from '@/store/use-modal-store';
import { Database } from '@/validation/types/supabase';

type User = Database['public']['Tables']['user']['Row'];

const UserInfo = ({ user }: { user: User }) => {
  const { onOpen } = useModal();
  const isMobile = useMediaQuery({ maxWidth: 768 });

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
    <div className="border-red-600 p-4 md:p-8">
      <div
        className={`${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 gap-8'} grid`}
      >
        <div className="flex flex-col">
          <div className="flex w-full items-center justify-between">
            <h2 className="mb-4 text-xl font-extrabold text-red-600 md:mb-6 md:text-3xl">
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
              className="max-h-[100px] max-w-[100px] rounded-full border-2 border-red-500 md:max-h-[140px] md:max-w-[140px]"
            />
            <div>
              <p className="text-lg font-semibold text-white md:text-xl">
                {user.name ? user.name : 'Unknown'}
              </p>
              <p className="text-sm md:text-base">
                {user.email ? user.email : 'no email'}
              </p>
              <p className="3xl:max-w-[400px] max-w-[160px] break-words text-xs sm:max-w-[200px] md:max-w-[240px] md:text-sm lg:max-w-[280px] xl:max-w-[360px] 2xl:max-w-[400px]">
                {user.wallet_address
                  ? user.wallet_address
                  : 'no wallet address'}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-4 rounded-lg border border-red-500 bg-gray-800/50 p-4 md:p-6">
          <div>
            <p className="text-sm font-medium text-gray-400">Description</p>
            <p className="mt-1 text-base font-semibold text-white md:text-lg">
              {user.description ? user.description : '-'}
            </p>
          </div>
          <div className="my-4 h-[2px] w-full bg-gradient-to-r from-transparent via-red-500 to-transparent md:my-6" />

          <div className="relative">
            <div className="grid grid-cols-3 gap-4 md:gap-10">
              <div className="col-span-2">
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    Total Score
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-white md:text-4xl">
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
                  className="w-[80px] md:w-[130px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
