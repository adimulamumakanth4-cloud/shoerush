import React, { useState } from 'react';
import { ShieldCheck, Lock, CreditCard, Truck, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CheckoutProps {
  cart: CartItem[];
}

const Checkout: React.FC<CheckoutProps> = ({ cart }) => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + (subtotal * 0.18);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 3000);
  };

  if (isComplete) {
    return (
      <div className="pt-48 pb-24 px-6 max-w-2xl mx-auto text-center">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle2 size={48} className="text-accent" />
        </motion.div>
        <h1 className="text-5xl font-serif mb-6 italic">Order Secured</h1>
        <p className="text-muted mb-12 leading-relaxed">
          Your collection has been updated. We are preparing your pieces for rush delivery. A confirmation email has been sent to your vault.
        </p>
        <div className="bg-white/5 border border-border p-8 rounded-2xl mb-12 text-left">
          <p className="small-caps mb-4">Order Details</p>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted">Order ID</span>
            <span className="font-mono">#SR-2026-9942</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted">Estimated Delivery</span>
            <span className="font-bold">March 27, 2026</span>
          </div>
        </div>
        <Link to="/" className="pill">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <Link to="/cart" className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-4xl font-serif italic">Checkout</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Checkout Form */}
        <div className="lg:w-2/3">
          <div className="flex flex-col gap-12">
            {/* Step 1: Shipping */}
            <section className={`transition-opacity ${step < 1 ? 'opacity-50' : 'opacity-100'}`}>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-8 bg-ink text-bg rounded-full flex items-center justify-center font-bold text-xs">1</div>
                <h3 className="text-xl font-serif">Shipping Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="small-caps">Full Name</label>
                  <input type="text" className="bg-white/5 border border-border px-4 py-3 focus:outline-none focus:border-accent" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="small-caps">Email Address</label>
                  <input type="email" className="bg-white/5 border border-border px-4 py-3 focus:outline-none focus:border-accent" />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="small-caps">Shipping Address</label>
                  <input type="text" className="bg-white/5 border border-border px-4 py-3 focus:outline-none focus:border-accent" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="small-caps">City</label>
                  <input type="text" className="bg-white/5 border border-border px-4 py-3 focus:outline-none focus:border-accent" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="small-caps">Postal Code</label>
                  <input type="text" className="bg-white/5 border border-border px-4 py-3 focus:outline-none focus:border-accent" />
                </div>
              </div>
            </section>

            {/* Step 2: Payment */}
            <section className={`transition-opacity ${step < 2 ? 'opacity-50' : 'opacity-100'}`}>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-8 bg-ink text-bg rounded-full flex items-center justify-center font-bold text-xs">2</div>
                <h3 className="text-xl font-serif">Payment Method</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <button className="border border-accent p-6 flex flex-col items-center gap-4 bg-accent/5 rounded-xl">
                  <CreditCard size={24} className="text-accent" />
                  <span className="text-xs font-bold uppercase tracking-widest">Credit / Debit Card</span>
                </button>
                <button className="border border-border p-6 flex flex-col items-center gap-4 hover:border-white transition-all rounded-xl">
                  <div className="text-xl font-bold italic text-blue-500">Klarna.</div>
                  <span className="text-xs font-bold uppercase tracking-widest">Pay in 3 Installments</span>
                </button>
              </div>
              <div className="flex flex-col gap-6 bg-white/5 p-8 border border-border rounded-2xl">
                <div className="flex flex-col gap-2">
                  <label className="small-caps">Card Number</label>
                  <div className="relative">
                    <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="bg-bg border border-border px-4 py-3 w-full focus:outline-none focus:border-accent" />
                    <Lock size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="small-caps">Expiry Date</label>
                    <input type="text" placeholder="MM/YY" className="bg-bg border border-border px-4 py-3 focus:outline-none focus:border-accent" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="small-caps">CVV</label>
                    <input type="text" placeholder="XXX" className="bg-bg border border-border px-4 py-3 focus:outline-none focus:border-accent" />
                  </div>
                </div>
              </div>
            </section>

            <button 
              onClick={handlePayment}
              disabled={isProcessing}
              className="bg-ink text-bg py-6 font-bold uppercase tracking-widest text-sm hover:bg-accent hover:text-ink transition-all flex items-center justify-center gap-4 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-bg border-t-transparent rounded-full animate-spin" />
                  Securing Transaction...
                </>
              ) : (
                <>
                  <ShieldCheck size={20} />
                  Complete Purchase - ₹{total.toLocaleString()}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white/5 p-8 border border-border rounded-2xl sticky top-32">
            <h3 className="small-caps mb-8">Order Summary</h3>
            <div className="flex flex-col gap-6 mb-8">
              {cart.map(item => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                  <div className="w-16 h-20 bg-bg overflow-hidden">
                    <img src={item.images[0]} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-xs font-bold mb-1">{item.name}</h4>
                    <p className="text-[10px] text-muted uppercase tracking-widest">Size: {item.selectedSize} × {item.quantity}</p>
                    <p className="text-xs font-mono mt-2">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4 text-sm border-t border-border pt-8">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="font-mono">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">GST (18%)</span>
                <span className="font-mono">₹{(subtotal * 0.18).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-4 border-t border-border">
                <span>Total</span>
                <span className="font-mono">₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
