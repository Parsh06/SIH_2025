import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, LogIn, Mail } from 'lucide-react';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/I18nContext';

export default function Login() {
  const { t } = useI18n();
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = t["auth.emailRequired"];
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t["auth.emailInvalid"];
    }

    if (!formData.password) {
      newErrors.password = t["auth.passwordRequired"];
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await login({ email: formData.email, password: formData.password });
      const redirectTo = params.get("redirect") || "/dashboard";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err?.message || t["auth.loginError"]);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      const redirectTo = params.get("redirect") || "/dashboard";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err?.message || t["auth.googleLoginError"]);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-leaf-50 via-white to-leaf-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-6"
          >
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-leaf-500 to-leaf-600 shadow-lg">
              <LogIn className="h-6 w-6 text-white" />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              {t["auth.loginTitle"]}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {t["auth.loginSubtitle"]}
            </p>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 text-sm text-red-700 bg-red-50 border border-red-100 rounded-md p-3"
            >
              {error}
            </motion.div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                {t["auth.email"]}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-leaf-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`w-full pl-10 pr-3 py-3 text-sm border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-leaf-500 focus:border-transparent ${
                    errors.email
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200 bg-white hover:border-leaf-300 focus:bg-white'
                  }`}
                  placeholder={t["auth.emailPlaceholder"]}
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading || googleLoading}
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 text-xs text-red-600 flex items-center"
                >
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-1"></span>
                  {errors.email}
                </motion.p>
              )}
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                {t["auth.password"]}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-leaf-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className={`w-full pl-10 pr-10 py-3 text-sm border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-leaf-500 focus:border-transparent ${
                    errors.password
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200 bg-white hover:border-leaf-300 focus:bg-white'
                  }`}
                  placeholder={t["auth.passwordPlaceholder"]}
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading || googleLoading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading || googleLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 text-xs text-red-600 flex items-center"
                >
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-1"></span>
                  {errors.password}
                </motion.p>
              )}
            </motion.div>

            {/* Remember Me & Forgot Password */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-leaf-600 focus:ring-leaf-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm font-medium text-gray-700">
                  {t["auth.rememberMe"]}
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-semibold text-leaf-600 hover:text-leaf-700 transition-colors duration-200"
                >
                  {t["auth.forgotPassword"]}
                </Link>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <button
                type="submit"
                disabled={loading || googleLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-leaf-600 to-leaf-700 text-white font-semibold text-base rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-leaf-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? "Signing in…" : t["auth.loginButton"]}
              </button>
            </motion.div>

            {/* Google Login Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading || googleLoading}
                className="w-full mt-4 py-3 px-4 border-2 border-gray-200 text-gray-700 font-semibold text-base rounded-lg hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-leaf-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <FcGoogle className="mr-2 h-4 w-4" />
                {googleLoading ? "Signing in with Google…" : t["auth.googleLogin"]}
              </button>
            </motion.div>

            {/* Sign Up Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center"
            >
              <p className="text-sm text-gray-600">
                {t["auth.dontHaveAccount"]}{' '}
                <Link
                  to="/signup"
                  className="font-semibold text-leaf-600 hover:text-leaf-700 transition-colors duration-200"
                >
                  {t["auth.signupLink"]}
                </Link>
              </p>
            </motion.div>
          </form>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-leaf-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-leaf-300/20 rounded-full blur-2xl"></div>
      </motion.div>
    </div>
  );
}
