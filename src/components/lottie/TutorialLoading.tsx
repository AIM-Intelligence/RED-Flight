'use client';

import { DotLottiePlayer } from '@dotlottie/react-player';

import '@dotlottie/react-player/dist/index.css';

const TutorialAnimation = () => {
  return (
    <DotLottiePlayer
      src="/lottie/tutorial_loading.lottie"
      autoplay
      loop
    ></DotLottiePlayer>
  );
};

export default TutorialAnimation;
