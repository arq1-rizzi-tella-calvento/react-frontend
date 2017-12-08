import React, { Component } from 'react';
import { render } from 'react-dom'
import { Link } from 'react-router-dom';
import Alert from '../components/Alert.jsx';
import { authStudent } from '../actions/auth.js';

export default class SignIn extends Component {
  state = {
    identity_document: ''
  };

  findStudent = (event) => {
    authStudent(
      this.studentToken(),
      data => this.props.history.push(`/survey/${data.token}`),
      () => render(<Alert msg="No se encuentra el estudiante"/>, document.getElementById('alert'))
    )
    event.preventDefault();
  }

  studentToken = () => {
    return this.props.match.params.token
  }

  render() {
    return (
      <div className="sign-box">
        <div id="alert">
        </div>
        <form onSubmit={this.findStudent}>
          <h2 className="sign-heading">¡Bienvenido a la encuesta!</h2>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Continuar</button>
        </form>
        <Link to={ `/signup/${this.studentToken()}` } className="text-center">¿Primera vez haciendo la encuesta?</Link>
      </div>
    )
  }
}
