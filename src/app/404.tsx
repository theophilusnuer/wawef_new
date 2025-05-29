import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDF8EE] text-black">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-6">Page Not Found</p>
        <Link
          href="/"
          className="inline-flex items-center bg-yellow-400 text-black py-2 px-6 rounded-sm hover:bg-yellow-500 hover:scale-105 hover:shadow-md transition-all duration-200 text-sm md:text-base"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}