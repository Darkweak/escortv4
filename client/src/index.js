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
import {Profile} from "./components/User";
import {CGU} from "./components/CGU";
import {NotFound} from "./components/Layout/NotFound";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendarAlt, faCaretUp, faEye, faFileAlt, faMapMarkerAlt, faMoneyBillAlt, faPlus, faQuestionCircle, faUser, faUserClock, faUsers, faUserShield } from '@fortawesome/free-solid-svg-icons';
import {OutingShow} from "./components/Outing/Show";
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
import {Activate} from "./components/User/Activate";
import {ForgotPassword, ResetPassword} from "./components/ForgotPassword";
import './components/Layout/css/main.css';

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
        <Route path="/activate/:id" component={Activate} strict exact/>
        <Route path="/outings/:id" component={OutingShow} strict exact/>
        <Route path="/reset-password/:id" component={ResetPassword} strict exact/>
        <Route path="/profile" component={Profile} strict exact/>
        <Route path="/forgot-password" component={ForgotPassword} strict exact/>
        <Route path="/login" component={Login} strict exact/>
        <Route path="/register" component={Register} strict exact/>
        <Route path="/cgu" component={CGU} strict exact/>
        <Route path="/" component={Welcome} strict exact/>
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
