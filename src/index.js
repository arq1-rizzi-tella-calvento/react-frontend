import React from 'react'
import thunkMiddleware from 'redux-thunk'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import app from './reducers'
import 'bootstrap/dist/css/bootstrap.min.css';
import './signin.css';
import App from './containers/App.jsx';

const store = createStore(
  app,
  applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
  )
)

render(<Provider store={store}><App/></Provider>, document.getElementById('root'))
