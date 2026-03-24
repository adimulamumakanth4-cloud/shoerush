import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, User, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "The Rise of the 'Grail' Culture in India",
      excerpt: "How a new generation of Indian collectors is reshaping the global luxury sneaker market.",
      image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800",
      date: "March 20, 2026",
      author: "Vikram Malhotra",
      category: "Culture"
    },
    {
      id: 2,
      title: "Caring for Antique Leather: A Masterclass",
      excerpt: "Preserving history requires patience and the right techniques. Here's how to maintain your 19th-century pieces.",
      image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&q=80&w=800",
      date: "March 15, 2026",
      author: "Elena Rossi",
      category: "Guide"
    },
    {
      id: 3,
      title: "Top 5 Investment Shoes for 2026",
      excerpt: "Which silhouettes are holding their value and which are poised for a massive surge in the auction circuit.",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800",
      date: "March 10, 2026",
      author: "Shoe Rush Curators",
      category: "Investment"
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <p className="small-caps mb-4 text-accent">The Journal</p>
        <h1 className="text-6xl md:text-7xl font-serif italic">The Rush Report</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {posts.map((post, i) => (
          <motion.article 
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="aspect-[16/10] overflow-hidden bg-white/5 mb-8 rounded-2xl relative">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-bg/80 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-white/10">
                {post.category}
              </div>
            </div>
            <div className="flex items-center gap-6 text-[10px] text-muted uppercase tracking-widest mb-4">
              <span className="flex items-center gap-2"><Calendar size={12} /> {post.date}</span>
              <span className="flex items-center gap-2"><User size={12} /> {post.author}</span>
            </div>
            <h2 className="text-2xl font-serif mb-4 group-hover:text-accent transition-colors leading-snug">{post.title}</h2>
            <p className="text-muted text-sm leading-relaxed mb-6 line-clamp-3 italic">"{post.excerpt}"</p>
            <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
              Read Article <ArrowRight size={14} className="text-accent" />
            </button>
          </motion.article>
        ))}
      </div>

      {/* Newsletter CTA */}
      <section className="mt-32 glass p-16 rounded-3xl text-center">
        <h2 className="text-4xl font-serif mb-6 italic">Never Miss a Drop</h2>
        <p className="text-muted mb-12 max-w-xl mx-auto">Subscribe to our weekly report for exclusive interviews, trend analysis, and early access to auctions.</p>
        <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
          <input type="email" placeholder="Your email address" className="bg-bg border border-border px-6 py-4 w-full focus:outline-none focus:border-accent" />
          <button className="bg-ink text-bg px-8 py-4 font-bold uppercase text-xs hover:bg-accent hover:text-ink transition-all">Subscribe</button>
        </div>
      </section>
    </div>
  );
};

export default Blog;
