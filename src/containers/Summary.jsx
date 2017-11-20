import React, { Component } from 'react';
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import '../styles/summary.css'

class Summary extends Component {
  constructor(props) {
    super(props)
    this.props.actions.getSubjectsSummary()
    this.state = { subjects: [] }
  }

  componentWillReceiveProps(nextProps) {
    if(!this.state.loaded && nextProps.subjects) {
      this.setState({ subjects: nextProps.subjects, loaded: true })
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
          <td className={ this._fullnessPercentageClass(subject.fullness_percentage) }>{ subject.fullness_percentage }%</td>
        </tr>
      )
    }))
  }

  _answersPercentage = () => {
    return this._renderAfterLoading(<span>Ha contestado el { this.props.answers_percentage }% de los estudiantes</span>)
  }

  _filterSubjects = (dropdown) => {
    let selectedFilter = this._filterFor(dropdown.target.value)
    let subjects = this.props.subjects.filter((subject) => {
      return selectedFilter(subject)
    })

    this.setState({ subjects: subjects })
  }

  _subjectsFilter = () => {
    return this._renderAfterLoading(
      <select onChange={ this._filterSubjects }>
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

  render() {
    return (
      <div>
        { this._answersPercentage() }
        <br/>
        { this._subjectsFilter() }
        <table className="table">
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