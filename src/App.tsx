import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, Heart, MapPin, MessageSquare, ArrowRight, Instagram, Twitter, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { products } from './data/products';
import { CartItem } from './types';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

const Navbar = ({ cartCount }: { cartCount: number }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-bg/80 backdrop-blur-md border-b border-border py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden">
            <Menu size={24} />
          </button>
          <Link to="/" className="text-2xl font-serif tracking-tighter flex items-center gap-2">
            SHOE RUSH
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          </Link>
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide">
            <Link to="/shop" className="hover:text-accent transition-colors">SHOP</Link>
            <Link to="/shop?category=rare" className="hover:text-accent transition-colors">RARE PIECES</Link>
            <Link to="/shop?category=antique" className="hover:text-accent transition-colors">ANTIQUE</Link>
            <Link to="/shop?category=auction" className="hover:text-accent transition-colors">AUCTIONS</Link>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="hidden md:block hover:text-accent transition-colors"><Search size={20} /></button>
          <Link to="/account" className="hover:text-accent transition-colors"><User size={20} /></Link>
          <Link to="/cart" className="relative hover:text-accent transition-colors">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-bg z-[60] p-8 lg:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-serif">MENU</span>
              <button onClick={() => setIsMobileMenuOpen(false)}><X size={24} /></button>
            </div>
            <div className="flex flex-col gap-8 text-3xl font-serif italic">
              <Link to="/shop">Shop All</Link>
              <Link to="/shop?category=rare">Rare Pieces</Link>
              <Link to="/shop?category=antique">Antique</Link>
              <Link to="/shop?category=auction">Auctions</Link>
              <Link to="/about">About</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-bg border-t border-border pt-24 pb-12">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
      <div>
        <Link to="/" className="text-2xl font-serif mb-6 block">SHOE RUSH</Link>
        <p className="text-muted text-sm leading-relaxed mb-8">
          Rush to the Best Feet Forward. Curating the world's most exclusive footwear, from modern grails to historical masterpieces.
        </p>
        <div className="flex gap-4">
          <Instagram size={20} className="text-muted hover:text-ink cursor-pointer transition-colors" />
          <Twitter size={20} className="text-muted hover:text-ink cursor-pointer transition-colors" />
          <Facebook size={20} className="text-muted hover:text-ink cursor-pointer transition-colors" />
        </div>
      </div>
      <div>
        <h4 className="text-sm font-bold mb-6 tracking-widest uppercase">Shop</h4>
        <ul className="flex flex-col gap-4 text-sm text-muted">
          <li><Link to="/shop" className="hover:text-ink transition-colors">All Collections</Link></li>
          <li><Link to="/shop?category=sneakers" className="hover:text-ink transition-colors">Luxury Sneakers</Link></li>
          <li><Link to="/shop?category=boots" className="hover:text-ink transition-colors">Designer Boots</Link></li>
          <li><Link to="/shop?category=dress" className="hover:text-ink transition-colors">Formal & Dress</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-sm font-bold mb-6 tracking-widest uppercase">Support</h4>
        <ul className="flex flex-col gap-4 text-sm text-muted">
          <li><Link to="/contact" className="hover:text-ink transition-colors">Contact Us</Link></li>
          <li><Link to="/about" className="hover:text-ink transition-colors">Our Story</Link></li>
          <li><Link to="/blog" className="hover:text-ink transition-colors">Journal</Link></li>
          <li><Link to="/shipping" className="hover:text-ink transition-colors">Shipping & Returns</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-sm font-bold mb-6 tracking-widest uppercase">Newsletter</h4>
        <p className="text-sm text-muted mb-6">Join our inner circle for early access to rare drops.</p>
        <div className="flex gap-2">
          <input type="email" placeholder="Email address" className="bg-white/5 border border-border px-4 py-2 text-sm w-full focus:outline-none focus:border-accent" />
          <button className="bg-ink text-bg px-4 py-2 text-sm font-bold hover:bg-accent hover:text-ink transition-all">JOIN</button>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-border pt-12 text-[10px] text-muted tracking-widest uppercase">
      <p>© 2026 SHOE RUSH INDIA. ALL RIGHTS RESERVED.</p>
      <div className="flex gap-8">
        <span>Privacy Policy</span>
        <span>Terms of Service</span>
        <span>Cookie Settings</span>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: any, size: number, color: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size && item.selectedColor === color);
      if (existing) {
        return prev.map(item => item === existing ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, selectedSize: size, selectedColor: color, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string, size: number, color: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedSize === size && item.selectedColor === color)));
  };

  const updateQuantity = (id: string, size: number, color: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.selectedSize === size && item.selectedColor === color) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
            <Route path="/checkout" element={<Checkout cart={cart} />} />
            <Route path="/account" element={<Account />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        
        {/* Live Chat Trigger */}
        <button className="fixed bottom-8 right-8 w-14 h-14 bg-accent rounded-full flex items-center justify-center shadow-2xl z-40 hover:scale-110 transition-transform">
          <MessageSquare size={24} className="text-ink" />
        </button>
      </div>
    </Router>
  );
}
