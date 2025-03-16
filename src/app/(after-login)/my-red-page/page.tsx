import { Suspense } from 'react';

import { getOrCreateWeb3User } from '@/server/auth/sign-in';
import ClientPage from './_components/ClientPage';

// Server component
export default async function Page() {
  let userData = null;
  try {
    userData = await getOrCreateWeb3User();
  } catch (error) {
    console.error('Error fetching user data:', error);
  }

  return (
    <Suspense fallback={<div>Loading user data...</div>}>
      <ClientPage initialUserData={userData} />
    </Suspense>
  );
}
