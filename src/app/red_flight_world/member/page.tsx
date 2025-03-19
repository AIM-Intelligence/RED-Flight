'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import ArrowAnimation from '@/components/lottie/Arrow';
import { Button } from '@/components/ui/Button';

const Page = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      // 스크롤 속도 증가
      const scrollSpeed = 2.5;
      container.scrollLeft += event.deltaY * scrollSpeed;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className="h-screen w-full overflow-hidden">
      <motion.div
        ref={containerRef}
        className="scrollbar-hide relative h-full w-full overflow-y-hidden overflow-x-scroll"
        style={{
          whiteSpace: 'nowrap',
          scrollBehavior: 'auto', // 'smooth'에서 'auto'로 변경
        }}
      >
        <img
          src="/red-flight-story/redflightwebsitept3.png"
          alt="redflight website pt3"
          width={22297}
          height={1114}
          className="inline-block h-screen w-auto min-w-max"
        />

        <Button
          className="fixed bottom-6 right-6 gap-2 bg-transparent px-4 py-2 hover:bg-none"
          onClick={() => router.push('/')}
        >
          go main page
          <ArrowAnimation />
        </Button>
      </motion.div>
    </div>
  );
};

export default Page;
