import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import Input from '../components/ui/input';
import Label from '../components/ui/label';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      await signup({ email, password, displayName: name });
      navigate('/profile', { replace: true });
    } catch (err) {
      setError(err?.message || 'Unable to create account.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-leaf-50/40 grid place-items-center">
      <div className="w-full max-w-md bg-white/70 backdrop-blur rounded-xl shadow-lg p-6 border border-leaf-100">
        <h1 className="text-2xl font-semibold text-leaf-900">Create your account</h1>
        <p className="text-leaf-600 mb-6">Join Krishi Sakhi in a minute</p>

        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-100 rounded-md p-3">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required disabled={loading} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required disabled={loading} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a password" required disabled={loading} />
              <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute inset-y-0 right-2 my-auto text-leaf-700 hover:text-leaf-900 p-1" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                {showPassword ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm">Confirm password</Label>
            <Input id="confirm" type={showPassword ? 'text' : 'password'} value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repeat password" required disabled={loading} />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating account…' : 'Create account'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-leaf-700">
          Already have an account? <Link to="/login" className="text-leaf-900 underline-offset-2 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}


