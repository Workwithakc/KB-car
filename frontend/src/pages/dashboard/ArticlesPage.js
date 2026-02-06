import React, { useState } from 'react';
import { Search, Calendar, User, ArrowRight, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/DashboardLayout';
import { useNavigate } from 'react-router-dom';

const articles = [
  {
    id: 1,
    title: 'How KB Car Clinic is Revolutionizing Vehicle Maintenance with AI',
    excerpt: 'Discover how our AI-powered diagnosis system helps you understand car problems without technical knowledge.',
    category: 'Technology',
    author: 'Tech Team',
    date: '2026-01-28',
    readTime: '5 min',
    image: '🤖',
    trending: true
  },
  {
    id: 2,
    title: 'Top 10 Signs Your Car Needs Immediate Service',
    excerpt: 'Learn to identify warning signs before they become expensive repairs. From strange noises to warning lights.',
    category: 'Maintenance',
    author: 'Garage Experts',
    date: '2026-01-27',
    readTime: '7 min',
    image: '⚠️',
    trending: true
  },
  {
    id: 3,
    title: 'Complete Guide to Multi-Vehicle Management',
    excerpt: 'Managing multiple vehicles? Our garage feature makes it easy to track service history, documents, and reminders for all your vehicles.',
    category: 'Features',
    author: 'Product Team',
    date: '2026-01-26',
    readTime: '6 min',
    image: '🚗'
  },
  {
    id: 4,
    title: 'Save Money with Predictive Maintenance',
    excerpt: 'How our smart reminders based on mileage and usage patterns help you save up to 40% on vehicle maintenance costs.',
    category: 'Tips',
    author: 'Finance Team',
    date: '2026-01-25',
    readTime: '4 min',
    image: '💰'
  },
  {
    id: 5,
    title: 'Emergency Breakdown? Here\'s What Garage Sathi AI Can Do',
    excerpt: 'Our AI assistant can find nearest garages, check availability in real-time, and even diagnose issues over chat.',
    category: 'Emergency',
    author: 'AI Team',
    date: '2026-01-24',
    readTime: '5 min',
    image: '🚨',
    trending: true
  },
  {
    id: 6,
    title: 'Genuine vs Aftermarket Parts: Making the Right Choice',
    excerpt: 'Understanding the difference between genuine and aftermarket parts, and why our marketplace ensures quality.',
    category: 'Parts',
    author: 'Parts Expert',
    date: '2026-01-23',
    readTime: '8 min',
    image: '🔧'
  },
  {
    id: 7,
    title: 'How Our 4-Step Booking System Saves You Time',
    excerpt: 'Book services in under 2 minutes with our streamlined process. Choose package, date, garage, and confirm!',
    category: 'Features',
    author: 'UX Team',
    date: '2026-01-22',
    readTime: '3 min',
    image: '📅'
  },
  {
    id: 8,
    title: 'Understanding Your Vehicle Health Score',
    excerpt: 'What does your 85% health score mean? Learn how we calculate it and what you can do to improve it.',
    category: 'Health',
    author: 'Data Science',
    date: '2026-01-21',
    readTime: '6 min',
    image: '💚'
  },
  {
    id: 9,
    title: 'Rewards Program: Earn While You Maintain',
    excerpt: 'Every service, part purchase, and referral earns you points. Here\'s how to maximize your rewards.',
    category: 'Rewards',
    author: 'Marketing Team',
    date: '2026-01-20',
    readTime: '4 min',
    image: '🏆'
  },
  {
    id: 10,
    title: 'Price Comparison: Finding the Best Deal Without Compromise',
    excerpt: 'How our comparison engine helps you find competitive prices while ensuring quality service.',
    category: 'Price',
    author: 'Business Team',
    date: '2026-01-19',
    readTime: '5 min',
    image: '💵'
  },
  {
    id: 11,
    title: 'Video Consultation: Expert Advice from Home',
    excerpt: 'Connect with certified mechanics via video call for quick diagnosis and advice before visiting the garage.',
    category: 'Features',
    author: 'Product Team',
    date: '2026-01-18',
    readTime: '4 min',
    image: '📹'
  },
  {
    id: 12,
    title: 'Document Vault: Never Lose Important Papers Again',
    excerpt: 'Store insurance, RC, service records, and warranties digitally. Access them anytime, anywhere.',
    category: 'Features',
    author: 'Security Team',
    date: '2026-01-17',
    readTime: '3 min',
    image: '📄'
  },
  {
    id: 13,
    title: 'Community Success Stories: Real Users, Real Experiences',
    excerpt: 'Read how KB Car Clinic helped thousands of users save money, time, and avoid fraudulent garages.',
    category: 'Community',
    author: 'Community Manager',
    date: '2026-01-16',
    readTime: '7 min',
    image: '👥'
  },
  {
    id: 14,
    title: 'Winter Car Care: Essential Tips for Cold Weather',
    excerpt: 'Prepare your vehicle for winter with our comprehensive checklist. Battery, tires, coolant, and more.',
    category: 'Seasonal',
    author: 'Technical Team',
    date: '2026-01-15',
    readTime: '6 min',
    image: '❄️'
  },
  {
    id: 15,
    title: 'The Future of Automotive Service: AI, IoT & Beyond',
    excerpt: 'Explore upcoming features like OBD2 integration, real-time diagnostics, and predictive analytics.',
    category: 'Future',
    author: 'Innovation Lab',
    date: '2026-01-14',
    readTime: '9 min',
    image: '🚀'
  }
];

const categories = ['All', 'Technology', 'Features', 'Tips', 'Emergency', 'Parts', 'Community'];

const ArticlesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredArticles = articles.filter(article =>
    (selectedCategory === 'All' || article.category === selectedCategory) &&
    (article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const trendingArticles = articles.filter(a => a.trending);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Knowledge Hub</h1>
          <p className="text-xl text-gray-600">
            Everything you need to know about vehicle maintenance, AI features, and smart car care
          </p>
        </div>

        {/* Search & Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {categories.map(cat => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Trending Articles */}
        {selectedCategory === 'All' && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-6 h-6 text-red-500" />
              <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trendingArticles.map(article => (
                <Card key={article.id} className="hover:shadow-xl transition-all cursor-pointer border-2 border-red-200">
                  <CardHeader>
                    <div className="text-6xl text-center mb-4">{article.image}</div>
                    <Badge className="bg-red-500 w-fit mb-2">Trending</Badge>
                    <CardTitle className="text-lg">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                      <Badge variant="outline">{article.category}</Badge>
                    </div>
                    <Button
                      onClick={() => navigate(`/dashboard/articles/${article.id}`)}
                      variant="ghost"
                      className="w-full mt-4"
                    >
                      Read More <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Articles */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {selectedCategory === 'All' ? 'All Articles' : `${selectedCategory} Articles`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => (
              <Card key={article.id} className="hover:shadow-lg transition-all cursor-pointer">
                <CardHeader>
                  <div className="text-6xl text-center mb-4">{article.image}</div>
                  <Badge variant="outline" className="w-fit mb-2">{article.category}</Badge>
                  <CardTitle className="text-base">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {article.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(article.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime} read
                    </span>
                    <Button
                      onClick={() => navigate(`/dashboard/articles/${article.id}`)}
                      variant="ghost"
                      size="sm"
                    >
                      Read <ArrowRight className="ml-1 w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No articles found matching your search.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ArticlesPage;
