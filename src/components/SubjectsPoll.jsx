import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as subjectsPollActions from '../actions'

class SubjectsPoll extends React.Component {
    constructor(props) {
        super(props)
        const subjectsPoll = [];
        Object.values(this.props).map(subject => {
            var subjectCast = { id: subject[1], name: subject[0], condition: ''}
            subjectsPoll.push(subjectCast)
        });
        this.state = {subjects: subjectsPoll};

        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit(event) {
        event.preventDefault();
        this.props.subjectsPollActions.submitSurvey(this.state)
    }

    render() {
        return(
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
                    <button className="btn btn-sm btn-primary btn-block" type="button" onClick={ this.handleSubmit }>
                        Enviar
                    </button>
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