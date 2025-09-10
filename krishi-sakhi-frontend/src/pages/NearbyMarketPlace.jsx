import { motion } from 'framer-motion';
import {
    Calendar,
    Clock,
    Filter,
    MapPin,
    Navigation,
    Phone,
    Search,
    Store
} from 'lucide-react';
import React, { useState } from 'react';
import Page from '../components/Page';
import Badge from '../components/ui/badge';
import Button from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import Input from '../components/ui/input';
import { useI18n } from '../context/I18nContext';

export default function NearbyMarketPlace() {
  const { t } = useI18n();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const marketData = [
    {
      id: 1,
      name: 'Nedumangad Wholesale Market',
      location: 'Thiruvananthapuram',
      district: 'Thiruvananthapuram',
      type: 'Wholesale',
      description: t["marketplace.marketDescriptions.nedumangad"],
      operatingHours: '4:00 AM - 8:00 PM',
      contact: '+91 471 2345678',
      established: '1985',
      facilities: [
        t["marketplace.facilities.parking"],
        t["marketplace.facilities.coldStorage"],
        t["marketplace.facilities.weighing"],
        t["marketplace.facilities.loading"]
      ],
      distance: '15 km',
      rating: 4.5,
      image: '/api/placeholder/300/200'
    },
    {
      id: 2,
      name: 'Anayara Urban Wholesale Market',
      location: 'Thiruvananthapuram',
      district: 'Thiruvananthapuram',
      type: 'Wholesale',
      description: t["marketplace.marketDescriptions.anayara"],
      operatingHours: '5:00 AM - 7:00 PM',
      contact: '+91 471 2345679',
      established: '2010',
      facilities: [
        t["marketplace.facilities.parking"],
        t["marketplace.facilities.coldStorage"],
        t["marketplace.facilities.weighing"],
        t["marketplace.facilities.loading"],
        t["marketplace.facilities.digitalPayment"]
      ],
      distance: '12 km',
      rating: 4.3,
      image: '/api/placeholder/300/200'
    },
    {
      id: 3,
      name: 'Spices Park',
      location: 'Puttady, Idukki',
      district: 'Idukki',
      type: 'Crop-Specific Wholesale',
      description: t["marketplace.marketDescriptions.spices"],
      operatingHours: '6:00 AM - 6:00 PM',
      contact: '+91 486 2345680',
      established: '2000',
      facilities: [
        t["marketplace.facilities.parking"],
        t["marketplace.facilities.coldStorage"],
        t["marketplace.facilities.qualityTesting"],
        t["marketplace.facilities.exportFacility"]
      ],
      distance: '45 km',
      rating: 4.7,
      image: '/api/placeholder/300/200'
    },
    {
      id: 4,
      name: 'VFPCK Farmer\'s Market',
      location: 'Multiple districts',
      district: 'Multiple',
      type: 'Farmer-Operated',
      description: t["marketplace.marketDescriptions.vfpck"],
      operatingHours: '6:00 AM - 8:00 PM',
      contact: '+91 471 2345681',
      established: '1995',
      facilities: [
        t["marketplace.facilities.directSelling"],
        t["marketplace.facilities.organicProducts"],
        t["marketplace.facilities.fairPricing"],
        t["marketplace.facilities.farmerSupport"]
      ],
      distance: '8 km',
      rating: 4.6,
      image: '/api/placeholder/300/200'
    },
    {
      id: 5,
      name: 'Horticorp Markets',
      location: 'Multiple districts',
      district: 'Multiple',
      type: 'Horticultural Wholesale',
      description: t["marketplace.marketDescriptions.horticorp"],
      operatingHours: '5:00 AM - 7:00 PM',
      contact: '+91 471 2345682',
      established: '1980',
      facilities: [
        t["marketplace.facilities.qualityAssurance"],
        t["marketplace.facilities.coldStorage"],
        t["marketplace.facilities.governmentSupport"],
        t["marketplace.facilities.fairPricing"]
      ],
      distance: '10 km',
      rating: 4.4,
      image: '/api/placeholder/300/200'
    },
    {
      id: 6,
      name: 'Regional Periodical Market (RPM)',
      location: 'Various rural centers',
      district: 'Multiple',
      type: 'Rural Periodical Market',
      description: t["marketplace.marketDescriptions.rpm"],
      operatingHours: '6:00 AM - 2:00 PM (Periodic)',
      contact: '+91 471 2345683',
      established: '1970',
      facilities: [
        t["marketplace.facilities.traditionalTrading"],
        t["marketplace.facilities.localProducts"],
        t["marketplace.facilities.communitySupport"],
        t["marketplace.facilities.culturalHeritage"]
      ],
      distance: '25 km',
      rating: 4.2,
      image: '/api/placeholder/300/200'
    }
  ];

  const marketTypes = [
    { value: 'all', label: t["marketplace.allMarkets"], count: marketData.length },
    { value: 'Wholesale', label: t["marketplace.wholesale"], count: marketData.filter(m => m.type === 'Wholesale').length },
    { value: 'Crop-Specific Wholesale', label: t["marketplace.cropSpecific"], count: marketData.filter(m => m.type === 'Crop-Specific Wholesale').length },
    { value: 'Farmer-Operated', label: t["marketplace.farmerOperated"], count: marketData.filter(m => m.type === 'Farmer-Operated').length },
    { value: 'Horticultural Wholesale', label: t["marketplace.horticultural"], count: marketData.filter(m => m.type === 'Horticultural Wholesale').length },
    { value: 'Rural Periodical Market', label: t["marketplace.ruralPeriodical"], count: marketData.filter(m => m.type === 'Rural Periodical Market').length }
  ];

  const filteredMarkets = marketData.filter(market => {
    const matchesSearch = market.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         market.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         market.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || market.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getTypeColor = (type) => {
    const colors = {
      'Wholesale': 'bg-blue-100 text-blue-800',
      'Crop-Specific Wholesale': 'bg-green-100 text-green-800',
      'Farmer-Operated': 'bg-orange-100 text-orange-800',
      'Horticultural Wholesale': 'bg-purple-100 text-purple-800',
      'Rural Periodical Market': 'bg-yellow-100 text-yellow-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const openGoogleMaps = (market) => {
    const query = encodeURIComponent(`${market.name}, ${market.location}, Kerala, India`);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <Page title={t["marketplace.title"]} subtitle={t["marketplace.subtitle"]}>
      <div className="space-y-6">
        {/* Search and Filter Section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    placeholder={t["marketplace.searchPlaceholder"]}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {marketTypes.map((type) => (
                  <Button
                    key={type.value}
                    variant={selectedType === type.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedType(type.value)}
                    className="flex items-center gap-2"
                  >
                    <Filter size={16} />
                    {type.label} ({type.count})
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-leaf-600">{marketData.length}</div>
              <div className="text-sm text-gray-600">{t["marketplace.totalMarkets"]}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-leaf-600">{filteredMarkets.length}</div>
              <div className="text-sm text-gray-600">{t["marketplace.filteredResults"]}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-leaf-600">4.5</div>
              <div className="text-sm text-gray-600">{t["marketplace.averageRating"]}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-leaf-600">6</div>
              <div className="text-sm text-gray-600">{t["marketplace.districtsCovered"]}</div>
            </CardContent>
          </Card>
        </div>

        {/* Markets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMarkets.map((market, index) => (
            <motion.div
              key={market.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{market.name}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <MapPin size={16} />
                        <span>{market.location}</span>
                      </div>
                      <Badge className={getTypeColor(market.type)}>
                        {market.type}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-leaf-600">{market.distance}</div>
                      <div className="text-xs text-gray-500">{t["marketplace.away"]}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="mb-4">
                    {market.description}
                  </CardDescription>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock size={16} className="text-gray-400" />
                      <span>{market.operatingHours}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Phone size={16} className="text-gray-400" />
                      <span>{market.contact}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Calendar size={16} className="text-gray-400" />
                      <span>Est. {market.established}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${
                              i < Math.floor(market.rating)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                        <span className="ml-1 text-gray-600">({market.rating})</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">{t["marketplace.facilities"]}</div>
                    <div className="flex flex-wrap gap-1">
                      {market.facilities.map((facility, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => openGoogleMaps(market)}
                    >
                      <Navigation size={16} className="mr-2" />
                      {t["marketplace.directions"]}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(`tel:${market.contact}`, '_self')}
                    >
                      <Phone size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredMarkets.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Store size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t["marketplace.noMarketsFound"]}</h3>
              <p className="text-gray-600">
                {t["marketplace.noMarketsDescription"]}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </Page>
  );
}
