import { Switch, Route } from 'react-router-dom';
import HomePage from '../pages/home';
import NotFound from '../pages/not-found';
import ContactsPage from '../pages/contacts';
import LisCallPage from '../pages/list-call';

const Routes = () => {
  return (
    <Switch>
      <Route path="/home" component={HomePage} />
      <Route path="/contacts" component={ContactsPage} />
      <Route exact path="/" component={HomePage} />
      <Route path="/list-call" component={LisCallPage} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
