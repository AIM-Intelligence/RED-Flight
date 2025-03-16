'use client';

import { motion } from 'framer-motion';

const loading = () => {
  const text = 'loading...';

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

  return (
    <div className="page flex h-screen items-center justify-center bg-black">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="text-5xl font-bold text-red-500"
      >
        {text.split('').map((char, index) => (
          <motion.span key={index} variants={item}>
            {char}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default loading;
