'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import { logout } from '@/server/auth/auth';

interface ErrorProps {
  message?: string;
}

const Error = ({ message }: ErrorProps) => {
  const router = useRouter();
  const staticText = 'error';
  const animatedText = '!!!';

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
      },
    },
  };

  const goToHome = useCallback(async () => {
    await logout();
    router.push('/');
  }, [router]);

  return (
    <div className="page flex h-screen flex-col items-center justify-center bg-black">
      <div className="text-5xl font-bold text-red-600">
        <span>{staticText}</span>
        <motion.span variants={container} initial="hidden" animate="show">
          {animatedText.split('').map((char, index) => (
            <motion.span key={index} variants={item}>
              {char}
            </motion.span>
          ))}
        </motion.span>
      </div>
      {message && (
        <motion.p
          className="mt-4 text-xl text-red-400"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {message}
        </motion.p>
      )}

      <motion.div
        className="mt-8 flex gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <button
          onClick={goToHome}
          className="rounded-md bg-red-500 px-4 py-2 font-medium text-white transition-colors hover:bg-red-600"
        >
          Go to Home
        </button>
      </motion.div>
    </div>
  );
};

export default Error;
