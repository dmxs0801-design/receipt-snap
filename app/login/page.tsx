'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (mode === 'register') {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setMessage(error.message);
      else setMessage('注册成功！请查收邮件验证（或直接去登录）');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message);
      else {
        setMessage('登录成功！');
        window.location.href = '/dashboard';
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center px-4">
      <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl w-full max-w-md border border-white/10">
        <div className="text-center mb-8">
          <div className="text-2xl font-bold text-emerald-400 mb-2">收据快照</div>
          <p className="text-slate-400">{mode === 'login' ? '登录你的账户' : '创建新账户'}</p>
        </div>

        {message && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-500/20 text-emerald-400 text-sm text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">邮箱</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition"
          >
            {mode === 'login' ? '登录' : '注册'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          {mode === 'login' ? (
            <>还没有账户？{' '}
              <button onClick={() => setMode('register')} className="text-emerald-400 hover:underline">
                立即注册
              </button>
            </>
          ) : (
            <>已有账户？{' '}
              <button onClick={() => setMode('login')} className="text-emerald-400 hover:underline">
                去登录
              </button>
            </>
          )}
        </div>

        <div className="mt-4 text-center">
          <a href="/" className="text-sm text-slate-500 hover:text-slate-300 transition">
            ← 返回首页
          </a>
        </div>
      </div>
    </div>
  );
}
