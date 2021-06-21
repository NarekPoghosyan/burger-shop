// libraries
import { Route } from 'react-router';

// pages
import { Home, Basket } from './pages/index'

// components
import { Header, Checkout } from './components/index'

// styles
import './scss/app.scss'

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Route path="/" component={Home} exact />
        <Route path="/basket" component={Basket} exact />
        <Route path="/order" component={Checkout} exact />
      </div>
    </div>
  );
}

export default App;
