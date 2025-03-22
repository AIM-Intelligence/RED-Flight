import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex h-screen items-center justify-center bg-black">
      <Image
        src="/background/blue3.png"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        width={1920}
        height={1080}
        alt="zaion city"
      />
      <div className="z-10 max-w-md rounded-lg border border-red-500/30 bg-black/50 p-8 text-center backdrop-blur-sm">
        <h1 className="mb-4 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-9xl font-bold text-transparent">
          404
        </h1>
        <h2 className="mb-6 text-2xl text-white">Page Not Found</h2>
        <p className="mb-8 text-gray-100">
          The page you are looking for doesn&apos;t exist or has been moved to
          another dimension.
        </p>
        <Link
          href="/"
          className="inline-block rounded-md bg-gradient-to-r from-red-600 to-red-800 px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-red-700 hover:to-red-900"
        >
          Return to Home
        </Link>
      </div>
    </main>
  );
}
