import { useStore, actions } from './store';
import Sidebar from './components/Sidebar';
import RelaxView from './views/RelaxView';
import GrowthView from './views/GrowthView';
import BreakthroughView from './views/BreakthroughView';

function App() {
  const currentCategory = useStore((state) => state.currentCategory);

  const renderContent = () => {
    switch (currentCategory) {
      case 'relax':
        return <RelaxView />;
      case 'growth':
        return <GrowthView />;
      case 'breakthrough':
        return <BreakthroughView />;
      default:
        return <RelaxView />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;