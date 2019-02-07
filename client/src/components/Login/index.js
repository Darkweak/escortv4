import React from 'react';
import {Layout} from "../Layout";
import {LoginForm} from "./Form";
import {Col} from 'reactstrap';
import {compose, lifecycle} from 'recompose';
import {connect} from 'react-redux';
import {redirectTo} from "../../functions/redirect";

const mapStateToProps = ({loginReducer: {logged}}) => ({
  logged,
});

export const Login = compose(
  connect(
    mapStateToProps,
    {}
  ),
  lifecycle({
    componentDidMount() {
      if (this.props.logged) {
        redirectTo(this.props.history, '/')
      }
    }
  })
)(({...rest}) => (
  <Layout defaultContainer {...rest}>
    <Col md={{offset: 2, size: 8}}>
      <div className={'pt-4 pb-4'}>
        <LoginForm {...rest}/>
      </div>
    </Col>
  </Layout>
));
