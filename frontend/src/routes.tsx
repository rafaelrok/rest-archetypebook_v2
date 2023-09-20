import { Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Books from './pages/Books';
import NewBook from './pages/NewBook';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Pricing from './pages/Pricing';

import Header from './components/Header';
import Footer from './components/Footer';
import history from "./util/history";

const Routes = () => (
  <Router history={history}>
    <Header />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/auth" exact component={SignIn} />
      <Route path="/auth/register" exact component={SignUp} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/books" component={Books} />
      <Route path="/book/new/:bookId" component={NewBook} />
    </Switch>
    <Footer />
  </Router>
)

export default Routes;

