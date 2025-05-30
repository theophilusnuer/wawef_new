import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDF8EE] text-black">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-6">Page Not Found</p>
        <Link
          href="/"
          className="inline-flex items-center bg-[#F2C94C] text-black py-2 px-6 rounded-sm cursor-pointer text-sm md:text-base"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}