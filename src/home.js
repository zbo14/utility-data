const React = require('react')

/**
 * Home
 * @extends React.Component
 */

class Home extends React.Component {
  render () {
    return (
      <div>
        <h1>Welcome!</h1>
        <p>This is a simple app to chart your utility data.</p>
        <p>Just upload a JSON file and the app will display your energy usage, bill, and savings for each month.</p>
        <p>If there's something wrong with your data, you should see an alert upon upload.</p>
        <p>Click <a href='/utility-data/chart'>here</a> to begin (there should be some data already displayed).</p>
      </div>
    )
  }
}

module.exports = Home
