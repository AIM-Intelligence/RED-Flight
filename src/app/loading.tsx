'use client';

import { motion } from 'framer-motion';

const Loading = () => {
  const staticText = 'loading';
  const animatedText = '...';

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
    </div>
  );
};

export default Loading;
