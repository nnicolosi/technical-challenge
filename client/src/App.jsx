import '@fortawesome/fontawesome-free/css/all.min.css';
import { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/navigation';
import Footer from './components/footer';
import Routes from './routes';
import './App.scss';

const App = () => {
  return (
    <Fragment>
      <Router>
        <Navigation />
        <Routes />
        <Footer />
      </Router>
    </Fragment>
  );
};

export default App;
