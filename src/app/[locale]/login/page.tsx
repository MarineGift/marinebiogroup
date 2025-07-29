'use client';
import { supabase } from '@/lib/supabaseClient';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) alert(error.message);
    else alert('Magic link sent!');
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4 text-purple-600">Login</h1>
      <input
        type="email"
        placeholder="Your email"
        className="w-full border p-2 mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleLogin} className="w-full bg-purple-600 text-white py-2 rounded">
        Send Magic Link
      </button>
    </div>
  );
}
