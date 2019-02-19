import {Activate} from "./components/User/Activate";
import {Cashback} from "./components/Cashback";
import {CGU} from "./components/CGU";
import {ForgotPassword, ResetPassword} from "./components/ForgotPassword";
import {Login} from "./components/Login";
import {OutingShow} from "./components/Outing/Show";
import {Profile} from "./components/User";
import {Register} from "./components/Register";
import {Welcome} from "./components/Welcome/Welcome";

export const routes = [
  {
    path: 'activate/:id',
    component: Activate,
  },
  {
    path: 'outings/:id',
    component: OutingShow,
  },
  {
    path: 'reset-password/:id',
    component: ResetPassword,
  },
  {
    path: 'cashback',
    component: Cashback,
  },
  {
    path: 'profile',
    component: Profile,
  },
  {
    path: 'forgot-password',
    component: ForgotPassword,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'cgu',
    component: CGU,
  },
  {
    path: '',
    component: Welcome,
  },
];
