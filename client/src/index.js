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
import * as serviceWorker from './serviceWorker';
import {Welcome} from "./components/Welcome/Welcome";
import {Login} from "./components/Login";
import {Register} from "./components/Register";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendarAlt, faEye, faMapMarkerAlt, faPlus, faQuestionCircle, faUsers, faUserShield } from '@fortawesome/free-solid-svg-icons';
import LoginSaga from './sagas/login';
import loginReducer from './components/Login/store/reducer';
import RegisterSaga from './sagas/register';
import registerReducer from './components/Register/store/reducer';
import formReducer from './components/Form/store/reducer';
import OutingSaga from './sagas/outing';
import outingReducer from './components/Outing/store/reducer';
import outingsListReducer from './components/Welcome/store/reducer';

const sagaMiddleware = createSagaMiddleware();
const history = createBrowserHistory();
const store = createStore(
  combineReducers({
    router: connectRouter(history),
    form,
    formReducer,
    loginReducer,
    outingReducer,
    outingsListReducer,
    registerReducer,
  }),
  applyMiddleware(routerMiddleware(history), sagaMiddleware)
);

const sagas = [
  LoginSaga,
  OutingSaga,
  RegisterSaga,
];

sagas.map(saga => sagaMiddleware.run(saga));

const faIcons = [
  faCalendarAlt,
  faEye,
  faMapMarkerAlt,
  faPlus,
  faQuestionCircle,
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
        <Route path="/login" component={Login} strict exact/>
        <Route path="/register" component={Register} strict exact/>
        <Route path="/" component={Welcome} strict exact/>
        {/* Add your routes here */}
        <Route render={() => <h1>Not Found</h1>} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
