'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import ArrowAnimation from '@/components/lottie/Arrow';
import { Button } from '@/components/ui/Button';

const Page = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollDirection, setScrollDirection] = useState<
    'horizontal' | 'vertical'
  >('horizontal');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (
        scrollDirection === 'horizontal' &&
        container.scrollLeft + container.clientWidth >=
          container.scrollWidth - 10
      ) {
        setScrollDirection('vertical');
      } else if (scrollDirection === 'vertical' && container.scrollTop === 0) {
        setScrollDirection('horizontal');
      }
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      if (scrollDirection === 'horizontal') {
        container.scrollLeft += event.deltaY;
        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth - 10
        ) {
          setScrollDirection('vertical');
        }
      } else {
        if (container.scrollTop === 0 && event.deltaY < 0) {
          setScrollDirection('horizontal');
        } else {
          container.scrollTop += event.deltaY;
        }
      }
    };

    container.addEventListener('scroll', handleScroll);
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('wheel', handleWheel);
    };
  }, [scrollDirection]);

  return (
    <div
      ref={containerRef}
      className={`relative h-screen w-full ${
        scrollDirection === 'horizontal'
          ? 'overflow-x-auto overflow-y-hidden'
          : 'overflow-y-auto overflow-x-hidden'
      } scrollbar-hide`}
      style={{ scrollBehavior: 'auto' }}
    >
      <Button
        className="fixed right-6 top-6 gap-2 bg-transparent px-4 py-2 text-red-600 hover:bg-none"
        onClick={() => router.push('/')}
      >
        go main page
        <ArrowAnimation />
      </Button>
      <div className="inline-block whitespace-nowrap">
        <img
          src="/red-flight-story/redflightwebsitept1.png"
          alt="redflight website pt1"
          width={13310}
          height={1098}
          className="inline-block h-screen w-auto min-w-max"
        />
        <div className="relative inline-block whitespace-nowrap align-top">
          <img
            src="/red-flight-story/redflightwebsitept2.png"
            alt="redflight website pt2"
            width={1799}
            height={5798}
            className="h-auto w-screen"
          />
          <Button
            className="absolute bottom-6 right-6 gap-2 bg-transparent px-4 py-2 hover:bg-none"
            onClick={() => router.push('/red_flight_world/member')}
          >
            go next page
            <ArrowAnimation />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
