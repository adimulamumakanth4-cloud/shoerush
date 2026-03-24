import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'motion/react';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const categoryFilter = searchParams.get('category');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const brands = useMemo(() => Array.from(new Set(products.map(p => p.brand))), []);
  
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (categoryFilter && p.category !== categoryFilter) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
      return true;
    });
  }, [categoryFilter, priceRange, selectedBrands]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
        <div>
          <h1 className="text-5xl md:text-6xl mb-4">
            {categoryFilter ? categoryFilter.toUpperCase() : 'ALL COLLECTIONS'}
          </h1>
          <p className="text-muted text-sm tracking-widest uppercase">
            Showing {filteredProducts.length} results
          </p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 border border-border px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-bg transition-all w-full md:w-auto"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
          <div className="relative group w-full md:w-auto">
            <button className="flex items-center justify-between gap-8 border border-border px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-bg transition-all w-full md:w-auto">
              Sort By <ChevronDown size={16} />
            </button>
            <div className="absolute top-full right-0 mt-2 bg-bg border border-border w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
              <button className="w-full text-left px-4 py-3 text-xs hover:bg-white/5">Price: Low to High</button>
              <button className="w-full text-left px-4 py-3 text-xs hover:bg-white/5">Price: High to Low</button>
              <button className="w-full text-left px-4 py-3 text-xs hover:bg-white/5">Newest First</button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters (Desktop) */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.aside 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 300, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="hidden lg:block overflow-hidden"
            >
              <div className="w-[300px] flex flex-col gap-12 sticky top-32">
                <div>
                  <h4 className="small-caps mb-6">Brands</h4>
                  <div className="flex flex-col gap-3">
                    {brands.map(brand => (
                      <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                          className="hidden" 
                        />
                        <div className={`w-4 h-4 border border-border flex items-center justify-center transition-colors ${selectedBrands.includes(brand) ? 'bg-accent border-accent' : 'group-hover:border-white'}`}>
                          {selectedBrands.includes(brand) && <div className="w-2 h-2 bg-bg" />}
                        </div>
                        <span className="text-sm text-muted group-hover:text-ink transition-colors">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="small-caps mb-6">Price Range</h4>
                  <div className="flex flex-col gap-4">
                    <input 
                      type="range" 
                      min="0" 
                      max="200000" 
                      step="5000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                    />
                    <div className="flex justify-between text-xs font-mono text-muted">
                      <span>₹0</span>
                      <span>₹{priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="small-caps mb-6">Style</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Sneakers', 'Boots', 'Dress', 'Rare', 'Antique'].map(style => (
                      <button 
                        key={style}
                        onClick={() => setSearchParams({ category: style.toLowerCase() })}
                        className={`px-4 py-2 border text-[10px] font-bold uppercase tracking-widest transition-all ${categoryFilter === style.toLowerCase() ? 'bg-ink text-bg border-ink' : 'border-border hover:border-white'}`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <div className="flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="py-24 text-center border border-dashed border-border rounded-3xl">
              <p className="text-muted italic mb-6">No pieces found matching your criteria.</p>
              <button 
                onClick={() => {
                  setSearchParams({});
                  setSelectedBrands([]);
                  setPriceRange([0, 200000]);
                }}
                className="pill"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
