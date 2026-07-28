import { useEffect, useState } from 'react'
import { BookOpen, Film, Music, ExternalLink, RefreshCw } from 'lucide-react'
import { useStore } from '../store'
import { fetchZhihuHot, fetchDoubanMovies, fetchDoubanMusic, type ContentItem } from '../services/api'

const subTabs = [
  { id: 'reading' as const, label: '阅读', icon: BookOpen },
  { id: 'movie' as const, label: '电影', icon: Film },
  { id: 'music' as const, label: '音乐', icon: Music },
]

export default function RelaxView() {
  const relaxSub = useStore((s) => s.relaxSub)
  const setRelaxSub = useStore((s) => s.setRelaxSub)
  const [items, setItems] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    let data: ContentItem[] = []
    if (relaxSub === 'reading') data = await fetchZhihuHot()
    else if (relaxSub === 'movie') data = await fetchDoubanMovies()
    else if (relaxSub === 'music') data = await fetchDoubanMusic()
    setItems(data)
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [relaxSub])

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2 className="section-title">Relax</h2>
        <button
          onClick={load}
          disabled={loading}
          style={{ background: 'none', border: 'none', color: '#64b5f6', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <RefreshCw size={16} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
          刷新
        </button>
      </div>
      <div className="sub-tabs">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            className={`sub-tab ${relaxSub === tab.id ? 'active' : ''}`}
            onClick={() => setRelaxSub(tab.id)}
          >
            <tab.icon size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
            {tab.label}
          </button>
        ))}
      </div>
      {items.length === 0 ? (
        <div className="empty-state">
          <RefreshCw size={48} />
          <p>{loading ? '加载中...' : '暂无数据，点击刷新重试'}</p>
        </div>
      ) : (
        <div className="card-grid">
          {items.map((item) => (
            <div key={item.id} className="card">
              <div className="card-title">{item.title}</div>
              <div className="card-meta">
                {item.author && <span>{item.author}</span>}
                {item.hot && <span style={{ color: '#ff6b6b' }}>{item.hot}</span>}
                {item.url && (
                  <a href={item.url} target="_blank" rel="noreferrer" style={{ color: '#64b5f6', marginLeft: 'auto' }}>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
