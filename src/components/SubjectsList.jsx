import React, { Component } from 'react';
import SubjectsPoll from './SubjectsPoll';

const swapClasses = (element, classRemove, classAdd) => {
    element.classList.remove(classRemove);
    element.classList.add(classAdd);
}

const updateCondition = (subjects, name, condition) => {
    subjects.map(subject => {
        if(subject.name === name){
            subject.condition = condition
        }
    });
}

export default class SubjectsList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    setSelected = (subject) => {
        return () => {
            const subjectCard = document.getElementById(subject.id);
            if (subjectCard.classList.contains('bg-light')) {
                swapClasses(subjectCard, 'bg-light', 'bg-success')
                updateCondition(this.props.subjects, subject.name, 'Aproobed');
            } else {
                swapClasses(subjectCard, 'bg-success', 'bg-light')
                updateCondition(this.props.subjects, subject.name, '');
            }
        }
    };

    continuePoll = (event) => {
        this.setState({readyToFinalPool: true})
        event.preventDefault();
    };

    render() {
        if (!this.state.readyToFinalPool) {
            return (
                <div>
                    <div className="alert alert-dark">
                        Haz click en las materias que ya aprobaste, esto evitara que aparezcan en encuestas posteriores.
                    </div>
                    <div className="row">
                        { this.props.subjects.map(subject => {
                            return (
                                <div key={subject.name} className="col-xl-3 col-md-4 col-sm-6 col-12">
                                    <div id={subject.id} className="card bg-light mb-3"
                                         onClick={this.setSelected(subject)}>
                                        <div className="card-header subject-name">{subject.name}</div>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                    <button className="btn btn-sm btn-primary btn-block" type="submit" onClick={this.continuePoll}>
                        Continuar con la encuesta
                    </button>
                </div>
            )
        } else{
            return <SubjectsPoll {...this.props} />
        }
    }
}