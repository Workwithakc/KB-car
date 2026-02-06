import React from 'react';

const LoadingAnimation = ({ fullScreen = false }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${fullScreen ? 'fixed inset-0 bg-white z-50' : 'py-16'}`}>
      {/* Mechanic Animation */}
      <div className="relative w-64 h-64">
        {/* Mechanic Body */}
        <div className="mechanic-container">
          {/* Head */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-amber-200 rounded-full border-4 border-blue-900">
            {/* Eyes */}
            <div className="absolute top-5 left-3 w-2 h-2 bg-blue-900 rounded-full animate-blink"></div>
            <div className="absolute top-5 right-3 w-2 h-2 bg-blue-900 rounded-full animate-blink"></div>
            {/* Smile */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-2 border-b-2 border-blue-900 rounded-full"></div>
          </div>

          {/* Cap */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-blue-700 rounded-t-full"></div>
          <div className="absolute top-9 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-blue-700 rounded-full"></div>

          {/* Body (Blue Uniform) */}
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-24 h-32 bg-blue-600 rounded-lg">
            {/* Pocket */}
            <div className="absolute top-4 left-4 w-8 h-6 border-2 border-blue-800 rounded"></div>
          </div>

          {/* Arms */}
          <div className="absolute top-28 left-8 w-6 h-20 bg-blue-600 rounded-full animate-hammer-left origin-top"></div>
          <div className="absolute top-28 right-8 w-6 h-20 bg-blue-600 rounded-full"></div>

          {/* Wrench in hand */}
          <div className="absolute top-44 left-6 w-8 h-12 animate-hammer-left origin-top">
            <div className="w-2 h-10 bg-gray-600 mx-auto"></div>
            <div className="w-6 h-4 bg-gray-500 rounded-lg mx-auto"></div>
          </div>

          {/* Legs */}
          <div className="absolute top-56 left-12 w-6 h-16 bg-blue-800 rounded-full"></div>
          <div className="absolute top-56 right-12 w-6 h-16 bg-blue-800 rounded-full"></div>
        </div>

        {/* Car Engine (Being Repaired) */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-24 bg-gray-700 rounded-lg">
          <div className="absolute top-2 left-2 w-6 h-6 bg-red-500 rounded animate-pulse"></div>
          <div className="absolute top-2 right-2 w-6 h-6 bg-yellow-500 rounded animate-pulse" style={{ animationDelay: '0.3s' }}></div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gray-900 rounded"></div>
        </div>

        {/* Sparks */}
        <div className="absolute top-48 left-16 w-2 h-2 bg-yellow-400 rounded-full animate-spark"></div>
        <div className="absolute top-50 left-14 w-2 h-2 bg-orange-500 rounded-full animate-spark" style={{ animationDelay: '0.2s' }}></div>
        <div className="absolute top-52 left-18 w-2 h-2 bg-yellow-300 rounded-full animate-spark" style={{ animationDelay: '0.4s' }}></div>
      </div>

      {/* Loading Text */}
      <div className="mt-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
        <p className="text-blue-900 font-semibold text-lg">Garage Sathi is working...</p>
        <p className="text-gray-600 text-sm">Analyzing your request</p>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes hammer-left {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(-25deg);
          }
        }

        @keyframes spark {
          0%, 100% {
            opacity: 0;
            transform: scale(0) translateY(0);
          }
          50% {
            opacity: 1;
            transform: scale(1) translateY(-10px);
          }
        }

        @keyframes blink {
          0%, 90%, 100% {
            opacity: 1;
          }
          95% {
            opacity: 0;
          }
        }

        .animate-hammer-left {
          animation: hammer-left 1s ease-in-out infinite;
        }

        .animate-spark {
          animation: spark 0.8s ease-in-out infinite;
        }

        .animate-blink {
          animation: blink 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation;
