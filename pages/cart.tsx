import { useCart } from '../contex/CartContext';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CartPage() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    cartCount,
    cartTotal,
  } = useCart();

  if (cartCount === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <Link href="/" className="text-blue-500 hover:text-blue-700">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart ({cartCount} items)</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {cartItems.map((item) => (
              <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="border-b py-4 flex flex-col sm:flex-row"
            >
              <div className="sm:w-1/4 mb-4 sm:mb-0">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-32 object-contain"
                />
              </div>
              <div className="sm:w-3/4 sm:pl-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600 mb-2">${item.price.toFixed(2)}</p>
                <div className="flex items-center">
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    -
                  </button>
                  <span className="mx-4">{item.quantity}</span>
                  <button 
                    onClick={() => addToCart(item)}
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    +
                  </button>
                  <span className="ml-auto font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
              </motion.div>
          ))}
        </div>
        
        <div className="md:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal ({cartCount} items)</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div className="border-t my-4"></div>
            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors mb-4">
              Proceed to Checkout
            </button>
            <button 
              onClick={clearCart}
              className="w-full text-blue-500 py-2 rounded-lg hover:text-blue-700 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}