import React, { Component } from 'react';

const updateCondition = (subjects, name, condition) => {
    subjects.map(subject => {
        if(subject.name === name){
            subject.condition = condition
        }
    });
};

export default class SubjectsPoll extends Component {
    constructor(props) {
        super(props)
        this.state = {subjects: this.props.subjects}
    }

    setSelected = (subject) => {
        return () => {
                updateCondition(this.props.subjects, subject.name, this.state.value);
        }
    };

    onSubmit(e) {
        e.preventDefault();
        fetch(this.props.formAction, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({survey: this.state.subjects})
        });
        this.setState({description: ''});
    }

    render() {
        return(
            <div>
                <form action="postSurvey">
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