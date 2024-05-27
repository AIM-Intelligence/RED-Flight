import { motion } from "framer-motion";

const transitionVariants = {
  initial: {
    x: "100%",
    width: "100%",
  },
  animate: {
    x: "0%",
    width: "0%",
  },
  exit: {
    x: ["0%", "100%"],
    width: ["0%", "100%"],
  },
};

const Transition = () => {
  return (
    <>
      <motion.div
        variants={transitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-50 bg-[#FF0000]"
      ></motion.div>
      <motion.div
        variants={transitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: 0.4, duration: 0.6, ease: "easeInOut" }}
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-40 bg-[#FF6347]"
      ></motion.div>
      <motion.div
        variants={transitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: 0.6, duration: 0.6, ease: "easeInOut" }}
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-30 bg-[#FF4500]"
      ></motion.div>
    </>
  );
};

export default Transition;
