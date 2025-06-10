import React, { useState, useRef, useEffect } from 'react';
import { ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon, HeartIcon, ShoppingCartIcon, StarIcon } from '@heroicons/react/24/outline';
import { useLocation } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'product' | 'style' | 'order' | 'welcome';
  data?: any;
}

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  brand: string;
  rating?: number;
}

interface UserProfile {
  name: string;
  preferredSize: string;
  favoriteColors: string[];
  budget: number;
  style: string;
  lastOrderSize?: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Removed unused 'showNotification' state to resolve the compile error.
  // Removed unused 'contextMessage' state to resolve the compile error.
  const location = useLocation();

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userProfile] = useState<UserProfile>({
    name: 'Sarah',
    preferredSize: 'M',
    favoriteColors: ['black', 'navy', 'white'],
    budget: 5000,
    style: 'casual',
    lastOrderSize: 'M'
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Context-aware welcome message
  const getWelcomeMessage = (): Message => {
    const path = location.pathname;
    let welcomeText = '';

    if (path.includes('/products')) {
      welcomeText = `👋 Hey ${userProfile.name}! I noticed you're browsing our collection. I'm Alex, your personal shopping assistant. Need help finding the perfect item?`;
    } else if (path.includes('/cart')) {
      welcomeText = `Hi ${userProfile.name}! I see you have items in your cart. Need help with sizing, payment, or have questions about delivery?`;
    } else if (path.includes('/checkout')) {
      welcomeText = `Almost there, ${userProfile.name}! I'm here to help with any checkout questions or concerns you might have.`;
    } else {
      welcomeText = `👋 Welcome to Modern Metro, ${userProfile.name}! I'm Alex, your AI fashion assistant. How can I help you discover amazing fashion today?`;
    }

    return {
      id: '1',
      text: welcomeText,
      sender: 'bot',
      timestamp: new Date(),
      type: 'welcome'
    };
  };

  // Initialize chat with context-aware welcome
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([getWelcomeMessage()]);
    }
  }, [location.pathname]);

  // Context-aware quick replies based on page
  const getContextualQuickReplies = () => {
    const path = location.pathname;
    if (path.includes('/products')) {
      return [
        '🔍 Find my size',
        '📏 Size guide',
        '🎨 Style advice',
        '💰 Best deals',
        '🚚 Shipping info',
        '💡 Similar items'
      ];
    } else if (path.includes('/cart')) {
      return [
        '💳 Payment help',
        '🚚 Delivery options',
        '📦 Track order',
        '💰 Apply coupon',
        '🔄 Size exchange',
        '❓ Checkout help'
      ];
    } else {
      return [
        '🔥 Trending now',
        '👗 New arrivals',
        '💰 Best deals',
        '📏 Size guide',
        '🎨 Style advice',
        '📞 Customer care'
      ];
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = getContextualQuickReplies();

  // Sample products for recommendations
  const sampleProducts: Product[] = [
    {
      id: '1',
      name: 'Professional Midi Dress',
      price: 2499,
      originalPrice: 3499,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop',
      brand: 'Zara',
      rating: 4.5
    },
    {
      id: '2',
      name: 'Business Shift Dress',
      price: 1999,
      originalPrice: 2799,
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=300&h=400&fit=crop',
      brand: 'H&M',
      rating: 4.3
    },
    {
      id: '3',
      name: 'Smart Casual Wrap Dress',
      price: 2799,
      originalPrice: 3999,
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=400&fit=crop',
      brand: 'Mango',
      rating: 4.7
    }
  ];

  const generateAdvancedResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();

    // Office dress recommendation
    if (lowerMessage.includes('office') || lowerMessage.includes('work') || lowerMessage.includes('professional')) {
      return {
        id: Date.now().toString(),
        text: `Perfect! Let me help you find the ideal office dress 👔\n\nBased on your profile and current trends, here are my top picks:`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'product',
        data: {
          products: sampleProducts,
          context: 'office wear',
          tip: '💡 Pro tip: Midi dresses are trending for office wear!\n📊 90% of customers loved these styles\n\nWould you like to see more options or need help with sizing?'
        }
      };
    }

    // Size help
    if (lowerMessage.includes('size') && !lowerMessage.includes('guide')) {
      return {
        id: Date.now().toString(),
        text: `Let me help you find your perfect fit! 📏\n\nWhat's your usual size in other brands?\n\nBased on 1,240+ customer reviews:\n• 78% say this item runs true to size\n• 15% recommend sizing up\n• Most popular: Size M\n\n💡 Your last order was Size ${userProfile.lastOrderSize} - would you like the same?`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
    }

    // Style advice
    if (lowerMessage.includes('style') || lowerMessage.includes('how to wear')) {
      return {
        id: Date.now().toString(),
        text: `Great choice! 🖤 Let me help you style that perfectly:\n\n**FOR OFFICE 💼**\nBeige Blazer + Nude Heels\n\n**FOR DATE NIGHT 🌙**\nRed Heels + Statement Jewelry\n\n**FOR BRUNCH ☀️**\nWhite Sneakers + Denim Jacket\n\n🎨 Want me to create a complete look? I can find matching accessories!\n💳 Bundle discount: Save 15% when you buy 3+ items together`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'style'
      };
    }

    // Budget help
    if (lowerMessage.includes('budget') || lowerMessage.includes('₹')) {
      const budgetMatch = lowerMessage.match(/₹?(\d+)/);
      const budget = budgetMatch ? parseInt(budgetMatch[1]) : userProfile.budget;

      return {
        id: Date.now().toString(),
        text: `Perfect! I love a good styling challenge! 💪 Let me create a complete look within ₹${budget}:\n\n👗 **DRESS**: Navy Blue Midi - ₹1,999\n👠 **HEELS**: Nude Block Heels - ₹1,499\n👜 **BAG**: Brown Crossbody - ₹1,299\n💍 **JEWELRY**: Gold Earrings - ₹399\n\n**Total**: ₹5,196 | **Budget**: ₹${budget}\n\n💡 **SMART SUGGESTION**:\nReplace heels with flats (-₹500) = ₹4,696 ✅\n\nWant me to find alternatives or adjust the budget?`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
    }

    // Order tracking
    if (lowerMessage.includes('order') || lowerMessage.includes('track')) {
      return {
        id: Date.now().toString(),
        text: `Let me check that for you! 📦\n\n**ORDER #FE2024001**\nBlack Midi Dress (Size M) • Ordered: March 15\n\n●━━━●━━━●━━━○━━━○\nOrder → Pack → Ship → Transit → Deliver\nPlaced   Ready   ped    ing      ed\n\n🚚 **Currently**: Out for delivery\n📅 **Expected**: Today by 7 PM\n📍 **Delivery to**: Your Address\n\n💡 Pro tip: Our delivery partner will call you 30 mins before arrival!\n\nAnything else I can help you with? 😊`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'order'
      };
    }

    // Default responses
    const responses = [
      `I'm here to help you find amazing fashion! You can ask me about:\n• Product recommendations\n• Size guidance\n• Style advice\n• Order tracking\n• Best deals\n\nWhat interests you most? 🛍️`,
      `Looking for something specific? I can help you find:\n• Trending items 🔥\n• Perfect fit guidance 📏\n• Style combinations 🎨\n• Budget-friendly options 💰\n\nJust let me know what you need!`,
      `I'm your personal shopping assistant! I can:\n• Recommend products based on your style\n• Help with sizing questions\n• Create complete looks\n• Find the best deals\n\nHow can I assist you today? ✨`
    ];

    return {
      id: Date.now().toString(),
      text: responses[Math.floor(Math.random() * responses.length)],
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    };
  };

  // Predefined bot responses for exact keyword matches
  // Removed unused 'botResponses' to resolve the compile error.

  // Removed unused function 'generateBotResponse' to resolve the compile error.

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Generate intelligent bot response
    setTimeout(() => {
      const botResponse = generateAdvancedResponse(inputMessage);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 500);
  };

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Professional Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
        >
          <div className="relative">
            {isOpen ? (
              <XMarkIcon className="h-7 w-7 transition-transform duration-300" />
            ) : (
              <ChatBubbleLeftRightIcon className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
            )}
          </div>

          {/* Notification Badge */}
          {!isOpen && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-xs font-bold text-black">AI</span>
            </div>
          )}

          {/* Ripple Effect */}
          <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </button>

        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Need help? Chat with our AI assistant
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
      </div>

      {/* Professional Chat Window */}
      {isOpen && (
        <div className="fixed bottom-32 right-6 z-50 w-96 h-[32rem] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden transform transition-all duration-300 animate-in slide-in-from-bottom-4">
          {/* Professional Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mr-4 backdrop-blur-sm">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                      <span className="text-sm font-black text-black">AI</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Alex • Fashion Assistant</h3>
                  <div className="flex items-center text-sm text-purple-100">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    Online • Speaks: EN, HI
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-xl transition-all duration-200"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-white opacity-5 rounded-full"></div>
            <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-pink-400 opacity-10 rounded-full"></div>
          </div>

          {/* Professional Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}
              >
                <div className={`flex items-end space-x-2 max-w-xs ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-white">AI</span>
                    </div>
                  )}
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-md'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>

                    {/* Product Recommendations */}
                    {message.type === 'product' && message.data?.products && (
                      <div className="mt-4 space-y-3">
                        {message.data.products.map((product: Product) => (
                          <div key={product.id} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer">
                            <div className="flex items-center space-x-3">
                              <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                              <div className="flex-1">
                                <div className="font-semibold text-gray-900 text-sm">{product.name}</div>
                                <div className="text-xs text-gray-600 mb-1">{product.brand}</div>
                                <div className="flex items-center space-x-2">
                                  <span className="font-bold text-blue-600">₹{product.price.toLocaleString()}</span>
                                  {product.originalPrice && (
                                    <span className="text-xs text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                                  )}
                                  {product.rating && (
                                    <div className="flex items-center">
                                      <StarIcon className="h-3 w-3 text-yellow-400 fill-current" />
                                      <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flex flex-col space-y-1">
                                <button className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                                  <HeartIcon className="h-4 w-4" />
                                </button>
                                <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                                  <ShoppingCartIcon className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                        {message.data.tip && (
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                            <p className="text-sm text-blue-800 whitespace-pre-wrap">{message.data.tip}</p>
                          </div>
                        )}
                      </div>
                    )}

                    <p className={`text-xs mt-2 ${
                      message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-white">U</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-in slide-in-from-bottom-2">
                <div className="flex items-end space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">AI</span>
                  </div>
                  <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-bl-md border border-gray-200 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Professional Quick Replies */}
          {messages.length <= 2 && (
            <div className="px-6 pb-4">
              <div className="mb-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Quick Actions</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 px-3 py-2 rounded-xl hover:from-indigo-100 hover:to-purple-100 transition-all duration-200 border border-indigo-200 hover:border-indigo-300 font-medium"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Professional Input Area */}
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about fashion..."
                  className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm transition-all duration-200 pr-12"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded">
                    ↵
                  </kbd>
                </div>
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-2xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
              >
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Footer */}
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500">
                Powered by Modern Metro AI • Always here to help
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
