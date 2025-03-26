import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { Product } from '../types/product';
import { useCart } from '../contex/CartContext';
import Link from 'next/link';

interface HomeProps {
  products: Product[];
}

export default function Home({ products: initialProducts }: HomeProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useCart();

  // Get unique categories
  const categories = ['all', ...new Set(initialProducts.map(p => p.category))];
  useEffect(() => {
    let filtered = initialProducts;
  
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      ); // <-- Closing parenthesis added here
    }
  
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category === selectedCategory
      );
    }
  
    setProducts(filtered);
  }, [searchTerm, selectedCategory, initialProducts]);
  

  return (
    <div className="container mx-auto px-6 py-12">
    {/* Heading */}
    <h1 className="text-xl font-extrabold text-teal-400  mb-2">
     Rahat Task
    </h1>
    <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
      Our Products
    </h1>
  
    {/* Search & Filter Section */}
    <div className="mb-10 flex flex-col md:flex-row items-center gap-4">
      <div className="flex-grow relative">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        <select
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  
    {/* No Products Found */}
    {products.length === 0 ? (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">No products found matching your criteria.</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-xl shadow-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl duration-300"
          >
            <Link href={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-56 object-contain bg-gray-100 p-4"
              />
            </Link>
            <div className="p-4">
              <Link href={`/product/${product.id}`} className="hover:text-blue-600">
                <h2 className="text-lg font-semibold mb-2 line-clamp-2">{product.title}</h2>
              </Link>
              <p className="text-gray-700 font-medium text-lg mb-2">${product.price.toFixed(2)}</p>
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const res = await fetch('https://fakestoreapi.com/products');
  const products: Product[] = await res.json();

  return {
    props: {
      products,
    },
  };
};