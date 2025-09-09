import {
    AlertCircle,
    Battery,
    Bell,
    Database,
    Download,
    Globe,
    Info,
    Moon,
    Settings as SettingsIcon,
    Shield,
    Smartphone,
    Sun,
    Trash2,
    Upload,
    User,
    Volume2,
    Wifi
} from 'lucide-react';
import React, { useState } from 'react';
import Page from '../components/Page';
import Button from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import Label from '../components/ui/label';
import Switch from '../components/ui/switch';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/I18nContext';

export default function Settings() {
  const { t } = useI18n();
  const { user } = useAuth();

  // Notification Settings
  const [alerts, setAlerts] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [weatherAlerts, setWeatherAlerts] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [reminderAlerts, setReminderAlerts] = useState(true);

  // App Settings
  const [tts, setTts] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [autoSync, setAutoSync] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);

  // Privacy & Security
  const [dataSharing, setDataSharing] = useState(false);
  const [locationTracking, setLocationTracking] = useState(true);
  const [analytics, setAnalytics] = useState(true);

  // Storage & Data
  const [cacheSize, setCacheSize] = useState('2.3 MB');
  const [dataUsage, setDataUsage] = useState('45.2 MB');

  const handleExportData = () => {
    // Implement data export functionality
    console.log('Exporting data...');
  };

  const handleImportData = () => {
    // Implement data import functionality
    console.log('Importing data...');
  };

  const handleClearCache = () => {
    // Implement cache clearing functionality
    console.log('Clearing cache...');
  };

  const handleDeleteAccount = () => {
    // Implement account deletion functionality
    console.log('Deleting account...');
  };

  return (
    <Page title={t['settings.title']} subtitle="Customize your farming experience">
      <div className="space-y-6">
        {/* User Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User size={20} className="text-leaf-600" />
              {t['settings.profile']}
            </CardTitle>
            <CardDescription>
              {t['settings.profileDescription']}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-leaf-500 to-leaf-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'F'}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{user?.displayName || 'Farmer'}</h3>
                <p className="text-gray-600">{user?.email}</p>
                <p className="text-sm text-gray-500">{t['settings.memberSince']} 2024</p>
              </div>
              <Button variant="outline" size="sm">
                <SettingsIcon size={16} className="mr-2" />
                {t['settings.editProfile']}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell size={20} className="text-leaf-600" />
              {t['settings.notifications']}
            </CardTitle>
            <CardDescription>
              {t['settings.notificationsDescription']}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell size={16} className="text-gray-500" />
                <div>
                  <div className="font-medium">{t['settings.enableAlerts']}</div>
                  <div className="text-sm text-gray-600">{t['settings.alertsDescription']}</div>
                </div>
              </div>
              <Switch checked={alerts} onChange={setAlerts} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone size={16} className="text-gray-500" />
                <div>
                  <div className="font-medium">{t['settings.pushNotifications']}</div>
                  <div className="text-sm text-gray-600">{t['settings.pushDescription']}</div>
                </div>
              </div>
              <Switch checked={pushNotifications} onChange={setPushNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe size={16} className="text-gray-500" />
                <div>
                  <div className="font-medium">{t['settings.emailNotifications']}</div>
                  <div className="text-sm text-gray-600">{t['settings.emailDescription']}</div>
                </div>
              </div>
              <Switch checked={emailNotifications} onChange={setEmailNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sun size={16} className="text-gray-500" />
                <div>
                  <div className="font-medium">{t['settings.weatherAlerts']}</div>
                  <div className="text-sm text-gray-600">{t['settings.weatherDescription']}</div>
                </div>
              </div>
              <Switch checked={weatherAlerts} onChange={setWeatherAlerts} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Database size={16} className="text-gray-500" />
                <div>
                  <div className="font-medium">{t['settings.priceAlerts']}</div>
                  <div className="text-sm text-gray-600">{t['settings.priceDescription']}</div>
                </div>
              </div>
              <Switch checked={priceAlerts} onChange={setPriceAlerts} />
            </div>
          </CardContent>
        </Card>

        {/* App Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon size={20} className="text-leaf-600" />
              {t['settings.appPreferences']}
            </CardTitle>
            <CardDescription>
              {t['settings.appPreferencesDescription']}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 size={16} className="text-gray-500" />
                <div>
                  <div className="font-medium">{t['settings.textToSpeech']}</div>
                  <div className="text-sm text-gray-600">{t['settings.ttsDescription']}</div>
                </div>
              </div>
              <Switch checked={tts} onChange={setTts} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode ? <Moon size={16} className="text-gray-500" /> : <Sun size={16} className="text-gray-500" />}
                <div>
                  <div className="font-medium">{t['settings.darkMode']}</div>
                  <div className="text-sm text-gray-600">{t['settings.darkModeDescription']}</div>
                </div>
              </div>
              <Switch checked={darkMode} onChange={setDarkMode} />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Globe size={16} className="text-gray-500" />
                {t['settings.language']}
              </Label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-500 focus:border-transparent"
              >
                <option value="en">English</option>
                <option value="ml">മലയാളം</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Wifi size={16} className="text-gray-500" />
                <div>
                  <div className="font-medium">{t['settings.autoSync']}</div>
                  <div className="text-sm text-gray-600">{t['settings.autoSyncDescription']}</div>
                </div>
              </div>
              <Switch checked={autoSync} onChange={setAutoSync} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Battery size={16} className="text-gray-500" />
                <div>
                  <div className="font-medium">{t['settings.offlineMode']}</div>
                  <div className="text-sm text-gray-600">{t['settings.offlineDescription']}</div>
                </div>
              </div>
              <Switch checked={offlineMode} onChange={setOfflineMode} />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield size={20} className="text-leaf-600" />
              {t['settings.privacySecurity']}
            </CardTitle>
            <CardDescription>
              {t['settings.privacyDescription']}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Database size={16} className="text-gray-500" />
                <div>
                  <div className="font-medium">{t['settings.dataSharing']}</div>
                  <div className="text-sm text-gray-600">{t['settings.dataSharingDescription']}</div>
                </div>
              </div>
              <Switch checked={dataSharing} onChange={setDataSharing} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe size={16} className="text-gray-500" />
                <div>
                  <div className="font-medium">{t['settings.locationTracking']}</div>
                  <div className="text-sm text-gray-600">{t['settings.locationDescription']}</div>
                </div>
              </div>
              <Switch checked={locationTracking} onChange={setLocationTracking} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Info size={16} className="text-gray-500" />
                <div>
                  <div className="font-medium">{t['settings.analytics']}</div>
                  <div className="text-sm text-gray-600">{t['settings.analyticsDescription']}</div>
                </div>
              </div>
              <Switch checked={analytics} onChange={setAnalytics} />
            </div>
          </CardContent>
        </Card>

        {/* Storage & Data */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database size={20} className="text-leaf-600" />
              {t['settings.storageData']}
            </CardTitle>
            <CardDescription>
              {t['settings.storageDescription']}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">{t['settings.cacheSize']}</div>
                <div className="text-2xl font-bold text-leaf-600">{cacheSize}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">{t['settings.dataUsage']}</div>
                <div className="text-2xl font-bold text-leaf-600">{dataUsage}</div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleExportData} className="flex-1">
                <Download size={16} className="mr-2" />
                {t['settings.exportData']}
              </Button>
              <Button variant="outline" onClick={handleImportData} className="flex-1">
                <Upload size={16} className="mr-2" />
                {t['settings.importData']}
              </Button>
            </div>

            <Button variant="outline" onClick={handleClearCache} className="w-full">
              <Trash2 size={16} className="mr-2" />
              {t['settings.clearCache']}
            </Button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle size={20} />
              {t['settings.dangerZone']}
            </CardTitle>
            <CardDescription>
              {t['settings.dangerDescription']}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              onClick={handleDeleteAccount}
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              <Trash2 size={16} className="mr-2" />
              {t['settings.deleteAccount']}
            </Button>
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}
