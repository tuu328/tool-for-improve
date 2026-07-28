import { useStore } from './store'
import Sidebar from './components/Sidebar'
import RelaxView from './views/RelaxView'
import GrowthView from './views/GrowthView'
import BreakthroughView from './views/BreakthroughView'

function App() {
  const activeTab = useStore((s) => s.activeTab)

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        {activeTab === 'relax' && <RelaxView />}
        {activeTab === 'growth' && <GrowthView />}
        {activeTab === 'breakthrough' && <BreakthroughView />}
      </main>
    </div>
  )
}

export default App
