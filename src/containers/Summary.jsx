import React, { Component } from 'react';
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import '../styles/summary.css'
import 'semantic-ui-css/semantic.min.css';
import { Sidebar, Segment, Button, Menu, Icon } from 'semantic-ui-react'

class Summary extends Component {
  constructor(props) {
    super(props)
    this.props.actions.getSubjectsSummary()
    this.state = { subjects: [], visible: false }
  }

  componentWillReceiveProps(nextProps) {
    if(!this.state.loaded && nextProps.subjects) {
      this.setState({ subjects: nextProps.subjects, loaded: true, visible: this.state.visible })
    }
  }

  _fullnessPercentageClass = (percentage) => {
    if (percentage > 100) {
      return 'over-demanded'
    } else if (percentage >= 80 && percentage < 100) {
      return 'highly-demanded'
    } else if (percentage < 80) {
      return 'normal'
    } else {
      return 'full'
    }
  }

  _subjects = () => {
    return this._renderAfterLoading(this.state.subjects.map(subject => {
      return (
        <tr key={ subject.name }>
          <td>{ subject.name }</td>
          <td>{ subject.chair }</td>
          <td>{ subject.number_of_students }</td>
          <td width="10%" className={ `${this._fullnessPercentageClass(subject.fullness_percentage)} percentage-value` }>{ subject.fullness_percentage }%</td>
        </tr>
      )
    }))
  }

  _answersPercentage = () => {
    return this._renderAfterLoading(<span className="answers-percentage">Ha contestado el { this.props.answers_percentage }% de los estudiantes</span>)
  }

  _filterSubjects = (dropdown) => {
    let selectedFilter = this._filterFor(dropdown.target.value)
    let subjects = this.props.subjects.filter((subject) => {
      return selectedFilter(subject)
    })

    this.setState({ subjects: subjects, visible: this.state.visible })
  }

  _subjectsFilter = () => {
    return this._renderAfterLoading(
      <select className="subjects-filter" onChange={ this._filterSubjects }>
        <option value="all">Todos</option>
        <option value="highly-demanded">Por llenar</option>
        <option value="full">Llenos</option>
        <option value="over-demanded">Sobredemandados</option>
      </select>
    )
  }

  _filterFor = (value) => {
    const filters = {
      "all": (subject) => { return true },
      "highly-demanded": (subject) => { return subject.fullness_percentage >= 80 && subject.fullness_percentage < 100 },
      "full": (subject) => { return subject.fullness_percentage == 100 },
      "over-demanded": (subject) => { return subject.fullness_percentage > 100 }
    }
    return filters[value]
  }

  _renderAfterLoading = (htmlNode) => {
    return this.state.loaded && htmlNode
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const { visible } = this.state

    return (
      <div>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='overlay' width='thin' visible={visible} icon='labeled' vertical inverted>
            <Menu.Item name='close'>
              <Icon inverted={true} name='close' onClick={this.toggleVisibility}/>
            </Menu.Item>
            <Menu.Item name='tasks'>
              <Icon name='tasks' />
              Resumen
            </Menu.Item>
            <Menu.Item name='users'>
              <Icon inverted={true} name='users' />
              Alumnos
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Icon id="hamburguer-icon" size="big" name="sidebar" onClick={this.toggleVisibility}/>
            <div className="subjects-summary">
              <div className="subjects-summary-header">
                { this._answersPercentage() }
                { this._subjectsFilter() }
              </div>
              <div className="table-responsive subject-table">
                <table className="table table-striped table-bordered">
                  <thead className="thead-inverse">
                  <tr>
                    <th>Materia</th>
                    <th>Comisión</th>
                    <th>Inscriptos</th>
                    <th>% ocupado</th>
                  </tr>
                  </thead>
                  <tbody>{ this._subjects() }</tbody>
                </table>
              </div>
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    subjects: state.subjects,
    answers_percentage: state.answers_percentage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Summary)