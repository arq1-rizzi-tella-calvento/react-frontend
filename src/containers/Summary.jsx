import React, { Component } from 'react';
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import '../styles/summary.css'
import 'semantic-ui-css/semantic.min.css';
import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react'

class Summary extends Component {
  constructor(props) {
    super(props)
    this.props.actions.getSubjectsSummary()
    this.state = { subjects: [], visible: false, fullnessFilter: this._filterFor('all'), filteredName: '', sorting: 'ascending' }
  }

  componentWillReceiveProps(nextProps) {
    if(!this.state.loaded && nextProps.subjects) {
      this._updateState({ subjects: nextProps.subjects, loaded: true, visible: this.state.visible }, this._sortSubjects)
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
    return this._renderAfterLoading(this.state.subjects.map((subject, index) => {
      return (
        <tr key={ `s-${index}` }>
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

  _filterByFullness = (dropdown) => {
    let selectedFilter = this._filterFor(dropdown.target.value)
    this._updateState({ fullnessFilter: selectedFilter }, this._filterSubjects)
  }

  _filterByName = (input) => {
    let subjectName = input.target.value.toLowerCase()
    this._updateState({ filteredName: subjectName }, this._filterSubjects)
  }

  _filterSubjects = () => {
    let subjects = this.props.subjects.filter((subject) => {
      return this.state.fullnessFilter(subject)
    })

    subjects = subjects.filter((subject) => {
      return subject.name.toLowerCase().includes(this.state.filteredName)
    })

    this._updateState({ subjects: subjects })
  }

  _updateState = (newProperties, callback) => {
    this.setState((prevState) => {
      return Object.assign(prevState, newProperties)
    }, callback)
  }

  _fullnessFilter = () => {
    return (
      <select onChange={ this._filterByFullness }>
        <option value="all">Todos</option>
        <option value="highly-demanded">Por llenar</option>
        <option value="full">Llenos</option>
        <option value="over-demanded">Sobredemandados</option>
      </select>
    )
  }

  _nameFilter = () => <input onChange={ this._filterByName } placeholder="Materia"></input>

  _subjectsFilters = () => {
    return this._renderAfterLoading(
      <div className="subjects-filter">
        { this._nameFilter() }
        { this._fullnessFilter() }
      </div>
    )
  }

  _filterFor = (value) => {
    const filters = {
      "all": (subject) => { return true },
      "highly-demanded": (subject) => { return subject.fullness_percentage >= 80 && subject.fullness_percentage < 100 },
      "full": (subject) => { return subject.fullness_percentage === 100 },
      "over-demanded": (subject) => { return subject.fullness_percentage > 100 }
    }
    return filters[value]
  }

  _renderAfterLoading = (htmlNode) => this.state.loaded && htmlNode

  toggleVisibility = () => this._updateState({ visible: !this.state.visible })

  _sortSubjects = () => {
    const sortedSubjects = this.state.subjects.sort(this._sorting())
    const newOrder = Object.keys(this._sortingOptions).find(option => option !== this.state.sorting)

    this._updateState({ subjects: sortedSubjects, sorting: newOrder })
  }

  _sortingOptions = {
    "ascending": (a, b) => a.fullness_percentage - b.fullness_percentage,
    "descending": (a, b) => b.fullness_percentage - a.fullness_percentage
  }

  _sorting = () => this._sortingOptions[this.state.sorting]

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
                { this._subjectsFilters() }
              </div>
              <div className="table-responsive subject-table">
                <table className="table table-striped table-bordered">
                  <thead className="thead-inverse">
                  <tr>
                    <th>Materia</th>
                    <th>Comisión</th>
                    <th>Inscriptos</th>
                    <th>
                      % ocupado
                      <Icon name={ `sort ${this.state.sorting}` } onClick={ this._sortSubjects }/>
                    </th>
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