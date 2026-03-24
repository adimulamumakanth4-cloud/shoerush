import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, Share2, Ruler, Star, ShieldCheck, Truck, RefreshCw, ChevronRight, ChevronLeft, Clock, Rotate3d, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { products } from '../data/products';
import { Product } from '../types';
import SizeGuide from '../components/SizeGuide';
import ProductCard from '../components/ProductCard';

interface ProductDetailProps {
  addToCart: (product: Product, size: number, color: string) => void;
}

const SpinViewer = ({ imageUrl, isSpinning, setIsSpinning }: { imageUrl: string, isSpinning: boolean, setIsSpinning: (v: boolean) => void }) => {
  const x = useMotionValue(0);
  const rotateY = useTransform(x, [-200, 200], [-180, 180]);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="relative w-full h-full flex items-center justify-center perspective-1000">
      <motion.div
        style={{ rotateY: isSpinning ? undefined : rotateY }}
        animate={isSpinning ? { rotateY: [0, 360] } : {}}
        transition={isSpinning ? { duration: 8, repeat: Infinity, ease: "linear" } : { type: "spring", damping: 20 }}
        drag={isSpinning ? false : "x"}
        dragConstraints={{ left: 0, right: 0 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        onPan={(e, info) => x.set(info.offset.x)}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <img 
          src={imageUrl} 
          alt="Product" 
          className="w-full h-full object-cover pointer-events-none select-none"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        <button 
          onClick={() => setIsSpinning(!isSpinning)}
          className={`px-4 py-2 rounded-full border text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all ${isSpinning ? 'bg-accent text-ink border-accent' : 'bg-bg/50 backdrop-blur-md border-white/10 text-ink hover:bg-white/10'}`}
        >
          <Rotate3d size={14} className={isSpinning ? 'animate-spin' : ''} />
          {isSpinning ? 'Stop Spin' : '360° Spin'}
        </button>
        {!isSpinning && (
          <div className="bg-bg/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest text-muted">
            Drag to Rotate
          </div>
        )}
      </div>
    </div>
  );
};

const ProductDetail: React.FC<ProductDetailProps> = ({ addToCart }) => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isSpinMode, setIsSpinMode] = useState(false);
  const [isAutoSpin, setIsAutoSpin] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
    }
    window.scrollTo(0, 0);
  }, [product, id]);

  if (!product) return <div className="pt-48 text-center font-serif italic text-2xl">Piece not found in vault.</div>;

  const crossSells = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted mb-12">
        <Link to="/" className="hover:text-ink transition-colors">Home</Link>
        <ChevronRight size={10} />
        <Link to="/shop" className="hover:text-ink transition-colors">Shop</Link>
        <ChevronRight size={10} />
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-16 mb-32">
        {/* Image Gallery */}
        <div className="lg:w-3/5 flex flex-col md:flex-row gap-6">
          <div className="flex md:flex-col gap-4 order-2 md:order-1">
            {product.images.map((img, i) => (
              <button 
                key={i} 
                onClick={() => { setSelectedImage(i); setIsSpinMode(false); }}
                className={`w-20 h-24 border transition-all overflow-hidden relative ${selectedImage === i && !isSpinMode ? 'border-accent' : 'border-border hover:border-white'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                {selectedImage === i && !isSpinMode && <motion.div layoutId="activeThumb" className="absolute inset-0 border-2 border-accent" />}
              </button>
            ))}
            <button 
              onClick={() => setIsSpinMode(true)}
              className={`w-20 h-24 border transition-all flex flex-col items-center justify-center gap-2 bg-white/5 ${isSpinMode ? 'border-accent text-accent' : 'border-border text-muted hover:border-white hover:text-ink'}`}
            >
              <Rotate3d size={20} />
              <span className="text-[8px] font-bold uppercase tracking-tighter">360°</span>
            </button>
          </div>
          
          <div className="flex-grow aspect-[4/5] bg-white/5 overflow-hidden relative order-1 md:order-2 group rounded-2xl border border-border">
            <AnimatePresence mode="wait">
              {isSpinMode ? (
                <motion.div 
                  key="spin"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full"
                >
                  <SpinViewer 
                    imageUrl={product.images[selectedImage]} 
                    isSpinning={isAutoSpin} 
                    setIsSpinning={setIsAutoSpin} 
                  />
                </motion.div>
              ) : (
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full relative"
                >
                  <img 
                    src={product.images[selectedImage]} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 cursor-zoom-in"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-3 bg-bg/50 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/20 transition-all">
                      <Maximize2 size={18} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-2/5 flex flex-col">
          <div className="mb-auto">
            <div className="flex justify-between items-start mb-6">
              <div className="flex flex-col gap-1">
                <p className="small-caps text-accent tracking-[0.3em]">{product.brand}</p>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5 text-accent">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < 4 ? "currentColor" : "none"} />)}
                  </div>
                  <span className="text-[10px] font-bold text-muted uppercase tracking-widest">4.9 / 5.0</span>
                </div>
              </div>
              <button className="p-3 bg-white/5 rounded-full border border-border hover:border-white transition-all">
                <Share2 size={18} />
              </button>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-serif mb-8 leading-[0.9] tracking-tighter">{product.name}</h1>
            
            <div className="flex items-center gap-6 mb-12">
              <span className="text-4xl font-mono tracking-tighter">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-muted line-through font-mono text-xl opacity-50">₹{product.originalPrice.toLocaleString()}</span>
              )}
              {product.isAuction && (
                <div className="flex items-center gap-2 bg-red-600/10 text-red-500 border border-red-500/20 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Live Auction</span>
                </div>
              )}
            </div>

            <div className="space-y-8 mb-16">
              <p className="text-muted text-sm leading-relaxed italic border-l border-accent/30 pl-6">
                "{product.description}"
              </p>

              {/* Color Selection */}
              <div>
                <h4 className="small-caps mb-4">Shade: <span className="text-ink">{selectedColor}</span></h4>
                <div className="flex gap-4">
                  {product.colors.map(color => (
                    <button 
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all p-0.5 ${selectedColor === color ? 'border-accent' : 'border-transparent hover:border-white/20'}`}
                    >
                      <div 
                        className="w-full h-full rounded-full shadow-inner" 
                        style={{ backgroundColor: color.toLowerCase().includes('black') ? '#111' : color.toLowerCase().includes('tan') ? '#C19A6B' : color.toLowerCase().includes('white') ? '#F5F5F5' : '#333' }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="small-caps">Size <span className="text-muted">(UK/IND)</span></h4>
                  <button 
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 text-accent hover:underline"
                  >
                    <Ruler size={14} /> Find My Fit
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map(size => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-4 border text-xs font-mono transition-all rounded-lg ${selectedSize === size ? 'bg-ink text-bg border-ink' : 'border-border hover:border-white bg-white/5'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {product.stock < 5 && (
                  <div className="flex items-center gap-2 mt-4 text-red-500 text-[10px] font-bold uppercase tracking-widest">
                    <Clock size={12} className="animate-pulse" />
                    Rare Stock: Only {product.stock} left
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="sticky bottom-6 lg:relative lg:bottom-0 z-20">
            <div className="flex flex-col gap-3 glass p-4 lg:p-0 lg:bg-transparent lg:border-none rounded-2xl">
              <button 
                onClick={() => selectedSize && selectedColor && addToCart(product, selectedSize, selectedColor)}
                disabled={!selectedSize}
                className="bg-ink text-bg py-6 font-bold uppercase tracking-widest text-xs hover:bg-accent hover:text-ink transition-all disabled:opacity-50 flex items-center justify-center gap-4 rounded-xl shadow-2xl"
              >
                <ShoppingBag size={18} />
                {selectedSize ? 'Acquire Piece' : 'Select Size to Acquire'}
              </button>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`flex-grow border py-4 rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all ${isWishlisted ? 'bg-red-600/10 border-red-600 text-red-600' : 'border-border hover:border-white bg-white/5'}`}
                >
                  <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
                  {isWishlisted ? 'In Vault' : 'Add to Vault'}
                </button>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-4 mt-12 border-t border-border pt-12">
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-border">
              <Truck size={20} className="text-accent" />
              <div>
                <p className="text-[8px] font-bold uppercase tracking-widest text-muted">Rush Shipping</p>
                <p className="text-[10px] font-bold">48H Delivery</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-border">
              <ShieldCheck size={20} className="text-accent" />
              <div>
                <p className="text-[8px] font-bold uppercase tracking-widest text-muted">Authenticity</p>
                <p className="text-[10px] font-bold">Verified Grail</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cross Sells */}
      <section className="mb-32">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="small-caps mb-2">Related Pieces</p>
            <h2 className="text-4xl font-serif italic">You May Also Covet</h2>
          </div>
          <Link to="/shop" className="text-[10px] font-bold uppercase tracking-widest hover:text-accent transition-colors">View All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {crossSells.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section>
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="small-caps mb-2">Collector Feedback</p>
            <h2 className="text-4xl font-serif italic">The Verdict</h2>
          </div>
          <button className="pill">Add Testimony</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {product.reviews.length > 0 ? product.reviews.map(review => (
            <div key={review.id} className="bg-white/5 p-10 border border-border rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Star size={64} />
              </div>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="font-bold text-lg mb-1">{review.user}</p>
                  <div className="flex gap-1 text-accent">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} />
                    ))}
                  </div>
                </div>
                <span className="text-[10px] text-muted font-mono uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">{review.date}</span>
              </div>
              <p className="text-sm text-muted leading-relaxed italic font-serif">"{review.comment}"</p>
            </div>
          )) : (
            <div className="col-span-2 py-24 text-center border border-dashed border-border rounded-3xl text-muted italic">
              No testimonies yet. Be the first collector to share your verdict.
            </div>
          )}
        </div>
      </section>

      <SizeGuide isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
    </div>
  );
};

export default ProductDetail;
