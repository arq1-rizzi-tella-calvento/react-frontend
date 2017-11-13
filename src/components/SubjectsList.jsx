import React, { Component } from 'react';
import { allSubjects } from '../actions/subjects.js';

const swapClasses = (element, classRemove, classAdd) => {
  element.classList.add(classAdd);
  element.classList.remove(classRemove);
}

export default class SubjectsList extends Component {
  state = { subjects: [] }
  componentDidMount() {
    allSubjects(data => this.setState({ subjects: data }));
  }
  setSelected = (event, subjectId) => {
    this.props.handler(subjectId)
    const subjectCard = event.target;
    if (subjectCard.classList.contains('bg-light')) {
      swapClasses(subjectCard, 'bg-light', 'bg-success');
    } else {
      swapClasses(subjectCard, 'bg-success', 'bg-light');
    }  
  };
  render() {
    return(
      <div>
        <div id='alert'>
        </div>
        <div className="alert alert-dark">
          Haz click en las materias que ya aprobaste, esto evitara que aparezcan en encuestas posteriores.
        </div>
        <div className="row">
          { this.state.subjects.map((name, id) => {
              return(
                <div key={id} className="col-xl-3 col-md-4 col-sm-6 col-12">
                  <div className="card mb-3">
                    <div className="card-header bg-light subject-name" onClick={(e) => this.setSelected(e, id)}>
                      {name}
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <button className="btn btn-sm btn-primary btn-block" type="submit">
          Continuar con la encuesta
        </button>
      </div>
    )
  }
}