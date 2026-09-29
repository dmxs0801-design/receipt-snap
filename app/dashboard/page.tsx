'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function DashboardPage() {
  const [receipts, setReceipts] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 获取当前登录用户
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) {
        // 获取该用户的收据
        supabase
          .from('receipts')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .then(({ data }) => {
            setReceipts(data || []);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  const totalAmount = receipts.reduce((sum, r) => sum + (r.amount || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center text-white">
        <div className="text-lg">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* 顶部导航 */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-white/10">
        <div className="text-xl font-bold text-emerald-400">收据快照</div>
        <div className="flex items-center gap-4">
          <span className="text-slate-400">{user?.email || '未登录'}</span>
          <button 
            onClick={handleLogout}
            className="text-sm text-slate-400 hover:text-white transition"
          >
            退出
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-8">
        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <div className="text-slate-400 text-sm mb-1">本月收据</div>
            <div className="text-3xl font-bold">{receipts.length} 张</div>
          </div>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <div className="text-slate-400 text-sm mb-1">本月总金额</div>
            <div className="text-3xl font-bold text-emerald-400">¥{totalAmount.toFixed(2)}</div>
          </div>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <div className="text-slate-400 text-sm mb-1">剩余额度</div>
            <div className="text-3xl font-bold">20/20</div>
            <div className="text-xs text-slate-500 mt-1">免费版每月 20 张</div>
          </div>
        </div>

        {/* 操作栏 */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">我的收据</h2>
          <a href="/upload" className="px-6 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 font-medium transition inline-block">
            + 上传收据
          </a>
        </div>

        {/* 收据列表 */}
        {receipts.length > 0 ? (
          <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">商家</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">类别</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">日期</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-slate-400">金额</th>
                </tr>
              </thead>
              <tbody>
                {receipts.map((receipt) => (
                  <tr key={receipt.id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="px-6 py-4">{receipt.merchant}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs">
                        {receipt.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{receipt.date}</td>
                    <td className="px-6 py-4 text-right font-medium">¥{Number(receipt.amount).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white/5 rounded-xl border border-white/10 p-12 text-center">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-slate-400 mb-4">还没有收据</p>
            <a href="/upload" className="px-6 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 transition inline-block">
              上传第一张收据
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
