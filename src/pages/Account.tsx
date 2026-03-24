import React, { useState } from 'react';
import { User, Package, Heart, Settings, LogOut, MapPin, CreditCard, ChevronRight, Truck, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import { products } from '../data/products';

const Account = () => {
  const [activeTab, setActiveTab] = useState('orders');

  const orders = [
    { id: 'SR-2026-9942', date: 'March 15, 2026', total: 45000, status: 'Shipped', tracking: 'IN-8842-991' },
    { id: 'SR-2026-8812', date: 'February 20, 2026', total: 85000, status: 'Delivered', tracking: 'IN-7712-882' }
  ];

  const wishlist = products.slice(0, 2);

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Sidebar */}
        <aside className="lg:w-1/4">
          <div className="flex items-center gap-6 mb-12">
            <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center text-accent font-serif text-3xl italic">R</div>
            <div>
              <h2 className="text-2xl font-serif">Rahul Sharma</h2>
              <p className="text-xs text-muted uppercase tracking-widest">Collector since 2024</p>
            </div>
          </div>
          
          <nav className="flex flex-col gap-2">
            {[
              { id: 'orders', label: 'My Collection', icon: Package },
              { id: 'wishlist', label: 'Wishlist', icon: Heart },
              { id: 'address', label: 'Vault Addresses', icon: MapPin },
              { id: 'payment', label: 'Payment Methods', icon: CreditCard },
              { id: 'settings', label: 'Account Settings', icon: Settings }
            ].map(item => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center justify-between px-6 py-4 rounded-xl transition-all ${activeTab === item.id ? 'bg-white/10 text-accent border border-white/10' : 'text-muted hover:bg-white/5'}`}
              >
                <div className="flex items-center gap-4">
                  <item.icon size={18} />
                  <span className="text-sm font-bold uppercase tracking-widest">{item.label}</span>
                </div>
                <ChevronRight size={16} />
              </button>
            ))}
            <button className="flex items-center gap-4 px-6 py-4 text-red-500 hover:bg-red-500/5 transition-all rounded-xl mt-8">
              <LogOut size={18} />
              <span className="text-sm font-bold uppercase tracking-widest">Logout</span>
            </button>
          </nav>
        </aside>

        {/* Content */}
        <div className="lg:w-3/4">
          {activeTab === 'orders' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h3 className="text-3xl font-serif mb-12 italic">Order History</h3>
              <div className="flex flex-col gap-6">
                {orders.map(order => (
                  <div key={order.id} className="bg-white/5 border border-border p-8 rounded-2xl">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                      <div>
                        <p className="small-caps mb-2">Order ID</p>
                        <h4 className="text-xl font-mono">{order.id}</h4>
                      </div>
                      <div>
                        <p className="small-caps mb-2">Date</p>
                        <p className="text-sm font-bold">{order.date}</p>
                      </div>
                      <div>
                        <p className="small-caps mb-2">Status</p>
                        <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${order.status === 'Shipped' ? 'bg-blue-500/20 text-blue-500 border border-blue-500/30' : 'bg-green-500/20 text-green-500 border border-green-500/30'}`}>
                          {order.status}
                        </span>
                      </div>
                      <div>
                        <p className="small-caps mb-2">Total</p>
                        <p className="text-sm font-mono">₹{order.total.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 border-t border-border pt-8">
                      <button className="bg-ink text-bg px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-accent hover:text-ink transition-all flex items-center gap-2">
                        <Truck size={14} /> Track Shipment
                      </button>
                      <button className="border border-border px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:border-white transition-all flex items-center gap-2">
                        <RefreshCw size={14} /> Initiate Return
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'wishlist' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h3 className="text-3xl font-serif mb-12 italic">Wishlist</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {wishlist.map(p => (
                  <div key={p.id} className="bg-white/5 border border-border p-6 rounded-2xl flex gap-6">
                    <div className="w-24 h-32 bg-bg overflow-hidden">
                      <img src={p.images[0]} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex flex-col justify-between py-2">
                      <div>
                        <p className="small-caps mb-1">{p.brand}</p>
                        <h4 className="text-sm font-bold mb-2">{p.name}</h4>
                        <p className="font-mono text-sm">₹{p.price.toLocaleString()}</p>
                      </div>
                      <button className="text-[10px] font-bold uppercase tracking-widest text-accent hover:underline">Add to Cart</button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
