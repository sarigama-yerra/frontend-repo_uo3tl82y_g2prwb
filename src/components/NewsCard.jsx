import { useState } from 'react'
import { Share2, Volume2, VolumeX } from 'lucide-react'

function timeAgo(dateStr) {
  const date = new Date(dateStr)
  const diff = Math.floor((Date.now() - date.getTime()) / 1000)
  const hours = Math.floor(diff / 3600)
  if (hours < 1) return `${Math.floor(diff / 60)}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export default function NewsCard({ item, onOpen }) {
  const [audioState, setAudioState] = useState('idle') // idle | loading | playing
  const [audio, setAudio] = useState(null)

  const tagClass = item.category === 'AI' ? 'tag-ai' : item.category === 'OS' ? 'tag-os' : item.category === 'Gadgets' ? 'tag-gadgets' : 'tag-other'

  const playSummary = async () => {
    try {
      if (audioState === 'playing') {
        audio.pause()
        setAudioState('idle')
        return
      }
      setAudioState('loading')
      const utterance = new SpeechSynthesisUtterance(item.summary)
      utterance.onend = () => setAudioState('idle')
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(utterance)
      setAudioState('playing')
      setAudio(utterance)
    } catch (e) {
      setAudioState('idle')
    }
  }

  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: item.headline, text: item.summary, url: item.links?.[0] || window.location.href })
      } else {
        await navigator.clipboard.writeText(item.links?.[0] || window.location.href)
        alert('Link copied to clipboard')
      }
    } catch {}
  }

  return (
    <div
      onClick={() => onOpen(item)}
      className="card-hover group cursor-pointer rounded-xl border border-white/10 bg-[#0b0b0b] p-4 flex flex-col gap-3 hover:border-cyan-500/40"
    >
      <div className="flex items-center justify-between">
        <div className="text-xs text-white/70 flex items-center gap-2">
          <span>{item.source}</span>
          <span>•</span>
          <span className={`px-2 py-0.5 rounded-full text-xs ${tagClass}`}>{item.category}</span>
          {item.published_at && <span>• {timeAgo(item.published_at)}</span>}
        </div>
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <button onClick={playSummary} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10">
            {audioState === 'loading' ? (
              <div className="animate-spin h-4 w-4 border-2 border-cyan-400 border-t-transparent rounded-full" />
            ) : audioState === 'playing' ? (
              <VolumeX size={16} className="text-cyan-300" />
            ) : (
              <Volume2 size={16} className="text-cyan-300" />
            )}
          </button>
          <button onClick={share} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10">
            <Share2 size={16} />
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold leading-snug group-hover:text-cyan-200 transition-colors">{item.headline}</h3>
        <p className="text-sm text-white/70 line-clamp-3 mt-1">{item.summary}</p>
      </div>
    </div>
  )
}
