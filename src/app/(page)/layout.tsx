"use client";
import HeaderPage from "@/components/HeaderPage";
import Nav from "@/components/Nav";
import { motion } from "framer-motion";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="page bg-black text-white font-sora relative">
      <motion.div
        key="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="h-full"
      >
        <Nav />
        <HeaderPage />
        <motion.div className="h-full">{children}</motion.div>
      </motion.div>
    </main>
  );
};

export default layout;
