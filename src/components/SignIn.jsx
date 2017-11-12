import React, { Component } from 'react';
import { render } from 'react-dom'
import { Link } from 'react-router-dom';
import { get } from '../httpMethods.js';
import Alert from './Alert.jsx';
import { handleChange } from '../formUtils.js';

export default class SignIn extends Component {
  state = {
    identity_document: ''
  };
  findStudent = (event) => {
    get(`/signin/${this.state.identity_document}`)
    .then(data => this.props.history.push(`/survey/${data.student_id}`))
    .catch(() => render(<Alert msg="No se encuentra el estudiante"/>, document.getElementById('alert')))
    event.preventDefault();
  }
  render() {
    return (
      <div className="sign-box">
        <div id="alert">
        </div>
        <form onSubmit={this.findStudent}>
          <h2 className="sign-heading">¡Bienvenido a la encuesta!</h2>
          <input type="documentNumber" className="form-control" placeholder="Número de documento"
            value={this.state.identity_document} onChange={handleChange(this, 'identity_document')} required autoFocus/>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Continuar</button>
        </form>
        <Link to="/signup" className="text-center">¿Primera vez haciendo la encuesta?</Link>
      </div>
    )
  }
}
