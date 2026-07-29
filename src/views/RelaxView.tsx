import { useEffect, useState } from 'react'
import { BookOpen, Film, Music, ExternalLink, RefreshCw } from 'lucide-react'
import { useStore } from '../store'
import { fetchZhihuHot, fetchDoubanMovies, fetchDoubanMusic, type ContentItem } from '../services/api'

const subTabs = [
  { id: 'reading' as const, label: '阅读', icon: BookOpen },
  { id: 'movie' as const, label: '电影', icon: Film },
  { id: 'music' as const, label: '音乐', icon: Music },
]

const FALLBACK_DATA: Record<string, ContentItem[]> = {
  reading: [
    { id: 'r1', title: '2026年，AI如何重塑我们的工作与生活', author: '知乎热榜', url: 'https://zhihu.com', hot: 2840 },
    { id: 'r2', title: '深度阅读：为什么深度工作越来越稀缺', author: '知乎热榜', url: 'https://zhihu.com', hot: 1920 },
    { id: 'r3', title: '年度书单推荐：10本改变思维方式的书', author: '知乎热榜', url: 'https://zhihu.com', hot: 1560 },
    { id: 'r4', title: '如何建立高效的个人知识管理系统', author: '知乎热榜', url: 'https://zhihu.com', hot: 1340 },
    { id: 'r5', title: '程序员必读：从代码到架构的思维升级', author: '知乎热榜', url: 'https://zhihu.com', hot: 1120 },
  ],
  movie: [
    { id: 'm1', title: '哪吒之魔童闹海', author: '豆瓣热门', url: 'https://movie.douban.com', hot: 9.6 },
    { id: 'm2', title: '流浪地球3', author: '豆瓣热门', url: 'https://movie.douban.com', hot: 9.2 },
    { id: 'm3', title: '封神第二部', author: '豆瓣热门', url: 'https://movie.douban.com', hot: 8.8 },
    { id: 'm4', title: '热辣滚烫', author: '豆瓣热门', url: 'https://movie.douban.com', hot: 8.5 },
    { id: 'm5', title: '飞驰人生2', author: '豆瓣热门', url: 'https://movie.douban.com', hot: 8.3 },
  ],
  music: [
    { id: 'u1', title: '青花', author: '周传雄', url: 'https://music.douban.com', hot: 9.4 },
    { id: 'u2', title: '若月亮没来', author: '王宇宙Leto / 乔浚丞', url: 'https://music.douban.com', hot: 9.1 },
    { id: 'u3', title: '小美满', author: '周深', url: 'https://music.douban.com', hot: 8.9 },
    { id: 'u4', title: '无名的人', author: '毛不易', url: 'https://music.douban.com', hot: 8.7 },
    { id: 'u5', title: '乌梅子酱', author: '李荣浩', url: 'https://music.douban.com', hot: 8.5 },
  ],
}

export default function RelaxView() {
  const relaxSub = useStore((s) => s.relaxSub)
  const setRelaxSub = useStore((s) => s.setRelaxSub)
  const [items, setItems] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(false)
  const [fromApi, setFromApi] = useState(false)

  const load = async () => {
    setLoading(true)
    let data: ContentItem[] = []
    if (relaxSub === 'reading') data = await fetchZhihuHot()
    else if (relaxSub === 'movie') data = await fetchDoubanMovies()
    else if (relaxSub === 'music') data = await fetchDoubanMusic()

    if (data.length === 0) {
      data = FALLBACK_DATA[relaxSub] || []
      setFromApi(false)
    } else {
      setFromApi(true)
    }
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
      {!fromApi && items.length > 0 && (
        <div style={{ fontSize: 12, color: '#888', marginBottom: 12, padding: '8px 12px', background: '#16213e', borderRadius: 8 }}>
          网络受限，以下为推荐内容（点击刷新尝试获取实时数据）
        </div>
      )}
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
                {item.hot && <span style={{ color: '#ff6b6b' }}>{typeof item.hot === 'number' ? `${item.hot}分` : item.hot}</span>}
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
