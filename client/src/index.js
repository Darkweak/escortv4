import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { reducer as form } from 'redux-form';
import { Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import {
  ConnectedRouter,
  connectRouter,
  routerMiddleware
} from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import {generateSitemap} from "./Sitemap";
import * as serviceWorker from './serviceWorker';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendarAlt, faCaretUp, faEye, faFileAlt, faMapMarkerAlt, faMoneyBillAlt, faPlus, faQuestionCircle, faUser, faUserClock, faUsers, faUserShield } from '@fortawesome/free-solid-svg-icons';
import LoginSaga from './sagas/login';
import loginReducer from './components/Login/store/reducer';
import RegisterSaga from './sagas/register';
import registerReducer from './components/Register/store/reducer';
import formReducer from './components/Form/store/reducer';
import OutingSaga from './sagas/outing';
import outingReducer from './components/Outing/store/reducer';
import forgotPasswordReducer from './components/ForgotPassword/store/reducer';
import UserSaga from './sagas/user';
import userReducer from './components/User/store/reducer';
import outingsListReducer from './components/Welcome/store/reducer';
import {NotFound} from "./components/Layout/NotFound";
import {Sitemap} from "./Sitemap";
import {routes} from "./routes";
import './components/Layout/css/main.css';

/*
let sm = new Sitemap();
console.log(sm.generateXML());
*/

const sagaMiddleware = createSagaMiddleware();
const history = createBrowserHistory();
const store = createStore(
  combineReducers({
    router: connectRouter(history),
    forgotPasswordReducer,
    form,
    formReducer,
    loginReducer,
    outingReducer,
    outingsListReducer,
    registerReducer,
    userReducer,
  }),
  applyMiddleware(routerMiddleware(history), sagaMiddleware)
);

const sagas = [
  LoginSaga,
  OutingSaga,
  RegisterSaga,
  UserSaga,
];

sagas.map(saga => sagaMiddleware.run(saga));

const faIcons = [
  faCalendarAlt,
  faCaretUp,
  faEye,
  faFileAlt,
  faMapMarkerAlt,
  faMoneyBillAlt,
  faPlus,
  faQuestionCircle,
  faUser,
  faUserClock,
  faUsers,
  faUserShield,
];
faIcons.map(icon => (
  library.add(icon)
));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        {
          routes.map((route, index) => (
            <Route
              key={index}
              path={`/${route.path}`}
              component={route.component}
              strict
              exact
            />
          ))
        }
        <Route component={NotFound} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
