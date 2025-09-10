import { Leaf, LogOut, Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/I18nContext';
import LanguageToggle from './LanguageToggle';

export default function NavBar(){
  const { t } = useI18n();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if user is on landing page
  const isLandingPage = location.pathname === '/' || location.pathname === '/features';

  const handleLogout = async () => {
    try {
      await logout();
      setMobileMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-leaf-100">
      <div className="w-full px-4 py-3 flex items-center justify-end">
        {/* Translate button, profile, and logout button on the far right */}
        <div className="flex items-center gap-2">
          <LanguageToggle />

          {/* Auth Links - Show different content based on authentication status */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              // Authenticated user - show logout and profile
              <>
                <Link to="/profile" className="px-3 py-1.5 rounded-xl hover:bg-leaf-50 transition-colors text-sm">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-xl hover:bg-red-50 text-red-600 transition-colors text-sm flex items-center gap-1"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </>
            ) : (
              // Guest user - show login/signup
              <>
                <Link to="/login" className="px-3 py-1.5 rounded-xl hover:bg-leaf-50 transition-colors text-sm">
                  {t["auth.loginLink"]}
                </Link>
                <Link to="/signup" className="px-3 py-1.5 rounded-xl bg-leaf-600 text-white hover:bg-leaf-700 transition-colors text-sm">
                  {t["auth.signupLink"]}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-leaf-50 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-leaf-100 bg-white">

          {/* Mobile Auth Links */}
          <div className="px-4 py-3 border-t border-leaf-100 flex flex-col gap-2">
            {user ? (
              // Authenticated user mobile auth
              <>
                <Link
                  to="/profile"
                  className="px-3 py-2 rounded-xl hover:bg-leaf-50 transition-colors text-sm text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-xl hover:bg-red-50 text-red-600 transition-colors text-sm text-center flex items-center justify-center gap-1"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </>
            ) : (
              // Guest user mobile auth
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-xl hover:bg-leaf-50 transition-colors text-sm text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t["auth.loginLink"]}
                </Link>
                <Link
                  to="/signup"
                  className="px-3 py-2 rounded-xl bg-leaf-600 text-white hover:bg-leaf-700 transition-colors text-sm text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t["auth.signupLink"]}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
