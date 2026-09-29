import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* 导航栏 */}
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="text-2xl font-bold text-emerald-400">收据快照</div>
        <div className="space-x-4">
          <button className="px-4 py-2 rounded-lg hover:bg-white/10 transition">登录</button>
          <button className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 transition">
            免费试用
          </button>
        </div>
      </nav>

      {/* 主标题区域 */}
      <section className="text-center px-4 pt-20 pb-16">
        <h1 className="text-5xl font-bold mb-6">
          帮助你增效
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          拍照上传，AI 自动提取金额、日期、商家信息。
          <br />
          告别手动录入，报销效率提升 10 倍。
        </p>
        <button className="px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-lg font-semibold transition">
          免费体验 →
        </button>
      </section>

      {/* 功能特点 */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 max-w-5xl mx-auto pb-20">
        <div className="bg-white/5 p-6 rounded-2xl">
          <div className="text-3xl mb-3">📸</div>
          <h3 className="text-lg font-semibold mb-2">智能识别</h3>
          <p className="text-slate-400">支持 JPG、PNG、PDF，AI 自动提取关键信息</p>
        </div>
        <div className="bg-white/5 p-6 rounded-2xl">
          <div className="text-3xl mb-3">📊</div>
          <h3 className="text-lg font-semibold mb-2">自动分类统计</h3>
          <p className="text-slate-400">餐饮、交通、办公...智能归类，一目了然</p>
        </div>
        <div className="bg-white/5 p-6 rounded-2xl">
          <div className="text-3xl mb-3">📥</div>
          <h3 className="text-lg font-semibold mb-2">一键导出报表</h3>
          <p className="text-slate-400">生成 Excel/CSV，直接提交财务报销</p>
        </div>
      </section>
    </main>
  );
}
