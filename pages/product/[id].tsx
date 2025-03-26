import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Product } from '../../types/product';
import { useCart } from '../../contex/CartContext';
import { motion } from 'framer-motion';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="container mx-auto px-4 py-8"
  >
      <button 
        onClick={() => router.back()} 
        className="mb-4 text-blue-500 hover:text-blue-700"
      >
        &larr; Back to products
      </button>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 bg-white p-8 rounded-lg shadow-md">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-64 object-contain"
          />
        </div>
        
        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <div className="flex items-center mb-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {product.category}
            </span>
            <span className="ml-2 text-yellow-500">
              {product.rating.rate} ★ ({product.rating.count} reviews)
            </span>
          </div>
          <p className="text-3xl font-bold mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <button 
        onClick={() => addToCart(product)}
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Add to Cart
      </button>
        </div>
      </div>
      </motion.div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://fakestoreapi.com/products');
  const products: Product[] = await res.json();

  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ProductDetailProps> = async ({ params }) => {
  const res = await fetch(`https://fakestoreapi.com/products/${params?.id}`);
  const product: Product = await res.json();

  return {
    props: {
      product,
    },
    revalidate: 60, // Re-generate the page at most once every 60 seconds
  };
};