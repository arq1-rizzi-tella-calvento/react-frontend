import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { allSubjects } from '../actions/subjects.js';
import Alert from '../components/Alert.jsx';
import { render } from 'react-dom';
import { submitSurvey } from '../actions/auth.js';

export default class  SubjectsPoll extends Component {
    state = { subjects: [] }
    componentDidMount() {
        allSubjects(data => this.castToSubjectPoll(data));
    }

    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    castToSubjectPoll = (data) => {
        const subjectsPoll = this.state.subjects;
        Object.values(data).map(subject => {
            var subjectCast = { id: subject[1], name: subject[0], condition: ''}
            subjectsPoll.push(subjectCast)
        });
        this.setState({ subjects : subjectsPoll})
    }

    setSelected = (subject) => {
        return (selected) => {
            const selectDropdown = selected.target;
            this.state.subjects.map(subject => {
                if(subject.name === selectDropdown.name){
                    subject.condition = selectDropdown.value
                }
            });
        }
    };

    handleSubmit = (event) => {
        submitSurvey(
            this.state,
            data => console.log('submit ok'),
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
                        { this.state.subjects.map(subject => {
                            if(subject.condition !== 'Approved'){
                                return(
                                    <div key={subject.id + subject.name} className='col-md-12 form-group'>
                                        <div className='col-md-4'>{subject.name} </div>
                                        <div className='col-md-6'>
                                            <select className='form-control' value={this.state.value} onChange={this.setSelected(subject)} name={subject.name} id={subject.name}>
                                                <option value="">Todavía no voy a cursar</option>
                                                <option value="cant">No puedo por los horarios</option>
                                                <option value="c1">Cursaria en C1</option>
                                                <option value="c2">Cursaria en C2</option>
                                                <option value="approve">Ya la cursé</option>
                                            </select>
                                        </div>
                                    </div>
                                )
                            }
                        })
                        }
                    </div>
                    <button className="btn btn-sm btn-primary btn-block" type="submit">
                        Enviar
                    </button>
                </div>
            </form>
        )
    }
}