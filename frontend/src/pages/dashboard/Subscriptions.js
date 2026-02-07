import React, { useState } from 'react';
import { 
  Crown, Check, Zap, Shield, Brain, Car, Wrench, Star,
  IndianRupee, Users, Building2, ArrowRight, Sparkles,
  Phone, MessageSquare, Clock, Award, TrendingUp, Gift
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/DashboardLayout';

const Subscriptions = () => {
  const [selectedPlan, setSelectedPlan] = useState('standard');
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      id: 'free',
      name: 'Free',
      icon: Car,
      price: { monthly: 0, yearly: 0 },
      tagline: 'Basic access for all users',
      color: 'gray',
      features: [
        { text: 'Find Nearby Garages', included: true },
        { text: 'Basic Cost Calculator', included: true },
        { text: 'Book Service (3/month)', included: true },
        { text: 'Service History View', included: true },
        { text: 'AI Diagnosis', included: false },
        { text: 'AI Smart Calculator', included: false },
        { text: 'AI Insurance Advisor', included: false },
        { text: 'Priority Support', included: false },
        { text: 'Exclusive Discounts', included: false }
      ],
      cta: 'Current Plan'
    },
    {
      id: 'standard',
      name: 'Standard',
      icon: Zap,
      price: { monthly: 199, yearly: 1999 },
      tagline: 'Perfect for regular car owners',
      color: 'blue',
      popular: true,
      features: [
        { text: 'Everything in Free', included: true },
        { text: 'Unlimited Bookings', included: true },
        { text: 'AI Diagnosis (5/month)', included: true },
        { text: 'AI Smart Calculator', included: true },
        { text: 'Parts Price Comparison', included: true },
        { text: 'Video Consultation (2/month)', included: true },
        { text: 'AI Insurance Advisor', included: false },
        { text: 'Priority Support', included: false },
        { text: '5% Cashback on Services', included: true }
      ],
      cta: 'Upgrade Now'
    },
    {
      id: 'premium',
      name: 'Premium',
      icon: Crown,
      price: { monthly: 499, yearly: 4999 },
      tagline: 'Complete AI-powered experience',
      color: 'purple',
      features: [
        { text: 'Everything in Standard', included: true },
        { text: 'Unlimited AI Diagnosis', included: true },
        { text: 'AI Insurance Advisor', included: true },
        { text: 'Unlimited Video Consults', included: true },
        { text: 'Priority Garage Booking', included: true },
        { text: 'Dedicated Account Manager', included: true },
        { text: '24/7 Priority Support', included: true },
        { text: '10% Cashback on Services', included: true },
        { text: 'Free Annual Inspection', included: true }
      ],
      cta: 'Go Premium'
    }
  ];

  const commissionStructure = [
    {
      service: 'Service Booking',
      rate: '5%',
      description: 'Commission on every service booked through our platform',
      icon: Wrench
    },
    {
      service: 'Parts Order',
      rate: '3-8%',
      description: 'Varies by part category and vendor partnership',
      icon: Car
    },
    {
      service: 'Insurance Claim Processing',
      rate: '2%',
      description: 'On successful claim settlement amount',
      icon: Shield
    },
    {
      service: 'Video Consultation',
      rate: '15%',
      description: 'Platform fee for expert consultations',
      icon: MessageSquare
    },
    {
      service: 'Premium Garage Listing',
      rate: '₹999/month',
      description: 'Featured listing for garage partners',
      icon: Building2
    }
  ];

  const garagePartnerBenefits = [
    { icon: Users, title: 'Customer Acquisition', desc: 'Get direct leads from verified users' },
    { icon: TrendingUp, title: 'Business Growth', desc: 'Increase revenue with platform visibility' },
    { icon: Star, title: 'Reviews & Ratings', desc: 'Build trust with verified customer reviews' },
    { icon: Clock, title: 'Easy Management', desc: 'Manage bookings with our dashboard' },
    { icon: IndianRupee, title: 'Quick Payments', desc: 'Weekly settlements directly to your bank' },
    { icon: Award, title: 'Certification', desc: 'Get KB Car Clinic partner badge' }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <Badge className="bg-purple-100 text-purple-700 mb-4">
            <Sparkles className="w-4 h-4 mr-1" />
            Subscription Plans
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Choose Your Plan</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Unlock AI-powered features and get exclusive benefits with our subscription plans
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center">
          <div className="bg-gray-100 p-1 rounded-full inline-flex">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'monthly' ? 'bg-white shadow text-gray-900' : 'text-gray-600'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'yearly' ? 'bg-white shadow text-gray-900' : 'text-gray-600'
              }`}
            >
              Yearly
              <Badge className="ml-2 bg-green-500 text-white text-xs">Save 17%</Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isSelected = selectedPlan === plan.id;
            const price = plan.price[billingCycle];
            
            return (
              <Card 
                key={plan.id}
                className={`relative overflow-hidden transition-all cursor-pointer ${
                  isSelected ? 'ring-2 ring-blue-500 shadow-xl' : 'hover:shadow-lg'
                } ${plan.popular ? 'border-2 border-blue-500' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-xs font-bold rounded-bl-lg">
                    MOST POPULAR
                  </div>
                )}
                
                <CardHeader className="text-center pb-2">
                  <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
                    plan.color === 'gray' ? 'bg-gray-100' :
                    plan.color === 'blue' ? 'bg-blue-100' :
                    'bg-purple-100'
                  }`}>
                    <Icon className={`w-8 h-8 ${
                      plan.color === 'gray' ? 'text-gray-600' :
                      plan.color === 'blue' ? 'text-blue-600' :
                      'text-purple-600'
                    }`} />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <p className="text-gray-500 text-sm">{plan.tagline}</p>
                </CardHeader>
                
                <CardContent className="text-center">
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      {price === 0 ? 'Free' : `₹${price}`}
                    </span>
                    {price > 0 && (
                      <span className="text-gray-500">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                    )}
                  </div>

                  <div className="space-y-3 text-left mb-6">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0" />
                        )}
                        <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className={`w-full ${
                      plan.id === 'free' ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' :
                      plan.id === 'standard' ? 'bg-blue-600 hover:bg-blue-700' :
                      'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                    }`}
                    disabled={plan.id === 'free'}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Commission & Revenue Model */}
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <IndianRupee className="w-6 h-6 text-green-400" />
              Platform Commission Structure
            </CardTitle>
            <p className="text-slate-300">Transparent pricing for our garage partners</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {commissionStructure.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="bg-slate-700/50 rounded-xl p-4 hover:bg-slate-700 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{item.service}</p>
                        <p className="text-2xl font-bold text-green-400 my-1">{item.rate}</p>
                        <p className="text-xs text-slate-400">{item.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-4 bg-blue-600/20 rounded-xl border border-blue-500/30">
              <p className="text-sm text-blue-200">
                <strong>Note:</strong> Commission is only charged when a successful transaction is completed. 
                No hidden fees. No upfront charges for garage partners.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Garage Partner Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-6 h-6 text-orange-600" />
              Become a Garage Partner
            </CardTitle>
            <p className="text-gray-600">Join our network and grow your business</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {garagePartnerBenefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <div key={idx} className="p-4 bg-orange-50 rounded-xl">
                    <Icon className="w-8 h-8 text-orange-600 mb-2" />
                    <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                    <p className="text-sm text-gray-600">{benefit.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Ready to Partner with Us?</h3>
                  <p className="text-orange-100">Join 500+ garages across India</p>
                </div>
                <Button className="bg-white text-orange-600 hover:bg-orange-50">
                  Apply Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feature Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>AI Feature Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Feature</th>
                    <th className="text-center py-3 px-4">Free</th>
                    <th className="text-center py-3 px-4 bg-blue-50">Standard</th>
                    <th className="text-center py-3 px-4 bg-purple-50">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'AI Diagnosis', free: '—', standard: '5/month', premium: 'Unlimited' },
                    { feature: 'AI Smart Calculator', free: '—', standard: '✓', premium: '✓' },
                    { feature: 'AI Insurance Advisor', free: '—', standard: '—', premium: '✓' },
                    { feature: 'AI Parts Recommendation', free: '—', standard: '✓', premium: '✓ Priority' },
                    { feature: 'AI Garage Matching', free: 'Basic', standard: 'Smart', premium: 'Premium' },
                    { feature: 'Video Consultation', free: '—', standard: '2/month', premium: 'Unlimited' },
                    { feature: 'Cashback', free: '—', standard: '5%', premium: '10%' },
                    { feature: 'Support', free: 'Email', standard: 'Chat', premium: '24/7 Priority' }
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="py-3 px-4 font-medium">{row.feature}</td>
                      <td className="text-center py-3 px-4 text-gray-500">{row.free}</td>
                      <td className="text-center py-3 px-4 bg-blue-50 font-medium text-blue-700">{row.standard}</td>
                      <td className="text-center py-3 px-4 bg-purple-50 font-medium text-purple-700">{row.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { q: 'Can I cancel my subscription anytime?', a: 'Yes, you can cancel anytime. Your benefits will continue until the end of the billing period.' },
              { q: 'How does the garage commission work?', a: 'We charge a small commission to garage partners only when a service is successfully completed. Users never pay extra.' },
              { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards, UPI, Net Banking, and popular wallets like Paytm and PhonePe.' },
              { q: 'Is there a refund policy?', a: 'Yes, we offer a 7-day money-back guarantee if you are not satisfied with our premium features.' }
            ].map((faq, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">{faq.q}</h4>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Subscriptions;
