
import { motion } from 'framer-motion';
import {
    Award,
    BookOpen,
    Bug,
    Calendar,
    Clock,
    Download,
    Droplets,
    Eye,
    Filter,
    Leaf,
    Play,
    Search,
    Star,
    Sun
} from 'lucide-react';
import React, { useState } from 'react';
import Page from '../components/Page';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useI18n } from '../context/I18nContext';

const knowledgeItems = [
  {
    id: 1,
    title: "Complete Rice Farming Guide",
    desc: "Comprehensive guide covering soil preparation, sowing, irrigation, pest management, and harvesting techniques for optimal rice yield.",
    category: "crops",
    icon: Leaf,
    difficulty: "beginner",
    duration: "15 min read",
    rating: 4.8,
    views: 1250,
    type: "article",
    tags: ["rice", "kharif", "irrigation", "harvest"],
    content: "Learn the complete process of rice cultivation from field preparation to post-harvest management..."
  },
  {
    id: 2,
    title: "Pest Management: Aphids Control",
    desc: "Effective strategies to identify, prevent, and control aphid infestations in vegetable crops using organic and chemical methods.",
    category: "pests",
    icon: Bug,
    difficulty: "intermediate",
    duration: "8 min read",
    rating: 4.6,
    views: 890,
    type: "article",
    tags: ["pests", "aphids", "organic", "control"],
    content: "Aphids are one of the most common pests affecting vegetable crops. Learn identification and control methods..."
  },
  {
    id: 3,
    title: "Soil Health Assessment",
    desc: "Step-by-step guide to assess soil health, interpret test results, and implement soil improvement strategies.",
    category: "soil",
    icon: Droplets,
    difficulty: "advanced",
    duration: "12 min read",
    rating: 4.9,
    views: 2100,
    type: "article",
    tags: ["soil", "health", "testing", "improvement"],
    content: "Understanding soil health is crucial for sustainable farming. Learn how to assess and improve your soil..."
  },
  {
    id: 4,
    title: "Weather-Based Irrigation Planning",
    desc: "Video tutorial on how to plan irrigation schedules based on weather forecasts and crop water requirements.",
    category: "irrigation",
    icon: Sun,
    difficulty: "intermediate",
    duration: "20 min video",
    rating: 4.7,
    views: 1560,
    type: "video",
    tags: ["irrigation", "weather", "planning", "water"],
    content: "Master the art of efficient irrigation planning using weather data and crop requirements..."
  },
  {
    id: 5,
    title: "Organic Farming Certification",
    desc: "Complete guide to organic farming practices, certification process, and market opportunities for organic produce.",
    category: "organic",
    icon: Award,
    difficulty: "advanced",
    duration: "25 min read",
    rating: 4.8,
    views: 3200,
    type: "article",
    tags: ["organic", "certification", "market", "sustainable"],
    content: "Transition to organic farming with this comprehensive guide covering certification and market strategies..."
  },
  {
    id: 6,
    title: "Crop Rotation Strategies",
    desc: "Learn effective crop rotation patterns to improve soil fertility, reduce pests, and increase yields.",
    category: "planning",
    icon: Calendar,
    difficulty: "beginner",
    duration: "10 min read",
    rating: 4.5,
    views: 980,
    type: "article",
    tags: ["rotation", "planning", "fertility", "yield"],
    content: "Discover the benefits of crop rotation and learn practical rotation strategies for your farm..."
  }
];

const categories = [
  { id: 'all', label: 'All Topics', icon: Filter },
  { id: 'crops', label: 'Crop Management', icon: Leaf },
  { id: 'pests', label: 'Pest Control', icon: Bug },
  { id: 'soil', label: 'Soil Health', icon: Droplets },
  { id: 'irrigation', label: 'Irrigation', icon: Sun },
  { id: 'organic', label: 'Organic Farming', icon: Award },
  { id: 'planning', label: 'Farm Planning', icon: Calendar }
];

export default function Knowledge(){
  const { t } = useI18n();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  const filteredItems = knowledgeItems.filter(item => {
    const matchesCategory = filter === 'all' || item.category === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDifficulty = difficultyFilter === 'all' || item.difficulty === difficultyFilter;
    return matchesCategory && matchesSearch && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    return type === 'video' ? Play : BookOpen;
  };

  return (
    <Page title="Knowledge Base" subtitle="Comprehensive farming guides, tutorials, and best practices">
      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search knowledge base..."
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

        {/* Difficulty Filter */}
        <div className="mt-4 flex gap-2">
          <span className="text-sm text-gray-600 flex items-center">Difficulty:</span>
          {['all', 'beginner', 'intermediate', 'advanced'].map(level => (
            <button
              key={level}
              onClick={() => setDifficultyFilter(level)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                difficultyFilter === level
                  ? 'bg-leaf-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Knowledge Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => {
          const IconComponent = item.icon;
          const TypeIcon = getTypeIcon(item.type);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="p-2 bg-leaf-100 rounded-lg group-hover:bg-leaf-200 transition-colors">
                      <IconComponent size={24} className="text-leaf-600" />
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star size={16} fill="currentColor" />
                      <span className="text-sm font-medium">{item.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-leaf-600 transition-colors">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600 line-clamp-2">
                    {item.desc}
                  </CardDescription>
            </CardHeader>
            <CardContent>
                  <div className="space-y-3">
                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <TypeIcon size={14} />
                        <span>{item.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye size={14} />
                        <span>{item.views}</span>
                      </div>
                    </div>

                    {/* Difficulty Badge */}
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(item.difficulty)}`}>
                        {item.difficulty}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock size={12} />
                        <span>{item.duration}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <button className="flex-1 bg-leaf-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-leaf-700 transition-colors flex items-center justify-center gap-2">
                        <BookOpen size={16} />
                        Read
                      </button>
                      {item.type === 'video' && (
                        <button className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <Play size={16} />
                        </button>
                      )}
                      <button className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Stats Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-leaf-600 mb-2">
              {knowledgeItems.length}
            </div>
            <div className="text-sm text-gray-600">Total Articles</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {knowledgeItems.filter(item => item.type === 'video').length}
            </div>
            <div className="text-sm text-gray-600">Video Tutorials</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {Math.round(knowledgeItems.reduce((acc, item) => acc + item.rating, 0) / knowledgeItems.length * 10) / 10}
            </div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {knowledgeItems.reduce((acc, item) => acc + item.views, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Views</div>
            </CardContent>
          </Card>
      </div>
    </Page>
  );
}
