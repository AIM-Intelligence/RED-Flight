"use client";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

const LoadingAnimation = () => {
  return <DotLottiePlayer src="/lottie/loading.lottie" autoplay loop></DotLottiePlayer>;
};

export default LoadingAnimation;
