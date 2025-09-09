import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/I18nContext';

export default function SignUp() {
  const { t } = useI18n();
  const { signup, signupWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    if (!formData.name.trim()) {
      newErrors.name = t["auth.nameRequired"];
    }

    if (!formData.email.trim()) {
      newErrors.email = t["auth.emailRequired"];
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t["auth.emailInvalid"];
    }

    if (!formData.password) {
      newErrors.password = t["auth.passwordRequired"];
    } else if (formData.password.length < 6) {
      newErrors.password = t["auth.passwordMinLength"];
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t["auth.confirmPasswordRequired"];
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t["auth.passwordsDoNotMatch"];
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
      await signup({
        email: formData.email,
        password: formData.password,
        displayName: formData.name
      });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err?.message || t["auth.signupError"]);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError('');
    setGoogleLoading(true);
    try {
      await signupWithGoogle();
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err?.message || t["auth.googleSignupError"]);
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
              <User className="h-6 w-6 text-white" />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              {t["auth.signupTitle"]}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {t["auth.signupSubtitle"]}
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
            {/* Name Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                {t["auth.name"]}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-leaf-500" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className={`w-full pl-10 pr-3 py-3 text-sm border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-leaf-500 focus:border-transparent ${
                    errors.name
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200 bg-white hover:border-leaf-300 focus:bg-white'
                  }`}
                  placeholder={t["auth.namePlaceholder"]}
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading || googleLoading}
                />
              </div>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 text-xs text-red-600 flex items-center"
                >
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-1"></span>
                  {errors.name}
                </motion.p>
              )}
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
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
              transition={{ duration: 0.6, delay: 0.4 }}
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

            {/* Confirm Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-1">
                {t["auth.confirmPassword"]}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-leaf-500" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  className={`w-full pl-10 pr-10 py-3 text-sm border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-leaf-500 focus:border-transparent ${
                    errors.confirmPassword
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200 bg-white hover:border-leaf-300 focus:bg-white'
                  }`}
                  placeholder={t["auth.confirmPasswordPlaceholder"]}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={loading || googleLoading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={loading || googleLoading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 text-xs text-red-600 flex items-center"
                >
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-1"></span>
                  {errors.confirmPassword}
                </motion.p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <button
                type="submit"
                disabled={loading || googleLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-leaf-600 to-leaf-700 text-white font-semibold text-base rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-leaf-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? "Creating account…" : t["auth.signupButton"]}
              </button>
            </motion.div>

            {/* Google Signup Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
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
                onClick={handleGoogleSignup}
                disabled={loading || googleLoading}
                className="w-full mt-4 py-3 px-4 border-2 border-gray-200 text-gray-700 font-semibold text-base rounded-lg hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-leaf-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <FcGoogle className="mr-2 h-4 w-4" />
                {googleLoading ? "Signing up with Google…" : t["auth.googleSignup"]}
              </button>
            </motion.div>

            {/* Login Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-center"
            >
              <p className="text-sm text-gray-600">
                {t["auth.alreadyHaveAccount"]}{' '}
                <Link
                  to="/login"
                  className="font-semibold text-leaf-600 hover:text-leaf-700 transition-colors duration-200"
                >
                  {t["auth.loginLink"]}
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
