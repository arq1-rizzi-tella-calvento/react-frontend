import React from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => (
  <div className="sign-box">
    <form>
      <h2 className="sign-heading">¡Bienvenido a la encuesta!</h2>
      <input type="documentNumber" className="form-control" placeholder="Número de documento" required autoFocus/>
      <button className="btn btn-lg btn-primary btn-block" type="submit">Continuar</button>
    </form>
    <Link to="/signup" className="text-center">¿Primera vez haciendo la encuesta?</Link>
  </div>
)

export default SignIn