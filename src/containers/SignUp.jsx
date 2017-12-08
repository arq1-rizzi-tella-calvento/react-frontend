import React, { Component } from 'react';
import SubjectsList from '../components/SubjectsList';
import { handleChange } from '../formUtils.js';
import Alert from '../components/Alert.jsx';
import { render } from 'react-dom';
import { enrollStudent } from '../actions/auth.js';

export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      identity_document: '',
      subjects: [],
      firstSemester: false,
      needStudentInfoSubmission: true,
      token: this.props.match.params.token
    }
  }

  captureUserInfo = (event) => {
    if (this.state.firstSemester || this.state.subjects.length > 0) {
      enrollStudent(
        this.state,
        data => this.props.history.push(`/survey/${data.token}`),
        data => render(<Alert msg={data.message}/>, document.getElementById('alert'))
      )
    } else {
      this.setState({ needStudentInfoSubmission: false })
    }
    event.preventDefault();
  };

  updateSubjects = (subjectId) => {
    let selectedSubjects = this.state.subjects;
    if (selectedSubjects.includes(subjectId)) {
      selectedSubjects = selectedSubjects.filter(subject => subject !== subjectId)
    } else {
      selectedSubjects.push(subjectId);
    }
    this.setState({ subjects: selectedSubjects });
  };

  studentInformationView = () => {
    if (this.state.needStudentInfoSubmission) {
      return <div className='sign-box'>
        <div id='alert'>
        </div>
        <p className='sign-info'>Antes de empezar la encuesta, quisieramos que nos brindaras algunos datos para mejorar tu experiencia.</p>
        <input type="text" className="form-control" value={this.state.name} onChange={handleChange(this, 'name')} 
          placeholder="Nombre completo" required/>
        <input type="text" className="form-control" value={this.state.identity_document} onChange={handleChange(this, 'identity_document')} 
          placeholder="Número de documento" required/>
    
        <div className="checkbox">
          <label>
            Primer cuatrimestre en la carrera
            <input type="checkbox" onChange={handleChange(this, 'firstSemester')} value={this.state.firstSemester} />
          </label>
        </div>
  
          <button className="btn btn-lg btn-primary btn-block" type="submit">Continuar</button>
      </div>  
    } else {
      return <SubjectsList handler={this.updateSubjects} />
    }
  };

  render() {
    return <form onSubmit={this.captureUserInfo}>
      { this.studentInformationView() }
    </form>
  }
}