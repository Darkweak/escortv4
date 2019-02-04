import React from 'react';
import {Form} from "../Form";
import {Layout} from "../Layout";

const fields = [
  {
    label: 'Email',
    type: 'email',
    placeholder: 'john@doe.com',
  },
  {
    label: 'Mot de passe',
    type: 'password',
    placeholder: 'Mot de passe',
  },
  {
    label: 'Nom d\'utilisateur',
    type: 'text',
    placeholder: 'jhondoe',
  }
];

export const Register = ({...rest}) => (
  <Layout defaultContainer {...rest}>
    <Form fields={fields} redirect={{label: 'Déjà un compte ?', to: 'login'}} {...rest}/>
  </Layout>
)
