import { useState, useEffect } from 'react';
import { useStore, actions } from '../store';
import { Book, Film, Music, RefreshCw, ExternalLink } from 'lucide-react';
import type { ContentItem } from '../types';

type SubCategory = 'reading' | 'movies' | 'music';

// 模拟数据生成器（演示用）
const generateMockData = (type: SubCategory): ContentItem[] => {
  const sources = {
    reading: ['豆瓣读书', '知乎推荐', '微信读书'],
    movies: ['豆瓣电影', '猫眼电影', '淘票票'],
    music: ['网易云音乐', 'QQ音乐', '酷狗音乐'],
  };

  const titles = {
    reading: ['三体', '百年孤独', '人类简史', '思考快与慢', '原则', '深度工作'],
    movies: ['奥本海默', '芭比', '消失的她', '孤注一掷', '封神第一部', '长安三万里'],
    music: ['晴天', '七里香', '稻香', '夜曲', '告白气球', '说好的幸福呢'],
  };

  return titles[type].map((title, index) => ({
    id: `${type}-${index}`,
    title,
    source: sources[type][index % sources[type].length],
    heat: Math.floor(Math.random() * 100000) + 10000,
    fetchedAt: new Date().toISOString(),
  }));
};

export default function RelaxView() {
  const [activeTab, setActiveTab] = useState<SubCategory>('reading');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const relaxContent = useStore((state) => state.relaxContent);
  const lastFetchDate = useStore((state) => state.lastFetchDate);

  const tabs = [
    { id: 'reading', label: '阅读', icon: Book },
    { id: 'movies', label: '电影', icon: Film },
    { id: 'music', label: '音乐', icon: Music },
  ] as const;

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // 模拟API请求延迟
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockData = generateMockData(activeTab);
    actions.updateRelaxContent(activeTab, mockData);
    actions.setLastFetchDate(new Date().toISOString());

    setIsRefreshing(false);
  };

  // 初始加载
  useEffect(() => {
    if (relaxContent[activeTab].length === 0) {
      handleRefresh();
    }
  }, [activeTab]);

  const currentItems = relaxContent[activeTab];

  return (
    <div className="content-card">
      <h2>
        <Book size={28} />
        Relax - 放松时刻
      </h2>

      <div className="last-fetch">
        <RefreshCw size={14} />
        {lastFetchDate
          ? `上次刷新: ${new Date(lastFetchDate).toLocaleString('zh-CN')}`
          : '暂无数据'}
      </div>

      <div className="sub-tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={16} style={{ marginRight: 6 }} />
              {tab.label}
            </button>
          );
        })}
        <button
          className="btn btn-secondary"
          onClick={handleRefresh}
          disabled={isRefreshing}
          style={{ marginLeft: 'auto' }}
        >
          <RefreshCw size={16} className={isRefreshing ? 'spin' : ''} />
          刷新
        </button>
      </div>

      <div className="item-grid">
        {currentItems.map((item) => (
          <div key={item.id} className="item-card">
            <h3>{item.title}</h3>
            <div className="meta">
              <span>{item.source}</span>
              {item.heat && <span>🔥 {item.heat.toLocaleString()}</span>}
            </div>
          </div>
        ))}
      </div>

      {currentItems.length === 0 && !isRefreshing && (
        <div className="empty-state">
          <Music size={64} />
          <p>暂无数据，点击刷新按钮获取热门推荐</p>
        </div>
      )}
    </div>
  );
}