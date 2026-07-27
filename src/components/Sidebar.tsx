import { useStore, actions } from '../store';
import { BookOpen, TrendingUp, Rocket } from 'lucide-react';

export default function Sidebar() {
  const currentCategory = useStore((state) => state.currentCategory);

  const navItems = [
    { id: 'relax', label: 'Relax 放松', icon: BookOpen },
    { id: 'growth', label: 'Growth 成长', icon: TrendingUp },
    { id: 'breakthrough', label: 'Breakthrough 突破', icon: Rocket },
  ] as const;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>自我规划工作台</h1>
        <p>Self Planning Workbench</p>
      </div>
      <nav className="nav-list">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`nav-item ${currentCategory === item.id ? 'active' : ''}`}
              onClick={() => actions.setCurrentCategory(item.id)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}