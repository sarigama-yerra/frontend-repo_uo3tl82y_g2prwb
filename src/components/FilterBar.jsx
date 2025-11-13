import { Cpu, Cog, Smartphone, Sparkles } from 'lucide-react'

const chips = [
  { key: 'All', icon: Cpu, className: 'bg-white/5 text-white hover:bg-white/10' },
  { key: 'AI', icon: Sparkles, className: 'tag-ai' },
  { key: 'OS', icon: Cog, className: 'tag-os' },
  { key: 'Gadgets', icon: Smartphone, className: 'tag-gadgets' },
  { key: 'Other', icon: Cpu, className: 'tag-other' },
]

export default function FilterBar({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map(({ key, icon: Icon, className }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${className} ${active===key ? 'ring-1 ring-cyan-400/60' : ''}`}
        >
          <Icon size={16} />
          <span className="text-sm">{key}</span>
        </button>
      ))}
    </div>
  )
}
