import React, { Component } from 'react';
import { render } from 'react-dom'
import { Link } from 'react-router-dom';
import Alert from '../components/Alert.jsx';
import { authStudent } from '../actions/auth.js';
import 'semantic-ui-css/semantic.min.css';
import { Loader } from 'semantic-ui-react'

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    authStudent(
      this.studentToken(),
      this.redirectToNextStep,
      () => render(<Alert msg="No se encuentra el estudiante"/>, document.getElementById('alert'))
    )
  }

  studentToken = () => {
    return this.props.match.params.token
  }

  redirectToNextStep = (data) => {
    if(data.identity_document && data.name) {
      this.props.history.push(`/survey/${data.token}`)
    } else {
      this.props.history.push(`/signup/${this.studentToken()}`)
    }
  }

  render() {
    return (
      <div className="sign-box">
        <div id='alert'></div>
        <Loader active={ true } size='medium'></Loader>
      </div>
    )
  }
}
