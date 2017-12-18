import React, { Component } from 'react';
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import '../styles/summary.css'
import 'semantic-ui-css/semantic.min.css';
import { Icon } from 'semantic-ui-react'

class Summary extends Component {
  constructor(props) {
    super(props)
    this.props.actions.getSubjectsSummary()
    this.state = { subjects: [], fullnessFilter: this._filterFor('all'), filteredName: '', sorting: 'ascending' }
  }

  componentWillReceiveProps(nextProps) {
    if(!this.state.loaded && nextProps.subjects) {
      this._updateState({ subjects: nextProps.subjects, loaded: true }, this._sortSubjects)
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
    return this._renderAfterLoading(this.state.subjects.map((subject) => {
      let firstChair = subject.chairs[0];

      return (
        subject.chairs.map((chair, index) => {
          return (
            <tr key={ `${subject.name}-${chair.chair}` }>
              { index === 0 && <td rowSpan={ subject.chairs.length }>{ subject.name }</td> }
              <td>{ chair.chair }</td>
              <td>{ chair.number_of_students }</td>
              <td width="10%" className={ `${this._fullnessPercentageClass(chair.fullness_percentage) } percentage-value` }>{ chair.fullness_percentage }%</td>
            </tr>
          )
        })
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
      "highly-demanded": (subject) => { return this._fullnessPercentages(subject).some(percentage => percentage >= 80 && percentage < 100) },
      "full": (subject) => { return this._fullnessPercentages(subject).some(percentage => percentage === 100) },
      "over-demanded": (subject) => { return this._fullnessPercentages(subject).some(percentage => percentage > 100) }
    }
    return filters[value]
  }

  _fullnessPercentages = (subject) => {
    return subject.chairs.map(chair => chair.fullness_percentage)
  }

  _max = (values) => {
    return Math.max.apply(Math, values)
  }

  _renderAfterLoading = (htmlNode) => this.state.loaded && htmlNode

  _sortSubjects = () => {
    const sortedSubjects = this.state.subjects.sort(this._sorting())
    const newOrder = Object.keys(this._sortingOptions).find(option => option !== this.state.sorting)

    this._updateState({ subjects: sortedSubjects, sorting: newOrder })
  }

  _sortingOptions = {
    "ascending": (a, b) => this._max(this._fullnessPercentages(a)) - this._max(this._fullnessPercentages(b)),
    "descending": (a, b) => this._max(this._fullnessPercentages(b)) - this._max(this._fullnessPercentages(a))
  }

  _sorting = () => this._sortingOptions[this.state.sorting]

  render() {
    const { visible } = this.state

    return (
      <div>
        <div className="subjects-summary">
          <div className="subjects-summary-header">
            { this._answersPercentage() }
            { this._subjectsFilters() }
          </div>
          <div className="table-responsive subject-table">
            <table className="table table-bordered">
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