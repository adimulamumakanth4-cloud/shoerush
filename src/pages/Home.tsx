import React, { useState } from 'react';
import Slider from 'react-slick';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Star, Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { getShoeRecommendations } from '../lib/gemini';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [aiRecs, setAiRecs] = useState<any[]>([]);
  const [loadingRecs, setLoadingRecs] = useState(false);
  const [pref, setPref] = useState('');

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  };

  const handleAiRecs = async () => {
    if (!pref) return;
    setLoadingRecs(true);
    const recs = await getShoeRecommendations(pref, products);
    setAiRecs(recs);
    setLoadingRecs(false);
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover opacity-60"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-walking-on-a-dark-runway-41235-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-transparent to-bg" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="small-caps mb-6 text-accent"
          >
            Rush to the Best Feet Forward
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif mb-8 tracking-tighter leading-none"
          >
            THE ART OF <br /> <span className="italic">THE STEP</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <button className="bg-ink text-bg px-10 py-4 font-bold tracking-widest uppercase text-xs hover:bg-accent hover:text-ink transition-all">
              Shop Collection
            </button>
            <button className="border border-white/30 backdrop-blur-md px-10 py-4 font-bold tracking-widest uppercase text-xs hover:bg-white hover:text-bg transition-all">
              Live Auctions
            </button>
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-px h-12 bg-white" />
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="small-caps mb-2">Curated Selection</p>
            <h2 className="text-4xl md:text-5xl">Best Sellers</h2>
          </div>
          <button className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:text-accent transition-colors group">
            View All <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
        <Slider {...carouselSettings}>
          {products.filter(p => p.isBestSeller).map(product => (
            <div key={product.id} className="px-3">
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </section>

      {/* Why Shoe Rush */}
      <section className="bg-white/5 py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center group">
            <div className="w-16 h-16 bg-bg rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent transition-colors">
              <Truck size={24} className="text-accent group-hover:text-ink" />
            </div>
            <h3 className="text-xl mb-4">Rush Delivery</h3>
            <p className="text-muted text-sm">Complimentary express shipping on all orders over ₹25,000. Carbon-neutral fulfillment.</p>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 bg-bg rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent transition-colors">
              <ShieldCheck size={24} className="text-accent group-hover:text-ink" />
            </div>
            <h3 className="text-xl mb-4">Fit Guarantee</h3>
            <p className="text-muted text-sm">Not the perfect fit? Our 365-day return policy ensures you find your ideal pair.</p>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 bg-bg rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent transition-colors">
              <Star size={24} className="text-accent group-hover:text-ink" />
            </div>
            <h3 className="text-xl mb-4">Verified Rare</h3>
            <p className="text-muted text-sm">Every rare and antique piece is authenticated by our master curators.</p>
          </div>
        </div>
      </section>

      {/* AI Recommendations */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="glass p-12 rounded-3xl flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <p className="small-caps mb-4 text-accent">Personalized Styling</p>
            <h2 className="text-4xl md:text-5xl mb-6">AI Shoe Match</h2>
            <p className="text-muted mb-8">Tell us your style, and our AI curator will find your perfect pair from our exclusive vault.</p>
            <div className="flex gap-4">
              <input 
                value={pref}
                onChange={(e) => setPref(e.target.value)}
                placeholder="e.g. I want something bold for a gala..." 
                className="bg-bg border border-border px-6 py-4 w-full focus:outline-none focus:border-accent" 
              />
              <button 
                onClick={handleAiRecs}
                disabled={loadingRecs}
                className="bg-ink text-bg px-8 py-4 font-bold uppercase text-xs hover:bg-accent hover:text-ink transition-all disabled:opacity-50"
              >
                {loadingRecs ? 'Analyzing...' : 'Match Me'}
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="grid grid-cols-1 gap-4">
              {aiRecs.length > 0 ? aiRecs.map((rec, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="bg-bg/50 p-6 border border-border flex items-center gap-6"
                >
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center font-serif italic text-accent">#{i+1}</div>
                  <div>
                    <h4 className="font-bold">{rec.productName}</h4>
                    <p className="text-xs text-muted italic">{rec.reason}</p>
                  </div>
                </motion.div>
              )) : (
                <div className="h-64 border border-dashed border-border rounded-xl flex items-center justify-center text-muted italic">
                  Your matches will appear here...
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* UGC Feed */}
      <section className="py-24">
        <div className="text-center mb-12 px-6">
          <p className="small-caps mb-2">Community</p>
          <h2 className="text-4xl md:text-5xl">#ShoeRushIndia</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="aspect-square relative group overflow-hidden">
              <img 
                src={`https://picsum.photos/seed/shoe${i}/600/600`} 
                alt="UGC" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Instagram size={24} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
