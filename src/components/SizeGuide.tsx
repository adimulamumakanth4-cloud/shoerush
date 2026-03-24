import React, { useState } from 'react';
import { Ruler, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const SizeGuide: React.FC<SizeGuideProps> = ({ isOpen, onClose }) => {
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({ brand: '', size: '' });

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers({ brand: '', size: '' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg/95 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="relative bg-bg border border-border w-full max-w-2xl p-12 rounded-3xl shadow-2xl"
          >
            <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-full transition-colors">
              <X size={24} />
            </button>

            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                <Ruler size={24} className="text-accent" />
              </div>
              <h2 className="text-3xl font-serif">Size Guide & Quiz</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="small-caps mb-6">Standard Conversion</h3>
                <div className="flex flex-col gap-4 text-sm">
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted">UK / INDIA</span>
                    <span className="font-mono">US</span>
                    <span className="font-mono">EU</span>
                  </div>
                  {[7, 8, 9, 10, 11].map(size => (
                    <div key={size} className="flex justify-between border-b border-border/50 pb-2">
                      <span className="font-bold">{size}</span>
                      <span className="text-muted font-mono">{size + 0.5}</span>
                      <span className="text-muted font-mono">{size + 33}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 p-8 rounded-2xl border border-border">
                <h3 className="small-caps mb-6">Fit Quiz</h3>
                {quizStep === 0 && (
                  <div className="flex flex-col gap-6">
                    <p className="text-sm text-muted">What brand do you usually wear?</p>
                    <div className="grid grid-cols-2 gap-2">
                      {['Nike', 'Adidas', 'Jordan', 'Yeezy'].map(brand => (
                        <button 
                          key={brand}
                          onClick={() => { setQuizAnswers({ ...quizAnswers, brand }); setQuizStep(1); }}
                          className="border border-border p-3 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-bg transition-all"
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {quizStep === 1 && (
                  <div className="flex flex-col gap-6">
                    <p className="text-sm text-muted">What size do you wear in {quizAnswers.brand}?</p>
                    <div className="grid grid-cols-3 gap-2">
                      {[7, 8, 9, 10, 11].map(size => (
                        <button 
                          key={size}
                          onClick={() => { setQuizAnswers({ ...quizAnswers, size: size.toString() }); setQuizStep(2); }}
                          className="border border-border p-3 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-bg transition-all"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {quizStep === 2 && (
                  <div className="text-center py-4">
                    <CheckCircle2 size={48} className="text-accent mx-auto mb-6" />
                    <h4 className="text-xl mb-2">We Recommend Size {quizAnswers.size}</h4>
                    <p className="text-xs text-muted mb-8 italic">Based on your {quizAnswers.brand} fit, this model runs true to size.</p>
                    <button onClick={resetQuiz} className="text-[10px] font-bold uppercase tracking-widest text-accent hover:underline">Retake Quiz</button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SizeGuide;
