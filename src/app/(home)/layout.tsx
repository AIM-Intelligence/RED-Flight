"use client";
import Header from "@/components/Header";
import Nav from "@/components/Nav";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <main className="page bg-site text-white bg-cover bg-no-repeat font-sora relative">
      <Nav />
      <Header />
      <AnimatePresence mode="wait">
        <motion.div key={pathname} className="h-full">
          {/* <Transition /> */}

          {children}
        </motion.div>
      </AnimatePresence>
    </main>
  );
};

export default layout;
