const React = require('react')
const BarChart = require('react-chartjs-2').Bar
const parse = require('./parse')
const _ = require('./util')

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const options = {
  scales: {
    yAxes: [
      {
        id: '$',
        type: 'linear',
        position: 'left',
        stacked: true,
        scaleLabel: {
          display: true,
          labelString: '$$',
          fontSize: 18
        },
        ticks: {
          suggestedMin: 0
        }
      },
      {
        id: 'kwh',
        type: 'linear',
        position: 'right',
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'kwh',
          fontSize: 18
        },
        ticks: {
          suggestedMin: 0
        }
      }
    ]
  }
}

const label = entry => `${months[entry.month - 1]} ${entry.year}`

const newState = entries => {
  const labels = []
  const bill = []
  const savings = []
  const kwh = []
  _.each(entries, entry => {
    labels.push(label(entry))
    bill.push(entry.bill)
    savings.push(entry.savings)
    kwh.push(entry.kwh)
  })
  return {
    labels: labels,
    datasets: [
      {
        backgroundColor: 'rgba(255, 99, 132, 0.4)',
        label: 'bill',
        yAxisID: '$',
        data: bill,
        stack: '$'
      },
      {
        backgroundColor: 'rgba(0, 250, 0, 0.4)',
        label: 'savings',
        yAxisID: '$',
        data: savings,
        stack: '$'
      },
      {
        backgroundColor: 'rgba(255, 206, 86, 0.4)',
        label: 'kwh',
        yAxisID: 'kwh',
        data: kwh
      }
    ]
  }
}

const initState = newState([
  {
    'year': 2016,
    'month': 12,
    'kwh': 1500,
    'bill': 144.04,
    'savings': 19.81
  },
  {
    'year': 2017,
    'month': 1,
    'kwh': 750,
    'bill': 73.29,
    'savings': 3.49
  },
  {
    'year': 2017,
    'month': 2,
    'kwh': 500,
    'bill': 70.04,
    'savings': 1.32
  },
  {
    'year': 2017,
    'month': 3,
    'kwh': 730,
    'bill': 94.14,
    'savings': 2.99
  },
  {
    'year': 2017,
    'month': 4,
    'kwh': 1000,
    'bill': 124.04,
    'savings': 12.99
  }
])

/**
 * Chart
 * @extends React.Component
 */

class Chart extends React.Component {
  constructor (props) {
    super(props)
    this.state = initState
    this.reader = new FileReader()
    this.reader.onload = () => {
      parse(this.reader.result, (err, entries) => {
        if (err) return alert(err.message)
        this.setState(newState(entries))
      })
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  onFormSubmit (e) {
    e.preventDefault()
    const [input] = document.getElementsByTagName('input')
    if (input.files.length) {
      this.reader.readAsText(input.files[0])
    }
  }

  render () {
    return (
      <div>
        <h1>Utility Data Chart</h1>
        <form onSubmit={this.onFormSubmit}>
          <input type='file' accept='application/json' />
          <br /><br />
          <button type='submit'>Upload</button>
        </form>
        <BarChart data={this.state} options={options} redraw />
      </div>
    )
  }
}

module.exports = Chart
