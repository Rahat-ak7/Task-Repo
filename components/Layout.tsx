import Link from 'next/link';
import { useCart } from '../contex/CartContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { cartCount } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            FakeStore
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/" className="hover:text-blue-500">
              Home
            </Link>
            <Link href="/cart" className="relative hover:text-blue-500">
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
      <main className="flex-grow">{children}</main>
      <footer className="bg-gray-100 py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          © {new Date().getFullYear()} FakeStore - All rights reserved
        </div>
      </footer>
    </div>
  );
}