import { redirect } from 'next/navigation';

import HeaderPage from '@/components/HeaderPage';
import Nav from '@/components/Nav';
import { DrawerProvider } from '@/lib/providers/drawer-provider';
import { ModalProvider } from '@/lib/providers/modal-provider';
import { isLoggedIn } from '@/server/auth/auth';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isLoggedIn())) {
    redirect('/auth');
  }

  return (
    <main className="page relative bg-black text-white">
      <Nav />
      <HeaderPage />
      {children}
      <ModalProvider />
      <DrawerProvider />
    </main>
  );
}
