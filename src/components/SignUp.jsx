import React, { Component } from 'react';
import SubjectsList from './SubjectsList';
import { handleChange } from '../formUtils.js';

export default class SignUp extends Component {
  state = {
    fullName: '',
    email: '',
    documentNumber: '',
    firstSemester: false,
    needStudentInfoSubmission: true
  };
  captureUserInfo = (event) => {
    if (this.state.firstSemester) {
      this.setState({ needStudentInfoSubmission: false })
    } else {
      
    }
    event.preventDefault();
  };
  render() {
    if (this.state.needStudentInfoSubmission) {
      return (
        <div className='sign-box'>
          <form onSubmit={this.captureUserInfo}>
            <p className='sign-info'>Antes de empezar la encuesta, quisieramos que nos brindaras algunos datos para mejorar tu experiencia.</p>
            <input type="text" className="form-control" value={this.state.fullName} onChange={handleChange(this, 'fullName')} 
              placeholder="Nombre completo" required/>
            <input type="email" className="form-control" value={this.state.email} onChange={handleChange(this, 'email')}
              placeholder="Email" required/>
            <input type="text" className="form-control" value={this.state.documentNumber} onChange={handleChange(this, 'documentNumber')} 
              placeholder="Número de documento" required/>
      
            <div className="checkbox">
              <label>
                Primer cuatrimestre en la carrera
                <input type="checkbox" onChange={handleChange(this, 'firstSemester')} value={this.state.firstSemester} />
              </label>
            </div>
    
            <button className="btn btn-lg btn-primary btn-block" type="submit">Continuar</button>
          </form>
        </div>  
      )
    } else {
      return <SubjectsList {...this.state} />
    }
  }
}