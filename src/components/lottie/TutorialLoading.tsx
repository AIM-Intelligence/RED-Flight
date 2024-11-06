'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import '@lottiefiles/dotlottie-react/dist/index.css';

const TutorialAnimation = () => {
  return (
    <DotLottieReact
      src="/lottie/tutorial_loading.lottie"
      autoplay
      loop
    ></DotLottieReact>
  );
};

export default TutorialAnimation;
