import { useEffect } from 'react'
import { X, Share2, ExternalLink } from 'lucide-react'

export default function NewsModal({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!item) return null

  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: item.headline, text: item.summary, url: item.links?.[0] })
      } else {
        await navigator.clipboard.writeText(item.links?.[0] || window.location.href)
        alert('Link copied to clipboard')
      }
    } catch {}
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div className="max-w-2xl w-full bg-[#0b0b0b] border border-white/10 rounded-2xl p-4 sm:p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-semibold">{item.headline}</h3>
          <button onClick={onClose} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10">
            <X size={18} />
          </button>
        </div>
        <p className="text-white/70 text-sm mt-1">{item.summary}</p>
        {item.content && <p className="text-white/80 text-sm mt-4 whitespace-pre-wrap">{item.content}</p>}

        {item.links?.length ? (
          <div className="mt-4 space-y-1">
            <p className="text-xs text-white/50">Sources</p>
            <ul className="list-disc list-inside text-sm text-cyan-300">
              {item.links.map((l) => (
                <li key={l}><a href={l} target="_blank" rel="noreferrer" className="hover:underline">{l}</a></li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-6 flex items-center gap-2">
          <button onClick={share} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10">
            <Share2 size={16} />
            Share
          </button>
          {item.links?.[0] && (
            <a href={item.links[0]} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-600/20 border border-cyan-400/40 text-cyan-200 hover:bg-cyan-600/30">
              <ExternalLink size={16} />
              Read Full Article
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
