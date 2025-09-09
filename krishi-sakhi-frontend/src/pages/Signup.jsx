import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import Input from "../components/ui/input";
import Label from "../components/ui/label";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import {
  validateEmail,
  validatePassword,
  validateName,
  validateConfirmPassword,
} from "../utils/validation";

export default function Signup() {
  const { signup, signupWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const validateFields = () => {
    const errors = {};
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmError = validateConfirmPassword(password, confirm);

    if (nameError) errors.name = nameError;
    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;
    if (confirmError) errors.confirm = confirmError;

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    if (!validateFields()) {
      return;
    }

    setLoading(true);
    try {
      await signup({ email, password, displayName: name });
      navigate("/profile", { replace: true });
    } catch (err) {
      setError(err?.message || "Unable to create account.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignup() {
    setError("");
    setGoogleLoading(true);
    try {
      await signupWithGoogle();
      navigate("/profile", { replace: true });
    } catch (err) {
      setError(err?.message || "Google sign-up failed.");
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-leaf-50/40 grid place-items-center">
      <div className="w-full max-w-md bg-white/70 backdrop-blur rounded-xl shadow-lg p-6 border border-leaf-100">
        <h1 className="text-2xl font-semibold text-leaf-900">
          Create your account
        </h1>
        <p className="text-leaf-600 mb-6">Join Krishi Sakhi in a minute</p>

        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-100 rounded-md p-3">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (fieldErrors.name) {
                  setFieldErrors((prev) => ({ ...prev, name: null }));
                }
              }}
              placeholder="Your name"
              required
              disabled={loading || googleLoading}
              className={
                fieldErrors.name ? "border-red-300 focus:border-red-500" : ""
              }
            />
            {fieldErrors.name && (
              <p className="text-sm text-red-600">{fieldErrors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (fieldErrors.email) {
                  setFieldErrors((prev) => ({ ...prev, email: null }));
                }
              }}
              placeholder="you@example.com"
              required
              disabled={loading || googleLoading}
              className={
                fieldErrors.email ? "border-red-300 focus:border-red-500" : ""
              }
            />
            {fieldErrors.email && (
              <p className="text-sm text-red-600">{fieldErrors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password) {
                    setFieldErrors((prev) => ({ ...prev, password: null }));
                  }
                }}
                placeholder="Create a password"
                required
                disabled={loading || googleLoading}
                className={
                  fieldErrors.password
                    ? "border-red-300 focus:border-red-500"
                    : ""
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-2 my-auto text-leaf-700 hover:text-leaf-900 p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <MdVisibilityOff size={18} />
                ) : (
                  <MdVisibility size={18} />
                )}
              </button>
            </div>
            {fieldErrors.password && (
              <p className="text-sm text-red-600">{fieldErrors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm">Confirm password</Label>
            <Input
              id="confirm"
              type={showPassword ? "text" : "password"}
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value);
                if (fieldErrors.confirm) {
                  setFieldErrors((prev) => ({ ...prev, confirm: null }));
                }
              }}
              placeholder="Repeat password"
              required
              disabled={loading || googleLoading}
              className={
                fieldErrors.confirm ? "border-red-300 focus:border-red-500" : ""
              }
            />
            {fieldErrors.confirm && (
              <p className="text-sm text-red-600">{fieldErrors.confirm}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading || googleLoading}
          >
            {loading ? "Creating account…" : "Create account"}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-leaf-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-leaf-500">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full mt-4"
            onClick={handleGoogleSignup}
            disabled={loading || googleLoading}
          >
            <FcGoogle className="mr-2 h-4 w-4" />
            {googleLoading ? "Signing up with Google…" : "Sign up with Google"}
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-leaf-700">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-leaf-900 underline-offset-2 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
