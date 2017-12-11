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
            this.state.subjects.map(subject => {
                if(subject.name === selectDropdown.name){
                    subject.selectedChair = selectDropdown.value
                }
            });
        }
    };

    handleSubmit = (event) => {
        submitSurvey(
            this.state,
            data => render (<SurveyConfirmation msg={data} /> , document.getElementById('root')),
            data => render(<Alert msg={data.message}/>, document.getElementById('alert'))
        )
        event.preventDefault();
    }

    _renderSubject(subject) {
        return (
            <div key={subject.id} className='col-md-12 form-group'>
                <div className='col-md-4'>{subject.name} </div>
                <div className='col-md-6'>
                    <select className='form-control' value={this.state.value} onChange={this.setSelected(subject)} name={subject.name} id={subject.id}>
                        <option value="dont">Todavía no voy a cursar</option>
                        <option value="cant">No puedo por los horarios</option>
                        { this._generateChairOptions(subject.chairs)}
                        <option value="approved">Ya la cursé</option>
                    </select>
                </div>
            </div>
        )
    }

    _generateChairOptions(chairs){
        return (
            chairs.map((chair) => {
                return(
                    <option value={chair.id}>{chair.time}</option>
                )
            })
        )
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
                            return(
                                this._renderSubject(subject)
                            )
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