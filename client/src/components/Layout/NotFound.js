import React from 'react';
import {Layout} from "./index";
import {DangerAlert} from "../Alerts";
import {lifecycle} from 'recompose';
import {redirectTo} from "../../functions/redirect";

export const NotFound = lifecycle({
  componentDidMount() {
    setTimeout(() => redirectTo(this.props.history, '/'), 5000)
  }
})(({...rest}) => (
  <Layout defaultContainer {...rest}>
    <div className={'pt-4 pb-4'}>
      <DangerAlert content={`Cette page n'existe pas, vous allez être redirigé vers l'accueil dans 5 secondes`}/>
    </div>
  </Layout>
));
