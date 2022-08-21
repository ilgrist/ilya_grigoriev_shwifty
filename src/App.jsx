import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { AppHeader } from './cmps/AppHeader';
import { Home } from './pages/Home';

function App() {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main className="main">
          <Switch>
            <Route path="/" component={Home}></Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
