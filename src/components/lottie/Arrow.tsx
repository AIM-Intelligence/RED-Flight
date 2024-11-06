'use client';

import { DotLottiePlayer } from '@dotlottie/react-player';

import '@dotlottie/react-player/dist/index.css';

const ArrowAnimation = () => {
  return (
    <DotLottiePlayer src="/lottie/arrow.lottie" autoplay loop></DotLottiePlayer>
  );
};

export default ArrowAnimation;
