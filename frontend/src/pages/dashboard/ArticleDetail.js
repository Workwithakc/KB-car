import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import DashboardLayout from '@/components/DashboardLayout';

const articleContent = {
  1: {
    title: 'How KB Car Clinic is Revolutionizing Vehicle Maintenance with AI',
    content: `
# The AI Revolution in Automotive Care

At KB Car Clinic, we're leveraging cutting-edge artificial intelligence to transform how you maintain your vehicle. Gone are the days when you needed to be a mechanic to understand car problems.

## Garage Sathi: Your AI Companion

Our flagship AI assistant, Garage Sathi, is available 24/7 to help you with:

- **Smart Diagnosis**: Describe symptoms in plain language, get instant analysis
- **Emergency Response**: Real-time garage availability and routing
- **Contextual Help**: Page-specific assistance as you navigate our platform
- **Natural Conversations**: No technical jargon, just helpful guidance

## AI-Powered Diagnosis System

### How It Works

1. **Select Symptoms**: Choose from 10+ common issues
2. **Smart Matching**: Our AI analyzes patterns across thousands of cases
3. **Get Results**: Severity level, estimated costs, and recommended solutions
4. **Book Service**: One-click booking with nearby garages

### Real Impact

- 85% accuracy in preliminary diagnosis
- Average cost savings of ₹2,000 through early detection
- 40% reduction in unnecessary garage visits

## Predictive Maintenance

Our AI learns your driving patterns and vehicle history to predict:

- When parts are likely to need replacement
- Optimal service intervals based on usage
- Seasonal maintenance requirements

## The Future

We're working on:

- OBD2 device integration for real-time diagnostics
- Computer vision for visual damage assessment
- Voice-activated service booking
- Augmented reality repair guides

## Conclusion

AI isn't replacing mechanics—it's empowering you to make better decisions about your vehicle's health. Try Garage Sathi today and experience the future of automotive care!
    `
  },
  2: {
    title: 'Top 10 Signs Your Car Needs Immediate Service',
    content: `
# Don't Ignore These Warning Signs!

Your car communicates with you constantly. Learning to recognize these signals can save you thousands in repairs.

## 1. Check Engine Light ⚠️

**What it means**: Your car's computer detected an issue
**Action**: Use our AI diagnosis tool immediately
**Cost if ignored**: ₹5,000 - ₹50,000

## 2. Strange Noises 🔊

- **Squealing**: Worn brake pads (₹2,000-4,000 fix)
- **Knocking**: Engine problems (₹10,000+ fix)
- **Grinding**: Transmission issues (₹15,000+ fix)

## 3. Vibrations

Unusual shaking could indicate:
- Unbalanced tires
- Worn suspension
- Engine misfires

## 4. Fluid Leaks 💧

Check your parking spot! Colors matter:
- **Red**: Transmission fluid
- **Green/Orange**: Coolant
- **Brown**: Oil or brake fluid

## 5. Poor Fuel Economy ⛽

Sudden drop in mileage indicates:
- Clogged air filter
- Faulty oxygen sensor
- Tire pressure issues

## 6. Difficulty Starting

Could be:
- Weak battery
- Faulty starter
- Fuel system problems

## 7. Smoke from Exhaust 💨

- **Blue**: Burning oil
- **White**: Coolant leak
- **Black**: Rich fuel mixture

## 8. Dashboard Warning Lights

Never ignore:
- ABS light
- Oil pressure
- Temperature gauge

## 9. Steering Issues

- Hard to turn
- Pulling to one side
- Loose feeling

## 10. Unusual Smells 👃

- **Burning**: Clutch or brakes
- **Sweet**: Coolant leak
- **Rotten eggs**: Catalytic converter

## Take Action Now

Use our AI Diagnosis tool to identify the issue and book service before it becomes expensive!
    `
  },
  // Add more articles similarly...
};

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const article = articleContent[id] || {
    title: 'Article Not Found',
    content: 'This article is coming soon!'
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard/articles')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Articles
        </Button>

        <Card>
          <CardContent className="p-8">
            <div className="mb-6">
              <Badge className="mb-4">Technology</Badge>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
              
              <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Tech Team
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Jan 28, 2026
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  5 min read
                </span>
              </div>

              <div className="flex gap-3 mb-8">
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 w-4 h-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="mr-2 w-4 h-4" />
                  Save
                </Button>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              {article.content.split('\n').map((line, idx) => {
                if (line.startsWith('# ')) {
                  return <h1 key={idx} className="text-3xl font-bold mt-8 mb-4">{line.substring(2)}</h1>;
                } else if (line.startsWith('## ')) {
                  return <h2 key={idx} className="text-2xl font-bold mt-6 mb-3">{line.substring(3)}</h2>;
                } else if (line.startsWith('### ')) {
                  return <h3 key={idx} className="text-xl font-bold mt-4 mb-2">{line.substring(4)}</h3>;
                } else if (line.startsWith('- ')) {
                  return <li key={idx} className="ml-6">{line.substring(2)}</li>;
                } else if (line.trim()) {
                  return <p key={idx} className="mb-4 text-gray-700">{line}</p>;
                }
                return null;
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ArticleDetail;
