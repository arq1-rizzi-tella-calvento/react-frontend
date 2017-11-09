import React, { Component } from 'react';


export default class SubjectsPoll extends Component {
    constructor(props) {
        super(props)
        this.state = { }
    }

    handleChange = (subject) => {
    };

    render() {
        return(
            <div>
                <div className="alert alert-dark">
                    Ahora decinos que materias tenes pensado cursar!
                </div>
                <div className="row">
                    { this.props.subjects.map(subject => {
                        if(subject.condition !== 'Aproobed'){
                            return(
                                <div className='col-md-12 form-group'>
                                    <div className='col-md-4'>{subject.name} </div>
                                    <div className='col-md-6'>
                                        <select className='form-control' value={subject.condition} onChange={ this.handleChange } name={subject.name} id={subject.name}>
                                            <option value="no-cursar">Todavía no voy a cursar</option>
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
                    Continuar con la encuesta
                </button>
            </div>
        )
    }
}