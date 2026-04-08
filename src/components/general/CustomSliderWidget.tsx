"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";


const CustomSliderWidget = () => {
  const [index, setIndex] = useState(0);

  // Automatically switch every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % 3); // 3 total slides
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full mx-auto py-16 px-6 sm:px-8 bg-gradient-to-br from-black to-gray-950 shadow-xl overflow-hidden">
      <div className="min-h-[300px] flex items-center justify-center text-center text-white">
        <AnimatePresence mode="wait">
          {index === 0 && (
            <motion.div
              key="uiux"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
              className="space-y-5 bg-contain w-full h-[300px] bg-no-repeat lg:h-[500px] w-[500px] w-full flex flex-col justify-center items-center"
              style={{backgroundImage:"url('./images/ui-ux.jpg')"}}
            >
              <div className="flex justify-center mb-4">
              </div>
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-600">
              </h2>
           
            </motion.div>
          )}

          {index === 1 && (
             <motion.div
              key="frontend"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
              className="space-y-5 bg-contain w-full h-[300px] bg-no-repeat lg:h-[500px] w-[500px] w-full flex flex-col justify-center items-center"
              style={{backgroundImage:"url('./images/frontend.jpg')"}}
            >
              <div className="flex justify-center mb-4">
              </div>
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-600">
              </h2>
           
            </motion.div>
          )}

          {index === 2 && (
               <motion.div
              key="backend"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
              className="space-y-5 bg-contain w-full h-[300px] bg-no-repeat lg:h-[500px] w-[500px] w-full flex flex-col justify-center items-center"
              style={{backgroundImage:"url('./images/ui-ux.jpg')"}}
            >
              <div className="flex justify-center mb-4">
              </div>
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-600">
              </h2>
           
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-8 gap-x-3">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === index ? "bg-white scale-125" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomSliderWidget;
