import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as stepWizardActions from '../actions'

class StepWizard extends React.Component {
//     handleSelect(selectedKey) {
//     alert(`selected ${selectedKey}`);
// }
//
//     const navInstance = (
//         <Nav bsStyle="pills" activeKey={1} onSelect={handleSelect}>
//             <NavItem eventKey={1} href="/home">NavItem 1 content</NavItem>
//             <NavItem eventKey={2} title="Item">NavItem 2 content</NavItem>
//             <NavItem eventKey={3} disabled>NavItem 3 content</NavItem>
//         </Nav>
//     );
//
//     render(navInstance, mountNode);
//
    constructor(props) {
        super(props);
        this.state = {student : { name: 'Julito', last_name: 'Calventhor', phone: '1234456', mail: 'amomimartillo@usopantene.com' },
            signatures : [
                { name: 'Matematica 1', signature_id: 'MT1' },
                { name: 'Matematica 2', signature_id: 'MT2' },
                { name: 'Matematica 3', signature_id: 'MT3' },
                { name: 'Analisis Matematico 1', signature_id: 'AM1' },
                { name: 'Analisis Matematico 2', signature_id: 'AM2' },
                { name: 'Analisis Matematico 3', signature_id: 'AM3' },
                { name: 'Arquitectura de software 1', signature_id: 'AS1' },
                { name: 'Arquitectura de software 2', signature_id: 'AS2' },
            ]};

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const selectDropdown = event.target
        this.setState({ [selectDropdown.name]: selectDropdown.value })
    }

    _stepOneStudentsData(student) {
        return (
            <div className='col-md-12 form-group'>
                <div className='col-md-12 form-group'>
                    <h1> Paso 1 - Datos del alumno</h1>
                </div>
                <div className='col-md-12 form-group'>
                    <div className='col-md-6'><label>Nombre</label></div>
                    <div className='col-md-6'><input className="form-control" id="student-name" value={student.name}/></div>
                </div>
                <div className='col-md-12 form-group'>
                    <div className='col-md-6'><label>Apellido</label></div>
                    <div className='col-md-6'><input className="form-control" id="student-last-name" value={student.last_name}/></div>
                </div>
                <div className='col-md-12 form-group'>
                    <div className='col-md-6'><label>Telefono</label></div>
                    <div className='col-md-6'><input className="form-control"  id="student-phone" value={student.phone}/></div>
                </div>
                <div className='col-md-12 form-group'>
                    <div className='col-md-6'><label>Correo electronico</label></div>
                    <div className='col-md-6'><input className="form-control" id="student-mail" value={student.mail}/></div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className='container page-centered'>
                <div className='row form-group'>
                    <div className='col-xs-12'>
                        <ul className='nav nav-pills nav-justified thumbnail setup-panel'>
                            <li className='active'>
                                <a data-toggle="pill" href='#step-1'>
                                    <h4 className='list-group-item-heading'>Paso 1</h4>
                                    <p className='list-group-item-text'>Datos Personales</p>
                                </a>
                            </li>
                            <li>
                                <a data-toggle="pill" href='#step-2'>
                                    <h4 className='list-group-item-heading'>Paso 2</h4>
                                    <p className='list-group-item-text'>Materias Aprobadas</p>
                                </a>
                            </li>
                            <li>
                                <a data-toggle="pill" href='#step-3'>
                                    <h4 className='list-group-item-heading'>Paso 3</h4>
                                    <p className='list-group-item-text'>Materias a cursar</p>
                                </a>
                            </li>
                            <li>
                                <a data-toggle="pill" href='#step-4'>
                                    <h4 className='list-group-item-heading'>Paso 4</h4>
                                    <p className='list-group-item-text'>Confirmar eleccion</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='tab-content'>
                    <div className='tab-pane fade in active' id='step-1'>
                        <div className='col-xs-12'>
                            <div className='col-md-12 well text-center'>
                                { this._stepOneStudentsData(this.state.student)}
                                <div className='col-md-12'>
                                    <button className='btn btn-success pull-right' type='button'>Continuar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='tab-pane fade' id='step-2'>
                        <div className='col-xs-12'>
                            <div className='col-md-12 well'>
                                <div className='col-md-12 well'>
                                    <h1 className='text-center'> Paso 2 - Materias aprobadas</h1>
                                </div>
                                <div className='col-md-12'>
                                    {this.state.signatures.map(function(signature){
                                        return(<div id={signature.signature_id} className='col-md-6 form-group'>

                                            <div className='col-md-12 form-group'>
                                                <div className='col-md-3 pull-left'>
                                                    <button className='btn btn-danger'>No voy a cursar</button>
                                                </div>
                                                <div className='col-md-4 text-center'>
                                                    <span>{signature.name}</span>
                                                </div>
                                                <div className='col-md-3 pull-right'>
                                                    <button className='btn btn-success'>Ya aprobe</button>
                                                </div>
                                            </div>
                                        </div>)
                                    })}
                                </div>
                                <div className='col-md-12'>
                                    <button className='btn btn-success pull-right' type='button'>Continuar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='tab-pane fade' id='step-3'>
                        <div className='col-xs-12'>
                            <div className='col-md-12 well'>
                                <h1 className='text-center'> Paso 3 - Encuesta</h1>
                            </div>
                            <div className='col-md-12'>
                                {this.state.signatures.map(function(signature){
                                    return(
                                        <div className='col-md-12 form-group'>
                                            <div className='col-md-4'>{signature.name}</div>
                                            <div className='col-md-6'>
                                                <select className='form-control' value={signature.signature_id}
                                                        name={signature.signature_id} id={signature.signature_id}>
                                                    <option value="">Selecciona tu opción</option>
                                                    <option value="c1">Cursaria en C1</option>
                                                    <option value="c2">Cursaria en C2</option>
                                                    <option value="no-cursar">Todavía no voy a cursar</option>
                                                    <option value="ya-curse">Ya la cursé</option>
                                                </select>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='col-md-12'>
                                <button className='btn btn-success pull-right' type='button'>Continuar</button>
                            </div>
                        </div>
                    </div>
                    <div className='tab-pane fade' id='step-4'>
                        <div className='col-xs-12'>
                            <div className='col-md-12 well'>
                                <h1 className='text-center'> Paso 4 - Confirmar eleccion</h1>
                                Te anotaste en las siguientes materias:
                                Materia x comision y
                                <div className='col-md-12'>
                                    <button className='btn btn-success pull-right' type='button'>Enviar respuesta</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => { return {} }

const mapDispatchToProps = (dispatch) => {
    return {
        stepWizardActions: bindActionCreators(stepWizardActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StepWizard)