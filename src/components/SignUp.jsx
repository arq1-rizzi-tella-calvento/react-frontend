import React, { Component } from 'react';
import SubjectsList from './SubjectsList';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      documentNumber: '',
      firstSemester: false,
      needStudentInfoSubmission: true,
      subjects: [ {id:'MT1', name:'Matematica I', condition: ''},
        {id:'IP', name:'Introducción a la programación', condition: ''},
        {id:'OC', name:'Organización de computadoras', condition: ''},
        {id:'BD', name:'Bases de datos', condition: ''},
        {id:'ED', name:'Estructuras de datos', condition: ''},
      ]
    };
  }

  handleChange = (name) => {
    return (event) => { 
      let newChange = {};
      newChange[name] = event.target.value
      this.setState(newChange); 
    };
  };
  captureUserInfo = (event) => {
    this.setState({ needStudentInfoSubmission: false })
    event.preventDefault();
  };
  render() {
    if (this.state.needStudentInfoSubmission) {
      return (
        <div className='sign-box'>
          <form onSubmit={this.captureUserInfo}>
            <p className='sign-info'>Antes de empezar la encuesta, quisieramos que nos brindaras algunos datos para mejorar tu experiencia.</p>
            <input type="text" className="form-control" value={this.state.fullName} onChange={this.handleChange('fullName')} 
              placeholder="Nombre completo" required/>
            <input type="email" className="form-control" value={this.state.email} onChange={this.handleChange('email')}
              placeholder="Email" required/>
            <input type="text" className="form-control" value={this.state.documentNumber} onChange={this.handleChange('documentNumber')} 
              placeholder="Número de documento" required/>
      
            <div className="checkbox">
              <label>
                Primer cuatrimestre en la carrera
                <input type="checkbox" onChange={this.handleChange('firstSemester')} value={this.state.firstSemester} />
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