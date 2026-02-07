import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Loader2, MapPin, Wifi, Clock, Search } from 'lucide-react';

const AIProcessingScreen = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    { 
      icon: MapPin, 
      text: "Detecting your location...", 
      color: "text-blue-400",
      duration: 2000 
    },
    { 
      icon: Search, 
      text: "Finding nearby garages...", 
      color: "text-purple-400",
      duration: 2500 
    },
    { 
      icon: Clock, 
      text: "Checking if garages are open...", 
      color: "text-yellow-400",
      duration: 2000 
    },
    { 
      icon: Wifi, 
      text: "Analyzing availability and distance...", 
      color: "text-green-400",
      duration: 2500 
    },
    { 
      icon: CheckCircle2, 
      text: "Best match found ✔", 
      color: "text-green-500",
      duration: 1500 
    }
  ];

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, steps[currentStep]?.duration || 2000);

      return () => clearTimeout(timer);
    } else {
      // All steps complete, navigate to result
      const finalTimer = setTimeout(() => {
        navigate('/emergency-result');
      }, 500);
      return () => clearTimeout(finalTimer);
    }
  }, [currentStep, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Animated Mechanic Illustration */}
        <div className="mb-12">
          <div className="relative w-48 h-48 mx-auto">
            {/* Mechanic */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Head */}
                <div className="w-16 h-16 bg-amber-300 rounded-full border-4 border-blue-400 relative mx-auto mb-2">
                  <div className="absolute top-4 left-3 w-2 h-2 bg-gray-800 rounded-full animate-pulse"></div>
                  <div className="absolute top-4 right-3 w-2 h-2 bg-gray-800 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-1 border-b-2 border-gray-800 rounded-full"></div>
                </div>
                
                {/* Cap */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-blue-600 rounded-t-full"></div>
                
                {/* Body */}
                <div className="w-20 h-24 bg-blue-600 rounded-lg mx-auto relative">
                  <div className="absolute top-2 left-2 w-6 h-4 border-2 border-blue-800 rounded"></div>
                </div>
                
                {/* Wrench (Animated) */}
                <div className="absolute -right-8 top-12 animate-bounce">
                  <div className="w-12 h-12 text-yellow-400 text-4xl">🔧</div>
                </div>
                
                {/* Tools floating around */}
                <div className="absolute -left-12 top-8 animate-spin-slow">
                  <div className="text-3xl">⚙️</div>
                </div>
                <div className="absolute -right-12 bottom-8 animate-bounce" style={{ animationDelay: '0.5s' }}>
                  <div className="text-3xl">🔩</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Processing Steps */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              AI Garage Finder
            </h1>
            <p className="text-gray-400">Powered by Garage Sathi Intelligence</p>
          </div>

          {/* Progress Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
                    isActive ? 'bg-blue-900/50 scale-105' : isCompleted ? 'bg-gray-700/30' : 'bg-gray-800/30'
                  }`}
                >
                  <div className={`flex-shrink-0 ${isCompleted ? 'text-green-500' : step.color}`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-8 h-8" />
                    ) : isActive ? (
                      <Icon className="w-8 h-8 animate-pulse" />
                    ) : (
                      <Icon className="w-8 h-8 opacity-30" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <p className={`text-lg font-semibold ${
                      isCompleted ? 'text-green-400' : isActive ? 'text-white' : 'text-gray-500'
                    }`}>
                      {step.text}
                    </p>
                  </div>
                  
                  {isActive && (
                    <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-green-500 h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${((currentStep) / steps.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-center text-gray-400 text-sm mt-2">
              {Math.min(Math.round(((currentStep) / steps.length) * 100), 100)}% Complete
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            ⚡ This prototype simulates AI-based garage matching.
            <br />
            Live AI and real-time data will be integrated in production.
          </p>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AIProcessingScreen;
