import React from 'react';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('Success!', this.state);
        alert('Inscripcion confirmada');
    }

    handleChange(event) {
        const selectDropdown = event.target
        this.setState({ [selectDropdown.name]: selectDropdown.value })
    }

    _questionGroup(label, name) {
        return (
            <div className='col-md-12 form-group'>
                <div className='col-md-4'>{label} </div>
                <div className='col-md-6'>
                    <select className='form-control' value={this.state.value}
                            onChange={ this.handleChange } name={name} id={name}>
                        <option value="">Selecciona tu opción</option>
                        <option value="c1">Cursaria en C1</option>
                        <option value="c2">Cursaria en C2</option>
                        <option value="no-cursar">Todavía no voy a cursar</option>
                        <option value="ya-curse">Ya la cursé</option>
                    </select>
                </div>
            </div>
        )
    }

    _welcome() {
        return (
            <div className='container page-centered'>
                <div className='jumbotron jumbotron-fluid'>
                    <div className='container'>
                        <h1 className='display-3'>¡Bienvenido, estudiante!</h1>
                        <p className='lead'>
                            Para iniciar la encuestra de pre-inscripripción, siga las instrucciones que se iran detallando.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <form onSubmit={ this.handleSubmit }>
                {this._welcome()}
                <div id='materias' className='container' style={{paddingBottom: 25 + 'px'}}>
                    <div className='panel panel-default'>
                        <div className='panel-body'>
                            <div className='panel-heading text-center'>
                                <span>Lista de materias</span>
                            </div>
                            <div className='col-md-12'>
                                { this._questionGroup('Cuándo cursarías Matemática 1?', 'matematica-1')}
                                { this._questionGroup('Cuándo cursarías Matemática 2?', 'matematica-2')}
                            </div>
                            <div className='col-md-12'>
                                <button className='btn btn-success pull-right' type='submit'>Enviar Respuesta</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}
