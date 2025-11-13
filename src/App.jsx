import { useEffect, useMemo, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import FilterBar from './components/FilterBar'
import NewsCard from './components/NewsCard'
import NewsModal from './components/NewsModal'
import UpcomingLaunchesTimeline from './components/UpcomingLaunchesTimeline'

function Splash({ onDone }) {
  const [show, setShow] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => {
      setShow(false)
      setTimeout(onDone, 600)
    }, 2000)
    return () => clearTimeout(t)
  }, [onDone])

  const features = [
    'Live Breaking News',
    'AI-Generated Briefs',
    'Upcoming Tech Timelines',
    'Futuristic Interface',
  ]

  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
          <div className="relative flex flex-col items-center gap-6">
            <div className="absolute -inset-24 rounded-full blur-3xl logo-glow" />
            <motion.h1 className="text-5xl sm:text-6xl font-bold tracking-tight headline-gradient font-space" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>Grid7</motion.h1>
            <motion.p className="text-cyan-300/80 font-medium" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>By Abhinand</motion.p>
            <div className="mt-2 space-y-2">
              {features.map((f, i) => (
                <motion.div key={f} className="text-sm sm:text-base text-white/80" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}>• {f}</motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function App() {
  const [activeTab, setActiveTab] = useState('news')
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [articles, setArticles] = useState([])
  const [launches, setLaunches] = useState([])
  const [modalItem, setModalItem] = useState(null)
  const [visibleCount, setVisibleCount] = useState(8)
  const [splashDone, setSplashDone] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const [aRes, lRes] = await Promise.all([
          fetch(`${API_BASE}/api/articles`).then((r) => r.json()),
          fetch(`${API_BASE}/api/launches`).then((r) => r.json()),
        ])
        setArticles(aRes.items || [])
        setLaunches(lRes.items || [])
      } catch (e) {
        setArticles([])
        setLaunches([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = useMemo(() => {
    if (filter === 'All') return articles
    return articles.filter((a) => a.category === filter)
  }, [articles, filter])

  const onRefresh = async () => {
    try {
      setRefreshing(true)
      await fetch(`${API_BASE}/api/refresh`, { method: 'POST' })
      const res = await fetch(`${API_BASE}/api/articles`).then((r) => r.json())
      setArticles(res.items || [])
    } finally {
      setRefreshing(false)
    }
  }

  return (
    <div className="min-h-screen bg-black pulse-bg text-white">
      {!splashDone && <Splash onDone={() => setSplashDone(true)} />}

      <div className="relative h-[46vh] sm:h-[52vh] grid-texture">
        <Spline scene="https://prod.spline.design/Gt5HUob8aGDxOUep/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <h1 className="font-space text-5xl sm:text-6xl font-bold headline-gradient drop-shadow">Grid7</h1>
            <p className="text-cyan-300/80 mt-2">By Abhinand</p>
          </div>
        </div>
      </div>

      <Header activeTab={activeTab} onTabChange={setActiveTab} onRefresh={onRefresh} refreshing={refreshing} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'news' ? (
          <div className="space-y-6">
            <FilterBar active={filter} onChange={(v) => { setFilter(v); setVisibleCount(8) }} />

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-40 rounded-xl bg-white/5 animate-pulse" />
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered.slice(0, visibleCount).map((item, idx) => (
                    <NewsCard key={idx} item={item} onOpen={setModalItem} />
                  ))}
                </div>
                {filtered.length > visibleCount && (
                  <div className="flex justify-center pt-4">
                    <button onClick={() => setVisibleCount((c) => c + 6)} className="px-4 py-2 rounded-lg bg-[#0b0b0b] border border-white/10 hover:border-cyan-400/40">Load More</button>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="py-6 flex justify-center">
            <UpcomingLaunchesTimeline items={launches} />
          </div>
        )}
      </main>

      <NewsModal item={modalItem} onClose={() => setModalItem(null)} />
    </div>
  )
}
