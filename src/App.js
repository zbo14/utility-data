import React from 'react'
import {Route, Switch} from 'react-router'
const Chart = require('./chart')
const Home = require('./home')
const NotFound = require('./notFound')

class App extends React.Component {
  render () {
    return (
      <Switch>
        <Route exact path='/utility-data/chart' component={Chart} />
        <Route exact path='/utility-data' component={Home} />
        <Route path='*' component={NotFound} />
      </Switch>
    )
  }
}

export default App
