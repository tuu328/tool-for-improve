import { useState } from 'react'
import { Coffee, TrendingUp, Zap, Menu, X } from 'lucide-react'
import { useStore } from '../store'

const tabs = [
  { id: 'relax' as const, label: 'Relax', icon: Coffee },
  { id: 'growth' as const, label: 'Growth', icon: TrendingUp },
  { id: 'breakthrough' as const, label: 'Breakthrough', icon: Zap },
]

export default function Sidebar() {
  const [open, setOpen] = useState(false)
  const activeTab = useStore((s) => s.activeTab)
  const setActiveTab = useStore((s) => s.setActiveTab)

  return (
    <>
      <button className="mobile-menu-btn" onClick={() => setOpen(!open)}>
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <div className={`sidebar-overlay ${open ? 'show' : ''}`} onClick={() => setOpen(false)} />
      <nav className={`sidebar ${open ? 'open' : ''}`}>
        <div style={{ padding: '0 24px 20px', fontSize: '18px', fontWeight: 700, color: '#fff' }}>
          规划台
        </div>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`sidebar-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(tab.id)
              setOpen(false)
            }}
          >
            <tab.icon size={20} className="sidebar-icon" />
            {tab.label}
          </div>
        ))}
      </nav>
    </>
  )
}
