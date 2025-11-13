export default function UpcomingLaunchesTimeline({ items }) {
  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-white/10" />
      <div className="space-y-12">
        {items.map((it, idx) => (
          <div key={idx} className={`flex items-start gap-6 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
            <div className="flex-1" />
            <div className="relative w-1/2">
              <div className="absolute -left-3 top-2 h-2 w-2 rounded-full bg-cyan-400" />
              <div className="rounded-xl border border-white/10 bg-[#0b0b0b] p-4">
                <div className="text-xs text-white/70">{new Date(it.date).toLocaleDateString()}</div>
                <h4 className="text-lg font-semibold mt-1">{it.title}</h4>
                <p className="text-sm text-white/70 mt-1">{it.description}</p>
                {it.link && (
                  <a className="text-sm text-cyan-300 hover:underline mt-2 inline-block" href={it.link} target="_blank" rel="noreferrer">Learn more →</a>
                )}
              </div>
            </div>
            <div className="flex-1" />
          </div>
        ))}
      </div>
    </div>
  )
}
