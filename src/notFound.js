const React = require('react')

/**
 * NotFound
 * @extends React.Component
 */

class NotFound extends React.Component {
  render () {
    return (
      <div>
        <h1>Page not found</h1>
        <p>Whoops, couldn't find what you were looking for!</p>
      </div>
    )
  }
}

module.exports = NotFound
