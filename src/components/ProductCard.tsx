import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Link to={`/product/${product.id}`} className="block overflow-hidden bg-white/5 aspect-[3/4] relative">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && <span className="bg-ink text-bg text-[10px] font-bold px-2 py-1 uppercase tracking-widest">New</span>}
          {product.isRare && <span className="bg-accent text-ink text-[10px] font-bold px-2 py-1 uppercase tracking-widest">Rare</span>}
          {product.isAuction && <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">Auction</span>}
        </div>

        {/* Quick Actions */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-bg/80 to-transparent flex justify-between items-center">
          <button className="bg-ink text-bg p-3 rounded-full hover:bg-accent transition-colors">
            <ShoppingBag size={18} />
          </button>
          <button className="bg-white/10 backdrop-blur-md text-ink p-3 rounded-full hover:bg-white/20 transition-colors">
            <Heart size={18} />
          </button>
        </div>
      </Link>
      
      <div className="mt-4">
        <div className="flex justify-between items-start mb-1">
          <p className="small-caps">{product.brand}</p>
          {product.isAuction ? (
            <p className="text-accent font-mono text-xs">Current Bid: ₹{product.currentBid?.toLocaleString()}</p>
          ) : (
            <p className="font-mono text-sm">₹{product.price.toLocaleString()}</p>
          )}
        </div>
        <Link to={`/product/${product.id}`} className="text-sm font-medium hover:text-accent transition-colors line-clamp-1">
          {product.name}
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
