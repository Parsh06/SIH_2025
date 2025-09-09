import { motion } from 'framer-motion';
import { Droplets, Leaf, Sprout, Sun } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  const loadingMessages = [
    'Planting seeds of innovation...',
    'Growing smart farming solutions...',
    'Cultivating your digital farm...',
    'Harvesting data insights...',
    'Preparing your farming journey...',
    'Almost ready to grow...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const textInterval = setInterval(() => {
      setLoadingText(prev => {
        const currentIndex = loadingMessages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-leaf-50 via-white to-leaf-100 flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Leaves */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-leaf-200/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Leaf size={20 + Math.random() * 15} />
          </motion.div>
        ))}

        {/* Sun Animation */}
        <motion.div
          className="absolute top-10 right-10 text-yellow-300/40"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity },
          }}
        >
          <Sun size={60} />
        </motion.div>

        {/* Water Droplets */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-blue-200/40"
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [0, 20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Droplets size={15 + Math.random() * 10} />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Logo and Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            className="mx-auto w-20 h-20 bg-gradient-to-br from-leaf-500 to-leaf-600 rounded-3xl flex items-center justify-center shadow-2xl mb-6"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <Leaf className="text-white" size={40} />
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Krishi Sakhi
          </h1>
          <p className="text-leaf-600 font-medium">
            Smart Farming Made Simple
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6"
        >
          <div className="w-full bg-leaf-100 rounded-full h-3 overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-leaf-500 to-leaf-600 rounded-full relative"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-600">Loading...</span>
            <span className="text-sm font-semibold text-leaf-600">{progress}%</span>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          key={loadingText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="text-gray-700 font-medium text-lg">
            {loadingText}
          </p>
        </motion.div>

        {/* Animated Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center space-x-8"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0,
            }}
            className="text-leaf-500"
          >
            <Sprout size={24} />
          </motion.div>

          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, -5, 5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.5,
            }}
            className="text-leaf-500"
          >
            <Leaf size={24} />
          </motion.div>

          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 1,
            }}
            className="text-leaf-500"
          >
            <Droplets size={24} />
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute -top-4 -left-4 w-8 h-8 bg-leaf-200/50 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute -bottom-4 -right-4 w-6 h-6 bg-leaf-300/50 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: 1,
          }}
        />
      </div>
    </div>
  );
}
