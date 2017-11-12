import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as subjectsPollActions from '../actions'

class SubjectsPoll extends React.Component {
    constructor(props) {
        super(props)
        this.state = {subjects: this.props.subjects}

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    setSelected = (subject) => {
        return (selected) => {
            const selectDropdown = selected.target
            this.props.subjects.map(subject => {
                if(subject.name === selectDropdown.name){
                    subject.condition = selectDropdown.value
                }
            });
            this.setState({subjects: this.props.subjects});
        }
    };

    handleSubmit(event) {
        event.preventDefault();
        this.props.subjectsPollActions.submitSurvey(this.state)
    }

    render() {
        return(
            <div>
                <form onSubmit={ this.handleSubmit }>
                    <div className="alert alert-dark">
                        Ahora decinos que materias tenes pensado cursar!
                    </div>
                    <div className="row">
                        { this.state.subjects.map(subject => {
                            if(subject.condition !== 'Aproobed'){
                                return(
                                    <div key={subject.id} className='col-md-12 form-group'>
                                        <div className='col-md-4'>{subject.name} </div>
                                        <div className='col-md-6'>
                                            <select className='form-control' value={this.state.value} onChange={this.setSelected(subject)} name={subject.name} id={subject.name}>
                                                <option value="">Todavía no voy a cursar</option>
                                                <option value="cant">No puedo por los horarios</option>
                                                <option value="c1">Cursaria en C1</option>
                                                <option value="c2">Cursaria en C2</option>
                                                <option value="aproobe">Ya la cursé</option>
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
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => { return {} }

const mapDispatchToProps = (dispatch) => {
    return {
        subjectsPollActions: bindActionCreators(subjectsPollActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectsPoll)