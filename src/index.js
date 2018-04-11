import React from 'react'
import {render} from 'react-dom'
import {Router} from 'react-router'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import createHistory from 'history/createBrowserHistory'
import App from './App'

const history = createHistory()

render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root'))

registerServiceWorker()
