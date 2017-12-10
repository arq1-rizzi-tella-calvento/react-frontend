import React, { Component } from 'react';
import { surveyOptions } from '../actions/subjects.js';
import Alert from '../components/Alert.jsx';
import { render } from 'react-dom';
import { submitSurvey } from '../actions/subjects';
import SurveyConfirmation from '../containers/SurveySummary.jsx';

export default class  SubjectsPoll extends Component {
  state = { subjects: [] }
  componentDidMount() {
    surveyOptions(
      this.props.match.params.token,
      data => this.setState({ userId: this.props.match.params.token, subjects: data }))
  }

  setSelected = (subject) => {
    return (selected) => {
      const selectDropdown = selected.target;
      let subjectsDup = this.state.subjects;
      const subjects = subjectsDup.find(subject => subject.name === selectDropdown.name)
      subject.selectedChair = selectDropdown.value;
      subject.selected = subject.selectedChair;
      
      this.setState({ subjects: subjectsDup });
    }
  };

  _renderSubject(subject) {
    return (
      <div key={subject.name} className='col-md-6 form-group'>
        <div className='col-md-12'>{subject.name}</div>
        <div className='col-md-10'>
          <select className='form-control' value={subject.selected} onChange={this.setSelected(subject)} name={subject.name} id={subject.name}>
            <option value="dont">Todavía no voy a cursar</option>
            <option value="cant">No puedo por los horarios</option>
            { this._generateChairOptions(subject.chairs)}
            <option value="approve">Ya la cursé</option>
          </select>
        </div>
      </div>
    )
  }

  _generateChairOptions(chairs) {
    return chairs.map(chair => <option value={chair.id}>{chair.time}</option>);
  }

  handleSubmit = (event) => {
    submitSurvey(
      this.state,
      data => render (<SurveyConfirmation msg={data} /> , document.getElementById('root')),
      data => render(<Alert msg={data.message}/>, document.getElementById('alert'))
    )
    event.preventDefault();
  }
  
  render() {
    return(
      <form onSubmit={ this.handleSubmit }>
        <div id="alert">
        </div>
        <div>
          <div className="alert alert-dark">
            Ahora decinos que materias tenes pensado cursar!
          </div>
          <div className="row">
            { this.state.subjects.map(subject => this._renderSubject(subject)) }
          </div>
          <button className="btn btn-sm btn-primary btn-block" type="submit">
            Enviar
          </button>
        </div>
      </form>
    )
  }
}