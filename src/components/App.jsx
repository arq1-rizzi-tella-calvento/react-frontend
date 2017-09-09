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
    console.log('Success!', this.state)
    new Audio('http://c.mimp3.eu/d/QDMxEzN5QDN/el-peluca-sabe.mp3').play();
  }

  handleChange(event) {
    const selectDropdown = event.target
    this.setState({ [selectDropdown.name]: selectDropdown.value })
  }

  _questionGroup(label, name) {
    return (
      <div>
        <label>{label}</label>
        <select value={this.state.value} onChange={ this.handleChange } name={name}>
          <option value="">Selecciona tu opción</option>
          <option value="c1">Cursaria en C1</option>
          <option value="c2">Cursaria en C2</option>
          <option value="no-cursar">Todavía no voy a cursar</option>
          <option value="ya-curse">Ya la cursé</option>
        </select>
      </div>
    )
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        { this._questionGroup('Cuándo cursarías bla?', 'pregunta-1')}
        { this._questionGroup('Cuándo cursarías bla2?', 'pregunta-2')}
        <button type='submit'>Enviar Respuesta</button>
      </form>
    );
  }
}
