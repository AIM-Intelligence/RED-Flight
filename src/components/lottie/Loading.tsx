'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import '@lottiefiles/dotlottie-react/dist/index.css';

const LoadingAnimation = () => {
  return (
    <DotLottieReact
      src="/lottie/loading.lottie"
      autoplay
      loop
    ></DotLottieReact>
  );
};

export default LoadingAnimation;
