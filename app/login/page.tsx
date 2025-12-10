'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Form from '@/app/components/Form';
import FormTitle from '@/app/components/FormTitle';
import FormField from '@/app/components/FormField';
import Button from '@/app/components/Button';
import HomeportLogo from '../components/HomeportLogo';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push('/');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-8 font-sans">
      <HomeportLogo />
      <Form>
        <FormTitle title="Login" />
        <div className="flex flex-col gap-4 p-6">
          <FormField
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormField
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="pt-4">
            <Button
              variant="filled"
              onClick={handleLogin}
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
