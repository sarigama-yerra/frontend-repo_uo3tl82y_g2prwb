import { useState } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, Mail, Newspaper, CalendarDays } from 'lucide-react'

export default function Header({ activeTab, onTabChange, onRefresh, refreshing }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/20 border-b border-white/10">
      <div className="header-texture">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-4 blur-2xl logo-glow" />
              <span className="relative font-space text-xl sm:text-2xl font-bold headline-gradient select-none">Grid7</span>
            </div>
            <span className="text-xs sm:text-sm text-cyan-300/80">By Abhinand</span>
          </div>

          <nav className="hidden sm:flex items-center gap-1 bg-[#0b0b0b] border border-white/10 rounded-full p-1">
            <Tab icon={<Newspaper size={16} />} label="News" active={activeTab==='news'} onClick={() => onTabChange('news')} />
            <Tab icon={<CalendarDays size={16} />} label="Upcoming Launches" active={activeTab==='launches'} onClick={() => onTabChange('launches')} />
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={onRefresh} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0b0b0b] border border-white/10 text-cyan-300 hover:border-cyan-400/50 transition-colors">
              <motion.span animate={{ rotate: refreshing ? 360 : 0 }} transition={{ repeat: refreshing ? Infinity : 0, duration: 1.2, ease: 'linear' }}>
                <RefreshCw size={16} />
              </motion.span>
              <span className="text-sm">Refresh</span>
            </button>
            <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-600/20 border border-cyan-400/40 text-cyan-200 hover:bg-cyan-600/30 transition-colors">
              <Mail size={16} />
              <span className="text-sm">Subscribe to Newsletter</span>
            </button>
          </div>
        </div>
      </div>

      <div className="sm:hidden px-4 pt-2 pb-3">
        <div className="flex items-center gap-2 bg-[#0b0b0b] border border-white/10 rounded-full p-1">
          <Tab icon={<Newspaper size={16} />} label="News" active={activeTab==='news'} onClick={() => onTabChange('news')} />
          <Tab icon={<CalendarDays size={16} />} label="Upcoming" active={activeTab==='launches'} onClick={() => onTabChange('launches')} />
        </div>
      </div>
    </header>
  )
}

function Tab({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${active ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white'}`}>
      {icon}
      <span className="text-sm">{label}</span>
    </button>
  )
}
