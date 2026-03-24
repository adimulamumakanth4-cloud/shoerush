import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Globe, Shield, Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-32 pb-24">
      {/* Hero */}
      <section className="px-6 max-w-7xl mx-auto mb-32">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="small-caps mb-6 text-accent text-center"
        >
          Our Story
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-8xl lg:text-9xl font-serif text-center mb-16 tracking-tighter leading-none"
        >
          CURATING THE <br /> <span className="italic">EXTRAORDINARY</span>
        </motion.h1>
        <div className="aspect-video bg-white/5 overflow-hidden rounded-3xl relative">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1920" 
            alt="Shoe Rush Studio" 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-2xl text-center p-12 glass rounded-3xl">
              <p className="text-lg md:text-xl leading-relaxed italic">
                "Shoe Rush was born from a simple obsession: the belief that footwear is the ultimate expression of human artistry and history."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white/5 py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 italic">The Rush Philosophy</h2>
            <p className="text-muted leading-relaxed mb-8">
              Founded in 2024 in Mumbai, Shoe Rush has quickly become India's premier destination for luxury footwear. We don't just sell shoes; we curate legacies. From the latest limited-edition drops to centuries-old antique pieces, every item in our vault tells a story.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <Shield className="text-accent shrink-0" />
                <div>
                  <h4 className="font-bold mb-2">Authenticity First</h4>
                  <p className="text-xs text-muted">Every piece is verified by our master curators using advanced forensic techniques.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Globe className="text-accent shrink-0" />
                <div>
                  <h4 className="font-bold mb-2">Global Reach</h4>
                  <p className="text-xs text-muted">Sourcing the rarest finds from private collections across Europe, Asia, and the Americas.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] bg-white/5 rounded-2xl overflow-hidden mt-12">
              <img src="https://images.unsplash.com/photo-1512374382149-4332c6c02151?auto=format&fit=crop&q=80&w=800" alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="aspect-[3/4] bg-white/5 rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800" alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* Team/Values */}
      <section className="py-32 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-serif mb-16 italic">Driven by Passion</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: 'Exclusivity', desc: 'We only source pieces that are truly unique or exceptionally rare.' },
            { title: 'Sustainability', desc: 'Every shipment is carbon-neutral. We believe in luxury that respects the planet.' },
            { title: 'Innovation', desc: 'Using AI and 3D technology to bring the store experience to your screen.' }
          ].map((value, i) => (
            <div key={i} className="p-12 border border-border rounded-3xl hover:border-accent transition-all group">
              <Zap className="text-accent mx-auto mb-6 group-hover:scale-125 transition-transform" />
              <h3 className="text-2xl mb-4">{value.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
