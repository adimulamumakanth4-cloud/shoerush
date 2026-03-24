import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import { CartItem } from '../types';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

interface CartProps {
  cart: CartItem[];
  removeFromCart: (id: string, size: number, color: string) => void;
  updateQuantity: (id: string, size: number, color: string, delta: number) => void;
}

const Cart: React.FC<CartProps> = ({ cart, removeFromCart, updateQuantity }) => {
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 25000 ? 0 : 500;
  const total = subtotal + shipping;

  const upsells = products.filter(p => !cart.find(item => item.id === p.id)).slice(0, 3);

  if (cart.length === 0) {
    return (
      <div className="pt-48 pb-24 px-6 max-w-7xl mx-auto text-center">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingBag size={48} className="text-muted" />
        </div>
        <h1 className="text-5xl font-serif mb-6">Your Collection is Empty</h1>
        <p className="text-muted mb-12 max-w-md mx-auto italic">"A journey of a thousand miles begins with a single step." - Lao Tzu</p>
        <Link to="/shop" className="bg-ink text-bg px-12 py-5 font-bold uppercase tracking-widest text-sm hover:bg-accent hover:text-ink transition-all">
          Explore the Vault
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <h1 className="text-5xl font-serif mb-16">Your Collection</h1>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Cart Items */}
        <div className="lg:w-2/3 flex flex-col gap-8">
          {cart.map((item, i) => (
            <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-6 border-b border-border pb-8">
              <div className="w-32 h-40 bg-white/5 overflow-hidden">
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="small-caps mb-1">{item.brand}</p>
                      <h3 className="text-lg font-medium">{item.name}</h3>
                    </div>
                    <p className="font-mono">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                  <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-muted">
                    <span>Size: {item.selectedSize}</span>
                    <span>Color: {item.selectedColor}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center border border-border">
                    <button 
                      onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, -1)}
                      className="p-2 hover:bg-white/5 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-12 text-center text-sm font-mono">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, 1)}
                      className="p-2 hover:bg-white/5 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                    className="text-muted hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Upsells */}
          <div className="mt-16">
            <h3 className="small-caps mb-8">Complete the Look</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {upsells.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white/5 p-8 border border-border rounded-2xl sticky top-32">
            <h3 className="text-2xl font-serif mb-8">Order Summary</h3>
            <div className="flex flex-col gap-4 text-sm mb-8">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="font-mono">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Rush Shipping</span>
                <span className="font-mono">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Estimated Tax</span>
                <span className="font-mono">₹{(subtotal * 0.18).toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-4 text-lg font-bold">
                <span>Total</span>
                <span className="font-mono">₹{(total + subtotal * 0.18).toLocaleString()}</span>
              </div>
            </div>

            <Link 
              to="/checkout" 
              className="bg-ink text-bg w-full py-5 font-bold uppercase tracking-widest text-sm hover:bg-accent hover:text-ink transition-all flex items-center justify-center gap-3 mb-6"
            >
              Proceed to Checkout
              <ArrowRight size={18} />
            </Link>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-muted">
                <ShieldCheck size={16} className="text-accent" />
                Secure Checkout with SSL
              </div>
              <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-muted">
                <Truck size={16} className="text-accent" />
                Free Returns for 365 Days
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
