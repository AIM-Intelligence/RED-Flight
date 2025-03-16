'use client';

import Nav from '@/components/Nav';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="page text-white">
      <Nav />
      {children}
    </main>
  );
};

export default layout;
