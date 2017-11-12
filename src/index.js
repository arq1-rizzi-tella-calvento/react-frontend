import React from 'react'
import thunkMiddleware from 'redux-thunk'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import app from './reducers'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './signin.css';
import App from './components/App.jsx';

const store = createStore(
  app,
  applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
  )
)

render(<Provider store={store}><App/></Provider>, document.getElementById('root'))
