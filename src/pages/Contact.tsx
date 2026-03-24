import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, MessageSquare, ArrowRight, Instagram, Twitter, Facebook } from 'lucide-react';

const Contact = () => {
  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-24">
        {/* Contact Info */}
        <div className="lg:w-1/2">
          <p className="small-caps mb-4 text-accent">Get in Touch</p>
          <h1 className="text-6xl md:text-7xl font-serif mb-12 italic">Connect with <br /> the Vault</h1>
          
          <div className="flex flex-col gap-12">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10">
                <Mail size={20} className="text-accent" />
              </div>
              <div>
                <h4 className="small-caps mb-2">Email Us</h4>
                <p className="text-xl font-serif">concierge@shoerush.in</p>
                <p className="text-xs text-muted mt-2">Our curators respond within 24 hours.</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10">
                <Phone size={20} className="text-accent" />
              </div>
              <div>
                <h4 className="small-caps mb-2">Call Us</h4>
                <p className="text-xl font-serif">+91 22 4932 8800</p>
                <p className="text-xs text-muted mt-2">Mon - Sat, 10:00 AM - 8:00 PM IST</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10">
                <MapPin size={20} className="text-accent" />
              </div>
              <div>
                <h4 className="small-caps mb-2">Visit the Studio</h4>
                <p className="text-xl font-serif">Level 4, The Palladium, Lower Parel, Mumbai, MH 400013</p>
                <button className="text-[10px] font-bold uppercase tracking-widest text-accent hover:underline mt-4 flex items-center gap-2">
                  View on Maps <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-16 border-t border-border">
            <h4 className="small-caps mb-6">Follow the Journey</h4>
            <div className="flex gap-8">
              <Instagram size={24} className="text-muted hover:text-accent cursor-pointer transition-colors" />
              <Twitter size={24} className="text-muted hover:text-accent cursor-pointer transition-colors" />
              <Facebook size={24} className="text-muted hover:text-accent cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:w-1/2">
          <div className="bg-white/5 p-12 rounded-3xl border border-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <h3 className="text-3xl font-serif mb-8 italic">Send a Message</h3>
            <form className="flex flex-col gap-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="small-caps">Full Name</label>
                  <input type="text" className="bg-bg border border-border px-6 py-4 focus:outline-none focus:border-accent" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="small-caps">Email Address</label>
                  <input type="email" className="bg-bg border border-border px-6 py-4 focus:outline-none focus:border-accent" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="small-caps">Subject</label>
                <select className="bg-bg border border-border px-6 py-4 focus:outline-none focus:border-accent appearance-none">
                  <option>General Inquiry</option>
                  <option>Auction Question</option>
                  <option>Authentication Service</option>
                  <option>Press & Media</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="small-caps">Message</label>
                <textarea rows={5} className="bg-bg border border-border px-6 py-4 focus:outline-none focus:border-accent resize-none" />
              </div>
              <button className="bg-ink text-bg py-5 font-bold uppercase tracking-widest text-sm hover:bg-accent hover:text-ink transition-all flex items-center justify-center gap-3">
                <MessageSquare size={18} />
                Send Message
              </button>
            </form>
          </div>
          
          {/* Store Locator Map (Simulated) */}
          <div className="mt-12 aspect-video bg-white/5 border border-border rounded-3xl overflow-hidden relative group">
            <img 
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200" 
              alt="Map" 
              className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-bg/80 backdrop-blur-md p-6 border border-white/10 rounded-2xl text-center">
                <MapPin size={32} className="text-accent mx-auto mb-4" />
                <p className="text-sm font-bold uppercase tracking-widest">Mumbai Studio</p>
                <p className="text-[10px] text-muted mt-1">Open Today: 10AM - 8PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
