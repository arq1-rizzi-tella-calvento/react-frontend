import React from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => (
  <div class="sign-box">
    <form>
      <h2 class="sign-heading">¡Bienvenido a la encuesta!</h2>
      <input type="documentNumber" class="form-control" placeholder="Número de documento" required autofocus/>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Continuar</button>
    </form>
    <Link to="/signup" className="text-center">¿Primera vez haciendo la encuesta?</Link>
  </div>
)

export default SignIn