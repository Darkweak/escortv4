import React from 'react';
import {Layout} from "../Layout";
import {LoginForm} from "./Form";

export const Login = ({...rest}) => (
  <Layout defaultContainer {...rest}>
    <LoginForm {...rest}/>
  </Layout>
)
