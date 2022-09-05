import { AppHeader } from './cmps/AppHeader';
import { Home } from './pages/Home';

function App() {
  return (
    <div className="app">
      <AppHeader />
      <main className="main">
        <Home />
      </main>
    </div>
  );
}

export default App;
