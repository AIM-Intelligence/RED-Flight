'use client';

import { motion } from 'framer-motion';

import HeaderPage from '@/components/HeaderPage';
import Nav from '@/components/Nav';
import { DrawerProvider } from '@/lib/providers/drawer-provider';
import { ModalProvider } from '@/lib/providers/modal-provider';

const layout = ({ children }: { children: React.ReactNode }) => {
  // TODO: chianID filter
  return (
    <main className="page relative bg-black font-sora text-white">
      <motion.div
        key="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <Nav />

        <HeaderPage />
        {children}
        <ModalProvider />
        <DrawerProvider />
      </motion.div>
    </main>
  );
};

export default layout;
