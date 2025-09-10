
import { motion } from 'framer-motion';
import {
    Bug,
    Calendar,
    CheckCircle,
    Clock,
    Droplets,
    Filter,
    Search,
    Shield,
    Sun,
    TrendingUp,
    Wind
} from 'lucide-react';
import React, { useState } from 'react';
import Page from '../components/Page';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useApp } from '../context/AppStore';
import { useI18n } from '../context/I18nContext';

export default function Advisory(){
  const { t } = useI18n();
  const { state } = useApp();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock advisory data with more realistic farming advice
  const advisories = [
    {
      id: 1,
      title: t["advisory.highTempAlert"],
      description: t["advisory.highTempDescription"],
      severity: "warning",
      category: "weather",
      icon: Sun,
      time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      priority: "high",
      action: t["advisory.highTempAction"]
    },
    {
      id: 2,
      title: t["advisory.rainProbabilityHigh"],
      description: t["advisory.rainProbabilityDescription"],
      severity: "info",
      category: "weather",
      icon: Droplets,
      time: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      priority: "medium",
      action: t["advisory.rainProbabilityAction"]
    },
    {
      id: 3,
      title: t["advisory.pestAlert"],
      description: t["advisory.pestDescription"],
      severity: "error",
      category: "pests",
      icon: Bug,
      time: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      priority: "high",
      action: t["advisory.pestAction"]
    },
    {
      id: 4,
      title: "Soil Moisture Optimal",
      description: "Current soil moisture levels are perfect for your wheat crop. No immediate action needed.",
      severity: "success",
      category: "soil",
      icon: CheckCircle,
      time: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      priority: "low",
      action: "Continue current irrigation schedule. Monitor for any changes."
    },
    {
      id: 5,
      title: "Harvest Window Opening",
      description: "Your corn crop is ready for harvest. Weather conditions are favorable for the next 5 days.",
      severity: "info",
      category: "harvest",
      icon: Calendar,
      time: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      priority: "medium",
      action: "Begin harvest operations. Check equipment and arrange labor if needed."
    },
    {
      id: 6,
      title: "Wind Speed Warning",
      description: "Strong winds (25 km/h) expected tomorrow. Avoid spraying pesticides and secure structures.",
      severity: "warning",
      category: "weather",
      icon: Wind,
      time: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      priority: "medium",
      action: "Postpone pesticide application and secure any loose equipment or structures."
    }
  ];

  const categories = [
    { id: 'all', label: t['advisory.allAdvisories'], icon: Filter },
    { id: 'weather', label: t['advisory.weather'], icon: Sun },
    { id: 'pests', label: t['advisory.pests'], icon: Bug },
    { id: 'soil', label: t['advisory.soil'], icon: Droplets },
    { id: 'harvest', label: t['advisory.harvest'], icon: Calendar },
    { id: 'equipment', label: t['advisory.equipment'], icon: Shield }
  ];

  const filteredAdvisories = advisories.filter(advisory => {
    const matchesFilter = filter === 'all' || advisory.category === filter;
    const matchesSearch = advisory.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         advisory.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'error': return 'border-red-200 bg-red-50 text-red-800';
      case 'warning': return 'border-orange-200 bg-orange-50 text-orange-800';
      case 'info': return 'border-blue-200 bg-blue-50 text-blue-800';
      case 'success': return 'border-green-200 bg-green-50 text-green-800';
      default: return 'border-gray-200 bg-gray-50 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Page title={t['advisory.title']} subtitle={t['advisory.subtitle']}>
      {/* Filters and Search */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={t['advisory.searchPlaceholder']}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-leaf-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setFilter(category.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === category.id
                      ? 'bg-leaf-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <IconComponent size={16} />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Advisories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAdvisories.map((advisory, index) => {
          const IconComponent = advisory.icon;
          return (
            <motion.div
              key={advisory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`border-l-4 ${getSeverityColor(advisory.severity)}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getSeverityColor(advisory.severity)}`}>
                        <IconComponent size={20} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{advisory.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Clock size={14} />
                          {advisory.time.toLocaleString()}
                        </CardDescription>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(advisory.priority)}`}>
                      {advisory.priority}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{advisory.description}</p>
                  <div className="bg-white/50 p-3 rounded-lg">
                    <div className="flex items-start gap-2">
                      <TrendingUp size={16} className="text-leaf-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{t['advisory.recommendedAction']}</p>
                        <p className="text-sm text-gray-600">{advisory.action}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {advisories.filter(a => a.priority === 'high').length}
            </div>
            <div className="text-sm text-gray-600">{t['advisory.highPriority']}</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {advisories.filter(a => a.priority === 'medium').length}
            </div>
            <div className="text-sm text-gray-600">{t['advisory.mediumPriority']}</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {advisories.filter(a => a.priority === 'low').length}
            </div>
            <div className="text-sm text-gray-600">{t['advisory.lowPriority']}</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {advisories.length}
            </div>
            <div className="text-sm text-gray-600">{t['advisory.totalAdvisories']}</div>
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}
