'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function UploadPage() {
  const [merchant, setMerchant] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('餐饮');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    // 获取当前用户
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      setMessage('请先登录');
      setSaving(false);
      return;
    }

    // 保存到数据库
    const { error } = await supabase.from('receipts').insert({
      user_id: user.id,
      merchant,
      amount: parseFloat(amount),
      date,
      category,
    });

    if (error) {
      setMessage('保存失败：' + error.message);
    } else {
      setMessage('保存成功！');
      // 清空表单
      setMerchant('');
      setAmount('');
      setDate('');
      setCategory('餐饮');
      
      // 2秒后跳转到 Dashboard
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
    }

    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <nav className="flex items-center justify-between px-8 py-4 border-b border-white/10">
        <div className="text-xl font-bold text-emerald-400">收据快照</div>
        <div className="flex items-center gap-4">
          <a href="/dashboard" className="text-slate-400 hover:text-white transition">
            ← 返回仪表盘
          </a>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold mb-2">上传收据</h1>
        <p className="text-slate-400 mb-8">填写收据信息，保存到数据库</p>

        {message && (
          <div className={`mb-6 p-4 rounded-lg text-center ${message.includes('成功') ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
            {message}
          </div>
        )}

        <div className="bg-white/5 rounded-xl border border-white/10 p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">商家</label>
              <input
                type="text"
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
                placeholder="如：星巴克"
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">金额</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="35.00"
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">日期</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">类别</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
              >
                <option className="bg-slate-800">餐饮</option>
                <option className="bg-slate-800">交通</option>
                <option className="bg-slate-800">办公</option>
                <option className="bg-slate-800">购物</option>
                <option className="bg-slate-800">其他</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving || !merchant || !amount || !date}
            className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition"
          >
            {saving ? '保存中...' : '确认保存'}
          </button>
        </div>
      </div>
    </div>
  );
}
