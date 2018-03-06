import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Login from './components/loginPage/login';
import UserDashboard from './components/userDashboard/userDashboard';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './redux/reducers/root-reducer';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import Customize from './components/customize/customize';
import Catalogue from './components/catalogue/catalogue';
import ShoppingCard from './components/shoppingCard/shoppingCardComponent';


import configureStore from './store/configure-store';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);


ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={browserHistory}>
       <Route path='/' component={App} />
       <Route path='/Login' component={Login} />
       <Route path='/userDashboard' component={UserDashboard} />
       <Route path='/customize' component={Customize} />
       <Route path='/catalogue' component={Catalogue} />
       <Route path='/shoppingCard' component={ShoppingCard} />
      </Router>
    </div>
  </Provider>,

	document.getElementById('root'));
  registerServiceWorker();
