import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Wrench, Maximize2, Minimize2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';

const GarageSathi = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      text: '👋 Hi! I\'m Garage Sathi, your AI automotive assistant. I can help you with emergency services, bookings, diagnosis, and answer any car-related questions!',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedVehicle } = useApp();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Contextual greeting based on page
  useEffect(() => {
    if (isOpen) {
      const pageContexts = {
        '/dashboard': 'I see you\'re on the dashboard. Need help understanding your vehicle health or any feature?',
        '/dashboard/garage': 'Looking at your garage? I can help you add vehicles or explain vehicle details!',
        '/dashboard/booking': 'Want to book a service? I can guide you through the process or suggest the best package!',
        '/dashboard/parts': 'Shopping for parts? I can help you find the right part or explain compatibility!',
        '/dashboard/diagnosis': 'Using AI diagnosis? I can help interpret symptoms and suggest next steps!',
        '/emergency': '🚨 Emergency mode! I can immediately connect you to the nearest available garage!'
      };

      const context = pageContexts[location.pathname];
      if (context && messages.length === 1) {
        setTimeout(() => {
          addMessage('assistant', context);
        }, 1000);
      }
    }
  }, [location.pathname, isOpen]);

  const addMessage = (role, text) => {
    setMessages(prev => [...prev, { role, text, timestamp: new Date() }]);
  };

  const getAIResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();

    // Emergency detection
    if (msg.includes('emergency') || msg.includes('urgent') || msg.includes('help') || msg.includes('stuck') || msg.includes('breakdown')) {
      return {
        text: '🚨 EMERGENCY DETECTED! I\'m activating our AI-powered garage finder right now!\n\n✨ Our AI will:\n• Detect your location\n• Find nearby open garages\n• Check real-time availability\n• Match you with the best option\n\nShall I start the AI search?',
        action: 'emergency'
      };
    }

    // Booking related
    if (msg.includes('book') || msg.includes('service') || msg.includes('appointment')) {
      return {
        text: 'I can help you book a service! We have 3 packages:\n\n🔹 Basic Service - ₹1,499\n🔹 Standard Service - ₹2,999\n🔹 Comprehensive Service - ₹4,999\n\nShall I take you to the booking page?',
        action: 'booking'
      };
    }

    // Parts related
    if (msg.includes('part') || msg.includes('buy') || msg.includes('spare')) {
      return {
        text: 'Looking for spare parts? Our store has:\n✅ Engine oils\n✅ Filters\n✅ Brake pads\n✅ Batteries\n✅ And much more!\n\nAll parts are genuine with warranty. Want to browse?',
        action: 'parts'
      };
    }

    // Diagnosis
    if (msg.includes('noise') || msg.includes('problem') || msg.includes('issue') || msg.includes('diagnos')) {
      return {
        text: 'Let me help diagnose the issue! Our AI Diagnosis tool can analyze symptoms like:\n🔸 Strange noises\n🔸 Warning lights\n🔸 Performance issues\n🔸 Starting problems\n\nShall I open the diagnosis tool for you?',
        action: 'diagnosis'
      };
    }

    // Vehicle info
    if (msg.includes('vehicle') || msg.includes('car') || msg.includes('my') && selectedVehicle) {
      return {
        text: `Your current vehicle: ${selectedVehicle.brand} ${selectedVehicle.model}\n\nVehicle Health: 85%\nLast Service: Not recorded\nNext Service Due: Within 1000 km\n\nNeed to add another vehicle or check details?`,
        action: 'garage'
      };
    }

    // Price related
    if (msg.includes('price') || msg.includes('cost') || msg.includes('charge')) {
      return {
        text: 'Our transparent pricing:\n💰 Basic Service: ₹1,499\n💰 Oil Change: ₹899\n💰 Brake Service: ₹2,000\n💰 AC Service: ₹1,200\n\nWant to compare prices across garages or get a detailed quote?',
        action: 'compare'
      };
    }

    // Features explanation
    if (msg.includes('feature') || msg.includes('what can') || msg.includes('help')) {
      return {
        text: 'I can help you with:\n\n🚗 Multi-vehicle garage management\n📅 Book services online\n🛒 Buy genuine spare parts\n🤖 AI-powered diagnosis\n💰 Compare prices\n📹 Video consultation with experts\n🏆 Earn reward points\n📄 Store vehicle documents\n👥 Join our community\n\nWhat would you like to explore?'
      };
    }

    // Garage info
    if (msg.includes('garage') || msg.includes('nearby') || msg.includes('location')) {
      return {
        text: '📍 Garages near you:\n\n1️⃣ KB Car Clinic - Central (1.2 km) ⭐4.8\n   Status: OPEN | Available slots today\n\n2️⃣ AutoCare Service (2.5 km) ⭐4.6\n   Status: OPEN | 2 slots left\n\n3️⃣ Express Car Repair (3.1 km) ⭐4.7\n   Status: OPEN | Evening slots\n\nWant directions or book now?'
      };
    }

    // Default helpful response
    return {
      text: 'I\'m here to help! I can assist with:\n\n🔹 Emergency breakdown assistance\n🔹 Booking services\n🔹 Finding spare parts\n🔹 Diagnosing issues\n🔹 Comparing prices\n🔹 Explaining features\n🔹 Garage recommendations\n\nJust ask me anything about your vehicle or our services!'
    };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    addMessage('user', input);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const response = getAIResponse(input);
      setIsTyping(false);
      addMessage('assistant', response.text);

      // Handle action
      if (response.action) {
        setTimeout(() => {
          addMessage('assistant', '👆 Click below to proceed!');
        }, 500);
      }
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'emergency':
        navigate('/emergency-ai');
        setIsOpen(false);
        break;
      case 'booking':
        navigate('/dashboard/booking');
        setIsOpen(false);
        break;
      case 'parts':
        navigate('/dashboard/parts');
        setIsOpen(false);
        break;
      case 'diagnosis':
        navigate('/dashboard/diagnosis');
        setIsOpen(false);
        break;
      case 'garage':
        navigate('/dashboard/garage');
        setIsOpen(false);
        break;
      case 'compare':
        navigate('/dashboard/compare');
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const quickActions = [
    { label: '🚨 Emergency', action: 'emergency' },
    { label: '📅 Book Service', action: 'booking' },
    { label: '🤖 AI Diagnosis', action: 'diagnosis' },
    { label: '🛒 Buy Parts', action: 'parts' }
  ];

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform animate-bounce"
          data-testid="garage-sathi-button"
        >
          <div className="relative">
            <Wrench className="w-8 h-8 text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 bg-white rounded-2xl shadow-2xl transition-all ${
            isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
          }`}
          data-testid="garage-sathi-chat"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Wrench className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold">Garage Sathi</h3>
                <p className="text-xs text-blue-100 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  AI-Powered Assistant
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                {isMinimized ? <Maximize2 className="w-5 h-5" /> : <Minimize2 className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="h-[420px] overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        msg.role === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-gray-100 text-gray-900 rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{msg.text}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-none">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              <div className="px-4 py-2 flex gap-2 overflow-x-auto">
                {quickActions.map((qa, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickAction(qa.action)}
                    className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs rounded-full whitespace-nowrap transition-colors"
                  >
                    {qa.label}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Garage Sathi..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default GarageSathi;
