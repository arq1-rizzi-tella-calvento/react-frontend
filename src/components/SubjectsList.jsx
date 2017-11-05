import React, { Component } from 'react';

const swapClasses = (element, classRemove, classAdd) => {
  element.classList.remove(classRemove);
  element.classList.add(classAdd);
}

export default class SubjectsList extends Component {
  setSelected = (event) => {
    const subjectCard = event.target
    if (subjectCard.classList.contains('bg-light')) {
      swapClasses(subjectCard, 'bg-light', 'bg-success')
    } else {
      swapClasses(subjectCard, 'bg-success', 'bg-light')
    }  
  };
  render() {
    return(
      <div>
        <div className="alert alert-dark">
          Haz click en las materias que ya aprobaste, esto evitara que aparezcan en encuestas posteriores.
        </div>
        <div className="row">
          { this.props.subjects.map(subject => {
              return(
                <div key={subject} className="col-xl-3 col-md-4 col-sm-6 col-12">
                  <div className="card bg-light mb-3" onClick={this.setSelected}>
                    <div className="card-header subject-name">{subject}</div>
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